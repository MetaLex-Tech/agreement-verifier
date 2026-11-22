import { conformedStockRound } from "@metalex-web/legal-documents/conformed-stock-round";
import { registeredStock } from "@metalex-web/legal-documents/registered-stock";
import { isAddressEqual, zeroAddress } from "viem";
import { z } from "zod";
import { readingDigest } from "../secondary-sales/standardSaleProof";
import { stockTicketRendererSha256 } from "./stockReadingRevision";
import {
  checkStockReceiptDates,
  stockCopyNodes,
  stockReadingEvidenceSchema,
  stockShareReading,
} from "./stockRoundReading";
import {
  describeTicketStock,
  stockTicketAdoption,
} from "./stockTicketDescription";
import {
  describeEscrowConsideration,
  recordedTicketOfficerTitle,
} from "./ticketConsideration";
import {
  ticketCopyIdentification,
  unreadableDescriptions,
} from "./ticketInvestorValues";

const round = stockReadingEvidenceSchema.shape;
const cert = round.certificate.shape;
const absent = z.literal("unavailable");
const unsigned = round.expiry;
const address = cert.printer;
const text = cert.legalDetails;
const hash = round.secretHash;
const rowField = z.union([
  round.companyRow.element,
  z.strictObject({
    source: z.literal("withheld-ciphertext"),
    ciphertextSha256: hash,
  }),
  z.strictObject({
    source: z.literal("withheld-commitment"),
    wire: z.string().regex(/^mtlxc1:[0-9a-f]{64}$/),
  }),
]);
const asset = z.strictObject({
  amount: unsigned,
  tokenId: unsigned,
  tokenAddress: address,
});
const schema = z.strictObject({
  format: round.format,
  renderer: z.literal("settled-standard-stock-ticket-v1"),
  stage: z.literal("settled"),
  scope: round.scope,
  rendererSha256: z.literal(stockTicketRendererSha256),
  annotationsSha256: round.annotationsSha256,
  originalSha256: round.originalSha256,
  receipts: round.receipts,
  edition: round.edition,
  company: round.company,
  officerWallet: address,
  investorWallet: address,
  companyRow: z.array(rowField).length(5),
  investorRow: z.array(rowField).length(5),
  globals: round.globals,
  secretHash: hash,
  registryExpiry: unsigned,
  escrowExpiry: unsigned,
  origin: z.enum(["external", "app"]),
  conditions: z.array(address),
  payment: asset.extend({
    fee: z.enum(["deduct", "none"]),
    currency: z.enum(["USDC", "purchase amount tokens"]),
    decimals: z.union([z.number().int().min(0).max(255), absent]),
  }),
  otherAssets: z.array(asset),
  certificates: z.array(
    z.strictObject({
      printer: address,
      tokenId: unsigned,
      legends: cert.legends,
      terms: z.union([
        absent,
        z.strictObject({
          units: unsigned,
          legalDetails: text,
          officer: text,
          title: text,
        }),
      ]),
      share: z.union([
        absent,
        round.certificate.pick({
          effectiveShare: true,
          shareClass: true,
          classId: true,
          classDocumentUri: true,
        }),
      ]),
    }),
  ),
});
export type StockTicketEvidence = z.input<typeof schema>;
export const stockTicketProof = z.strictObject({
  evidence: schema,
  readingSha256: hash,
});

