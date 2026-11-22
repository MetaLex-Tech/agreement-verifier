// Browser-safe v1 codec. The format and fixed vectors are in ../formats.
const domain = "MetaLeX/investor-field/commitment/v1";
const encoder = new TextEncoder();
const loneSurrogate = /[\uD800-\uDFFF]/u;

export type CommitmentInput = {
  chainId: string;
  contract: string;
  position: string;
  field: string;
  value: string;
};

export type CommitmentOpening = CommitmentInput & { salt: string };

export function isInvestorCommitment(
  value: unknown,
): value is `mtlxc1:${string}` {
  return typeof value === "string" && /^mtlxc1:[0-9a-f]{64}$/.test(value);
}

export function canonicalizeOpening(
  input: CommitmentOpening,
): CommitmentOpening {
  const { chainId, contract, position, field, value, salt } = input;
  if (
    typeof chainId !== "string" ||
    !/^[1-9][0-9]{0,77}$/.test(chainId) ||
    BigInt(chainId) >= 2n ** 256n
  )
    throw new Error("Expected a positive decimal chain ID within uint256.");
  if (typeof contract !== "string" || !/^0x[0-9a-fA-F]{40}$/.test(contract))
    throw new Error("Expected an EVM contract address.");
  if (typeof position !== "string" || !/^[A-Za-z0-9._:-]+$/.test(position))
    throw new Error("Invalid commitment position.");
  if (typeof field !== "string" || !field.length || loneSurrogate.test(field))
    throw new Error("Expected a nonempty field identifier with valid Unicode.");
  if (typeof value !== "string" || loneSurrogate.test(value))
    throw new Error("Expected valid Unicode text for the field value.");
  if (typeof salt !== "string" || !/^[0-9a-f]{64}$/.test(salt))
    throw new Error("Expected a 32-byte salt in lowercase hexadecimal.");
  return {
    chainId,
    contract: contract.toLowerCase(),
    position,
    field,
    value: value.trim().normalize("NFC"),
    salt,
  };
}

/** SHA-256 of a sequence of length-prefixed UTF-8 strings, as specified in v1. */
export async function hashFramedStrings(
  values: readonly string[],
): Promise<string> {
  const parts = values.map((part) => encoder.encode(part));
  const encoded = new Uint8Array(
    parts.reduce((n, part) => n + 4 + part.length, 0),
  );
  const view = new DataView(encoded.buffer);
  let offset = 0;
  for (const part of parts) {
    view.setUint32(offset, part.length, false);
    encoded.set(part, offset + 4);
    offset += 4 + part.length;
  }
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", encoded));
  return Array.from(digest, (byte) => byte.toString(16).padStart(2, "0")).join(
    "",
  );
}

export async function computeCommitment(
  input: CommitmentOpening,
): Promise<string> {
  const { chainId, contract, position, field, value, salt } =
    canonicalizeOpening(input);
  return (
    "mtlxc1:" +
    (await hashFramedStrings([
      domain,
      chainId,
      contract,
      position,
      field,
      value,
      salt,
    ]))
  );
}

export async function verifyCommitment(
  opening: CommitmentOpening,
  recorded: string,
): Promise<boolean> {
  return (await computeCommitment(opening)) === recorded;
}
