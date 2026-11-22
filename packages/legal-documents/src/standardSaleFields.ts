import { type AgreementField, assertAgreementFields } from "./agreementFields";
import {
  entityTypeSuggestions,
  jurisdictionSuggestions,
  notApplicableEntityValue,
} from "./entityDescription";

// The registered values of the standard secondary sale, edition
// 1.0.0-a6cf6bd2c10f. The registered names and their order are part of the
// template ID. The tests compare each declaration with the registered paper.

const askRepresentative = {
  field: "partyType",
  operator: "notEquals",
  value: "Individual",
} as const;

const global: readonly AgreementField[] = [
  ["issuer", "Issuer"],
  ["instrumentType", "Instrument type"],
  ["governingDocuments", "Governing documents"],
  ["governingLaw", "Governing law"],
  ["specialTerms", "Special terms"],
].map(([key, registered]) => ({
  key: key!,
  registered: registered!,
  question: { label: registered! },
  check: { required: true },
}));

const party: readonly AgreementField[] = [
  {
    key: "partyType",
    registered: "Party type",
    question: {
      label: "Party type",
      placeholder: "Choose individual or entity",
      options: [
        {
          value: "Individual",
          label: "Individual (signing personally)",
          note: "Your legal name is also your signer name, in individual capacity. Confirm your legal name and notice contact before posting or accepting.",
        },
        { value: "Entity", label: "Entity" },
      ],
    },
    check: {
      required: true,
      refusal: "Choose whether the party is an individual or entity.",
    },
  },
  {
    key: "legalName",
    registered: "Legal name",
    question: { label: "Legal name" },
    check: { required: true },
  },
  {
    key: "signerName",
    registered: "Signer name",
    question: { label: "Signer name" },
    askWhen: askRepresentative,
    otherwise: { copy: "legalName" },
    check: { required: true },
  },
  {
    key: "signingCapacity",
    registered: "Signing capacity",
    question: { label: "Signing capacity" },
    askWhen: askRepresentative,
    otherwise: { value: "Individual capacity" },
    check: { required: true },
  },
  {
    key: "noticeContact",
    registered: "Notice contact",
    question: { label: "Notice contact" },
    check: { required: true },
  },
];

export const standardSaleFields = {
  global: assertAgreementFields(global),
  party: assertAgreementFields(party),
};

// The registered party values of the customized sale, edition 2.2.0. The
// first five keep their positions; the fifth is registered as contactDetails
// (as in edition 2.1.0) and the forms still ask for the "Notice contact". An
// entity adds its entity type and its jurisdiction of organization; an
// individual is not asked and records "Not applicable" in both.
const customParty22: readonly AgreementField[] = [
  ...party.map((field) =>
    field.key === "noticeContact"
      ? { ...field, registered: "contactDetails" }
      : field,
  ),
  {
    key: "entityType",
    registered: "Entity type",
    question: {
      label: "Entity type",
      helpText:
        "The kind of entity, as the agreement prints it: “a Delaware corporation”.",
      placeholder: "corporation",
      suggestions: entityTypeSuggestions,
    },
    askWhen: askRepresentative,
    otherwise: { value: notApplicableEntityValue },
    check: { required: true, maxLength: 200 },
  },
  {
    key: "jurisdiction",
    registered: "Jurisdiction of organization",
    question: {
      label: "Jurisdiction of organization",
      helpText: "The state or country under whose law the entity is organized.",
      placeholder: "Delaware",
      suggestions: jurisdictionSuggestions,
    },
    askWhen: askRepresentative,
    otherwise: { value: notApplicableEntityValue },
    check: { required: true, maxLength: 200 },
  },
];

export const customSaleFields22 = {
  party: assertAgreementFields(customParty22),
};
