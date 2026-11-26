import {
  type Address,
  encodeAbiParameters,
  type Hex,
  keccak256,
  stringToHex,
} from "viem";
import {
  SIGNATUREDATA_DOMAIN,
  SIGNATUREDATA_TYPES,
  SIGNATUREWITHEVIDENCEDATA_TYPES,
} from "./signatureData";
import {
  StandaloneAgreementConstructionError,
  type StandaloneAgreementPayloadInput,
  validateStandaloneAgreementPayload,
} from "./standaloneAgreement";

/**
 * Creator-bound creation on the CyberAgreementRegistry build of
 * cybercorps-contracts 68c8e75 (PR #185). Its ids commit to the creator and to
 * every stored term, so no other account can register different terms under
 * them. Use it only on a reviewed runtime whose `creatorBound` review matches
 * the live domain getters; this module does not approve a runtime.
 *
 * The signer-conditions build (cybercorps-contracts
 * `feat/creator-bound-zkpassport-condition`) adds conditions per party. The
 * conditions are part of the agreement id, and a party with conditions signs
 * with its evidence (`signContractWithEvidenceFor`). Use the conditioned
 * entries only on a runtime whose `signerConditions` review matches.
 */
export const CREATOR_BOUND_ALGORITHM = "creator-bound-v1" as const;

export const BOUND_TEMPLATE_DOMAIN = keccak256(
  stringToHex("MetaLeX.CyberAgreementRegistry.BoundTemplate.v1"),
);
export const BOUND_AGREEMENT_DOMAIN = keccak256(
  stringToHex("MetaLeX.CyberAgreementRegistry.BoundAgreement.v1"),
);
export const CONDITIONED_BOUND_AGREEMENT_DOMAIN = keccak256(
  stringToHex("MetaLeX.CyberAgreementRegistry.ConditionedBoundAgreement.v1"),
);

/** A check that a party must pass to sign; `params` is the struct that `kind` defines. */
export type SignerCondition = { kind: Hex; params: Hex };

/** `conditions[i]` lists the conditions of `parties[i]`. An empty list means none. */
export type SignerConditions = readonly (readonly SignerCondition[])[];

const signerConditionsInput = {
  name: "conditions",
  type: "tuple[][]",
  internalType: "struct SignerCondition[][]",
  components: [
    { name: "kind", type: "bytes32", internalType: "bytes32" },
    { name: "params", type: "bytes", internalType: "bytes" },
  ],
} as const;

const templateTuple = {
  name: "template",
  type: "tuple",
  internalType: "struct ICyberAgreementRegistry.Template",
  components: [
    { name: "legalContractUri", type: "string", internalType: "string" },
    { name: "title", type: "string", internalType: "string" },
    { name: "globalFields", type: "string[]", internalType: "string[]" },
    { name: "partyFields", type: "string[]", internalType: "string[]" },
  ],
} as const;

const boundInputs = [
  templateTuple,
  { name: "salt", type: "uint256", internalType: "uint256" },
  { name: "globalValues", type: "string[]", internalType: "string[]" },
  { name: "parties", type: "address[]", internalType: "address[]" },
  { name: "partyValues", type: "string[][]", internalType: "string[][]" },
  { name: "expiry", type: "uint256", internalType: "uint256" },
] as const;

const boundOutputs = [
  { name: "templateId", type: "bytes32", internalType: "bytes32" },
  { name: "contractId", type: "bytes32", internalType: "bytes32" },
] as const;

