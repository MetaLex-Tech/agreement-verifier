import { isAddressEqual, sha256, toBytes } from "viem";
import type { output } from "zod";
import type { stockReadingProof } from "../../apps/cybercorps-web/src/features/conformedAgreements/stockRoundReading";
import type { stockTicketProof } from "../../apps/cybercorps-web/src/features/conformedAgreements/stockTicketReading";
import type { saleReadingProof } from "../../apps/cybercorps-web/src/features/secondary-sales/standardSaleProof";
import { isAnyInvestorCommitment } from "../../packages/encryption/src/commitment";
import { ENCRYPTION_PREFIX } from "../../packages/encryption/src/constants";
import {
  type Agreement,
  confirmSnapshot,
  readAgreement,
  recordedSnapshot,
  type Snapshot,
} from "./registry";

type Sale = output<typeof saleReadingProof>["evidence"];
type Stock = output<
  typeof stockReadingProof | typeof stockTicketProof
>["evidence"];
export type ReadingEvidence = Sale | Stock;
type Field = Sale["seller"]["fields"][number] | Stock["companyRow"][number];

function matchesField(wire: string, field: Field) {
  if ("ciphertextSha256" in field)
    return (
      wire.startsWith(ENCRYPTION_PREFIX) &&
      sha256(toBytes(wire)) === field.ciphertextSha256
    );
  if ("commitment" in field) return wire === field.commitment;
  if ("wire" in field) return wire === field.wire;
  return (
    !wire.startsWith(ENCRYPTION_PREFIX) &&
    !wire.startsWith("mfpii_") &&
    !isAnyInvestorCommitment(wire) &&
    wire === field.value
  );
}

function sameStrings(actual: readonly string[], expected: readonly string[]) {
  return (
    actual.length === expected.length &&
    actual.every((v, i) => v === expected[i])
  );
}

export function matchesRegisteredTerms(
  record: Agreement | null,
  evidence: ReadingEvidence,
) {
  if (
    record?.status !== "Finalized" ||
    record.parties.length !== 2 ||
    record.rows.length !== 2 ||
    record.signed.length !== 2 ||
    record.signed.some((time) => time <= 0n)
  )
    return false;
  const sale = evidence.renderer === "standard-secondary-sale-v1";
  const template = sale ? evidence.edition : evidence.receipts;
  const wallets = sale
    ? [evidence.seller.wallet, evidence.purchaser.wallet]
    : [evidence.receipts.officer, evidence.receipts.investor];
  const rows = sale
    ? [evidence.seller.fields, evidence.purchaser.fields]
    : [evidence.companyRow, evidence.investorRow];
  // A round officer approved terms before investors were known. That date is on the round receipt.
  const signed = sale
    ? [evidence.accepted.timestamp, evidence.accepted.timestamp]
    : [
        evidence.receipts.kind === "ticket"
          ? evidence.receipts.companyApproval.timestamp
          : undefined,
        evidence.receipts.investorSignature.timestamp,
      ];
  return (
    record.id ===
      (sale ? evidence.agreementId : evidence.receipts.agreementId) &&
    record.template === template.templateId &&
    record.uri === template.legalContractUri &&
    sameStrings(record.globals, evidence.edition.globalFields) &&
    sameStrings(record.fields, evidence.edition.partyFields) &&
    sameStrings(record.values, evidence.globals) &&
    wallets.every((wallet, i) => isAddressEqual(record.parties[i]!, wallet)) &&
    signed.every(
      (time, i) => time === undefined || BigInt(time) === record.signed[i],
    ) &&
    rows.every((row, i) => {
      const actual = record.rows[i]!;
      return (
        actual.length === row.length &&
        row.every((field, j) => matchesField(actual[j]!, field))
      );
    })
  );
}

export async function confirmRegisteredTerms(
  latest: Snapshot,
  evidence: ReadingEvidence,
) {
  const reference =
    evidence.renderer === "standard-secondary-sale-v1"
      ? evidence
      : evidence.receipts;
  const snapshot = await recordedSnapshot(latest, reference);
  const record = await readAgreement(snapshot, reference.agreementId);
  if (!record)
    throw Error(
      "This agreement was absent from the registry at the recorded block.",
    );
  if (record.status !== "Finalized")
    throw Error(
      "The agreement’s status at the recorded block was “" +
        record.status +
        "”.",
    );
  if (!matchesRegisteredTerms(record, evidence))
    throw Error(
      "The registered agreement or its recorded terms differ from this copy.",
    );
  await confirmSnapshot(snapshot);
  if (snapshot !== latest) await confirmSnapshot(latest);
}
