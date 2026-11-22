import { type Address, formatUnits, isAddressEqual, zeroAddress } from "viem";

type Asset = { amount: bigint; tokenAddress: Address; tokenId: bigint };
export function describeEscrowConsideration(
  payments: readonly (Asset & {
    tokenType: number;
    isFee: boolean;
    knownUsdc: boolean;
    decimals: number | null;
  })[],
  otherAssets: readonly Asset[],
  expiry: bigint,
  phase: "pending" | "settled",
) {
  const request =
    phase === "settled" ? "The agreement required" : "The escrow requests";
  const amounts = payments.map((asset) => {
    const fee =
      asset.isFee && asset.tokenType === 0
        ? " The manager deducts any applicable fee from this payment."
        : "";
    if (asset.tokenType !== 0)
      return `${request} ${asset.amount} of token ${asset.tokenId} at ${asset.tokenAddress} as consideration.${fee}`;
    if (asset.amount === 0n || isAddressEqual(asset.tokenAddress, zeroAddress))
      return `The escrow records ${asset.amount} base units at ${asset.tokenAddress} as consideration.${fee}`;
    const amount =
      asset.decimals === null
        ? `${asset.amount} base units`
        : formatUnits(asset.amount, asset.decimals);
    return `${request} ${amount}${asset.knownUsdc ? " USDC" : ""} at ${asset.tokenAddress} as consideration.${fee}`;
  });
  return [
    ...otherAssets.map(
      (asset) =>
        `The Company also offers ${asset.amount} base units of token ${asset.tokenId} at ${asset.tokenAddress}.`,
    ),
    amounts.length
      ? amounts.join(" ")
      : phase === "settled"
        ? "The agreement required no payment from the Investor."
        : "The escrow requires no payment from the Investor.",
    ticketSettlementDeadline(expiry, phase),
  ].join(" ");
}
export function ticketSettlementDeadline(
  expiry: bigint,
  phase: "pending" | "settled" = "pending",
) {
  if (expiry === 0n)
    return phase === "settled"
      ? "The agreement had no settlement deadline."
      : "The escrow has no settlement deadline.";
  const calendar = expiry <= 8640000000000n;
  const date = calendar
    ? new Date(Number(expiry) * 1000).toISOString()
    : "Unix time " + expiry;
  return phase === "settled"
    ? `The settlement deadline was ${date}.`
    : `The escrow expires ${calendar ? "on" : "at"} ${date}.`;
}

export function recordedTicketOfficerTitle(
  officer: string,
  certificates: readonly {
    signingOfficerName: string;
    signingOfficerTitle: string;
  }[],
) {
  const title = certificates[0]?.signingOfficerTitle;
  return title &&
    certificates.every(
      (c) =>
        c.signingOfficerName === officer && c.signingOfficerTitle === title,
    )
    ? title
    : "";
}
