import terms from "../templates/secondary-sale/terms.json";
import { additionalTermsSection, type FieldMark } from "./agreementReferences";
import {
  entityDescription,
  notApplicableEntityValue,
} from "./entityDescription";
import { secondarySaleRegistryVersion } from "./generated/secondarySaleRevision";

export { standardSaleAnnotations } from "./standardSaleReferences";

import { standardSaleText } from "./standardSaleReferences";

export const conformedAgreementNotice =
  "Convenience view. The agreement you are signing is the template linked here together with the values in your signature request. If this view differs from them, the template and the signed values control.";

// Offline content addresses for the registered execution PDF, SHA-256
// a81350cae4ab5b7b325b758b0f79e9db5657442b57c282e7e6930523460fe564.
export const standardSaleOriginalSha256 =
  "0xa81350cae4ab5b7b325b758b0f79e9db5657442b57c282e7e6930523460fe564";
const conformedSaleSources = [
  "ipfs://QmVW3pe5rbmaWxHNYcpEjbvC12FbePs5dQ7k2zYbFojzpy",
  "ipfs://bafybeidknivvrddwz7hwl4gfnjteievbqncjc4474cxrybhafpimqsudci",
] as const;

export const conformedSaleVersion = "1.0.0-a6cf6bd2c10f";
export function isConformedSaleSource(uri: string) {
  return (
    secondarySaleRegistryVersion === conformedSaleVersion &&
    conformedSaleSources.some((source) => source === uri)
  );
}

type Party = { wallet: string; values: readonly (string | null)[] };

function partyDescription(role: "Seller" | "Purchaser", party: Party) {
  const [type, name, signer, capacity, contact, entityType, jurisdiction] =
    party.values;
  const unavailable = (value: string | null | undefined, label: string) =>
    value === null
      ? `The ${role} recorded ${label} privately.`
      : `The ${role} did not record ${label}.`;
  // Edition 2.2.0 of the customized sale records an entity's type and
  // jurisdiction of organization as the sixth and seventh party values. An
  // individual records "Not applicable" in both.
  const recordsEntity = party.values.length > 5 && type !== "Individual";
  const stated = (value: string | null | undefined) =>
    value && value !== notApplicableEntityValue ? value : "";
  const described =
    recordsEntity && name && stated(entityType) && stated(jurisdiction)
      ? `${name}, ${entityDescription(stated(entityType), stated(jurisdiction))},`
      : name;
  const sentences = [
    described
      ? `${described} is the ${role}.`
      : unavailable(name, "its legal name"),
    `The ${role} uses wallet ${party.wallet}.`,
  ];
  if (type)
    sentences.push(
      `The ${role} acts as ${type === "Entity" ? "an entity" : type === "Individual" ? "an individual" : type}.`,
    );
  else sentences.push(unavailable(type, "its party type"));
  if (recordsEntity && described === name) {
    // A value recorded privately, or not recorded, is said so.
    if (!stated(entityType))
      sentences.push(unavailable(entityType, "its entity type"));
    if (!stated(jurisdiction))
      sentences.push(
        unavailable(jurisdiction, "its jurisdiction of organization"),
      );
    if (stated(entityType) && stated(jurisdiction))
      sentences.push(
        `The ${role} is ${entityDescription(stated(entityType), stated(jurisdiction))}.`,
      );
    else if (stated(entityType))
      sentences.push(`The ${role}’s entity type is ${stated(entityType)}.`);
    else if (stated(jurisdiction))
      sentences.push(
        `The ${role}’s jurisdiction of organization is ${stated(jurisdiction)}.`,
      );
  }
  if (signer && capacity)
    sentences.push(
      capacity === "Individual capacity"
        ? `${signer} signs in an individual capacity.`
        : `${signer} signs as ${capacity}.`,
    );
  else {
    sentences.push(
      signer
        ? `${signer} signs for the ${role}.`
        : unavailable(signer, "the signer's name"),
    );
    sentences.push(
      capacity
        ? `The signer acts in the capacity of ${capacity}.`
        : unavailable(capacity, "the signer's capacity"),
    );
  }
  sentences.push(
    contact
      ? `Send notices to ${contact}.`
      : unavailable(contact, "its notice contact"),
  );
  return sentences.join(" ");
}

// Five party values through edition 2.1.0 of the customized sale and in the
// standard sale; seven from edition 2.2.0. Both parties use the same paper.
const partyValueCounts = [5, 7];

type SaleTerms = {
  globals: readonly string[];
  seller: Party;
  units: string;
  payment: string;
  paymentToken: string;
  printer: string;
  tokenId: string;
  issuerWallet: string;
  chainId: number;
  manager: string;
  offerId: string;
  expires: string;
  settlementWindowSeconds: string;
  pathway?: string;
  namedBuyer?: string;
};

