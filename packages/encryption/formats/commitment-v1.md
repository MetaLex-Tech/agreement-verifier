# Investor field commitment v1

An onchain string has the prefix `mtlxc1:` followed by exactly 64 lowercase hexadecimal digits. The digest is SHA-256. A verifier needs the recorded string and its opening. An opening is a UTF-8 JSON object with six string properties: `chainId`, `contract`, `position`, `field`, `value` and `salt`. JSON property order and whitespace have no effect. The first [fixed vector](commitment-v1-vectors.json) includes a complete opening and its expected onchain string.

Download [the standalone verifier](verifier.html) to check a pasted commitment offline. Its [document and field guide](document-references.md) explains registry and LET lookups.

## Compute the digest

Encode each of these seven strings as UTF-8, without a byte-order mark. Prefix **each** byte sequence with its byte length as an unsigned 32-bit big-endian integer. Concatenate the seven length-prefixed sequences in the order below, hash the result once, and prepend the prefix to the lowercase hexadecimal digest.

| Order | String to encode |
| --- | --- |
| 1 | Literal ASCII domain tag `MetaLeX/investor-field/commitment/v1`. |
| 2 | Positive EVM chain ID in canonical ASCII decimal, within uint256, without a sign or leading zeros. Pass it as a string to preserve large IDs. |
| 3 | Origin contract address as `0x` followed by 40 lowercase hexadecimal digits. Lowercase the hexadecimal digits before hashing. |
| 4 | Position identifier. Preserve every character and its case. Use one or more ASCII letters, digits, periods, underscores, colons or hyphens. |
| 5 | Nonempty field identifier in its original case and exact Unicode scalar sequence. Include the field slot when a template can repeat a label. |
| 6 | Exact entered value after ECMAScript `String.prototype.trim()` applied to both ends, then Unicode NFC. Store this canonical text in the opening. Preserve internal whitespace, capitalization, punctuation and titles. |
| 7 | The 32-byte random salt encoded as **64 lowercase ASCII hexadecimal characters**. The length prefix for this part is 64. |

For independent implementations the trim set is U+0009–000D, U+0020, U+00A0, U+1680, U+2000–200A, U+2028, U+2029, U+202F, U+205F, U+3000 and U+FEFF. Reject isolated UTF-16 surrogates in the value or field identifier. Replacing them with U+FFFD would make distinct inputs hash alike. Compare the complete output string byte for byte. A malformed opening is an input error. A valid opening that produces a different string is a mismatch.

## Bind an opening to a position

The origin contract is the contract for the originating record. A downstream LET that copies a deal or EOI name keeps the original commitment, origin contract and position. Supply the position exactly as saved in the opening. A position identifies an issuance or transfer and, where applicable, the party row. It is known before the first wallet request. Bind agreement positions to stable inputs such as the template or round ID, agreement nonce and party slot. Include the originating manager or creator if the origin contract serves multiple issuers. Direct issuance can use the persisted issuance intent and line. Never derive a position from the resulting agreement ID or from an output that itself depends on the commitment.

Resolve the signed field against its expected origin and position before showing the value to the signer. Matching an opening to a supplied string proves consistency with that string. Entitlement to receive the opening and confirmation that the string came from the claimed onchain record require their own checks.

Generate 32 fresh random bytes on the server for each new opening. Save the value and salt together, encrypted at rest. Retries, closed agreements and signing must reuse the saved commitment exactly. A transfer to a new holder needs a new opening. The salts in the fixed vectors are public test inputs.

Commitments do not protect against a breach of MetaLeX. MetaLeX stores the values and salts. Anyone who obtains an opening can verify and read it.