/** The creator-bound entry points, getters and errors of the registry builds. */
export const creatorBoundRegistryAbi = [
  {
    type: "function",
    name: "BOUND_TEMPLATE_DOMAIN",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "BOUND_AGREEMENT_DOMAIN",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createBoundContract",
    inputs: boundInputs,
    outputs: boundOutputs,
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createBoundContractAndSignFor",
    inputs: [
      ...boundInputs,
      { name: "creatorSignature", type: "bytes", internalType: "bytes" },
    ],
    outputs: boundOutputs,
    stateMutability: "nonpayable",
  },
  { type: "error", name: "AlreadySigned", inputs: [] },
  { type: "error", name: "ContractAlreadyExists", inputs: [] },
  { type: "error", name: "DuplicateParty", inputs: [] },
  { type: "error", name: "ExpiryNotInFuture", inputs: [] },
  { type: "error", name: "FirstPartyZeroAddress", inputs: [] },
  { type: "error", name: "InvalidPartyCount", inputs: [] },
  { type: "error", name: "MismatchedFieldsLength", inputs: [] },
  { type: "error", name: "MismatchedPartyValuesLength", inputs: [] },
  { type: "error", name: "SignatureVerificationFailed", inputs: [] },
  { type: "error", name: "TemplateAlreadyExists", inputs: [] },
  { type: "error", name: "TemplateDoesNotExist", inputs: [] },
  { type: "error", name: "TitleEmpty", inputs: [] },
  {
    type: "function",
    name: "CONDITIONED_BOUND_AGREEMENT_DOMAIN",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "SIGNATUREWITHEVIDENCEDATA_TYPEHASH",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createBoundContract",
    inputs: [...boundInputs, signerConditionsInput],
    outputs: boundOutputs,
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createBoundContractAndSignFor",
    inputs: [
      ...boundInputs,
      signerConditionsInput,
      { name: "creatorEvidence", type: "bytes[]", internalType: "bytes[]" },
      { name: "creatorSignature", type: "bytes", internalType: "bytes" },
    ],
    outputs: boundOutputs,
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "signContractWithEvidenceFor",
    inputs: [
      { name: "signer", type: "address", internalType: "address" },
      { name: "contractId", type: "bytes32", internalType: "bytes32" },
      { name: "partyValues", type: "string[]", internalType: "string[]" },
      { name: "evidence", type: "bytes[]", internalType: "bytes[]" },
      { name: "signature", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "getSignerConditionConfig",
    inputs: [{ name: "kind", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "SignerConditionSet",
    inputs: [
      {
        name: "contractId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "party",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "index",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "kind",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      { name: "params", type: "bytes", indexed: false, internalType: "bytes" },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SignerConditionMet",
    inputs: [
      {
        name: "contractId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "party",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "index",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "kind",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      { name: "result", type: "bytes", indexed: false, internalType: "bytes" },
    ],
    anonymous: false,
  },
  { type: "error", name: "SignerConditionsLengthMismatch", inputs: [] },
  {
    type: "error",
    name: "UnknownSignerConditionKind",
    inputs: [{ name: "kind", type: "bytes32", internalType: "bytes32" }],
  },
  { type: "error", name: "EvidenceRequired", inputs: [] },
  { type: "error", name: "NoSignerConditions", inputs: [] },
  { type: "error", name: "EvidenceLengthMismatch", inputs: [] },
  { type: "error", name: "ZKPassportNotConfigured", inputs: [] },
  { type: "error", name: "InvalidZKPassportConditionParams", inputs: [] },
  { type: "error", name: "DevModeProof", inputs: [] },
  { type: "error", name: "InvalidProof", inputs: [] },
  { type: "error", name: "InvalidScope", inputs: [] },
  { type: "error", name: "InvalidBoundChainId", inputs: [] },
  { type: "error", name: "InvalidBoundSender", inputs: [] },
  { type: "error", name: "InvalidBoundContractId", inputs: [] },
  { type: "error", name: "UniqueIdentifierMismatch", inputs: [] },
  { type: "error", name: "UniqueIdentifierAlreadyUsed", inputs: [] },
  { type: "error", name: "ClosedAgreementPartyValueMismatch", inputs: [] },
  { type: "error", name: "ContractAlreadyFinalized", inputs: [] },
  { type: "error", name: "ContractAlreadyVoided", inputs: [] },
  { type: "error", name: "ContractDoesNotExist", inputs: [] },
  { type: "error", name: "ContractExpired", inputs: [] },
] as const;

export type CreatorBoundAgreementInput = Omit<
  StandaloneAgreementPayloadInput,
  "algorithm" | "allowTrailingOpenSlots"
> & {
  /** Optional per-party signer conditions (`conditions[i]` for `parties[i]`). */
  conditions?: SignerConditions;
};

/**
 * Mirrors `_boundIds`:
 *
 * templateId = keccak256(abi.encode(BOUND_TEMPLATE_DOMAIN, creator, salt,
 *   title, legalContractUri, globalFields, partyFields))
 * terms = keccak256(abi.encode(creator, templateId, salt, globalValues,
 *   parties, keccak256(abi.encode(partyValues)), expiry))
 * contractId = keccak256(abi.encode(BOUND_AGREEMENT_DOMAIN, terms)), or with
 *   conditions keccak256(abi.encode(CONDITIONED_BOUND_AGREEMENT_DOMAIN, terms,
 *   keccak256(abi.encode(conditions))))
 */
export const buildCreatorBoundIds = (
  input: Pick<
    CreatorBoundAgreementInput,
    | "creator"
    | "salt"
    | "title"
    | "legalContractUri"
    | "globalFields"
    | "partyFields"
    | "globalValues"
    | "parties"
    | "partyValues"
    | "expiry"
  > & { conditions?: SignerConditions },
): { templateId: Hex; agreementId: Hex } => {
  const templateId = keccak256(
    encodeAbiParameters(
      [
        { type: "bytes32" },
        { type: "address" },
        { type: "uint256" },
        { type: "string" },
        { type: "string" },
        { type: "string[]" },
        { type: "string[]" },
      ],
      [
        BOUND_TEMPLATE_DOMAIN,
        input.creator,
        input.salt,
        input.title,
        input.legalContractUri,
        [...input.globalFields],
        [...input.partyFields],
      ],
    ),
  );
  const partyValuesHash = keccak256(
    encodeAbiParameters(
      [{ type: "string[][]" }],
      [input.partyValues.map((row) => [...row])],
    ),
  );
  const inner = keccak256(
    encodeAbiParameters(
      [
        { type: "address" },
        { type: "bytes32" },
        { type: "uint256" },
        { type: "string[]" },
        { type: "address[]" },
        { type: "bytes32" },
        { type: "uint256" },
      ],
      [
        input.creator,
        templateId,
        input.salt,
        [...input.globalValues],
        [...input.parties],
        partyValuesHash,
        input.expiry,
      ],
    ),
  );
  const conditions = input.conditions ?? [];
  const agreementId = conditions.length
    ? keccak256(
        encodeAbiParameters(
          [{ type: "bytes32" }, { type: "bytes32" }, { type: "bytes32" }],
          [
            CONDITIONED_BOUND_AGREEMENT_DOMAIN,
            inner,
            keccak256(encodeSignerConditions(conditions)),
          ],
        ),
      )
    : keccak256(
        encodeAbiParameters(
          [{ type: "bytes32" }, { type: "bytes32" }],
          [BOUND_AGREEMENT_DOMAIN, inner],
        ),
      );
  return { templateId, agreementId };
};

/** `abi.encode(conditions)`. */
export const encodeSignerConditions = (conditions: SignerConditions) =>
  encodeAbiParameters(
    [signerConditionsInput],
    [conditions.map((list) => list.map((condition) => ({ ...condition })))],
  );

/**
 * The typed data that `parties[0]` signs and the one call that creates the
 * template and the agreement and records that signature. The registry binds
 * the ids to `parties[0]`, so the creator must be the first party, and every
 * party must be a named, nonzero, distinct address.
 */
export const buildCreatorBoundAgreementPayload = (
  input: CreatorBoundAgreementInput,
) => {
  validateStandaloneAgreementPayload({
    ...input,
    algorithm: "lifecycle-bound-v2",
  });
  if (input.parties.length !== input.partyValues.length)
    throw new StandaloneAgreementConstructionError(
      "party_values_length_mismatch",
      "Every creator-bound agreement party must have one party-values row",
    );
  const conditions = input.conditions ?? [];
  if (conditions.length > 0 && conditions.length !== input.parties.length)
    throw new StandaloneAgreementConstructionError(
      "party_values_length_mismatch",
      "Every creator-bound agreement party must have one signer-conditions row",
    );
  const { templateId, agreementId } = buildCreatorBoundIds(input);
  const globalFields = [...input.globalFields];
  const partyFields = [...input.partyFields];
  const globalValues = [...input.globalValues];
  const parties = [...input.parties];
  const partyValues = input.partyValues.map((values) => [...values]);
  const normalizedConditions = conditions.map((list) =>
    list.map((condition) => ({ ...condition })),
  );
  const template = {
    legalContractUri: input.legalContractUri,
    title: input.title,
    globalFields,
    partyFields,
  };
  const domain = SIGNATUREDATA_DOMAIN({
    address: input.registryAddress,
    chainId: input.chainId,
  });
  const baseMessage = {
    contractId: agreementId,
    signer: input.creator as Address,
    legalContractUri: input.legalContractUri,
    globalFields,
    partyFields,
    globalValues,
    partyValues: [...partyValues[0]!],
  };
  return {
    algorithm: CREATOR_BOUND_ALGORITHM,
    templateId,
    agreementId,
    signatureData: {
      types: SIGNATUREDATA_TYPES,
      domain,
      primaryType: "SignatureData" as const,
      message: baseMessage,
    },
    ...(normalizedConditions.length > 0
      ? {
          signatureDataWithEvidence: (creatorEvidence: readonly Hex[]) => {
            const expectedCount = normalizedConditions[0]?.length ?? 0;
            if (
              expectedCount === 0 ||
              creatorEvidence.length !== expectedCount
            ) {
              throw new StandaloneAgreementConstructionError(
                "party_values_length_mismatch",
                "Creator evidence must match the number of signer conditions on party 1",
              );
            }
            return {
              types: SIGNATUREWITHEVIDENCEDATA_TYPES,
              domain,
              primaryType: "SignatureWithEvidenceData" as const,
              message: {
                ...baseMessage,
                evidence: [...creatorEvidence],
              },
            };
          },
        }
      : {}),
    createContractCall: (signature: Hex, creatorEvidence?: readonly Hex[]) => {
      if (normalizedConditions.length > 0) {
        const evidence = [...(creatorEvidence ?? [])];
        const expectedCount = normalizedConditions[0]?.length ?? 0;
        if (evidence.length !== expectedCount) {
          throw new StandaloneAgreementConstructionError(
            "party_values_length_mismatch",
            "Creator evidence must match the number of signer conditions on party 1",
          );
        }
        return {
          address: input.registryAddress,
          abi: creatorBoundRegistryAbi,
          functionName: "createBoundContractAndSignFor" as const,
          args: [
            template,
            input.salt,
            globalValues,
            parties,
            partyValues,
            input.expiry,
            normalizedConditions,
            evidence,
            signature,
          ] as const,
        };
      }
      if (creatorEvidence?.length) {
        throw new StandaloneAgreementConstructionError(
          "party_values_length_mismatch",
          "Creator evidence requires signer conditions on party 1",
        );
      }
      return {
        address: input.registryAddress,
        abi: creatorBoundRegistryAbi,
        functionName: "createBoundContractAndSignFor" as const,
        args: [
          template,
          input.salt,
          globalValues,
          parties,
          partyValues,
          input.expiry,
          signature,
        ] as const,
      };
    },
  };
};
