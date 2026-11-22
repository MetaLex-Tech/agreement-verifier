import terms from "../templates/secondary-sale/terms.json";
import {
  agreementNodes,
  type ReferenceSpan,
  readMarkedReferences,
  readSaleValue,
  renderReferences,
  type SaleReadingValues,
} from "./agreementReferences";
import { secondarySaleRegistrySource } from "./generated/sources";

// An address names a numbered section and its one-based paragraph, or a front
// paragraph. Offsets and registered spellings belong to v1.0.0-a6cf6bd2c10f.
export const standardSaleAnnotations = [
  [
    "front.3",
    65,
    "the LET contract and token ID in the Offer Record",
    "position",
  ],
  [
    "front.3",
    163,
    "the units recorded in that Purchaser's Settlement Record",
    "units",
  ],
  [
    "front.4",
    128,
    "the consideration recorded in its Settlement Record, in that token's base units",
    "payment",
  ],
  ["front.4", 37, "the token identified in the Offer Record", "paymentAsset"],
  ["1.1", 442, "in the Governing documents field", "documents"],
  ["1.3", 336, "in Special terms", "expressAgreement"],
  ["1.3", 441, "in Special terms", "expressAgreement"],
  ["2.1", 149, "in Purchase terms", "purchase"],
  ["2.2", 107, "DealManager", "manager"],
  ["2.2", 193, "DealManager", "manager"],
  ["2.2", 919, "or Special terms", "approval"],
  ["2.4", 96, "in Purchase terms or Special terms", "costs"],
  ["3.2", 474, "Special terms may record", "recordConditions"],
  ["3.2", 557, "a blank field", "no additional provision"],
  ["4.1", 410, "in Special terms", "expressAgreement"],
  ["4.2", 482, "in Special terms", "expressAgreement"],
  ["7.1", 0, "The law identified in Governing law", "law"],
  ["7.2", 308, "Purchase terms and Special terms", "priority"],
  ["front.2", 63, "DealManager", "manager"],
  [
    "front.5",
    32,
    "The registered global values, in this exact order, are: (1) Issuer, (2) Instrument type, (3) Governing documents, (4) Governing law, and (5) Special terms. The same global values apply to each fill of the offer. “None” in Special terms means no additional transaction-specific terms.",
    "general",
  ],
  [
    "front.6",
    22,
    "Each party's registered values, in this exact order, are: (1) Party type, (2) Legal name, (3) Signer name, (4) Signing capacity, and (5) Notice contact. For an Individual selling or purchasing personally, the Signer name is the Legal name and the Signing capacity is “Individual capacity”. For an Entity, those values identify its authorized representative and that representative's capacity.",
    "partyInstructions",
  ],
] as const;

type Reference = (typeof standardSaleAnnotations)[number][3];
const byParagraph = new Map<string, ReferenceSpan<Reference>[]>();
for (const [key, start, registered, reference] of standardSaleAnnotations) {
  const spans = byParagraph.get(key) ?? [];
  spans.push({ start, registered, reference });
  byParagraph.set(key, spans);
}
const start = "[Registered transaction and party details]\n";
const end = "\n#for section in terms.sections";
const frontParts = secondarySaleRegistrySource.split(start)[1]?.split(end);
if (frontParts?.length !== 2)
  throw Error("The registered sale front matter has changed.");
const front = frontParts[0]!
  .trim()
  .split("\n\n")
  .map((p) =>
    p.startsWith("*")
      ? p.slice(1, p.indexOf("*", 1)) + p.slice(p.indexOf("*", 1) + 1)
      : p,
  );
if (front.length !== 6)
  throw Error("The registered sale front matter is incomplete.");

export function standardSaleText(context?: {
  documents: string;
  law: string;
  values: SaleReadingValues;
  paymentToken: string;
}) {
  const resolve = (ref: Reference) => {
    switch (ref) {
      case "position":
        return (
          "position " +
          context!.values.tokenId +
          " at " +
          context!.values.printer
        );
      case "paymentAsset":
        return context!.paymentToken;
      case "units":
      case "payment":
        return readSaleValue(ref, context!.values).text;
      case "documents":
        return context!.documents
          ? "in the following description: " + context!.documents
          : "in the Parties’ recorded description, if any";
      case "expressAgreement":
        return "in the terms supplied with this offer";
      case "purchase":
        return "for this purchase";
      case "manager":
        return "deal manager";
      case "approval":
        return "or in the terms supplied with this offer";
      case "costs":
        return "in the purchase terms or the terms supplied with this offer";
      case "recordConditions":
        return "The terms supplied with this offer may record";
      case "no additional provision":
        return "the absence of such provisions";
      case "law":
        return context!.law.trim()
          ? "The law of " + context!.law
          : "The governing law, which the Parties did not specify in the offer,";
      case "priority":
        return "the agreed purchase terms and any additional provisions supplied with this offer";
      case "general":
        return "The same issuer, security, governing documents, governing law and any agreed provisions apply to each fill of the offer.";
      case "partyInstructions":
        return "An individual acting personally gives the same legal name for the party and the signer and signs in an individual capacity. An entity identifies its authorized representative and that representative’s capacity.";
    }
  };
  function paragraph(key: string, registered: string) {
    const nodes = agreementNodes(registered, byParagraph.get(key) ?? []);
    if (!context) return { text: renderReferences(nodes), marks: [] };
    return readMarkedReferences(nodes, (ref) =>
      ref === "units" || ref === "payment"
        ? readSaleValue(ref, context.values)
        : { text: resolve(ref) },
    );
  }
  const details = front.map((p, i) => paragraph("front." + (i + 1), p));
  return {
    front: details.map((p) => p.text),
    frontMarks: details.map((p) => p.marks),
    sections: terms.sections.map((s, i) => ({
      heading: s.heading,
      paragraphs: s.paragraphs.map(
        (p, j) => paragraph(i + 1 + "." + (j + 1), p).text,
      ),
    })),
  };
}
