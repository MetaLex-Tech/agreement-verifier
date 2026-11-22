import {
  getAbiItem,
  isAddressEqual,
  parseEventLogs,
  type TransactionReceipt,
} from "viem";
import { cyberAgreementRegistryAbi } from "../../packages/abis/cybercorps/cyberAgreementRegistry";
import { cyberCorpAbi } from "../../packages/abis/cybercorps/cyberCorpAbi";
import { dealManagerAbi } from "../../packages/abis/cybercorps/dealManagerAbi";
import { dealManagerAbiV4 } from "../../packages/abis/cybercorps/dealManagerAbiV4";
import { roundManagerAbi } from "../../packages/abis/cybercorps/roundManagerAbi";
import { roundManagerAbi as legacyRoundAbi } from "../../packages/abis/cybercorps/roundManagerAbiLegacy";
import { roundManagerAbiV4 } from "../../packages/abis/cybercorps/roundManagerAbiV4";
import { supportedCorpContractMajor } from "../../packages/document-signing/src/corpContractVersion";
import type { FinancingReceiptRecord } from "../../packages/legal-documents/src/financingReceipts";
import {
  confirmSnapshot,
  readAgreement,
  recordedSnapshot,
  type Snapshot,
} from "./registry";

export function financingReceiptRows(r: FinancingReceiptRecord) {
  return [
    ...(r.kind === "ticket" ? [["Ticket proposed", r.creation] as const] : []),
    [
      r.kind === "round"
        ? "Company approved the round terms"
        : "Company signed the ticket",
      r.companyApproval,
    ],
    ["Investor signed", r.investorSignature],
    [
      r.kind === "round"
        ? "Company allocated the investment"
        : "Ticket settled",
      r.settlement,
    ],
  ] as const;
}

