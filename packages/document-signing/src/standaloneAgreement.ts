import { cyberAgreementRegistryAbi } from "@metalex-web/abis";
import {
  type Address,
  encodeAbiParameters,
  type Hex,
  isAddress,
  isAddressEqual,
  keccak256,
  zeroAddress,
  zeroHash,
} from "viem";
import { SIGNATUREDATA_DOMAIN, SIGNATUREDATA_TYPES } from "./signatureData";

/**
 * Agreement-id algorithms implemented by reviewed CyberAgreementRegistry
 * runtimes. Runtime-code compatibility is checked separately; callers must not
 * select an algorithm from a chain id or registry version string alone.
 */
export const STANDALONE_AGREEMENT_ID_ALGORITHMS = [
  "legacy-v1",
  "lifecycle-bound-v2",
] as const;

export type StandaloneAgreementIdAlgorithm =
  (typeof STANDALONE_AGREEMENT_ID_ALGORITHMS)[number];

/** Values hard-coded by createStandaloneContractAndSignFor. */
export const STANDALONE_SECRET_HASH = zeroHash;
export const STANDALONE_FINALIZER = zeroAddress;

export type StandaloneAgreementIdInput = {
  algorithm: StandaloneAgreementIdAlgorithm;
  creator: Address;
  title: string;
  legalContractUri: string;
  globalFields: readonly string[];
  partyFields: readonly string[];
  salt: bigint;
  globalValues: readonly string[];
  parties: readonly Address[];
};

export type StandaloneAgreementPayloadInput = StandaloneAgreementIdInput & {
  chainId: number;
  registryAddress: Address;
  partyValues: readonly (readonly string[])[];
  expiry: bigint;
  /** Public records only: named prefix followed by unallocated slots. */
  allowTrailingOpenSlots?: boolean;
};

export class StandaloneAgreementConstructionError extends Error {
  constructor(
    readonly code:
      | "creator_is_zero"
      | "creator_invalid"
      | "creator_not_first"
      | "duplicate_party"
      | "global_values_length_mismatch"
      | "invalid_party"
      | "invalid_chain_id"
      | "invalid_expiry"
      | "invalid_registry"
      | "invalid_salt"
      | "legal_contract_uri_empty"
      | "missing_creator"
      | "missing_creator_party_values"
      | "party_fields_length_mismatch"
      | "party_is_zero"
      | "party_values_length_mismatch"
      | "title_empty"
      | "unsupported_algorithm",
    message: string,
  ) {
    super(message);
    this.name = "StandaloneAgreementConstructionError";
  }
}

/**
 * Mirrors CyberAgreementRegistry's content-addressed standalone template id:
 * keccak256(abi.encode(title, legalContractUri, globalFields, partyFields)).
 */
export const buildStandaloneTemplateId = ({
  title,
  legalContractUri,
  globalFields,
  partyFields,
}: Pick<
  StandaloneAgreementIdInput,
  "title" | "legalContractUri" | "globalFields" | "partyFields"
>): Hex =>
  keccak256(
    encodeAbiParameters(
      [
        { name: "title", type: "string" },
        { name: "legalContractUri", type: "string" },
        { name: "globalFields", type: "string[]" },
        { name: "partyFields", type: "string[]" },
      ],
      [title, legalContractUri, [...globalFields], [...partyFields]],
    ),
  );

/**
 * Builds the ids for createStandaloneContractAndSignFor and rejects a creator
 * who is not the first party. The registry always verifies the creator using
 * partyValues[0], so allowing a later creator here would produce an apparently
 * valid signature that reverts when submitted.
 *
 * This helper intentionally does not call or replace the deal/grant
 * computeContractId helper. Standalone runtimes have used two reviewed
 * preimages:
 *
 * - legacy-v1: (templateId, salt, globalValues, parties)
 * - lifecycle-bound-v2: the legacy tuple plus the standalone call's fixed zero
 *   secretHash and zero finalizer
 */
