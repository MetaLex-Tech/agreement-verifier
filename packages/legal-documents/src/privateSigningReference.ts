import { z } from "zod";

const sha256 = z
  .string()
  .regex(/^[a-fA-F0-9]{64}$/)
  .transform((v) => v.toLowerCase());
export const privateDocumentExpectationSchema = z
  .object({
    agreementId: z
      .string()
      .regex(/^0x[a-fA-F0-9]{64}$/)
      .transform((v) => v.toLowerCase()),
    artifactId: z.uuid().transform((v) => v.toLowerCase()),
    documentSha256: sha256,
  })
  .strict();
export type PrivateDocumentExpectation = z.infer<
  typeof privateDocumentExpectationSchema
>;

/** Malformed references in this namespace still require private-document handling. */
export function isManagedPrivateDocument(uri: string) {
  return /^urn:metalex:private-document(?:[:/?#]|$)/i.test(uri.trim());
}

/** Decode the signed private-document URN without opening the document. */
export function parsePrivateDocumentReference(uri: string) {
  const match =
    /^urn:metalex:private-document:([a-f0-9-]+):sha256:([a-f0-9]{64})$/i.exec(
      uri,
    );
  if (!match || !z.uuid().safeParse(match[1]).success) return null;
  return {
    artifactId: match[1]!.toLowerCase(),
    documentSha256: match[2]!.toLowerCase(),
  };
}

/** Generic signing has no authenticated PDF or application lifecycle evidence. */
export function assertGenericDocumentSigningAllowed(uri: string) {
  if (isManagedPrivateDocument(uri)) {
    throw new Error(
      "Open the private document to review its current signing request.",
    );
  }
}

/** A navigation reference, never an authorization grant or proof of request state. */
export function privateDocumentReviewPath({
  chainId,
  agreementId,
  legalContractUri,
  globalFields,
  globalParams,
}: {
  chainId: number;
  agreementId: string;
  legalContractUri: string;
  globalFields: readonly string[];
  globalParams: Record<string, string>;
}): string | null {
  const uri = parsePrivateDocumentReference(legalContractUri);
  if (!uri) return null;
  // Ambiguous or missing registered fields must not guess another request.
  if (
    !["company", "requestId", "documentSha256"].every(
      (field) => globalFields.filter((v) => v === field).length === 1,
    )
  )
    return null;
  const reference = privateDocumentExpectationSchema
    .extend({
      chainId: z.number().int().positive(),
      company: z
        .string()
        .regex(/^0x[a-fA-F0-9]{40}$/)
        .refine((v) => !/^0x0{40}$/.test(v))
        .transform((v) => v.toLowerCase()),
      requestId: z.uuid(),
    })
    .safeParse({
      agreementId,
      artifactId: uri.artifactId,
      documentSha256: uri.documentSha256,
      chainId,
      company: globalParams.company,
      requestId: globalParams.requestId,
    });
  if (
    !reference.success ||
    globalParams.documentSha256?.toLowerCase() !== reference.data.documentSha256
  )
    return null;
  const { requestId, ...values } = reference.data;
  const query = new URLSearchParams(
    Object.entries(values).map(([key, value]) => [key, String(value)]),
  );
  return `/post-formation/sign/${requestId}?${query}`;
}

/** Old direct links omit all three fields. Partial/malformed handoffs fail closed. */
export function parsePrivateDocumentExpectation(
  search: Record<string, string | string[] | undefined>,
) {
  const values = {
    agreementId: search.agreementId,
    artifactId: search.artifactId,
    documentSha256: search.documentSha256,
  };
  if (Object.values(values).every((value) => value === undefined))
    return undefined;
  return privateDocumentExpectationSchema.parse(values);
}

export function assertPrivateDocumentIdentity(
  expected: PrivateDocumentExpectation | undefined,
  document: {
    agreementId: string;
    artifactId: string;
    contentSha256: string;
  },
) {
  if (
    expected &&
    (expected.agreementId !== document.agreementId.toLowerCase() ||
      expected.artifactId !== document.artifactId.toLowerCase() ||
      expected.documentSha256 !== document.contentSha256.toLowerCase())
  ) {
    throw new Error(
      "This signing link does not match the saved document. Ask the sender for the original link.",
    );
  }
}
