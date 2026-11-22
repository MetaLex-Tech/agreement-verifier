import {
  type Address,
  getAddress,
  type Hex,
  isAddress,
  isAddressEqual,
  keccak256,
  zeroAddress,
} from "viem";
import {
  STANDALONE_AGREEMENT_ID_ALGORITHMS,
  type StandaloneAgreementIdAlgorithm,
} from "../standaloneAgreement";

/**
 * ERC-1967 implementation slot:
 * keccak256("eip1967.proxy.implementation") - 1.
 */
export const ERC1967_IMPLEMENTATION_SLOT =
  "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc" as const;

/**
 * Creator-bound creation (createBoundContractAndSignFor) reviewed for this
 * runtime, with the domain constants its getters must return.
 */
export type CreatorBoundReview = {
  templateDomain: Hex;
  agreementDomain: Hex;
  /**
   * Signer conditions (`createBoundContract` with conditions,
   * `signContractWithEvidenceFor`) reviewed for this runtime, with the
   * constants its getters must return.
   */
  signerConditions?: {
    conditionedAgreementDomain: Hex;
    evidenceTypehash: Hex;
  };
};

/**
 * Sender-registered creation reviewed for a creator-bound runtime: an account
 * that is not a party sends the unsigned `createBoundContract`, the ids commit
 * to that account, and each party's signature is recorded with
 * `signContractFor`. Absent: the runtime refuses sender-registered creation.
 */
export type SenderRegisteredReview = {
  reviewedAt: string;
  reviewReference: string;
};

export type ReviewedRegistryRuntime = {
  algorithmVersion: StandaloneAgreementIdAlgorithm;
  creatorBound?: CreatorBoundReview;
  /** Requires `creatorBound`: it uses the same bound entry points. */
  senderRegistered?: SenderRegisteredReview;
  implementationAddress: Address;
  implementationCodeHash: Hex;
  proxyCodeHash: Hex;
  reviewedAt: string;
  reviewReference: string;
};

export type RegistryCompatibilityEntry = {
  registryAddress: Address;
  /** The runtime the proxy is expected to run now. */
  review: ReviewedRegistryRuntime | null;
  /**
   * Earlier reviewed runtimes of the same proxy that stay accepted, so reads
   * pinned to a block before an upgrade still resolve. Each entry needs the
   * same complete review as `review`.
   */
  retainedReviews?: readonly ReviewedRegistryRuntime[];
};

export type RegistryCompatibilityMatrix = Readonly<
  Record<number, RegistryCompatibilityEntry>
>;

export type RegistryCompatibilityReasonCode =
  | "compatible"
  | "unsupported-chain"
  | "runtime-not-reviewed"
  | "invalid-review-config"
  | "rpc-unavailable"
  | "proxy-code-missing"
  | "proxy-code-hash-mismatch"
  | "implementation-unresolved"
  | "implementation-address-mismatch"
  | "implementation-code-missing"
  | "implementation-code-hash-mismatch";

type RegistryRuntimeEvidence = {
  algorithmVersion?: StandaloneAgreementIdAlgorithm;
  creatorBound?: CreatorBoundReview;
  senderRegistered?: SenderRegisteredReview;
  chainId: number;
  implementationAddress?: Address;
  implementationCodeHash?: Hex;
  proxyCodeHash?: Hex;
  reasonCode: RegistryCompatibilityReasonCode;
  registryAddress?: Address;
};

export type RegistryRuntimeCompatibility = RegistryRuntimeEvidence & {
  isCompatible: boolean;
};

export type RegistryCreationCapability = RegistryRuntimeEvidence & {
  canCreate: boolean;
};

export type RegistryRuntimeClient = {
  getCode: (parameters: {
    address: Address;
    blockNumber?: bigint;
  }) => Promise<Hex | undefined>;
  getStorageAt: (parameters: {
    address: Address;
    blockNumber?: bigint;
    slot: Hex;
  }) => Promise<Hex | undefined>;
};

const bytes32Pattern = /^0x[0-9a-fA-F]{64}$/;

const isBytes32 = (value: string): value is Hex => bytes32Pattern.test(value);

const hashesMatch = (left: Hex, right: Hex): boolean =>
  left.toLowerCase() === right.toLowerCase();

