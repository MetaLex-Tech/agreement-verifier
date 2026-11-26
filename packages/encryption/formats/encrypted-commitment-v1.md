# Encrypted investor field commitment v1

An onchain encrypted commitment string has the prefix `mtxe1:` followed by canonical unpadded `base64url` characters (`A-Z`, `a-z`, `0-9`, `-`, `_`). The underlying primitive is Ethereum Keccak-256 (`0x01` domain-padded `Keccak-f[1600]`, capacity 512 bits). The recorded string carries a 24-byte random nonce, a 64-byte-bucketed ciphertext and a 32-byte key-committing authentication tag.

An authorized holder of the 64-byte scope root key recovers the plaintext directly from the onchain string and scope identifier without an offchain preimage table or slot-matching lookup. To disclose a single field to an investor, counterparty or auditor without exposing the scope root key, export its derived 32-byte `entryKey` in an `mtxe1-opening-v1` JSON object. Download [the standalone verifier](verifier.html) to decrypt or verify a recorded `mtxe1:` string offline against its [fixed test vectors](encrypted-commitment-v1-vectors.json).

## Binary layout and canonical `base64url`

Strip the six-byte ASCII prefix `mtxe1:` and decode the remaining string as unpadded RFC 4648 §5 `base64url`:

1. Reject any character outside `[A-Za-z0-9_-]`, including `=`, `+`, `/` and whitespace.
2. Reject if the `base64url` character count is congruent to `1` modulo `4`.
3. Reject non-canonical trailing bits: re-encoding the decoded byte array to unpadded `base64url` must reproduce the input `base64url` substring byte for byte.
4. Let `raw` be the decoded byte array. Require `raw.length >= 120`, `raw.length <= 4216` and `(raw.length - 56) % 64 === 0`.

Split `raw` into three contiguous slices, where `B = raw.length - 56`:

| Byte range | Length | Field |
| --- | --- | --- |
| `0 .. 23` | 24 bytes | Random per-encryption `nonce`. |
| `24 .. 24 + B - 1` | `B` bytes (`64 <= B <= 4160`, `B % 64 === 0`) | Bucketed `ciphertext`. |
| `24 + B .. 55 + B` | 32 bytes | Key- and message-committing `tag`. |

For any field whose canonical UTF-8 text is 62 bytes or shorter (`B = 64`), `raw` is 120 bytes and the complete onchain string is 166 ASCII characters (`mtxe1:` plus 160 `base64url` characters).

## Canonicalize and pad the plaintext

1. Require a string value containing no isolated UTF-16 surrogates (`U+D800` through `U+DFFF`).
2. Apply ECMAScript `String.prototype.trim()` to both ends (trim set `U+0009`–`U+000D`, `U+0020`, `U+00A0`, `U+1680`, `U+2000`–`U+200A`, `U+2028`, `U+2029`, `U+202F`, `U+205F`, `U+3000` and `U+FEFF`), then normalize to Unicode `NFC`. Preserve internal whitespace, case, punctuation and titles.
3. Encode the canonical string as UTF-8 without a byte-order mark to obtain `M` of byte length `L`. Require `0 <= L <= 4096`.
4. Compute the minimal 64-byte bucket size `B = max(64, ceil((2 + L) / 64) * 64)`.
5. Construct the `B`-byte padded plaintext `P`:
   - `P[0..1]`: `L` encoded as an unsigned 16-bit big-endian integer (`u16be(L)`).
   - `P[2 .. 2 + L - 1]`: the UTF-8 bytes `M`.
   - `P[2 + L .. B - 1]`: zero bytes (`0x00`).

On decryption, after recovering `P` of length `B`, read `L = u16be(P[0..1])` and reject the opening unless all five conditions hold:

1. `L <= 4096` and `2 + L <= B`.
2. `max(64, ceil((2 + L) / 64) * 64) === B` (non-minimal bucket inflation is rejected).
3. Every byte in `P[2 + L .. B - 1]` is `0x00` (nonzero padding bytes are rejected).
4. `P[2 .. 2 + L - 1]` decodes under fatal UTF-8 without surrogates to `text`.
5. `text === text.trim().normalize("NFC")`.

## Encrypt, commit and verify with `entryKey`

Let `entryKey` be 32 bytes (serialized in openings as 64 lowercase ASCII hexadecimal digits) and `nonce` be 24 fresh random bytes.

### Keystream and ciphertext

Let `W = B / 32` (`2 <= W <= 130`). For each 32-byte word index `i` from `0` through `W - 1`, hash the fixed 83-byte concatenation with Keccak-256:

```text
block[i] = keccak256("MetaLeX/mtxe1/stream/v1" || entryKey || nonce || u32be(i))
```

Here `"MetaLeX/mtxe1/stream/v1"` is 23 literal ASCII bytes and `u32be(i)` is the unsigned 32-bit big-endian encoding of `i`. Concatenate `block[0] || ... || block[W - 1]` to obtain the `B`-byte keystream `S`, and XOR byte by byte: `ciphertext = P XOR S`.

### Committing tag

Compute the 32-byte tag over the `(83 + B)`-byte concatenation:

```text
tag = keccak256("MetaLeX/mtxe1/commit/v1" || entryKey || nonce || u32be(B) || ciphertext)
```

