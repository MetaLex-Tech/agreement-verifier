// Browser-safe encrypted commitment v1 codec. Format and fixed vectors are in ../formats.
import { keccak256 } from "viem";
import {
  BUCKET_STEP_BYTES,
  ENCRYPTED_COMMITMENT_PREFIX,
  ENCRYPTED_OPENING_FORMAT,
  ENCRYPTED_ROOT_KEY_BACKUP_FORMAT,
  type EncryptedCommitmentKeyOpening,
  type EncryptedCommitmentOpening,
  isEncryptedCommitment,
  isEncryptedCommitmentOpening,
  MAX_ENCRYPTED_VALUE_BYTES,
  MIN_CIPHERTEXT_BYTES,
  NONCE_BYTES,
  parseEncryptedEnvelope as parseEnvelope,
  TAG_BYTES,
  toBase64Url,
} from "./encryptedCommitmentFormat";

export {
  ENCRYPTED_COMMITMENT_PREFIX,
  ENCRYPTED_OPENING_FORMAT,
  ENCRYPTED_ROOT_KEY_BACKUP_FORMAT,
  type EncryptedCommitmentKeyOpening,
  type EncryptedCommitmentOpening,
  isEncryptedCommitment,
  isEncryptedCommitmentOpening,
  MAX_ENCRYPTED_VALUE_BYTES,
};

const encoder = new TextEncoder();
const fatalUtf8Decoder = new TextDecoder("utf-8", { fatal: true });
const loneSurrogate = /[\uD800-\uDFFF]/u;

const STREAM_DOMAIN = encoder.encode("MetaLeX/mtxe1/stream/v1");
const COMMIT_DOMAIN = encoder.encode("MetaLeX/mtxe1/commit/v1");
const COMPANY_KDF_DOMAIN = encoder.encode("MetaLeX/mtxe1/kdf/company/v1");
const SALE_KDF_DOMAIN = encoder.encode("MetaLeX/mtxe1/kdf/sale/v1");
const ROOT_KEY_FINGERPRINT_DOMAIN = encoder.encode(
  "MetaLeX/mtxe1/root-key-fingerprint/v1",
);

export type EncryptedCommitmentScope =
  | {
      kind: "company";
      chainId: string;
      company: string;
    }
  | {
      kind: "sale";
      chainId: string;
      tradeContract: string;
      offerId: string;
    };

function bucketByteLength(utf8Length: number): number {
  return Math.max(
    MIN_CIPHERTEXT_BYTES,
    Math.ceil((2 + utf8Length) / BUCKET_STEP_BYTES) * BUCKET_STEP_BYTES,
  );
}

function decodeHexFixed(
  hex: string,
  byteLength: number,
  label: string,
): Uint8Array {
  if (
    typeof hex !== "string" ||
    hex.length !== byteLength * 2 ||
    !/^[0-9a-f]+$/.test(hex)
  ) {
    throw new Error(
      `Expected a ${byteLength}-byte ${label} in lowercase hexadecimal.`,
    );
  }
  const out = new Uint8Array(byteLength);
  for (let i = 0; i < byteLength; i++) {
    out[i] = Number.parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }
  return out;
}

function bytesToHex(bytes: Uint8Array): string {
  let out = "";
  for (let i = 0; i < bytes.length; i++) {
    out += (bytes[i] ?? 0).toString(16).padStart(2, "0");
  }
  return out;
}

function assertPositiveChainId(chainId: unknown): string {
  if (
    typeof chainId !== "string" ||
    !/^[1-9][0-9]{0,77}$/.test(chainId) ||
    BigInt(chainId) >= 2n ** 256n
  ) {
    throw new Error("Expected a positive decimal chain ID within uint256.");
  }
  return chainId;
}

function assertNonnegativeUint256(value: unknown, label: string): string {
  if (
    typeof value !== "string" ||
    !/^(0|[1-9][0-9]{0,77})$/.test(value) ||
    BigInt(value) >= 2n ** 256n
  ) {
    throw new Error(`Expected a canonical decimal ${label} within uint256.`);
  }
  return value;
}

function assertEvmAddress(address: unknown, label: string): string {
  if (typeof address !== "string" || !/^0x[0-9a-fA-F]{40}$/.test(address)) {
    throw new Error(`Expected an EVM ${label} address.`);
  }
  return address.toLowerCase();
}