const supportedAlgorithms = new Set<string>(STANDALONE_AGREEMENT_ID_ALGORITHMS);

const isReviewComplete = (review: ReviewedRegistryRuntime): boolean =>
  supportedAlgorithms.has(review.algorithmVersion) &&
  isBytes32(review.proxyCodeHash) &&
  isBytes32(review.implementationCodeHash) &&
  isAddress(review.implementationAddress) &&
  !isAddressEqual(review.implementationAddress, zeroAddress) &&
  review.reviewedAt.trim().length > 0 &&
  review.reviewReference.trim().length > 0 &&
  (review.creatorBound === undefined ||
    (isBytes32(review.creatorBound.templateDomain) &&
      isBytes32(review.creatorBound.agreementDomain) &&
      (review.creatorBound.signerConditions === undefined ||
        (isBytes32(
          review.creatorBound.signerConditions.conditionedAgreementDomain,
        ) &&
          isBytes32(
            review.creatorBound.signerConditions.evidenceTypehash,
          ))))) &&
  (review.senderRegistered === undefined ||
    (review.creatorBound !== undefined &&
      review.senderRegistered.reviewedAt.trim().length > 0 &&
      review.senderRegistered.reviewReference.trim().length > 0));

export const resolveErc1967Implementation = (
  storageValue: Hex | undefined,
): Address | undefined => {
  if (!storageValue || !isBytes32(storageValue)) return undefined;

  const candidate = `0x${storageValue.slice(-40)}`;
  if (!isAddress(candidate) || isAddressEqual(candidate, zeroAddress)) {
    return undefined;
  }

  return getAddress(candidate);
};

const runtimeBlocked = (
  chainId: number,
  reasonCode: Exclude<RegistryCompatibilityReasonCode, "compatible">,
  partial: Partial<RegistryRuntimeCompatibility> = {},
): RegistryRuntimeCompatibility => ({
  ...partial,
  isCompatible: false,
  chainId,
  reasonCode,
});

const asCreationCapability = (
  runtime: RegistryRuntimeCompatibility,
): RegistryCreationCapability => {
  const { isCompatible, ...evidence } = runtime;
  return { ...evidence, canCreate: isCompatible };
};

/**
 * Compares a registry proxy and its resolved implementation with a deliberately
 * reviewed runtime pair. RPC errors are reduced to a stable reason code; callers
 * must not surface provider error strings or treat an incomplete read as support.
 */
export const probeRegistryRuntimeCompatibility = async ({
  chainId,
  client,
  matrix,
  blockNumber,
}: {
  chainId: number;
  client: RegistryRuntimeClient;
  matrix: RegistryCompatibilityMatrix;
  blockNumber?: bigint;
}): Promise<RegistryRuntimeCompatibility> => {
  const configured = matrix[chainId];
  if (!configured) return runtimeBlocked(chainId, "unsupported-chain");

  const { registryAddress, review } = configured;
  if (!review) {
    return runtimeBlocked(chainId, "runtime-not-reviewed", { registryAddress });
  }
  const reviews = [review, ...(configured.retainedReviews ?? [])];
  if (!reviews.every(isReviewComplete)) {
    return runtimeBlocked(chainId, "invalid-review-config", {
      registryAddress,
    });
  }

  let proxyCode: Hex | undefined;
  try {
    proxyCode = await client.getCode({ address: registryAddress, blockNumber });
  } catch {
    return runtimeBlocked(chainId, "rpc-unavailable", { registryAddress });
  }
  if (!proxyCode || proxyCode === "0x") {
    return runtimeBlocked(chainId, "proxy-code-missing", { registryAddress });
  }

  const proxyCodeHash = keccak256(proxyCode);
  if (
    !reviews.some((entry) => hashesMatch(proxyCodeHash, entry.proxyCodeHash))
  ) {
    return runtimeBlocked(chainId, "proxy-code-hash-mismatch", {
      proxyCodeHash,
      registryAddress,
    });
  }

  let implementationStorage: Hex | undefined;
  try {
    implementationStorage = await client.getStorageAt({
      address: registryAddress,
      blockNumber,
      slot: ERC1967_IMPLEMENTATION_SLOT,
    });
  } catch {
    return runtimeBlocked(chainId, "rpc-unavailable", {
      proxyCodeHash,
      registryAddress,
    });
  }

  const implementationAddress = resolveErc1967Implementation(
    implementationStorage,
  );
  if (!implementationAddress) {
    return runtimeBlocked(chainId, "implementation-unresolved", {
      proxyCodeHash,
      registryAddress,
    });
  }
  const matched = reviews.find(
    (entry) =>
      isAddressEqual(implementationAddress, entry.implementationAddress) &&
      hashesMatch(proxyCodeHash, entry.proxyCodeHash),
  );
  if (!matched) {
    return runtimeBlocked(chainId, "implementation-address-mismatch", {
      implementationAddress,
      proxyCodeHash,
      registryAddress,
    });
  }

  let implementationCode: Hex | undefined;
  try {
    implementationCode = await client.getCode({
      address: implementationAddress,
      blockNumber,
    });
  } catch {
    return runtimeBlocked(chainId, "rpc-unavailable", {
      implementationAddress,
      proxyCodeHash,
      registryAddress,
    });
  }
  if (!implementationCode || implementationCode === "0x") {
    return runtimeBlocked(chainId, "implementation-code-missing", {
      implementationAddress,
      proxyCodeHash,
      registryAddress,
    });
  }

  const implementationCodeHash = keccak256(implementationCode);
  if (!hashesMatch(implementationCodeHash, matched.implementationCodeHash)) {
    return runtimeBlocked(chainId, "implementation-code-hash-mismatch", {
      implementationAddress,
      implementationCodeHash,
      proxyCodeHash,
      registryAddress,
    });
  }

  return {
    algorithmVersion: matched.algorithmVersion,
    ...(matched.creatorBound ? { creatorBound: matched.creatorBound } : {}),
    ...(matched.senderRegistered
      ? { senderRegistered: matched.senderRegistered }
      : {}),
    isCompatible: true,
    chainId,
    implementationAddress,
    implementationCodeHash,
    proxyCodeHash,
    reasonCode: "compatible",
    registryAddress,
  };
};

