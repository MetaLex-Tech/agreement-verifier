import {
  type AgreementField,
  customSaleFields22,
  registeredFieldNames,
  secondarySaleRegistryVersion,
  signerValues,
  standardSaleFields,
} from "@metalex-web/legal-documents";
import {
  conformedSaleVersion,
  isConformedSaleSource,
} from "@metalex-web/legal-documents/conformed-secondary-sale";
import { encodeAbiParameters, type Hex, keccak256 } from "viem";

export const standardSaleTitle = `Secondary Sale and Assignment Agreement v${secondarySaleRegistryVersion}`;
// The registered names come from the field declarations of the paper.
export const standardSaleGlobalFields: readonly string[] = registeredFieldNames(
  standardSaleFields.global,
);
export const standardSalePartyFields: readonly string[] = registeredFieldNames(
  standardSaleFields.party,
);
/** New customized offers use this edition. Offers already posted keep the
 * edition, title and party fields they were registered with. */
export const customSaleVersion = "2.2.0";
const customSaleVersions = ["2.0.0", "2.1.0", "2.2.0"] as const;
type CustomSaleVersion = (typeof customSaleVersions)[number];
const isCustomSaleVersion = (version: string): version is CustomSaleVersion =>
  (customSaleVersions as readonly string[]).includes(version);
// Edition 2.1.0 registers the fifth party field under the name the v2.1
// instruments read. The value and its position are unchanged, and the forms
// still ask for the "Notice contact".
export const customSaleV21PartyFields: readonly string[] =
  standardSaleFields.party.map((field) =>
    field.key === "noticeContact" ? "contactDetails" : field.registered,
  );
// Edition 2.2.0 adds the entity type and the jurisdiction of organization
// after the five values of edition 2.1.0, which keep their positions.
export const customSaleV22PartyFields: readonly string[] = registeredFieldNames(
  customSaleFields22.party,
);
/** The registered party fields of a MetaLeX sale paper, by its version. */
export function salePartyFieldsFor(version: string): readonly string[] {
  return version === "2.2.0"
    ? customSaleV22PartyFields
    : version === "2.1.0"
      ? customSaleV21PartyFields
      : standardSalePartyFields;
}
const customSaleTitle =
  /^Cyber-Secondary Sale and Assignment Agreement v(2\.[012]\.0)(?= \(registration [1-9][0-9]*\)$|$)/;
/** The customized edition named by a registered title, if any. */
export function customSaleTitleVersion(title: string | undefined) {
  const version = title ? customSaleTitle.exec(title)?.[1] : undefined;
  return version && isCustomSaleVersion(version) ? version : undefined;
}
export type StandardSaleAgreement = {
  templateId: Hex;
  registrationNonce: number;
  title: string;
  legalContractUri: string;
  globalFields: readonly string[];
  partyFields: readonly string[];
};
/** Content identity includes the immutable PDF URI and the exact ordered schema. */
export function standardSaleAgreement(
  uri: string,
  registrationNonce = 0,
  version = secondarySaleRegistryVersion,
): StandardSaleAgreement {
  if (!/^ipfs:\/\/(?:Qm[1-9A-HJ-NP-Za-km-z]{44}|b[a-z2-7]{20,})$/.test(uri))
    throw new Error("Invalid immutable agreement URI.");
  if (
    !Number.isSafeInteger(registrationNonce) ||
    registrationNonce < 0 ||
    registrationNonce > 0xffffffff
  )
    throw new Error("Invalid registration nonce.");
  const customized = isCustomSaleVersion(version);
  if (!customized && !/^1\.0\.0-[a-f0-9]{12}$/.test(version))
    throw new Error("Unsupported standard agreement version.");
  const baseTitle = `${customized ? "Cyber-" : ""}Secondary Sale and Assignment Agreement v${version}`;
  const globalFields = customized ? [] : standardSaleGlobalFields;
  const partyFields = salePartyFieldsFor(version);
  const title = registrationNonce
    ? `${baseTitle} (registration ${registrationNonce})`
    : baseTitle;
  const tuple = [title, uri, globalFields, partyFields] as const;
  return {
    templateId: keccak256(
      encodeAbiParameters(
        [
          { type: "string" },
          { type: "string" },
          { type: "string[]" },
          { type: "string[]" },
        ],
        tuple,
      ),
    ),
    registrationNonce,
    title,
    legalContractUri: uri,
    globalFields,
    partyFields,
  };
}
export function assertStandardSaleAgreement(
  value: StandardSaleAgreement,
  version: string = customSaleTitleVersion(value.title) ??
    secondarySaleRegistryVersion,
) {
  const expected = standardSaleAgreement(
    value.legalContractUri,
    value.registrationNonce,
    version,
  );
  if (
    JSON.stringify([
      value.templateId,
      value.title,
      value.globalFields,
      value.partyFields,
    ]) !==
    JSON.stringify([
      expected.templateId,
      expected.title,
      expected.globalFields,
      expected.partyFields,
    ])
  )
    throw new Error(
      "The prepared agreement does not match its document and fields. Prepare it again.",
    );
  return expected;
}
export type SalePartyTemplate = {
  partyFields: readonly string[];
} & Partial<StandardSaleAgreement>;
/** The complete descriptor selects the input convention, not proof of legal approval. Always review the registered paper. */
export function isStandardSaleTemplate(template: SalePartyTemplate) {
  if (!template.title || !template.legalContractUri) return false;
  // Keep the v1 input convention for existing offers when only the clause revision changes.
  const match =
    /^(?:Cyber-)?Secondary Sale and Assignment Agreement v(2\.[012]\.0|1\.0\.0-[a-f0-9]{12})(?: \(registration ([1-9][0-9]*)\))?$/.exec(
      template.title,
    );
  if (!match) return false;
  const registrationNonce = match[2] ? Number(match[2]) : 0;
  try {
    assertStandardSaleAgreement(
      {
        ...template,
        registrationNonce,
      } as StandardSaleAgreement,
      match[1],
    );
    return true;
  } catch {
    return false;
  }
}
/** The questions and rules for the party values of a MetaLeX sale paper, by
 * the edition its registered title names. Other papers have none. */
