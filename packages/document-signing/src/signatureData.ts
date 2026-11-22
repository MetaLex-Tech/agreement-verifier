import type { Address } from "viem";

export const SIGNATUREDATA_DOMAIN = ({
  address,
  version = "1",
  chainId,
}: {
  address: Address;
  version?: string;
  chainId: number;
}) =>
  ({
    name: "CyberAgreementRegistry",
    version,
    chainId,
    verifyingContract: address,
  }) as const;

export const SIGNATUREDATA_TYPES = {
  SignatureData: [
    { name: "contractId", type: "bytes32" },
    // The party this signature consents for. A delegate can sign for more than
    // one party, so the payload names the one it counts for.
    { name: "signer", type: "address" },
    { name: "legalContractUri", type: "string" },
    { name: "globalFields", type: "string[]" },
    { name: "partyFields", type: "string[]" },
    { name: "globalValues", type: "string[]" },
    { name: "partyValues", type: "string[]" },
  ],
} as const;

/**
 * What a party with signer conditions signs: `SignatureData` plus the evidence
 * of each condition, so the signature covers the evidence.
 */
export const SIGNATUREWITHEVIDENCEDATA_TYPES = {
  SignatureWithEvidenceData: [
    ...SIGNATUREDATA_TYPES.SignatureData,
    { name: "evidence", type: "bytes[]" },
  ],
} as const;
