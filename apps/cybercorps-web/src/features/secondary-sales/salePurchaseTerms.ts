import { formatUnits } from "viem";
import { readNamedBuyerMetadata } from "./namedBuyer";
import type { OnchainOffer, OnchainQuote } from "./onchainSales";
import { exemptionPathwayLabel } from "./secondaryTradeEnums";

type PurchaseOffer = Pick<
  OnchainOffer["offer"],
  | "globalValues"
  | "spvAddress"
  | "offeror"
  | "paymentToken"
  | "certPrinter"
  | "tokenId"
  | "validUntil"
  | "counterpartyRestrictions"
>;
export function salePurchaseTerms(
  sale: Pick<OnchainOffer, "target" | "decimals"> & { offer: PurchaseOffer },
  fill: Pick<
    OnchainQuote,
    "buyer" | "units" | "payment" | "agreementId" | "pathway"
  >,
  window: bigint,
  sellerValues: readonly (string | null)[],
  buyerValues: readonly string[],
) {
  return {
    globals: sale.offer.globalValues,
    issuerWallet: sale.offer.spvAddress,
    purchaser: {
      wallet: fill.buyer,
      values: buyerValues,
    },
    seller: {
      wallet: sale.offer.offeror,
      values: sellerValues,
    },
    units: formatUnits(fill.units, 18),
    payment: formatUnits(fill.payment, sale.decimals),
    paymentToken: sale.offer.paymentToken,
    printer: sale.offer.certPrinter,
    tokenId: String(sale.offer.tokenId),
    manager: sale.target.manager,
    offerId: sale.target.offerId,
    chainId: sale.target.chainId,
    agreementId: fill.agreementId,
    expires: offerExpiry(sale.offer.validUntil),
    settlementWindowSeconds: String(window),
    pathway: exemptionPathwayLabel(fill.pathway),
    namedBuyer: readNamedBuyerMetadata(sale.offer.counterpartyRestrictions),
  };
}

export function offerExpiry(expiry: bigint) {
  return expiry < 0n || expiry > 8640000000000n
    ? `Unix time ${expiry}`
    : new Date(Number(expiry) * 1000)
        .toISOString()
        .replace("T", " ")
        .replace(".000Z", " UTC");
}

export function saleSignatureName(row: readonly string[]) {
  if (!row[2]?.trim())
    throw new Error("The signer's recorded name is unavailable.");
  return !row[3] || row[3] === "Individual capacity"
    ? row[2]
    : `${row[2]}, ${row[3]}`;
}
