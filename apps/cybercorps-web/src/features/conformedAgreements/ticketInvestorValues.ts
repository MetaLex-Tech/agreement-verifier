import { isAnyInvestorCommitment } from "@metalex-web/encryption/commitment";
import { isPrivateAgreementValue } from "../deals/helpers/templateFieldEncoding";

export const ticketPaymentVisibility =
  "The signing wallets are public onchain. Anyone can see the sending address, receiving address and amount of each payment.";

export const unreadableDescriptions = [
  "the investor using the signing wallet",
  "an address this copy cannot display",
  "the notice address recorded in the offer",
  "unavailable in this copy",
  "unavailable in this copy",
];

export function readableTicketInvestor(
  wire: readonly string[],
  opened: readonly string[],
  externalPreset: boolean,
) {
  if (wire.length !== 5 || opened.length !== wire.length)
    throw Error("The investor’s recorded details changed.");
  return wire.map((value, i) => {
    const text = opened[i]!;
    if (!isPrivateAgreementValue(value)) {
      if (text !== value)
        throw Error("The investor’s recorded details changed.");
      return value;
    }
    if (externalPreset && value === text) return unreadableDescriptions[i]!;
    if (i === 4 && text === "" && opened[3] === "Natural person") return "";
    if (!text.trim() || isPrivateAgreementValue(text))
      throw Error("The investor’s private details could not be verified.");
    return isAnyInvestorCommitment(value) ? text.trim().normalize("NFC") : text;
  });
}

export function ticketCopyIdentification(
  settlement: { timestamp: bigint; transactionHash: string },
  conditions: readonly string[],
  external: boolean,
  missing: boolean,
  investorNameUnknown: boolean,
) {
  return [
    `The offer settled on ${new Date(Number(settlement.timestamp) * 1000).toISOString()} in transaction ${settlement.transactionHash}.`,
    conditions.length &&
      "The offer specified the conditions at " + conditions.join(", ") + ".",
    external && ticketPaymentVisibility,
    missing &&
      "Some party details recorded in the external offer could not be opened for this copy.",
    investorNameUnknown &&
      "The Investor’s signature block identifies the wallet that signed.",
  ]
    .filter(Boolean)
    .join(" ");
}
