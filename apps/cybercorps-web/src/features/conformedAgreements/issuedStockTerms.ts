import { formatUnits, zeroHash } from "viem";

export function issuedStockTerms(
  allocation: {
    amount: bigint;
    paymentDecimals: number;
    paymentToken: string;
    pricePerUnit: bigint;
    timestamp: bigint;
    transactionHash: string;
  },
  certificate: {
    units: bigint;
    paid: bigint;
    tokenId: bigint;
    printer: string;
  },
  agreement: {
    agreementId: string;
    chainId: number;
    roundId: string;
    secretHash: string;
    expiry: bigint;
  },
  currency: string,
  membership = false,
  contribution = false,
) {
  const { units, paid, tokenId, printer } = certificate;
  const { paymentToken, paymentDecimals } = allocation;
  const { agreementId, chainId, roundId, secretHash, expiry } = agreement;
  if (
    !Number.isInteger(paymentDecimals) ||
    paymentDecimals < 0 ||
    paymentDecimals > 255
  )
    throw Error("The payment token precision is invalid.");
  const settled =
    paymentDecimals <= 18
      ? paid / 10n ** BigInt(18 - paymentDecimals)
      : paid * 10n ** BigInt(paymentDecimals - 18);
  if (
    units <= 0n ||
    allocation.pricePerUnit <= 0n ||
    (units * allocation.pricePerUnit) / 10n ** 18n !== paid ||
    settled !== allocation.amount
  )
    throw Error(
      "The issued shares, round price and settlement amount do not agree.",
    );
  const adoptionLimits = [
    secretHash === zeroHash
      ? "The agreement required no signing secret."
      : `Signing required a secret whose registered hash is ${secretHash}.`,
    !expiry
      ? "The agreement set no expiry."
      : `The signing and finalization deadline was ${expiry <= 8640000000000n ? new Date(Number(expiry) * 1000).toISOString() : "Unix time " + expiry}.`,
  ].join(" ");
  const quantity = formatUnits(units, 18);
  const noun = membership ? "units" : "shares";
  return {
    quantity,
    adoptionLimits,
    consideration: contribution
      ? `The original certificate records a contribution of ${formatUnits(paid, 18)} ${currency} before rounding. The allocation applied ${formatUnits(allocation.amount, paymentDecimals)} ${currency}.`
      : `The issued ${noun} represent an aggregate purchase price of ${formatUnits(paid, 18)} ${currency}. The allocation settled ${formatUnits(allocation.amount, paymentDecimals)} ${currency} after rounding to the payment token’s precision.`,
    identification: `Agreement ${agreementId} on chain ${chainId}. The Company issued ${quantity} ${noun} in certificate ${tokenId} at ${printer} for round ${roundId}. The round price was ${formatUnits(allocation.pricePerUnit, 18)} ${currency} per ${membership ? "unit" : "share"}. The allocation settled ${formatUnits(allocation.amount, paymentDecimals)} ${currency} at ${paymentToken} on ${new Date(Number(allocation.timestamp) * 1000).toISOString()} in transaction ${allocation.transactionHash}.`,
  };
}
