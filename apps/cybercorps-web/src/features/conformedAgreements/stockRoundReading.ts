import { shareExtensionV3Abi } from "@metalex-web/abis";
import { isInvestorCommitment } from "@metalex-web/encryption/commitment";
import { ENCRYPTION_PREFIX } from "@metalex-web/encryption/constants";
import { conformedAgreementNotice } from "@metalex-web/legal-documents/conformed-secondary-sale";
import { conformedStockRound } from "@metalex-web/legal-documents/conformed-stock-round";
import { financingReceiptRecord } from "@metalex-web/legal-documents/financing-receipts";
import { registeredStock } from "@metalex-web/legal-documents/registered-stock";
import {
  type Address,
  decodeAbiParameters,
  encodeAbiParameters,
  getAbiItem,
  type Hex,
  isAddressEqual,
  sha256,
  toBytes,
} from "viem";
import { z } from "zod";
import { readingDigest } from "../secondary-sales/standardSaleProof";
import { issuedStockTerms } from "./issuedStockTerms";
import {
  stockAnnotationSha256,
  stockRendererSha256,
} from "./stockReadingRevision";
import { describeStockShare, type Share } from "./stockSeriesDescription";

const hash = z
  .string()
  .regex(/^0x[a-fA-F0-9]{64}$/)
  .transform((value) => value as Hex);
const address = z
  .string()
  .regex(/^0x[0-9a-fA-F]{40}$/)
  .transform((value) => value as Address);
const unsigned = z
  .string()
  .regex(/^(0|[1-9][0-9]{0,77})$/, { abort: true })
  .refine((v) => BigInt(v) < 2n ** 256n);
const text = z.string().max(256 * 1024);
const readable = text.refine(
  (v) => !v.startsWith(ENCRYPTION_PREFIX) && !isInvestorCommitment(v),
);
const disclosed = z.discriminatedUnion("source", [
  z.strictObject({ source: z.literal("recorded"), value: readable }),
  z.strictObject({
    source: z.literal("agreement-party-decryption"),
    ciphertextSha256: hash,
    value: readable,
  }),
  z.strictObject({
    source: z.literal("agreement-party-disclosure"),
    wire: z.string().regex(/^mtlxc1:[0-9a-f]{64}$/),
    value: readable,
  }),
]);
const shareAbi = getAbiItem({
  abi: shareExtensionV3Abi,
  name: "resolveCert",
}).outputs;
export const encodeStockShare = (share: Share) =>
  encodeAbiParameters(shareAbi, [share]);

export function stockPartyValues(
  wires: readonly string[],
  opened: readonly string[],
) {
  return wires.map((wire, i) => {
    const value = opened[i];
    if (
      typeof value !== "string" ||
      value.startsWith(ENCRYPTION_PREFIX) ||
      isInvestorCommitment(value)
    )
      throw Error("The authorized stock purchase details could not be opened.");
    if (wire.startsWith(ENCRYPTION_PREFIX))
      return {
        source: "agreement-party-decryption" as const,
        ciphertextSha256: sha256(toBytes(wire)),
        value,
      };
    if (isInvestorCommitment(wire))
      return { source: "agreement-party-disclosure" as const, wire, value };
    if (wire !== value)
      throw Error("A recorded stock purchase value differs from the copy.");
    return { source: "recorded" as const, value };
  });
}

export const stockReadingEvidenceSchema = z.strictObject({
  format: z.literal("metalex-agreement-reading-v1"),
  renderer: z.literal("issued-standard-stock-round-v1"),
  stage: z.literal("issued"),
  scope: z.literal("agreement-party"),
  rendererSha256: z.literal(stockRendererSha256),
  annotationsSha256: z.literal(stockAnnotationSha256),
  originalSha256: z.literal("0x" + registeredStock.sha256),
  receipts: financingReceiptRecord,
  edition: z.strictObject({
    title: z.literal(registeredStock.title),
    globalFields: z.array(text).length(5),
    partyFields: z.array(text).length(5),
  }),
  company: z.strictObject({
    name: text,
    address,
    jurisdiction: text,
    type: text,
  }),
  officer: z.strictObject({
    name: text.min(1),
    title: text.min(1),
    wallet: address,
  }),
  investorWallet: address,
  companyRow: z.array(disclosed).length(5),
  investorRow: z.array(disclosed).length(5),
  globals: z.array(text).length(5),
  expiry: unsigned,
  secretHash: hash,
  payment: z.strictObject({
    token: address,
    decimals: z.number().int().min(0).max(255),
    currency: z.enum(["USDC", "payment tokens"]),
    amount: unsigned,
    pricePerUnit: unsigned,
  }),
  certificate: z.strictObject({
    printer: address,
    tokenId: unsigned,
    units: unsigned,
    paid: unsigned,
    legalDetails: text,
    shareClass: z.enum(["Common Stock", "Preferred Stock"]),
    classId: unsigned,
    classDocumentUri: text,
    effectiveShare: z
      .string()
      .max(1024 * 1024)
      .regex(/^0x(?:[0-9a-f]{2})+$/)
      .transform((v) => v as Hex),
    legends: z.discriminatedUnion("state", [
      z.strictObject({ state: z.literal("unavailable") }),
      z.strictObject({ state: z.literal("recorded"), values: z.array(text) }),
    ]),
  }),
});
export type StockReadingEvidence = z.input<typeof stockReadingEvidenceSchema>;
export const stockReadingProof = z.strictObject({
  evidence: stockReadingEvidenceSchema,
  readingSha256: hash,
});

