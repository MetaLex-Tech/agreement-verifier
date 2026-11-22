// The standalone verifier's stand-in for the legal-documents package index.
// See narrowImports.mjs. It exports only the names that the bundled files use.
export {
  type AgreementField,
  registeredFieldNames,
  signerValues,
} from "../../packages/legal-documents/src/agreementFields";
export { secondarySaleRegistryVersion } from "../../packages/legal-documents/src/generated/secondarySaleRevision";
export {
  customSaleFields22,
  standardSaleFields,
} from "../../packages/legal-documents/src/standardSaleFields";