/**
 * Creation uses the same reviewed-runtime evidence today, while keeping a
 * distinct capability type from verification/attachment of agreements that
 * are already onchain.
 */
export const probeRegistryCreationCompatibility = async (parameters: {
  chainId: number;
  blockNumber?: bigint;
  client: RegistryRuntimeClient;
  matrix: RegistryCompatibilityMatrix;
}): Promise<RegistryCreationCapability> =>
  asCreationCapability(await probeRegistryRuntimeCompatibility(parameters));

/**
 * Lazy entry point for server wrappers. Unknown/unreviewed chains are rejected
 * before client construction, and a transport/configuration failure is reduced
 * to the same safe RPC reason used for failed reads.
 */
export const probeRegistryRuntimeCompatibilityWithClientFactory = async ({
  chainId,
  clientFactory,
  matrix,
  blockNumber,
}: {
  chainId: number;
  blockNumber?: bigint;
  clientFactory: () => RegistryRuntimeClient;
  matrix: RegistryCompatibilityMatrix;
}): Promise<RegistryRuntimeCompatibility> => {
  const configured = matrix[chainId];
  if (!configured) return runtimeBlocked(chainId, "unsupported-chain");
  if (!configured.review) {
    return runtimeBlocked(chainId, "runtime-not-reviewed", {
      registryAddress: configured.registryAddress,
    });
  }
  if (
    ![configured.review, ...(configured.retainedReviews ?? [])].every(
      isReviewComplete,
    )
  ) {
    return runtimeBlocked(chainId, "invalid-review-config", {
      registryAddress: configured.registryAddress,
    });
  }

  let client: RegistryRuntimeClient;
  try {
    client = clientFactory();
  } catch {
    return runtimeBlocked(chainId, "rpc-unavailable", {
      registryAddress: configured.registryAddress,
    });
  }

  return probeRegistryRuntimeCompatibility({
    chainId,
    client,
    matrix,
    blockNumber,
  });
};

export const probeRegistryCreationCompatibilityWithClientFactory =
  async (parameters: {
    chainId: number;
    blockNumber?: bigint;
    clientFactory: () => RegistryRuntimeClient;
    matrix: RegistryCompatibilityMatrix;
  }): Promise<RegistryCreationCapability> =>
    asCreationCapability(
      await probeRegistryRuntimeCompatibilityWithClientFactory(parameters),
    );
