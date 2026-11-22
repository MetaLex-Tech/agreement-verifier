/**
 * The secondary-trade enums, named. Solidity emits them as bare integers, so a
 * reader that indexes a positional array silently renames every state when a
 * value is inserted into the enum; a lookup keyed by the contract's own member
 * name fails visibly instead.
 *
 * Mirrors `src/interfaces/ISecondaryTradeStorage.sol` in the cybercorps-contracts
 * repository:
 *
 *   enum OfferSide            { SELL, BUY }
 *   enum OfferStatus          { LIVE, CANCELLED, PARTIALLY_ACCEPTED, FULLY_ACCEPTED, FINALIZED }
 *   enum SecondaryEscrowStatus{ ACCEPTED, FINALIZED, VOIDED }
 *   enum HostingMode          { DIRECT, ADMINISTERED }
 *   enum ExemptionPathway     { NONE, RULE_144, SECTION_4A7, SECTION_4A1HALF, RULE_144A, REGULATION_S }
 */

export const OFFER_SIDE = { SELL: 0, BUY: 1 } as const;

export const OFFER_STATUS = {
  LIVE: 0,
  CANCELLED: 1,
  PARTIALLY_ACCEPTED: 2,
  FULLY_ACCEPTED: 3,
  FINALIZED: 4,
} as const;

export const SECONDARY_ESCROW_STATUS = {
  ACCEPTED: 0,
  FINALIZED: 1,
  VOIDED: 2,
} as const;

export const HOSTING_MODE = { DIRECT: 0, ADMINISTERED: 1 } as const;

/**
 * The exemption pathway an acceptance elects. `NONE` is the zero value and is
 * not electable: a SELL acceptance must name a real pathway, and one that is
 * not enabled on the company reverts.
 */
export const EXEMPTION_PATHWAY = {
  NONE: 0,
  RULE_144: 1,
  SECTION_4A7: 2,
  SECTION_4A1HALF: 3,
  RULE_144A: 4,
  REGULATION_S: 5,
} as const;

const EXEMPTION_PATHWAY_LABEL: Record<number, string> = {
  [EXEMPTION_PATHWAY.RULE_144]: "Rule 144",
  [EXEMPTION_PATHWAY.SECTION_4A7]: "Section 4(a)(7)",
  [EXEMPTION_PATHWAY.SECTION_4A1HALF]: "Section 4(a)(1½)",
  [EXEMPTION_PATHWAY.RULE_144A]: "Rule 144A",
  [EXEMPTION_PATHWAY.REGULATION_S]: "Regulation S",
};

export const exemptionPathwayLabel = (pathway: number): string =>
  EXEMPTION_PATHWAY_LABEL[pathway] ?? "Unknown exemption pathway";

export const isElectableExemptionPathway = (pathway: number): boolean =>
  pathway in EXEMPTION_PATHWAY_LABEL;

/** Officer-facing wording for each offer state. Keyed by the contract's own
 * member name, so an unknown integer reads as unknown rather than as whichever
 * label happens to sit at that index. */
const OFFER_STATUS_LABEL: Record<number, string> = {
  [OFFER_STATUS.LIVE]: "Live",
  [OFFER_STATUS.CANCELLED]: "Remainder cancelled",
  [OFFER_STATUS.PARTIALLY_ACCEPTED]: "Partially accepted",
  [OFFER_STATUS.FULLY_ACCEPTED]: "Fully accepted",
  [OFFER_STATUS.FINALIZED]: "Finalized (contract report)",
};

export const offerStatusLabel = (status: number): string =>
  OFFER_STATUS_LABEL[status] ?? "Unknown offer state";

export const isKnownOfferStatus = (status: number): boolean =>
  status in OFFER_STATUS_LABEL;

export const isKnownSecondaryEscrowStatus = (status: number): boolean =>
  (Object.values(SECONDARY_ESCROW_STATUS) as number[]).includes(status);

/** Where the buyer's units are delivered. An unrecognized mode is reported as
 * unknown, never silently as a direct delivery. */
export const hostingModeLabel = (
  mode: number,
  adminMultisig: string,
): string => {
  if (mode === HOSTING_MODE.DIRECT) return "Buyer wallet";
  if (mode === HOSTING_MODE.ADMINISTERED)
    return `Administered custody: ${adminMultisig}`;
  return "Unknown hosting mode";
};
