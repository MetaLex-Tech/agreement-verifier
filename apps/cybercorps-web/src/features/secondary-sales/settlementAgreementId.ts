import {
  type Address,
  encodeAbiParameters,
  encodePacked,
  type Hex,
  keccak256,
  zeroHash,
} from "viem";

/**
 * The settlement agreement id an acceptance of this offer would create.
 *
 * This is the id the company's approver approves, and approving it is the only
 * thing that restricts who may accept an offer. The buyer's address is one of
 * the hashed parties, so a different buyer derives a different id and their
 * acceptance is refused with nothing left behind. Everything the restriction
 * is worth therefore rests on deriving exactly the id the contracts will.
 *
 * Two hashes, both from pinned commit `d0d488e6f5a45bc096604caab1aa518186cc9d06`:
 *
 *   SecondaryTradeStorage._acceptOffer
 *     settlementSalt = keccak256(abi.encodePacked(offer.salt, offer.settlementAgreementIds.length))
 *
 *   CyberAgreementRegistry.createContract
 *     contractId = keccak256(abi.encode(templateId, salt, globalValues, parties, secretHash, finalizer))
 *
 * with `parties = [offer.offeror, acceptor]`, `secretHash = bytes32(0)` and
 * `finalizer = address(dealManager)` as `_acceptOffer` passes them. Note what
 * is NOT in the preimage: party values, expiry, units, consideration, hosting
 * mode and custodian are all absent. That is not an omission here — it is the
 * §9.2 verdict's central finding, and it is why an approved id restricts WHO
 * accepts and never WHAT they accept.
 *
 * `abi.encodePacked` of two uint256 is plain concatenation, so the packed
 * encoding is unambiguous and no length prefix is involved.
 */

/** The offer fields the derivation reads, as `getOffer` serves them. */
export type SettlementIdOffer = {
  offeror: Address;
  templateId: Hex;
  salt: bigint;
  globalValues: readonly string[];
  /** Appended at each acceptance; its length is the push-only nonce. */
  settlementAgreementIds: readonly Hex[];
};

/**
 * The salt one acceptance would use. Split out because the count is the whole
 * source of per-acceptance uniqueness: it only ever grows — a void decrements
 * `unitsAccepted` but never shortens the array — so an id derived at a stale
 * count can never match again, and an approval recorded against it is dead.
 */
export function settlementSalt(
  offerSalt: bigint,
  acceptanceCount: bigint,
): Hex {
  return keccak256(
    encodePacked(["uint256", "uint256"], [offerSalt, acceptanceCount]),
  );
}

export function predictSettlementAgreementId(input: {
  offer: SettlementIdOffer;
  /** The buyer whose acceptance is being predicted. */
  acceptor: Address;
  /** The deal manager, which `_acceptOffer` passes as the finalizer. */
  dealManager: Address;
  /**
   * The acceptance count to derive at. Defaults to the offer's current count,
   * and is passed explicitly when a caller has re-read it and wants the id for
   * that exact count rather than for whatever the struct it holds says.
   */
  acceptanceCount?: bigint;
}): Hex {
  const { offer, acceptor, dealManager } = input;
  const count =
    input.acceptanceCount ?? BigInt(offer.settlementAgreementIds.length);
  const salt = settlementSalt(offer.salt, count);
  return keccak256(
    encodeAbiParameters(
      [
        { type: "bytes32" },
        { type: "uint256" },
        { type: "string[]" },
        { type: "address[]" },
        { type: "bytes32" },
        { type: "address" },
      ],
      [
        offer.templateId,
        BigInt(salt),
        [...offer.globalValues],
        [offer.offeror, acceptor],
        zeroHash,
        dealManager,
      ],
    ),
  );
}

/**
 * The offer id this posting would create.
 *
 * `_postOffer` derives it deterministically from the seller, the template and
 * the seller's own salt, so it is known BEFORE the offer is posted. That
 * matters for one check in particular: a blanket approval already standing on
 * this id would make the offer open to anyone the moment it exists, and the
 * seller is entitled to learn that before they sign rather than afterwards.
 *
 *   SecondaryTradeStorage._postOffer
 *     offerId = keccak256(abi.encode(offeror, params.templateId, params.salt))
 *
 * The same three inputs always produce the same id, which is also why posting
 * twice with one salt reverts as an existing offer rather than creating a
 * second one.
 */
export function predictOfferId(input: {
  offeror: Address;
  templateId: Hex;
  salt: bigint;
}): Hex {
  return keccak256(
    encodeAbiParameters(
      [{ type: "address" }, { type: "bytes32" }, { type: "uint256" }],
      [input.offeror, input.templateId, input.salt],
    ),
  );
}
