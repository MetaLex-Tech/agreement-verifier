import { isInvestorCommitment } from "@metalex-web/encryption/commitment";
import { ENCRYPTION_PREFIX } from "@metalex-web/encryption/constants";

export function isPrivateAgreementValue(value: string) {
  return value.startsWith(ENCRYPTION_PREFIX) || isInvestorCommitment(value);
}

/** Existing templates store btoa strings. Preserve their original byte encoding
 * for Latin-1. For new readable text outside it, a UTF-8 BOM identifies the
 * Unicode representation inside the same base64 field. */
export function encodeReadableTemplateField(value: string) {
  try {
    return btoa(value);
  } catch {
    const bytes = new TextEncoder().encode(value);
    return btoa(
      "\xEF\xBB\xBF" +
        Array.from(bytes, (b) => String.fromCharCode(b)).join(""),
    );
  }
}

/** Display only. Wallet and settlement callers use the recorded wire strings. */
export function displayEncodedTemplateField(value: string) {
  if (isPrivateAgreementValue(value)) return value;
  try {
    const raw = atob(value);
    if (raw.startsWith("\xEF\xBB\xBF"))
      return new TextDecoder("utf-8", { fatal: true }).decode(
        Uint8Array.from(raw, (c) => c.charCodeAt(0)),
      );
    return raw;
  } catch {
    return value;
  }
}
