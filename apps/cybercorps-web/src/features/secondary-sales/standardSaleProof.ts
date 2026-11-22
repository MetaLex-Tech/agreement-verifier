import {
  conformedAgreementNotice,
  conformedSaleVersion,
  conformedSecondarySale,
  isConformedSaleSource,
  standardSaleAnnotations,
  standardSaleOriginalSha256,
} from "@metalex-web/legal-documents/conformed-secondary-sale";
import { type Address, type Hex, sha256, toBytes } from "viem";
import { z } from "zod";
import { salePurchaseTerms, saleSignatureName } from "./salePurchaseTerms";
import {
  predictOfferId,
  predictSettlementAgreementId,
} from "./settlementAgreementId";
import { isStandardSaleTemplate } from "./standardSaleAgreement";
import { standardSaleRendererSha256 } from "./standardSaleRendererRevision";

const hash = z
  .string()
  .regex(/^0x[a-fA-F0-9]{64}$/)
  .transform((v) => v as Hex);
const address = z
  .string()
  .regex(/^0x[a-fA-F0-9]{40}$/)
  .transform((v) => v as Address);
const uint = z
  .string()
  .regex(/^(0|[1-9]\d{0,77})$/u)
  .refine(
    (v) => v.length <= 78 && /^[0-9]+$/.test(v) && BigInt(v) < 2n ** 256n,
  );
const block = z.strictObject({ number: uint, hash });
const event = block.extend({ transaction: hash, timestamp: uint });
const field = z.discriminatedUnion("disclosure", [
  z.strictObject({ disclosure: z.literal("recorded"), value: z.string() }),
  z.strictObject({
    disclosure: z.literal("agreement-party-decryption"),
    ciphertextSha256: hash,
    value: z.string(),
  }),
  z.strictObject({
    disclosure: z.literal("agreement-party-disclosure"),
    commitment: z.string().regex(/^mtlxc1:[0-9a-f]{64}$/),
    value: z.string(),
  }),
]);
const party = z.strictObject({
  wallet: address,
  fields: z.array(field).length(5),
});

export { standardSaleOriginalSha256 as originalSaleSha256 };
export const saleAnnotationSha256 = sha256(
  toBytes(JSON.stringify(standardSaleAnnotations)),
);
const edition = z.strictObject({
  templateId: hash,
  title: z.string(),
  legalContractUri: z.string(),
  globalFields: z.array(z.string()).length(5),
  partyFields: z.array(z.string()).length(5),
});
export const saleProofEvidence = z.strictObject({
  format: z.literal("metalex-agreement-reading-v1"),
  renderer: z.literal("standard-secondary-sale-v1"),
  rendererSha256: z.literal(standardSaleRendererSha256),
  stage: z.literal("completed"),
  scope: z.literal("agreement-party"),
  originalSha256: z.literal(standardSaleOriginalSha256),
  annotationsSha256: z.literal(saleAnnotationSha256),
  edition,
  chainId: z.number().int().positive().safe(),
  manager: address,
  registry: address,
  finalized: block,
  posted: event,
  accepted: event,
  settled: event,
  offerId: hash,
  agreementId: hash,
  offerSalt: uint,
  acceptanceIndex: uint,
  globals: z.array(z.string()).length(5),
  issuer: address,
  printer: address,
  tokenId: uint,
  units: uint,
  payment: uint,
  paymentToken: address,
  paymentDecimals: z.number().int().min(0).max(36),
  pathway: z.number().int().min(0).max(255),
  restrictions: z
    .string()
    .regex(/^0x(?:[a-fA-F0-9]{2})*$/)
    .transform((v) => v as Hex),
  offerExpiry: uint,
  settlementDeadline: uint,
  seller: party,
  purchaser: party,
});
export type StandardSaleEvidence = z.input<typeof saleProofEvidence>;
export const saleReadingProof = z.strictObject({
  evidence: saleProofEvidence,
  readingSha256: hash,
});
type WordNode = { kind: "heading" | "paragraph"; text: string };
const heading = (text: string): WordNode => ({ kind: "heading", text });
const para = (text: string): WordNode => ({ kind: "paragraph", text });

// Each scalar is tagged and UTF-8 byte-length prefixed. Object order is independent
// of JSON property insertion order. Reject invalid Unicode before encoding.
export function readingDigest(value: unknown): Hex {
  const utf8 = new TextEncoder();
  function encode(v: unknown): string {
    if (typeof v === "string") {
      if (/[\uD800-\uDFFF]/u.test(v))
        throw Error("Invalid Unicode in the reading.");
      return "s" + utf8.encode(v).length + ":" + v;
    }
    if (typeof v === "number" && Number.isSafeInteger(v)) return "i" + v + ";";
    if (Array.isArray(v)) return "a" + v.length + ":" + v.map(encode).join("");
    if (v && typeof v === "object") {
      const entries = Object.entries(v).sort(([a], [b]) =>
        a < b ? -1 : a > b ? 1 : 0,
      );
      return (
        "o" +
        entries.length +
        ":" +
        entries.map(([k, x]) => encode(k) + encode(x)).join("")
      );
    }
    throw Error("Unsupported evidence value.");
  }
  return sha256(utf8.encode("MetaLeX/reading/v1\n" + encode(value)));
}