function keccakFramed(parts: readonly Uint8Array[]): Uint8Array {
  const total = parts.reduce((sum, part) => sum + 4 + part.length, 0);
  const framed = new Uint8Array(total);
  const view = new DataView(framed.buffer);
  let offset = 0;
  for (const part of parts) {
    view.setUint32(offset, part.length, false);
    framed.set(part, offset + 4);
    offset += 4 + part.length;
  }
  const digest = keccak256(framed, "bytes");
  framed.fill(0);
  return digest;
}

function computeKeystream(
  entryKey: Uint8Array,
  nonce: Uint8Array,
  byteLength: number,
): Uint8Array {
  const stream = new Uint8Array(byteLength);
  const scratch = new Uint8Array(STREAM_DOMAIN.length + 32 + NONCE_BYTES + 4);
  scratch.set(STREAM_DOMAIN, 0);
  scratch.set(entryKey, STREAM_DOMAIN.length);
  scratch.set(nonce, STREAM_DOMAIN.length + 32);
  const view = new DataView(scratch.buffer);
  const counterOffset = STREAM_DOMAIN.length + 32 + NONCE_BYTES;
  const words = byteLength / 32;
  for (let word = 0; word < words; word++) {
    view.setUint32(counterOffset, word, false);
    stream.set(keccak256(scratch, "bytes"), word * 32);
  }
  scratch.fill(0);
  return stream;
}

function computeCommitTag(
  entryKey: Uint8Array,
  nonce: Uint8Array,
  ciphertext: Uint8Array,
): Uint8Array {
  const preimage = new Uint8Array(
    COMMIT_DOMAIN.length + 32 + NONCE_BYTES + 4 + ciphertext.length,
  );
  preimage.set(COMMIT_DOMAIN, 0);
  preimage.set(entryKey, COMMIT_DOMAIN.length);
  preimage.set(nonce, COMMIT_DOMAIN.length + 32);
  const lengthOffset = COMMIT_DOMAIN.length + 32 + NONCE_BYTES;
  new DataView(preimage.buffer).setUint32(
    lengthOffset,
    ciphertext.length,
    false,
  );
  preimage.set(ciphertext, lengthOffset + 4);
  const tag = keccak256(preimage, "bytes");
  preimage.fill(0);
  return tag;
}

export function canonicalizeEncryptedValue(value: string): string {
  if (typeof value !== "string" || loneSurrogate.test(value)) {
    throw new Error("Expected valid Unicode text for the field value.");
  }
  const canonical = value.trim().normalize("NFC");
  const utf8Length = encoder.encode(canonical).length;
  if (utf8Length > MAX_ENCRYPTED_VALUE_BYTES) {
    throw new Error(
      `Field value exceeds ${MAX_ENCRYPTED_VALUE_BYTES} UTF-8 bytes.`,
    );
  }
  return canonical;
}

export function canonicalizeScope(
  scope: EncryptedCommitmentScope,
): EncryptedCommitmentScope {
  if (!scope || typeof scope !== "object" || Array.isArray(scope)) {
    throw new Error("Expected an encrypted commitment scope object.");
  }
  if (scope.kind === "company") {
    const keys = Object.keys(scope);
    if (
      keys.length !== 3 ||
      !keys.every((k) => k === "kind" || k === "chainId" || k === "company")
    ) {
      throw new Error("Unexpected properties in company scope.");
    }
    return {
      kind: "company",
      chainId: assertPositiveChainId(scope.chainId),
      company: assertEvmAddress(scope.company, "company"),
    };
  }
  if (scope.kind === "sale") {
    const keys = Object.keys(scope);
    if (
      keys.length !== 4 ||
      !keys.every(
        (k) =>
          k === "kind" ||
          k === "chainId" ||
          k === "tradeContract" ||
          k === "offerId",
      )
    ) {
      throw new Error("Unexpected properties in sale scope.");
    }
    return {
      kind: "sale",
      chainId: assertPositiveChainId(scope.chainId),
      tradeContract: assertEvmAddress(scope.tradeContract, "trade contract"),
      offerId: assertNonnegativeUint256(scope.offerId, "offer ID"),
    };
  }
  throw new Error("Unsupported encrypted commitment scope kind.");
}

