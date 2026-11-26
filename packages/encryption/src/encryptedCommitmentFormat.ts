// Zero-dependency format and envelope helpers for `mtxe1:` commitments.
export const ENCRYPTED_COMMITMENT_PREFIX = "mtxe1:" as const;
export const ENCRYPTED_OPENING_FORMAT = "mtxe1-opening-v1" as const;
export const ENCRYPTED_ROOT_KEY_BACKUP_FORMAT = "mtxe1-root-key-v1" as const;
export const MAX_ENCRYPTED_VALUE_BYTES = 4096;

export const NONCE_BYTES = 24;
export const TAG_BYTES = 32;
export const BUCKET_STEP_BYTES = 64;
export const MIN_CIPHERTEXT_BYTES = 64;
export const MAX_CIPHERTEXT_BYTES =
  Math.ceil((2 + MAX_ENCRYPTED_VALUE_BYTES) / BUCKET_STEP_BYTES) *
  BUCKET_STEP_BYTES; // 4160
export const MIN_RAW_BYTES = NONCE_BYTES + MIN_CIPHERTEXT_BYTES + TAG_BYTES; // 120
export const MAX_RAW_BYTES = NONCE_BYTES + MAX_CIPHERTEXT_BYTES + TAG_BYTES; // 4216

const BASE64URL_ALPHABET =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
const BASE64URL_LOOKUP = (() => {
  const table = new Int16Array(128).fill(-1);
  for (let i = 0; i < BASE64URL_ALPHABET.length; i++) {
    table[BASE64URL_ALPHABET.charCodeAt(i)] = i;
  }
  return table;
})();

export type EncryptedCommitmentOpening = {
  format: typeof ENCRYPTED_OPENING_FORMAT;
  entryKey: string;
  value: string;
  chainId?: string;
};

export type EncryptedCommitmentKeyOpening = {
  format: typeof ENCRYPTED_OPENING_FORMAT;
  entryKey: string;
  value?: string;
  chainId?: string;
};

export function toBase64Url(bytes: Uint8Array): string {
  let out = "";
  let i = 0;
  for (; i + 2 < bytes.length; i += 3) {
    const triple =
      ((bytes[i] ?? 0) << 16) |
      ((bytes[i + 1] ?? 0) << 8) |
      (bytes[i + 2] ?? 0);
    out +=
      BASE64URL_ALPHABET[(triple >>> 18) & 63]! +
      BASE64URL_ALPHABET[(triple >>> 12) & 63]! +
      BASE64URL_ALPHABET[(triple >>> 6) & 63]! +
      BASE64URL_ALPHABET[triple & 63]!;
  }
  const rem = bytes.length - i;
  if (rem === 1) {
    const b0 = bytes[i] ?? 0;
    out +=
      BASE64URL_ALPHABET[(b0 >>> 2) & 63]! + BASE64URL_ALPHABET[(b0 & 3) << 4]!;
  } else if (rem === 2) {
    const pair = ((bytes[i] ?? 0) << 8) | (bytes[i + 1] ?? 0);
    out +=
      BASE64URL_ALPHABET[(pair >>> 10) & 63]! +
      BASE64URL_ALPHABET[(pair >>> 4) & 63]! +
      BASE64URL_ALPHABET[(pair & 15) << 2]!;
  }
  return out;
}

export function fromCanonicalBase64Url(encoded: string): Uint8Array | null {
  if (!encoded.length || encoded.length % 4 === 1) return null;
  for (let i = 0; i < encoded.length; i++) {
    const code = encoded.charCodeAt(i);
    if (code >= 128 || BASE64URL_LOOKUP[code] === -1) return null;
  }
  const fullGroups = Math.floor(encoded.length / 4);
  const rem = encoded.length % 4;
  const outLength = fullGroups * 3 + (rem === 0 ? 0 : rem - 1);
  const out = new Uint8Array(outLength);
  let inOffset = 0;
  let outOffset = 0;
  for (let g = 0; g < fullGroups; g++) {
    const c0 = BASE64URL_LOOKUP[encoded.charCodeAt(inOffset++)]!;
    const c1 = BASE64URL_LOOKUP[encoded.charCodeAt(inOffset++)]!;
    const c2 = BASE64URL_LOOKUP[encoded.charCodeAt(inOffset++)]!;
    const c3 = BASE64URL_LOOKUP[encoded.charCodeAt(inOffset++)]!;
    const triple = (c0 << 18) | (c1 << 12) | (c2 << 6) | c3;
    out[outOffset++] = (triple >>> 16) & 0xff;
    out[outOffset++] = (triple >>> 8) & 0xff;
    out[outOffset++] = triple & 0xff;
  }
  if (rem === 2) {
    const c0 = BASE64URL_LOOKUP[encoded.charCodeAt(inOffset++)]!;
    const c1 = BASE64URL_LOOKUP[encoded.charCodeAt(inOffset++)]!;
    if ((c1 & 0x0f) !== 0) return null;
    out[outOffset++] = ((c0 << 2) | (c1 >>> 4)) & 0xff;
  } else if (rem === 3) {
    const c0 = BASE64URL_LOOKUP[encoded.charCodeAt(inOffset++)]!;
    const c1 = BASE64URL_LOOKUP[encoded.charCodeAt(inOffset++)]!;
    const c2 = BASE64URL_LOOKUP[encoded.charCodeAt(inOffset++)]!;
    if ((c2 & 0x03) !== 0) return null;
    const pair = (c0 << 10) | (c1 << 4) | (c2 >>> 2);
    out[outOffset++] = (pair >>> 8) & 0xff;
    out[outOffset++] = pair & 0xff;
  }
  return out;
}

export function parseEncryptedEnvelope(recorded: unknown): {
  nonce: Uint8Array;
  ciphertext: Uint8Array;
  tag: Uint8Array;
} | null {
  if (
    typeof recorded !== "string" ||
    !recorded.startsWith(ENCRYPTED_COMMITMENT_PREFIX)
  ) {
    return null;
  }
  const raw = fromCanonicalBase64Url(
    recorded.slice(ENCRYPTED_COMMITMENT_PREFIX.length),
  );
  if (
    !raw ||
    raw.length < MIN_RAW_BYTES ||
    raw.length > MAX_RAW_BYTES ||
    (raw.length - (NONCE_BYTES + TAG_BYTES)) % BUCKET_STEP_BYTES !== 0
  ) {
    return null;
  }
  const ciphertextEnd = raw.length - TAG_BYTES;
  return {
    nonce: raw.subarray(0, NONCE_BYTES),
    ciphertext: raw.subarray(NONCE_BYTES, ciphertextEnd),
    tag: raw.subarray(ciphertextEnd),
  };
}

export function isEncryptedCommitment(
  value: unknown,
): value is `mtxe1:${string}` {
  return parseEncryptedEnvelope(value) !== null;
}

export function isEncryptedCommitmentOpening(
  value: unknown,
): value is EncryptedCommitmentOpening {
  return (
    typeof value === "object" &&
    value !== null &&
    (value as { format?: unknown }).format === ENCRYPTED_OPENING_FORMAT &&
    typeof (value as { entryKey?: unknown }).entryKey === "string" &&
    typeof (value as { value?: unknown }).value === "string"
  );
}
