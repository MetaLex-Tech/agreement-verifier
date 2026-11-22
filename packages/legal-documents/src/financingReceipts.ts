import type { Address, Hex } from "viem";
import { z } from "zod";
import { matchingFinancingTemplates } from "./standardFinancingTemplates";

const hash = z
  .string()
  .regex(/^0x[0-9a-f]{64}$/i)
  .transform((value) => value.toLowerCase() as Hex);
const wallet = z
  .string()
  .regex(/^0x[0-9a-f]{40}$/i)
  .transform((value) => value.toLowerCase() as Address);
const unsigned = z.string().regex(/^(0|[1-9][0-9]{0,19})$/, { abort: true });
const block = z.strictObject({ number: unsigned, hash });
const transaction = block.extend({
  timestamp: unsigned,
  transactionHash: hash,
  transactionIndex: z.number().int().nonnegative(),
});

export function financingReceiptReference(confirmed: {
  timestamp: bigint;
  receipt: {
    blockHash: string;
    blockNumber: bigint;
    transactionHash: string;
    transactionIndex: number;
  };
}) {
  const { receipt, timestamp } = confirmed;
  return {
    number: receipt.blockNumber.toString(),
    hash: receipt.blockHash,
    timestamp: timestamp.toString(),
    transactionHash: receipt.transactionHash,
    transactionIndex: receipt.transactionIndex,
  };
}

const base = z.strictObject({
  format: z.literal("metalex-financing-receipts-v1"),
  chainId: z.number().int().positive(),
  company: wallet,
  registry: wallet,
  manager: wallet,
  agreementId: hash,
  templateId: hash,
  legalContractUri: z.string().max(256),
  officer: wallet,
  investor: wallet,
  finalized: block,
  creation: transaction,
  companyApproval: transaction,
  investorSignature: transaction,
  settlement: transaction,
});

export const financingReceiptRecord = z
  .discriminatedUnion("kind", [
    base.extend({ kind: z.literal("round"), roundId: hash }),
    base.extend({ kind: z.literal("ticket") }),
  ])
  .refine((r) => {
    if (
      !matchingFinancingTemplates(new Set([r.legalContractUri])).some(
        (paper) => paper.id === r.templateId.toLowerCase(),
      )
    )
      return false;
    const events = [
      r.creation,
      r.companyApproval,
      r.investorSignature,
      r.settlement,
    ];
    const height = (e: z.infer<typeof block>) => BigInt(e.number);
    const same = (a: string, b: string) => a.toLowerCase() === b.toLowerCase();
    const before = (a: typeof r.creation, b: typeof r.creation) =>
      height(a) < height(b) ||
      (height(a) === height(b) && a.transactionIndex <= b.transactionIndex);
    for (const a of events) {
      if (
        height(a) > height(r.finalized) ||
        (height(a) === height(r.finalized) && !same(a.hash, r.finalized.hash))
      )
        return false;
      if (!before(r.creation, a) || !before(a, r.settlement)) return false;
      for (const b of events) {
        if ((height(a) === height(b)) !== same(a.hash, b.hash)) return false;
        if (height(a) === height(b) && a.timestamp !== b.timestamp)
          return false;
        if (height(a) < height(b) && BigInt(a.timestamp) > BigInt(b.timestamp))
          return false;
        const samePosition =
          height(a) === height(b) && a.transactionIndex === b.transactionIndex;
        if (samePosition !== same(a.transactionHash, b.transactionHash))
          return false;
      }
    }
    return (
      r.kind === "ticket" ||
      same(r.creation.transactionHash, r.companyApproval.transactionHash)
    );
  }, "The financing receipts disagree about the edition or transaction history.");

export type FinancingReceiptRecord = z.infer<typeof financingReceiptRecord>;

export function financingDownloadEvidence(
  record: {
    chainId: number;
    company: Address;
    agreementId: string;
    registry: Address;
    manager: Address;
    companyApproval: { wallet: Address };
    investorSignature: { wallet: Address };
    verification: {
      finalized: { number: string; hash: string | null };
      creation: ReturnType<typeof financingReceiptReference>;
      companyApproval: ReturnType<typeof financingReceiptReference>;
      investorSignature: ReturnType<typeof financingReceiptReference>;
      settlement: ReturnType<typeof financingReceiptReference>;
    };
  },
  edition: { templateId: string; legalContractUri: string },
  roundId?: string,
): {
  includeStandaloneVerifier?: true;
  financingReceipts?: FinancingReceiptRecord;
} {
  if (
    !matchingFinancingTemplates(new Set([edition.legalContractUri])).some(
      (paper) => paper.id === edition.templateId.toLowerCase(),
    )
  )
    return {};
  const receipts = financingReceiptRecord.safeParse({
    format: "metalex-financing-receipts-v1" as const,
    ...(roundId
      ? { kind: "round" as const, roundId }
      : { kind: "ticket" as const }),
    chainId: record.chainId,
    company: record.company,
    manager: record.manager,
    registry: record.registry,
    agreementId: record.agreementId,
    templateId: edition.templateId,
    legalContractUri: edition.legalContractUri,
    officer: record.companyApproval.wallet,
    investor: record.investorSignature.wallet,
    finalized: record.verification.finalized,
    creation: record.verification.creation,
    companyApproval: record.verification.companyApproval,
    investorSignature: record.verification.investorSignature,
    settlement: record.verification.settlement,
  });
  return {
    includeStandaloneVerifier: true,
    ...(receipts.success && { financingReceipts: receipts.data }),
  };
}