export function canonicalizeEncryptedKeyOpening(
  input: unknown,
): EncryptedCommitmentKeyOpening {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("Expected an encrypted commitment opening object.");
  }
  const record = input as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (
      key !== "format" &&
      key !== "entryKey" &&
      key !== "value" &&
      key !== "chainId"
    ) {
      throw new Error(`Unexpected opening property: ${key}.`);
    }
  }
  if (record.format !== ENCRYPTED_OPENING_FORMAT) {
    throw new Error(`Expected opening format ${ENCRYPTED_OPENING_FORMAT}.`);
  }
  decodeHexFixed(record.entryKey as string, 32, "entry key");
  const out: EncryptedCommitmentKeyOpening = {
    format: ENCRYPTED_OPENING_FORMAT,
    entryKey: record.entryKey as string,
  };
  if (record.value !== undefined) {
    if (typeof record.value !== "string") {
      throw new Error("Expected valid Unicode text for the field value.");
    }
    out.value = canonicalizeEncryptedValue(record.value);
  }
  if (record.chainId !== undefined) {
    out.chainId = assertPositiveChainId(record.chainId);
  }
  return out;
}

export function canonicalizeEncryptedOpening(
  input: unknown,
): EncryptedCommitmentOpening {
  const base = canonicalizeEncryptedKeyOpening(input);
  if (base.value === undefined) {
    throw new Error("Expected valid Unicode text for the field value.");
  }
  return {
    format: ENCRYPTED_OPENING_FORMAT,
    entryKey: base.entryKey,
    value: base.value,
    ...(base.chainId !== undefined ? { chainId: base.chainId } : {}),
  };
}

export function deriveEncryptedEntryKey(
  rootKeyHex: string,
  scope: EncryptedCommitmentScope,
  nonceHex: string,
): string {
  const rootKey = decodeHexFixed(rootKeyHex, 64, "root key");
  const nonce = decodeHexFixed(nonceHex, NONCE_BYTES, "nonce");
  const canonical = canonicalizeScope(scope);
  try {
    const derived =
      canonical.kind === "company"
        ? keccakFramed([
            COMPANY_KDF_DOMAIN,
            rootKey,
            encoder.encode(canonical.chainId),
            encoder.encode(canonical.company),
            nonce,
          ])
        : keccakFramed([
            SALE_KDF_DOMAIN,
            rootKey,
            encoder.encode(canonical.chainId),
            encoder.encode(canonical.tradeContract),
            encoder.encode(canonical.offerId),
            nonce,
          ]);
    const hex = bytesToHex(derived);
    derived.fill(0);
    return hex;
  } finally {
    rootKey.fill(0);
  }
}

export function encryptWithEntryKey(
  entryKeyHex: string,
  nonceHex: string,
  value: string,
): `mtxe1:${string}` {
  const entryKey = decodeHexFixed(entryKeyHex, 32, "entry key");
  const nonce = decodeHexFixed(nonceHex, NONCE_BYTES, "nonce");
  const canonical = canonicalizeEncryptedValue(value);
  const utf8 = encoder.encode(canonical);
  const bucketBytes = bucketByteLength(utf8.length);
  const padded = new Uint8Array(bucketBytes);
  new DataView(padded.buffer).setUint16(0, utf8.length, false);
  padded.set(utf8, 2);

  try {
    const stream = computeKeystream(entryKey, nonce, bucketBytes);
    const ciphertext = new Uint8Array(bucketBytes);
    for (let i = 0; i < bucketBytes; i++) {
      ciphertext[i] = (padded[i] ?? 0) ^ (stream[i] ?? 0);
    }
    stream.fill(0);
    padded.fill(0);

    const tag = computeCommitTag(entryKey, nonce, ciphertext);
    const raw = new Uint8Array(NONCE_BYTES + bucketBytes + TAG_BYTES);
    raw.set(nonce, 0);
    raw.set(ciphertext, NONCE_BYTES);
    raw.set(tag, NONCE_BYTES + bucketBytes);
    return `${ENCRYPTED_COMMITMENT_PREFIX}${toBase64Url(raw)}`;
  } finally {
    entryKey.fill(0);
    padded.fill(0);
  }
}