export const buildStandaloneAgreementIds = (
  input: StandaloneAgreementIdInput,
): { templateId: Hex; agreementId: Hex } => {
  assertCreatorFirst(input.creator, input.parties);

  const templateId = buildStandaloneTemplateId(input);
  const commonValues = [
    templateId,
    input.salt,
    [...input.globalValues],
    [...input.parties],
  ] as const;

  switch (input.algorithm) {
    case "legacy-v1":
      return {
        templateId,
        agreementId: keccak256(
          encodeAbiParameters(
            [
              { name: "templateId", type: "bytes32" },
              { name: "salt", type: "uint256" },
              { name: "globalValues", type: "string[]" },
              { name: "parties", type: "address[]" },
            ],
            commonValues,
          ),
        ),
      };
    case "lifecycle-bound-v2":
      return {
        templateId,
        agreementId: keccak256(
          encodeAbiParameters(
            [
              { name: "templateId", type: "bytes32" },
              { name: "salt", type: "uint256" },
              { name: "globalValues", type: "string[]" },
              { name: "parties", type: "address[]" },
              { name: "secretHash", type: "bytes32" },
              { name: "finalizer", type: "address" },
            ],
            [...commonValues, STANDALONE_SECRET_HASH, STANDALONE_FINALIZER],
          ),
        ),
      };
    default:
      throw new StandaloneAgreementConstructionError(
        "unsupported_algorithm",
        `Unsupported standalone agreement-id algorithm: ${String(input.algorithm)}`,
      );
  }
};

/**
 * Prepares the two payloads that must stay in lockstep for the registry's
 * standalone create-and-sign call: the EIP-712 message signed by party zero
 * and the ABI call that carries every party row. Both name the creator as the
 * signing party — the registry binds it into the typed data, so one signature
 * consents for that party alone. Requiring only the complete `partyValues`
 * matrix prevents a caller from accidentally signing a later creator row while
 * the contract always verifies `partyValues[0]`.
 */
export const buildStandaloneAgreementPayload = (
  input: StandaloneAgreementPayloadInput,
) => {
  validateStandaloneAgreementPayload(input);
  const { templateId, agreementId } = buildStandaloneAgreementIds(input);
  const creatorPartyValues = input.partyValues[0];

  if (!creatorPartyValues) {
    throw new StandaloneAgreementConstructionError(
      "missing_creator_party_values",
      "The standalone agreement creator must have partyValues[0]",
    );
  }

  const globalFields = [...input.globalFields];
  const partyFields = [...input.partyFields];
  const globalValues = [...input.globalValues];
  const parties = [...input.parties];
  const partyValues = input.partyValues.map((values) => [...values]);

  return {
    templateId,
    agreementId,
    signatureData: {
      types: SIGNATUREDATA_TYPES,
      domain: SIGNATUREDATA_DOMAIN({
        address: input.registryAddress,
        chainId: input.chainId,
      }),
      primaryType: "SignatureData" as const,
      message: {
        contractId: agreementId,
        signer: input.creator,
        legalContractUri: input.legalContractUri,
        globalFields,
        partyFields,
        globalValues,
        partyValues: [...creatorPartyValues],
      },
    },
    createContractCall: (signature: Hex) => ({
      address: input.registryAddress,
      abi: cyberAgreementRegistryAbi,
      functionName: "createStandaloneContractAndSignFor" as const,
      args: [
        input.title,
        input.legalContractUri,
        globalFields,
        partyFields,
        input.salt,
        globalValues,
        parties,
        partyValues,
        input.expiry,
        input.creator,
        signature,
      ] as const,
    }),
  };
};

