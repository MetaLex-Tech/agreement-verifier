import {
  type Address,
  decodeAbiParameters,
  encodeAbiParameters,
  type Hex,
  isAddress,
  keccak256,
  parseAbi,
  stringToHex,
  zeroAddress,
} from "viem";
import type { SalesClient, SalesConfiguration } from "./onchainSales";

export const namedBuyerApprovalAbi = parseAbi([
  "function approvers(address dealManager) view returns (address)",
  "function dealApprovals(address dealManager, bytes32 dealId) view returns (bool)",
  "function setApprover(address dealManager, address approver)",
  "function setDealApproval(address dealManager, bytes32 dealId, bool approved)",
]);
export const NAMED_BUYER_CONDITION =
  "0x4be9Eaff732F4BA3f1Fc6359a2F0858F70637c69" as const;
const implementationSlot =
  "0x360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc" as const;
const metadataVersion = keccak256(
  stringToHex("metalex.secondary-sale.named-buyer.v1"),
);
const metadataTypes = [{ type: "bytes32" }, { type: "address" }] as const;

/** Descriptive metadata. Enforcement comes from the mandatory approval condition. */
export function namedBuyerMetadata(buyer?: Address): Hex {
  if (!buyer) return "0x";
  if (!isAddress(buyer) || buyer.toLowerCase() === zeroAddress)
    throw new Error("Enter the purchaser's nonzero wallet address.");
  return encodeAbiParameters(metadataTypes, [metadataVersion, buyer]);
}

export function readNamedBuyerMetadata(value: Hex): Address | undefined {
  if (value === "0x") return undefined;
  if (!/^0x[0-9a-fA-F]{64}0{24}[0-9a-fA-F]{40}$/.test(value))
    throw new Error("This offer uses unsupported counterparty restrictions.");
  const [version, buyer] = decodeAbiParameters(metadataTypes, value);
  if (version !== metadataVersion || buyer.toLowerCase() === zeroAddress)
    throw new Error("This offer uses unsupported counterparty restrictions.");
  return buyer;
}

// Exact deployed runtime matched to the compiled GPLPApprovalCondition source.
// Evidence and normalization method: notes/verification/private-sales-condition-runtime.json.
export async function verifyNamedBuyerRuntime(
  client: SalesClient,
  chainId: number,
  blockNumber: bigint,
) {
  if (![1, 8453, 42161, 11155111, 84532].includes(chainId))
    throw new Error(
      "Named-purchaser approval has not been verified on this chain.",
    );
  const implementation =
    chainId === 84532
      ? "0xc490bb59ef45ca834c10e9db95fdd2aa2a2ed8c6"
      : "0x4d1cfa1cf02994c94c1bb525fd2e83fbada05658";
  const implementationHash =
    chainId === 84532
      ? "0xb06a5701f299e1dd25b9a8a45fc6833bc893a95e0276364d73b03fc086ec2516"
      : "0xe9071800a07bf15912f668d098771502cd66ccc486b84e8bf3f7fb2b90c60e9e";
  const [slot, proxyCode, code] = await Promise.all([
    client.getStorageAt({
      address: NAMED_BUYER_CONDITION,
      slot: implementationSlot,
      blockNumber,
    }),
    client.getCode({ address: NAMED_BUYER_CONDITION, blockNumber }),
    client.getCode({ address: implementation, blockNumber }),
  ]);
  if (
    slot?.toLowerCase() !== `0x${"0".repeat(24)}${implementation.slice(2)}` ||
    !proxyCode ||
    keccak256(proxyCode) !==
      "0x63c04ff22572238e25a05aa8a5bba88e97f1700e50ab822cf36b497325bc4edd" ||
    !code ||
    keccak256(code) !== implementationHash
  )
    throw new Error(
      "The issuer approval contract changed or could not be verified. Named-purchaser execution is unavailable until its runtime is reviewed.",
    );
}

export function assertMandatoryBuyerGate(
  configuration: SalesConfiguration,
  pathway: number,
) {
  const includesGate = (conditions: readonly Address[]) =>
    conditions.some(
      (address) =>
        address.toLowerCase() === NAMED_BUYER_CONDITION.toLowerCase(),
    );
  const pathways = configuration.pathways.filter(
    (item) => item.enabled && (pathway === 0 || item.id === pathway),
  );
  if (
    !pathways.length ||
    (!includesGate(configuration.spvConditions) &&
      !pathways.every((item) => includesGate(item.conditions)))
  )
    throw new Error(
      "The issuer must require purchaser approval at acceptance on every available pathway. Closing-only approval does not restrict acceptance.",
    );
}

export async function readNamedBuyerGate(
  client: SalesClient,
  input: {
    chainId: number;
    configuration: SalesConfiguration;
    pathway: number;
    seller: Address;
    buyer: Address;
    offerId: Hex;
    agreementId?: Hex;
    blockNumber: bigint;
  },
) {
  if (
    !isAddress(input.buyer) ||
    input.buyer.toLowerCase() === zeroAddress ||
    input.buyer.toLowerCase() === input.seller.toLowerCase()
  )
    throw new Error("Choose a purchaser wallet different from the seller.");
  assertMandatoryBuyerGate(input.configuration, input.pathway);
  if ((await client.getChainId()) !== input.chainId)
    throw new Error("The RPC is on the wrong chain.");
  const { approver, blanket, approved } = await readNamedBuyerApprovalState(
    client,
    {
      chainId: input.chainId,
      manager: input.configuration.manager,
      offerId: input.offerId,
      agreementId: input.agreementId,
      blockNumber: input.blockNumber,
    },
  );
  if (
    approver === zeroAddress ||
    approver.toLowerCase() === input.seller.toLowerCase() ||
    approver.toLowerCase() === input.buyer.toLowerCase()
  )
    throw new Error(
      "The issuer must appoint an approver separate from the seller and purchaser.",
    );
  if (blanket)
    throw new Error(
      "This offer has blanket approval, which permits other buyers. The issuer must revoke it before this named-purchaser sale can proceed.",
    );
  return { approver, approved };
}

export async function readNamedBuyerApprovalState(
  client: SalesClient,
  input: {
    chainId: number;
    manager: Address;
    offerId: Hex;
    agreementId?: Hex;
    blockNumber: bigint;
  },
) {
  await verifyNamedBuyerRuntime(client, input.chainId, input.blockNumber);
  const call = {
    address: NAMED_BUYER_CONDITION,
    abi: namedBuyerApprovalAbi,
    blockNumber: input.blockNumber,
  } as const;
  const [approver, blanket, approved] = await Promise.all([
    client.readContract({
      ...call,
      functionName: "approvers",
      args: [input.manager],
    }),
    client.readContract({
      ...call,
      functionName: "dealApprovals",
      args: [input.manager, input.offerId],
    }),
    input.agreementId
      ? client.readContract({
          ...call,
          functionName: "dealApprovals",
          args: [input.manager, input.agreementId],
        })
      : false,
  ]);
  return { approver, blanket, approved };
}