export function decryptWithEntryKey(
  entryKeyHex: string,
  recorded: string,
): string {
  const entryKey = decodeHexFixed(entryKeyHex, 32, "entry key");
  const parsed = parseEnvelope(recorded);
  if (!parsed) {
    entryKey.fill(0);
    throw new Error("Expected a canonical mtxe1 encrypted commitment.");
  }
  const { nonce, ciphertext, tag } = parsed;
  try {
    const expectedTag = computeCommitTag(entryKey, nonce, ciphertext);
    let tagDiff = 0;
    for (let i = 0; i < TAG_BYTES; i++) {
      tagDiff |= (tag[i] ?? 0) ^ (expectedTag[i] ?? 0);
    }
    expectedTag.fill(0);
    if (tagDiff !== 0) {
      throw new Error("Encrypted commitment authentication failed.");
    }

    const stream = computeKeystream(entryKey, nonce, ciphertext.length);
    const padded = new Uint8Array(ciphertext.length);
    for (let i = 0; i < ciphertext.length; i++) {
      padded[i] = (ciphertext[i] ?? 0) ^ (stream[i] ?? 0);
    }
    stream.fill(0);

    const utf8Length = new DataView(
      padded.buffer,
      padded.byteOffset,
      padded.byteLength,
    ).getUint16(0, false);
    if (
      utf8Length > MAX_ENCRYPTED_VALUE_BYTES ||
      2 + utf8Length > padded.length ||
      bucketByteLength(utf8Length) !== padded.length
    ) {
      padded.fill(0);
      throw new Error("Invalid encrypted commitment padding.");
    }

    let padDiff = 0;
    for (let i = 2 + utf8Length; i < padded.length; i++) {
      padDiff |= padded[i] ?? 0;
    }
    if (padDiff !== 0) {
      padded.fill(0);
      throw new Error("Invalid encrypted commitment padding.");
    }

    let text: string;
    try {
      text = fatalUtf8Decoder.decode(padded.subarray(2, 2 + utf8Length));
    } catch {
      padded.fill(0);
      throw new Error("Invalid UTF-8 in encrypted commitment.");
    }
    padded.fill(0);

    if (loneSurrogate.test(text) || text !== text.trim().normalize("NFC")) {
      throw new Error("Non-canonical plaintext in encrypted commitment.");
    }
    return text;
  } finally {
    entryKey.fill(0);
  }
}

export function extractEncryptedCommitmentNonce(recorded: string): string {
  const parsed = parseEnvelope(recorded);
  if (!parsed) {
    throw new Error("Expected a canonical mtxe1 encrypted commitment.");
  }
  return bytesToHex(parsed.nonce);
}

export function decryptEncryptedCommitment(
  rootKeyHex: string,
  scope: EncryptedCommitmentScope,
  recorded: string,
): { value: string; entryKey: string; nonce: string } {
  const nonce = extractEncryptedCommitmentNonce(recorded);
  const entryKey = deriveEncryptedEntryKey(rootKeyHex, scope, nonce);
  const value = decryptWithEntryKey(entryKey, recorded);
  return { value, entryKey, nonce };
}

export function verifyEncryptedOpening(
  opening: EncryptedCommitmentOpening,
  recorded: string,
): boolean {
  const canonical = canonicalizeEncryptedOpening(opening);
  if (!isEncryptedCommitment(recorded)) return false;
  try {
    return (
      decryptWithEntryKey(canonical.entryKey, recorded) === canonical.value
    );
  } catch {
    return false;
  }
}

export type EncryptedRootKeyBackup = {
  format: typeof ENCRYPTED_ROOT_KEY_BACKUP_FORMAT;
  scope: EncryptedCommitmentScope;
  rootKey: string;
};

export function canonicalizeEncryptedRootKeyBackup(
  input: unknown,
): EncryptedRootKeyBackup {
  if (!input || typeof input !== "object" || Array.isArray(input)) {
    throw new Error("Expected an encrypted commitment root key backup object.");
  }
  const record = input as Record<string, unknown>;
  for (const key of Object.keys(record)) {
    if (key !== "format" && key !== "scope" && key !== "rootKey") {
      throw new Error(`Unexpected root key backup property: ${key}.`);
    }
  }
  if (record.format !== ENCRYPTED_ROOT_KEY_BACKUP_FORMAT) {
    throw new Error(
      `Expected backup format ${ENCRYPTED_ROOT_KEY_BACKUP_FORMAT}.`,
    );
  }
  const scope = canonicalizeScope(record.scope as EncryptedCommitmentScope);
  decodeHexFixed(record.rootKey as string, 64, "root key");
  return {
    format: ENCRYPTED_ROOT_KEY_BACKUP_FORMAT,
    scope,
    rootKey: record.rootKey as string,
  };
}

/** Non-reversible 16-hex identifier for comparing a saved backup against an active root key. */
export function computeEncryptedRootKeyFingerprint(rootKeyHex: string): string {
  const rootKey = decodeHexFixed(rootKeyHex, 64, "root key");
  try {
    const digest = keccakFramed([ROOT_KEY_FINGERPRINT_DOMAIN, rootKey]);
    const hex = bytesToHex(digest.subarray(0, 8));
    digest.fill(0);
    return hex;
  } finally {
    rootKey.fill(0);
  }
}