export function salePaymentText(amount: string) {
  return amount + " " + (amount === "1" ? "token" : "tokens");
}

/** The numbered provisions come from the same source that the registry paper
 * renders. Change only its references to the unfilled transaction details. */
export function conformedSecondarySale(
  input: SaleTerms &
    (
      | { purchaser: Party; agreementId: string; pathway: string }
      | { offer: true }
    ),
  paper: "verified-custom" | "original" | false = false,
) {
  const fixedTermsInPaper = paper === "original";
  const posting = "offer" in input;
  if (
    input.globals.length !== (fixedTermsInPaper ? 0 : 5) ||
    !partyValueCounts.includes(input.seller.values.length) ||
    (!posting && input.purchaser.values.length !== input.seller.values.length)
  )
    throw new Error("The sale does not match the registered agreement schema.");
  const [issuer, instrument, documents, law, special] = input.globals;
  const issuerDescription = fixedTermsInPaper
    ? `The issuer uses wallet ${input.issuerWallet}`
    : `The issuer at ${input.issuerWallet}${issuer?.trim() ? ` is identified as ${issuer}` : " has no registered name on this offer"}`;
  const standard = paper
    ? undefined
    : standardSaleText({
        documents: documents!,
        law: law!,
        paymentToken: input.paymentToken,
        values: {
          printer: input.printer,
          tokenId: input.tokenId,
          units: posting ? undefined : input.units,
          payment: posting ? undefined : salePaymentText(input.payment),
          pathway: input.pathway,
        },
      });
  return {
    title: terms.title,
    introduction: terms.introduction,
    partyMarks: posting ? { 1: [{ start: 0, value: "[Purchaser]" }] } : {},
    purchaseMarks: standard?.frontMarks ?? [],
    sectionMarks: {} as Record<string, FieldMark[]>,
    parties: [
      partyDescription("Seller", input.seller),
      posting
        ? input.namedBuyer
          ? `[Purchaser] is the person identified by wallet ${input.namedBuyer}. The Purchaser supplies its identity, signing details and notice contact when it accepts. The issuer's purchaser-approval condition must permit the purchase.`
          : "[Purchaser] is the eligible buyer who accepts all or part of the offer and supplies its identity, signing details and notice contact at acceptance."
        : partyDescription("Purchaser", input.purchaser),
    ],
    purchase: [
      ...(standard?.front ?? []),
      `${issuerDescription}. ${posting ? "The Seller offers up to" : "The Purchaser agrees to acquire"} ${input.units} ${input.units === "1" ? "unit" : "units"} of ${instrument?.trim() ? instrument : "the security identified by the source position"} from position ${input.tokenId} at ${input.printer}.`,
      posting
        ? `The total price for all offered units is ${salePaymentText(input.payment)} of the payment asset at ${input.paymentToken}. For a partial purchase, the contract calculates the total price due for all units accepted so far, rounds down to the smallest payment unit and deducts the amounts charged on earlier purchases.`
        : `The Purchaser agrees to pay ${salePaymentText(input.payment)} of the payment asset at ${input.paymentToken} for this purchase. The Offer Record and the Settlement Record identify this fill even if its status later changes.`,
      fixedTermsInPaper
        ? ""
        : `${documents?.trim() ? `The Parties identify these governing documents for this purchase. ${documents}` : "The Parties did not record a reference to the governing documents."} A reference to a document does not deliver it or authorize its public disclosure. The required approvals, disclosures and closing conditions apply.`,
      posting
        ? `The offer expires at ${input.expires}. ${input.pathway ? `Each purchase must use ${input.pathway}.` : "The Purchaser chooses an eligible pathway the issuer has enabled."} The settlement period is set at acceptance. The period currently in effect is ${input.settlementWindowSeconds} seconds.`
        : `The offer expires at ${input.expires}. ${input.namedBuyer ? `The offer names wallet ${input.namedBuyer} as purchaser.` : "The offer does not name a specific purchaser."} The Purchaser elects ${input.pathway}. The settlement period is ${input.settlementWindowSeconds} seconds from acceptance.`,
      posting
        ? `By posting offer ${input.offerId} at deal manager ${input.manager} on chain ${input.chainId}, the Seller authorizes purchases on these terms. Each acceptance receives its own agreement ID.`
        : `This purchase uses offer ${input.offerId} at deal manager ${input.manager} on chain ${input.chainId}. The agreement ID for this purchase is ${input.agreementId}.`,
      "The registered wallet and party details do not by themselves establish authority or verified identity.",
    ].filter(Boolean),
    sections: standard
      ? [...standard.sections, ...additionalTermsSection(special!, "standard")]
      : [],
  };
}