export const validateStandaloneAgreementPayload = (
  input: StandaloneAgreementPayloadInput,
): void => {
  assertCreatorFirst(input.creator, input.parties);

  if (
    !isAddress(input.registryAddress) ||
    isAddressEqual(input.registryAddress, zeroAddress)
  ) {
    throw new StandaloneAgreementConstructionError(
      "invalid_registry",
      "The standalone agreement registry address must be a nonzero address",
    );
  }

  if (!Number.isSafeInteger(input.chainId) || input.chainId <= 0) {
    throw new StandaloneAgreementConstructionError(
      "invalid_chain_id",
      "The standalone agreement chain id must be a positive safe integer",
    );
  }

  if (input.salt < 0n || input.salt >= 1n << 256n) {
    throw new StandaloneAgreementConstructionError(
      "invalid_salt",
      "The standalone agreement salt must fit uint256",
    );
  }

  if (input.expiry < 0n || input.expiry >= 1n << 256n) {
    throw new StandaloneAgreementConstructionError(
      "invalid_expiry",
      "The standalone agreement expiry must fit uint256",
    );
  }

  if (input.title.length === 0) {
    throw new StandaloneAgreementConstructionError(
      "title_empty",
      "The standalone agreement title cannot be empty",
    );
  }

  if (input.legalContractUri.length === 0) {
    throw new StandaloneAgreementConstructionError(
      "legal_contract_uri_empty",
      "The standalone agreement document URI cannot be empty",
    );
  }

  if (input.globalFields.length !== input.globalValues.length) {
    throw new StandaloneAgreementConstructionError(
      "global_values_length_mismatch",
      "Every standalone agreement global field must have one value",
    );
  }

  if (
    (input.allowTrailingOpenSlots
      ? input.parties.filter((p) => !isAddressEqual(p, zeroAddress)).length
      : input.parties.length) !== input.partyValues.length
  ) {
    throw new StandaloneAgreementConstructionError(
      "party_values_length_mismatch",
      "Every standalone agreement party must have one party-values row",
    );
  }

  if (!input.partyValues[0]) {
    throw new StandaloneAgreementConstructionError(
      "missing_creator_party_values",
      "The standalone agreement creator must have partyValues[0]",
    );
  }

  for (const values of input.partyValues) {
    if (!values || values.length !== input.partyFields.length) {
      throw new StandaloneAgreementConstructionError(
        "party_fields_length_mismatch",
        "Every standalone agreement party row must match the party fields",
      );
    }
  }

  const seenParties = new Set<string>();
  let openSeen = false;
  for (const party of input.parties) {
    if (!isAddress(party)) {
      throw new StandaloneAgreementConstructionError(
        "invalid_party",
        `Invalid standalone agreement party address: ${party}`,
      );
    }
    if (isAddressEqual(party, zeroAddress)) {
      if (input.allowTrailingOpenSlots) {
        openSeen = true;
        continue;
      }
      throw new StandaloneAgreementConstructionError(
        "party_is_zero",
        "A standalone agreement party cannot be the zero address",
      );
    }

    if (openSeen)
      throw new StandaloneAgreementConstructionError(
        "invalid_party",
        "Open slots must follow all named parties",
      );
    const normalizedParty = party.toLowerCase();
    if (seenParties.has(normalizedParty)) {
      throw new StandaloneAgreementConstructionError(
        "duplicate_party",
        `Duplicate standalone agreement party: ${party}`,
      );
    }
    seenParties.add(normalizedParty);
  }
};

const assertCreatorFirst = (
  creator: Address,
  parties: readonly Address[],
): void => {
  if (!isAddress(creator)) {
    throw new StandaloneAgreementConstructionError(
      "creator_invalid",
      `Invalid standalone agreement creator address: ${creator}`,
    );
  }

  if (isAddressEqual(creator, zeroAddress)) {
    throw new StandaloneAgreementConstructionError(
      "creator_is_zero",
      "The standalone agreement creator cannot be the zero address",
    );
  }

  const firstParty = parties[0];
  if (!firstParty) {
    throw new StandaloneAgreementConstructionError(
      "missing_creator",
      "The standalone agreement creator must be the first party",
    );
  }

  if (!isAddressEqual(creator, firstParty)) {
    throw new StandaloneAgreementConstructionError(
      "creator_not_first",
      "The standalone agreement creator must be parties[0]",
    );
  }
};
