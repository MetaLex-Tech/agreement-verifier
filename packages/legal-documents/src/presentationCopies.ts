import cyberForms from "./cyberFormsPresentation.json";

export type DocumentMode = "dark" | "light";

export type PresentationCopy = {
  cid: string;
  sha256: string;
};

export type DocumentPresentation = {
  id: string;
  title: string;
  /** Both copies must be pinned and verified before activation. */
  publication: "pending" | "published";
  /** Published bytes can remain available for review without launch approval. */
  previewOnly?: boolean;
  /** Hash of the common normalized PDF text, checked during preparation. */
  textSha256: string;
  dark: PresentationCopy;
  light: PresentationCopy;
};

export const cyberFormsPresentations: readonly DocumentPresentation[] =
  cyberForms as DocumentPresentation[];

const cidPattern =
  /^(?:(?:bafybei|bafkrei)[a-z2-7]{52}|Qm[1-9A-HJ-NP-Za-km-z]{44})$/;
const gateways = new Set([
  "https://gateway.pinata.cloud",
  "https://ipfs.io",
  "https://dweb.link",
  "https://gateway.ipfs.io",
  "https://beige-just-flyingfish-108.mypinata.cloud",
]);

/** Exact root PDFs only: never substitute a file inside a directory or an arbitrary URL. */
export function presentationCid(
  uri: string,
  configuredGateway?: string,
): string | null {
  const ipfs = /^ipfs:\/\/([^/?#]+)\/?(?:#[^?]*)?$/.exec(uri);
  if (ipfs) return cidPattern.test(ipfs[1]) ? ipfs[1] : null;
  try {
    const url = new URL(uri);
    if (url.username || url.password || url.search) return null;
    const configured = configuredGateway
      ? new URL(configuredGateway).origin
      : null;
    if (
      url.protocol !== "https:" ||
      (!gateways.has(url.origin) && url.origin !== configured)
    ) {
      return null;
    }
    const match = /^\/ipfs\/([^/]+)\/?$/.exec(url.pathname);
    return match && cidPattern.test(match[1]) ? match[1] : null;
  } catch {
    return null;
  }
}

/** Presentation metadata cannot change the caller's agreement/template identity. */
export function findDocumentPresentation(
  uri: string,
  configuredGateway?: string,
  catalog: readonly DocumentPresentation[] = cyberFormsPresentations,
): DocumentPresentation | undefined {
  const cid = presentationCid(uri, configuredGateway);
  if (!cid) return undefined;
  const matches = catalog.filter(
    (entry) =>
      entry.publication === "published" &&
      (entry.dark.cid === cid || entry.light.cid === cid),
  );
  // Ambiguous metadata must not select a document by array order.
  return matches.length === 1 ? matches[0] : undefined;
}

export function presentationUri(copy: PresentationCopy): string {
  return `ipfs://${copy.cid}`;
}