Here `"MetaLeX/mtxe1/commit/v1"` is 23 literal ASCII bytes and `u32be(B)` is the unsigned 32-bit big-endian byte length of `ciphertext`.

### Constant-time verification and non-equivocation

Before XORing `ciphertext` with the keystream or inspecting padding, recompute `tag` from `(entryKey, nonce, ciphertext)` and compare all 32 bytes in constant time. Reject immediately on any byte difference.

Because `entryKey`, `nonce` and `ciphertext` are bound inside `keccak256`, and unpadding is deterministic, finding two distinct `(entryKey, value)` pairs that verify against the same recorded `mtxe1:` string requires a collision in Keccak-256. In Solidity, a contract given `(bytes32 entryKey, bytes24 nonce, bytes calldata ciphertext, bytes32 tag)` checks the commitment and recovers a 64-byte bucket in four `KECCAK256` opcode calls (roughly 200 gas).

## Derive `entryKey` from a scope root key

A scope root key `rootKey` is 64 random bytes (512 bits, serialized at rest as 128 lowercase ASCII hexadecimal characters), providing a 256-bit post-quantum key-search margin. Frame an ordered list of byte arrays `[X_1, ..., X_m]` by prefixing each element with its byte length as an unsigned 32-bit big-endian integer (`u32be(X_k.length) || X_k`), concatenating all framed elements, and hashing once with Keccak-256.

Two disjoint KDF scopes separate company-readable cap table records from party-only secondary-sale details:

### Company scope (`kind = "company"`)

Used for primary issuance fields and LET holder-of-record names that the issuing company is entitled to open:

| Order | Framed byte sequence |
| --- | --- |
| 1 | Literal ASCII `"MetaLeX/mtxe1/kdf/company/v1"` (28 bytes). |
| 2 | Raw 64-byte `rootKey`. |
| 3 | Positive EVM `chainId` in canonical ASCII decimal within `uint256`, without sign or leading zeros. |
| 4 | Issuing company address as `0x` followed by 40 lowercase ASCII hexadecimal digits (42 bytes). |
| 5 | Raw 24-byte `nonce` from the `mtxe1:` payload. |

### Sale-party scope (`kind = "sale"`)

Used for holder-to-holder secondary-sale fields (such as notice contact, mailing address and signer details) that stay restricted to the parties to that sale rather than the issuing company's root key:

| Order | Framed byte sequence |
| --- | --- |
| 1 | Literal ASCII `"MetaLeX/mtxe1/kdf/sale/v1"` (25 bytes). |
| 2 | Raw 64-byte `rootKey`. |
| 3 | Positive EVM `chainId` in canonical ASCII decimal within `uint256`, without sign or leading zeros. |
| 4 | Secondary trade contract address as `0x` followed by 40 lowercase ASCII hexadecimal digits (42 bytes). |
| 5 | Nonnegative `offerId` in canonical ASCII decimal within `uint256` (`"0"` or positive decimal without leading zeros). |
| 6 | Raw 24-byte `nonce` from the `mtxe1:` payload. |

Draw 24 fresh random bytes from a cryptographically secure generator for every new encryption. Never reuse a `(rootKey, scope, nonce)` tuple across distinct encryptions; retries of the same logical write must reuse the exact previously emitted `mtxe1:` string.

## Selective opening JSON (`mtxe1-opening-v1`)

To let a recipient verify or decrypt one recorded `mtxe1:` field offline without revealing `rootKey`, supply a UTF-8 JSON object:

```json
{
  "format": "mtxe1-opening-v1",
  "chainId": "84532",
  "entryKey": "64 lowercase hexadecimal characters",
  "value": "Renée Li"
}
```

- `format`: literal string `"mtxe1-opening-v1"`.
- `entryKey`: 64 lowercase ASCII hexadecimal digits (32 bytes).
- `value`: canonical trimmed `NFC` string expected upon decryption. Key-only decryption in the standalone verifier also accepts an opening object that omits `value` and recovers the canonical text directly from `(entryKey, recorded)`.
- `chainId`: optional positive canonical decimal EVM chain ID string. When present and comparing against an RPC-loaded record, the verifier requires the connected chain ID to match `chainId`.

## Scope root key backup JSON (`mtxe1-root-key-v1`)

An officer can back up a company's 512-bit scope root key for offline recovery in [the standalone verifier](verifier.html) using a strict UTF-8 JSON object:

```json
{
  "format": "mtxe1-root-key-v1",
  "scope": {
    "kind": "company",
    "chainId": "8453",
    "company": "0x0000000000000000000000000000000000000000"
  },
  "rootKey": "128 lowercase hexadecimal characters"
}
```

- `format`: literal string `"mtxe1-root-key-v1"`.
- `scope`: canonical `company` or `sale` scope object bound by the KDF.
- `rootKey`: 128 lowercase ASCII hexadecimal digits (64 bytes / 512 bits). Keep this file strictly confidential in an offline vault or password manager; anyone holding `rootKey` can decrypt every `mtxe1:` commitment recorded under `scope`.
- Fingerprint: `keccakFramed(["MetaLeX/mtxe1/root-key-fingerprint/v1", rootKey])[0..7]` encoded as 16 lowercase hex characters lets an officer verify that a saved backup matches the active key without exposing any key bytes.