export function salePartyDeclarations(
  template: SalePartyTemplate,
): readonly AgreementField[] | undefined {
  if (!isStandardSaleTemplate(template)) return undefined;
  return customSaleTitleVersion(template.title) === "2.2.0"
    ? customSaleFields22.party
    : standardSaleFields.party;
}
export function salePartyValues(
  template: SalePartyTemplate,
  values: Record<string, string>,
  requireType = false,
) {
  // The declarations set the values that an individual is not asked for.
  const declarations = salePartyDeclarations(template);
  if (declarations)
    return signerValues(declarations, values, {
      check: requireType,
    });
  return template.partyFields.map((_, index) => values[index]?.trim() ?? "");
}

export function isCustomizedSaleTemplate(template: SalePartyTemplate) {
  return (
    customSaleTitleVersion(template.title) !== undefined &&
    isStandardSaleTemplate(template)
  );
}

/** Which MetaLeX paper a registered template is, if this repository can
 * reproduce it. Anything else is not a MetaLeX form. */
export function saleTemplatePaper(
  template: SalePartyTemplate,
):
  | { kind: "customized"; version: CustomSaleVersion }
  | { kind: "standard"; version: string }
  | { kind: "unknown" } {
  if (!isStandardSaleTemplate(template)) return { kind: "unknown" };
  const customized = customSaleTitleVersion(template.title);
  if (customized) return { kind: "customized", version: customized };
  // A standard descriptor can name any PDF. Only the archived standard paper
  // is a text this repository reproduces.
  const version = /v(1\.0\.0-[a-f0-9]{12})/.exec(template.title ?? "")?.[1];
  return version === conformedSaleVersion &&
    isConformedSaleSource(template.legalContractUri ?? "")
    ? { kind: "standard", version }
    : { kind: "unknown" };
}

const legalNameIndex = standardSaleFields.party.findIndex(
  (field) => field.key === "legalName",
);
export const saleBuyerNameMismatch =
  "The buyer’s registered name must be the Purchaser’s legal name in the agreement. Use the same name in both places.";
/** On a MetaLeX sale paper the holder of record (`buyerName`) is the
 * Purchaser's "Legal name" party value: derive it, and refuse a different
 * typed name. Other registered papers keep their separately entered name. */
export function saleBuyerName(
  template: SalePartyTemplate,
  partyValues: readonly string[],
  entered: string,
) {
  const typed = entered.trim();
  if (!isStandardSaleTemplate(template)) return typed;
  const legalName = partyValues[legalNameIndex]?.trim() ?? "";
  if (typed && typed.normalize("NFC") !== legalName.normalize("NFC"))
    throw new Error(saleBuyerNameMismatch);
  return legalName;
}

export const retiredSaleAgreementRefusal =
  "This edition of the standard Secondary Sale and Assignment Agreement is retired. Post a new offer on the Cyber-Secondary Sale and Assignment Agreement, the current form.";
/** The owner retired the standard agreement on 2026-11-21. New offers refuse
 * it; offers already posted on it read, settle and render as before. */
export function isRetiredSaleTemplate(template: SalePartyTemplate) {
  // Any registration of the standard descriptor, whatever PDF it names.
  return (
    isStandardSaleTemplate(template) &&
    customSaleTitleVersion(template.title) === undefined
  );
}
export function assertSaleTemplateOpenForNewOffers(
  template: SalePartyTemplate,
) {
  if (isRetiredSaleTemplate(template))
    throw new Error(retiredSaleAgreementRefusal);
}