function utc(value: string) {
  const seconds = BigInt(value);
  if (seconds > 8640000000000n) return "Unix time " + value;
  return (
    new Date(Number(seconds) * 1000)
      .toISOString()
      .slice(0, 19)
      .replace("T", " ") + " UTC"
  );
}
export function reconstructSaleReading(input: unknown) {
  const e = saleProofEvidence.parse(input);
  const { edition, seller, purchaser } = e;
  if (
    !isConformedSaleSource(edition.legalContractUri) ||
    !isStandardSaleTemplate(edition) ||
    !edition.title.startsWith(
      "Secondary Sale and Assignment Agreement v" + conformedSaleVersion,
    )
  )
    throw Error(
      "The registration differs from this verifier’s standard sale edition.",
    );
  const offer = {
    offeror: seller.wallet,
    templateId: edition.templateId,
    salt: BigInt(e.offerSalt),
    globalValues: e.globals,
    settlementAgreementIds: [],
  };
  if (
    predictOfferId(offer) !== e.offerId ||
    predictSettlementAgreementId({
      offer,
      dealManager: e.manager,
      acceptor: purchaser.wallet,
      acceptanceCount: BigInt(e.acceptanceIndex),
    }) !== e.agreementId
  )
    throw Error("The offer or purchase ID differs from the supplied terms.");
  const events = [e.posted, e.accepted, e.settled];
  for (let i = 1; i < events.length; i++) {
    const prev = events[i - 1]!;
    const next = events[i]!;
    if (
      BigInt(prev.number) > BigInt(next.number) ||
      BigInt(prev.timestamp) > BigInt(next.timestamp) ||
      (prev.number === next.number &&
        (prev.hash !== next.hash || prev.timestamp !== next.timestamp))
    )
      throw Error("The event records disagree.");
  }
  if (
    BigInt(e.settled.number) > BigInt(e.finalized.number) ||
    (e.settled.number === e.finalized.number &&
      e.settled.hash !== e.finalized.hash) ||
    BigInt(e.offerExpiry) < BigInt(e.accepted.timestamp) ||
    BigInt(e.settlementDeadline) <= BigInt(e.accepted.timestamp) ||
    !BigInt(e.units)
  )
    throw Error("The supplied settlement record is inconsistent.");
  const body = conformedSecondarySale(
    salePurchaseTerms(
      {
        target: { chainId: e.chainId, manager: e.manager, offerId: e.offerId },
        decimals: e.paymentDecimals,
        offer: {
          ...offer,
          spvAddress: e.issuer,
          paymentToken: e.paymentToken,
          certPrinter: e.printer,
          tokenId: BigInt(e.tokenId),
          validUntil: BigInt(e.offerExpiry),
          counterpartyRestrictions: e.restrictions,
        },
      },
      {
        buyer: purchaser.wallet,
        units: BigInt(e.units),
        payment: BigInt(e.payment),
        agreementId: e.agreementId,
        pathway: e.pathway,
      },
      BigInt(e.settlementDeadline) - BigInt(e.accepted.timestamp),
      seller.fields.map((f) => f.value),
      purchaser.fields.map((f) => f.value),
    ),
  );
  const nodes = [
    heading(body.title),
    para(conformedAgreementNotice),
    para("Registered template: " + edition.legalContractUri),
    para(body.introduction),
    ...body.parties.map(para),
    heading("This purchase"),
    ...body.purchase.map(para),
    ...body.sections.flatMap((s) => [
      heading(s.heading),
      ...s.paragraphs.map(para),
    ]),
    heading("Conformed signature page"),
    ...(
      [
        [seller, e.posted, "Seller", "when the seller’s offer was posted"],
        [purchaser, e.accepted, "Purchaser", "when the purchase was accepted"],
      ] as const
    ).flatMap(([party, event, role, timing]) => [
      heading(role),
      para("/s/ " + saleSignatureName(party.fields.map((f) => f.value))),
      para("Recorded " + utc(event.timestamp) + ", " + timing),
      para("Wallet " + party.wallet),
      para("Transaction " + event.transaction),
    ]),
    para("Agreement ID " + e.agreementId),
    para("Chain ID " + e.chainId),
    para("Settlement deadline " + utc(e.settlementDeadline)),
    para("Settlement transaction " + e.settled.transaction),
  ];
  return { body, nodes, digest: readingDigest({ evidence: e, nodes }) };
}