export function reconstructStockTicket(input: StockTicketEvidence) {
  const e = schema.parse(input);
  const r = e.receipts;
  if (
    r.kind !== "ticket" ||
    r.templateId !== registeredStock.id ||
    !isAddressEqual(r.company, e.company.address) ||
    !isAddressEqual(r.officer, e.officerWallet) ||
    !isAddressEqual(r.investor, e.investorWallet)
  )
    throw Error(
      "The receipts do not identify this stock ticket and its signers.",
    );
  checkStockReceiptDates(r);
  const external = e.origin === "external";
  const companyValues = e.companyRow.map((f) =>
    "value" in f ? f.value : undefined,
  );
  const investorValues = e.investorRow.map((f) =>
    "value" in f
      ? f.source === "agreement-party-disclosure"
        ? f.value.trim().normalize("NFC")
        : f.value
      : undefined,
  );
  const missing = [...companyValues, ...investorValues].some(
    (v) => v === undefined,
  );
  if (
    !external &&
    (missing ||
      !e.certificates.length ||
      e.certificates.some(
        (c) => c.terms === "unavailable" || c.share === "unavailable",
      ))
  )
    throw Error(
      "The stock ticket lacks verified party or certificate details.",
    );
  const officer = companyValues[0]?.trim() ? companyValues[0] : e.officerWallet;
  const unknownInvestor = !investorValues[0]?.trim();
  const investor = investorValues.map(
    (v, i) => v ?? unreadableDescriptions[i]!,
  );
  if (unknownInvestor) investor[0] = e.investorWallet;
  const certificates = e.certificates.map((c) => {
    if (c.terms === "unavailable" && c.share !== "unavailable")
      throw Error("Share terms are missing their certificate.");
    return {
      label: `certificate ${c.tokenId} at ${c.printer}`,
      terms:
        c.terms === "unavailable"
          ? null
          : {
              unitsRepresented: BigInt(c.terms.units),
              legalDetails: c.terms.legalDetails,
            },
      details: c.share === "unavailable" ? null : stockShareReading(c.share),
    };
  });
  const payment = e.payment;
  const decodeAsset = (a: z.infer<typeof asset>) => ({
    ...a,
    amount: BigInt(a.amount),
    tokenId: BigInt(a.tokenId),
  });
  const consideration = describeEscrowConsideration(
    [
      {
        ...decodeAsset(payment),
        tokenType: 0,
        isFee: payment.fee === "deduct",
        knownUsdc: payment.currency === "USDC",
        decimals: payment.decimals === "unavailable" ? null : payment.decimals,
      },
    ],
    e.otherAssets.map(decodeAsset),
    BigInt(e.escrowExpiry),
    "settled",
  );
  const identification = ticketCopyIdentification(
    {
      timestamp: BigInt(r.settlement.timestamp),
      transactionHash: r.settlement.transactionHash,
    },
    e.conditions,
    external,
    missing,
    unknownInvestor,
  );
  const body = conformedStockRound({
    ...describeTicketStock(certificates, "settled"),
    source: {
      ...e.edition,
      templateId: r.templateId,
      legalContractUri: r.legalContractUri,
    },
    title: e.edition.title,
    phase: "ticket",
    stage: "settled",
    external,
    globalValues: e.globals,
    company: {
      ...e.company,
      party: companyValues.map((v) => v ?? "details this copy cannot display"),
    },
    investor,
    investorWallet: e.investorWallet,
    legends: e.certificates.map((c, i) => ({
      certificate: certificates[i]!.label,
      legends: c.legends.state === "recorded" ? c.legends.values : null,
    })),
    consideration,
    identification: `Agreement ${r.agreementId} on chain ${r.chainId}. ${identification}`,
    adoptionLimits: stockTicketAdoption(
      e.secretHash,
      BigInt(e.registryExpiry),
      true,
    ),
    paymentToken: payment.currency,
    paymentTokenAddress: isAddressEqual(payment.tokenAddress, zeroAddress)
      ? undefined
      : payment.tokenAddress,
  });
  const title = recordedTicketOfficerTitle(
    officer,
    e.certificates.flatMap((c) =>
      c.terms === "unavailable"
        ? []
        : [
            {
              signingOfficerName: c.terms.officer,
              signingOfficerTitle: c.terms.title,
            },
          ],
    ),
  );
  const nodes = stockCopyNodes(
    body,
    r,
    { name: officer, title, wallet: e.officerWallet },
    investor[0]!,
    e.investorWallet,
  );
  return { body, nodes, digest: readingDigest({ evidence: e, nodes }) };
}