export function stockShareReading(
  c: Pick<
    z.output<typeof stockReadingEvidenceSchema>["certificate"],
    "effectiveShare" | "shareClass" | "classId" | "classDocumentUri"
  >,
) {
  const [share] = decodeAbiParameters(shareAbi, c.effectiveShare);
  if (encodeStockShare(share) !== c.effectiveShare)
    throw Error("The certificate terms have an invalid encoding.");
  return describeStockShare(share, c.shareClass, {
    id: BigInt(c.classId),
    documentURI: c.classDocumentUri,
  });
}

export function checkStockReceiptDates(
  r: z.output<typeof financingReceiptRecord>,
) {
  // Receipt ordering guarantees settlement is at or after each signature.
  if (BigInt(r.settlement.timestamp) > 8640000000000n)
    throw Error(
      "A stock purchase receipt gives a date outside the supported range.",
    );
}
export function reconstructIssuedStock(input: StockReadingEvidence) {
  const e = stockReadingEvidenceSchema.parse(input);
  const r = e.receipts;
  if (
    r.kind !== "round" ||
    r.templateId !== registeredStock.id ||
    !isAddressEqual(r.company, e.company.address) ||
    !isAddressEqual(r.officer, e.officer.wallet) ||
    !isAddressEqual(r.investor, e.investorWallet)
  )
    throw Error(
      "The financing receipts identify a different stock purchase or signer.",
    );
  checkStockReceiptDates(r);
  const c = e.certificate;
  const stock = stockShareReading(c);
  const investor = e.investorRow.map((f) => f.value);
  const company = { ...e.company, party: e.companyRow.map((f) => f.value) };
  const allocation = {
    amount: BigInt(e.payment.amount),
    paymentDecimals: e.payment.decimals,
    paymentToken: e.payment.token,
    pricePerUnit: BigInt(e.payment.pricePerUnit),
    timestamp: BigInt(r.settlement.timestamp),
    transactionHash: r.settlement.transactionHash,
  };
  const terms = issuedStockTerms(
    allocation,
    {
      tokenId: BigInt(c.tokenId),
      printer: c.printer,
      paid: BigInt(c.paid),
      units: BigInt(c.units),
    },
    {
      agreementId: r.agreementId,
      chainId: r.chainId,
      roundId: r.roundId,
      secretHash: e.secretHash,
      expiry: BigInt(e.expiry),
    },
    e.payment.currency,
  );
  const body = conformedStockRound({
    phase: "issued",
    source: {
      templateId: r.templateId,
      legalContractUri: r.legalContractUri,
      globalFields: e.edition.globalFields,
      partyFields: e.edition.partyFields,
    },
    title: e.edition.title,
    company,
    investor,
    investorWallet: e.investorWallet,
    globalValues: e.globals,
    ...terms,
    paymentToken: e.payment.currency,
    paymentTokenAddress: e.payment.token,
    series: stock.series,
    legalDetails: c.legalDetails,
    legends: [
      {
        certificate: "certificate " + c.tokenId + " at " + c.printer,
        legends: c.legends.state === "recorded" ? c.legends.values : null,
      },
    ],
    stockCertificates: [stock.reading],
    certificateTerms: stock.paragraphs,
  });
  const nodes = stockCopyNodes(
    body,
    r,
    e.officer,
    investor[0]!,
    e.investorWallet,
  );
  return { body, nodes, digest: readingDigest({ evidence: e, nodes }) };
}

export function stockCopyNodes(
  body: ReturnType<typeof conformedStockRound>,
  r: z.output<typeof financingReceiptRecord>,
  officer: { name: string; title: string; wallet: Address },
  investorName: string,
  investorWallet: Address,
) {
  const heading = (text: string) => ({ kind: "heading" as const, text });
  const paragraph = (text: string) => ({ kind: "paragraph" as const, text });
  const date = (value: string) =>
    new Date(Number(value) * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ") + " UTC";
  return [
    heading(body.title),
    paragraph(conformedAgreementNotice),
    paragraph("Registered agreement: " + body.uri),
    paragraph(body.identification),
    ...body.paragraphs.map((p) =>
      (p.heading ? heading : paragraph)(
        p.content.map((v) => (typeof v === "string" ? v : v.text)).join(""),
      ),
    ),
    {
      kind: "original-pages" as const,
      originalSha256: "0x" + registeredStock.sha256,
      first: registeredStock.firstAttachmentPage,
      last: registeredStock.pages,
    },
    heading("Conformed signature page"),
    heading("Company"),
    paragraph(
      "/s/ " + [officer.name, officer.title].filter(Boolean).join(", "),
    ),
    paragraph(
      "Signed " +
        date(r.companyApproval.timestamp) +
        (r.kind === "round"
          ? ", when the company approved the terms of this round"
          : ""),
    ),
    paragraph("Wallet " + officer.wallet),
    paragraph("Transaction " + r.companyApproval.transactionHash),
    heading("Investor"),
    paragraph("/s/ " + investorName),
    paragraph("Signed " + date(r.investorSignature.timestamp)),
    paragraph("Wallet " + investorWallet),
    paragraph("Transaction " + r.investorSignature.transactionHash),
    paragraph("Agreement ID " + r.agreementId),
    paragraph("Chain ID " + r.chainId),
  ];
}