export async function confirmFinancingReceipts(
  s: Snapshot,
  r: FinancingReceiptRecord,
) {
  const { client } = s;
  const historical = await recordedSnapshot(s, r);
  const inputs = [
    r.creation,
    r.companyApproval,
    r.investorSignature,
    r.settlement,
  ];
  const receipts = new Map<string, TransactionReceipt>();
  for (const ref of inputs) {
    if (receipts.has(ref.transactionHash)) continue;
    const [receipt, block] = await Promise.all([
      client.getTransactionReceipt({ hash: ref.transactionHash }),
      client.getBlock({ blockNumber: BigInt(ref.number) }),
    ]);
    if (
      receipt.status !== "success" ||
      receipt.transactionHash !== ref.transactionHash ||
      receipt.blockNumber !== BigInt(ref.number) ||
      receipt.transactionIndex !== ref.transactionIndex ||
      receipt.blockHash !== ref.hash ||
      block.hash !== ref.hash ||
      block.timestamp !== BigInt(ref.timestamp)
    )
      throw Error("A transaction differs from its canonical receipt or block.");
    receipts.set(ref.transactionHash, receipt);
  }
  const record = await readAgreement(historical, r.agreementId);
  if (
    record?.status !== "Finalized" ||
    record.template !== r.templateId ||
    record.uri !== r.legalContractUri ||
    record.parties.length !== 2 ||
    record.signed.some((time) => time <= 0n) ||
    !isAddressEqual(record.parties[0]!, r.officer) ||
    !isAddressEqual(record.parties[1]!, r.investor) ||
    record.signed[1] !== BigInt(r.investorSignature.timestamp) ||
    (r.kind === "ticket" &&
      record.signed[0] !== BigInt(r.companyApproval.timestamp))
  )
    throw Error("The registered purchase differs from the financing record.");
  const manager = await client.readContract({
    address: r.company,
    abi: cyberCorpAbi,
    functionName: r.kind === "round" ? "roundManager" : "dealManager",
    blockNumber: BigInt(r.creation.number),
  });
  if (!isAddressEqual(manager, r.manager))
    throw Error("The company used a different manager at creation.");
  const logs = (ref: typeof r.creation) =>
    receipts.get(ref.transactionHash)!.logs;
  const one = (events: readonly unknown[]) => {
    if (events.length !== 1)
      throw Error(
        "The receipt does not identify the expected event for this purchase.",
      );
  };
  const signed = (ref: typeof r.creation, wallet: typeof r.officer) =>
    one(
      parseEventLogs({
        abi: [
          getAbiItem({
            abi: cyberAgreementRegistryAbi,
            name: "AgreementSigned",
          }),
        ],
        logs: logs(ref),
      }).filter(
        (e) =>
          isAddressEqual(e.address, r.registry) &&
          e.args.contractId === r.agreementId &&
          isAddressEqual(e.args.party, wallet) &&
          e.args.timestamp === BigInt(ref.timestamp),
      ),
    );
  signed(r.investorSignature, r.investor);
  const versionAt = async (ref: typeof r.creation) =>
    supportedCorpContractMajor(
      await client.readContract({
        address: manager,
        abi: [getAbiItem({ abi: roundManagerAbi, name: "DEPLOY_VERSION" })],
        functionName: "DEPLOY_VERSION",
        blockNumber: BigInt(ref.number),
      }),
    );
  if (r.kind === "round") {
    const abiAt = async (ref: typeof r.creation) => {
      const major = await versionAt(ref);
      if (major && major < 4) return legacyRoundAbi;
      if (major === 4) return roundManagerAbiV4;
      if (major === 5) return roundManagerAbi;
      throw Error(
        "The round manager version at the recorded block is unsupported.",
      );
    };
    const [creationAbi, signingAbi, allocationAbi] = await Promise.all([
      abiAt(r.creation),
      abiAt(r.investorSignature),
      abiAt(r.settlement),
    ]);
    one(
      parseEventLogs({
        abi: creationAbi,
        eventName: "RoundCreated",
        logs: logs(r.creation),
      }).filter(
        (e) =>
          isAddressEqual(e.address, manager) &&
          isAddressEqual(e.args.corp, r.company) &&
          e.args.roundId === r.roundId &&
          isAddressEqual(e.args.round.authorityOfficer, r.officer) &&
          e.args.round.templateId === r.templateId,
      ),
    );
    one(
      parseEventLogs({
        abi: signingAbi,
        eventName: "EOISubmitted",
        logs: logs(r.investorSignature),
      }).filter(
        (e) =>
          isAddressEqual(e.address, manager) &&
          isAddressEqual(e.args.corp, r.company) &&
          e.args.roundId === r.roundId &&
          e.args.agreementId === r.agreementId &&
          isAddressEqual(e.args.investor, r.investor),
      ),
    );
    one(
      parseEventLogs({
        abi: allocationAbi,
        eventName: "AllocationMade",
        logs: logs(r.settlement),
      }).filter(
        (e) =>
          isAddressEqual(e.address, manager) &&
          e.args.roundId === r.roundId &&
          e.args.agreementId === r.agreementId &&
          isAddressEqual(e.args.buyer, r.investor),
      ),
    );
  } else {
    for (const [ref, eventName] of [
      [r.creation, "DealProposed"],
      [r.settlement, "DealFinalized"],
    ] as const) {
      const major = await versionAt(ref);
      if (major !== 3 && major !== 4 && major !== 5)
        throw Error(
          "The ticket manager version at the recorded block is unsupported.",
        );
      const abi = major === 5 ? dealManagerAbi : dealManagerAbiV4;
      one(
        parseEventLogs({ abi, eventName, logs: logs(ref) }).filter(
          (e) =>
            isAddressEqual(e.address, manager) &&
            isAddressEqual(e.args.corp, r.company) &&
            isAddressEqual(e.args.dealRegistry, r.registry) &&
            e.args.agreementId === r.agreementId,
        ),
      );
    }
    signed(r.companyApproval, r.officer);
  }
  await confirmSnapshot(historical);
  if (historical !== s) await confirmSnapshot(s);
}
