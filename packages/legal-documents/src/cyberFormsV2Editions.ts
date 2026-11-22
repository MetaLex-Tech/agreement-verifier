import { toHex } from "viem";
import type { CyberFormsV2Regulation } from "./cyberFormsV2";
import { presentationCid } from "./presentationCopies";

/**
 * Publication of the v2.0 SAFE editions. THIS IS THE ONE PLACE TO CHANGE
 * after the parent session publishes the PDFs written by
 * `bun run --cwd packages/legal-documents cyberforms:v2-pdfs <folder>`:
 * set each regulation to the registered (dark) full agreement's content
 * address and SHA-256, and the dark stand-alone SAFE's content address. A
 * published edition joins the package lookups. It is selectable for a new
 * round only once the app's release manifest lists a chain on which its
 * registration was read back; until then it has no chain.
 */
export const cyberFormsV2Publication: Record<
  CyberFormsV2Regulation,
  null | { cid: string; sha256: string; safeCid: string }
> = {
  // Published 2026-11-20; receipt in notes/verification/cyberforms-v2-publication.json.
  "Reg D": {
    cid: "bafkreib625wi7qdftrfov6jkrk543bd5totmxxflsuk72mvpg7ktpdxvwe",
    sha256: "3ed76c8fc0659c4aeaf92a8abbcd847d9ba6cbdcab9515fd32af37d5378ef5b1",
    safeCid: "bafkreih4tw7vrdvhyu2i2mwzv7m3jm54cubwm5m5swcnpcpgvfdxgnzozi",
  },
  "Reg S": {
    cid: "bafkreigknm7pbb47vxbkdmaqln3ctgmgoxjqakzjtrv554h73i5r3ivrn4",
    sha256: "ca6b3ef0879fadc2a1b0105b7629998675d3002b299c6bdef0ffda3b1da2b16f",
    safeCid: "bafkreih5tl23fe3dcepyx6y6hgrcfvkdcdpa6lt4lrpuy3q26tkoqjms2a",
  },
};

/** The v1.6 SAFE schema, unchanged: the edition reads values by these names. */
export const cyberFormsV2GlobalFields = [
  "purchaseAmount",
  "postMoneyValuationCap",
  "expirationTime",
  "governingJurisdiction",
  "disputeResolution",
] as const;
export const cyberFormsV2PartyFields = [
  "name",
  "evmAddress",
  "contactDetails",
  "investorType",
  "investorJurisdiction",
] as const;

const titles = {
  "Reg D": "mlx_safe_reg_d_v2_0",
  "Reg S": "mlx_safe_reg_s_v2_0",
} as const;

export type CyberFormsV2Edition = {
  /** The registry template ID: the title right-padded to 32 bytes, as v1.6. */
  id: `0x${string}`;
  title: (typeof titles)[CyberFormsV2Regulation];
  instrument: "SAFE";
  regulation: CyberFormsV2Regulation;
  edition: "2.0";
  publication: (typeof cyberFormsV2Publication)[CyberFormsV2Regulation];
};

export const cyberFormsV2Editions: readonly CyberFormsV2Edition[] = (
  ["Reg D", "Reg S"] as const
).map((regulation) => ({
  id: toHex(titles[regulation], { size: 32 }),
  title: titles[regulation],
  instrument: "SAFE" as const,
  regulation,
  edition: "2.0" as const,
  publication: cyberFormsV2Publication[regulation],
}));

/** Published v2.0 editions in the shape of the standard edition table. */
export function publishedCyberFormsV2Editions() {
  return cyberFormsV2Editions.flatMap((edition) =>
    edition.publication
      ? [
          {
            id: edition.id,
            title: edition.title,
            cid: edition.publication.cid,
            instrument: edition.instrument,
            regulation: edition.regulation,
            edition: edition.edition,
            safeUri: `ipfs://${edition.publication.safeCid}`,
          },
        ]
      : [],
  );
}

export function cyberFormsV2Edition(templateId: string) {
  return cyberFormsV2Editions.find(
    (edition) => edition.id === templateId.toLowerCase(),
  );
}

export function publishedCyberFormsV2Edition(templateId: string) {
  const edition = cyberFormsV2Edition(templateId);
  const publication = edition?.publication;
  return edition && publication ? { ...edition, publication } : undefined;
}

type Paper = {
  templateId: string;
  legalContractUri: string;
  globalFields: readonly string[];
  partyFields: readonly string[];
};

/**
 * Returns the v2.0 edition a registered paper identifies, or undefined for
 * any other template ID. A v2.0 ID refuses while the edition is unpublished,
 * and refuses any title, content address or schema that differs.
 */
export function verifyCyberFormsV2Template(source: Paper, title: string) {
  const edition = cyberFormsV2Edition(source.templateId);
  if (!edition) return undefined;
  const publication = edition.publication;
  if (
    !publication ||
    title !== edition.title ||
    !/^ipfs:\/\//i.test(source.legalContractUri) ||
    source.legalContractUri.replace(/^ipfs:\/\//i, "") !== publication.cid ||
    JSON.stringify(source.globalFields) !==
      JSON.stringify(cyberFormsV2GlobalFields) ||
    JSON.stringify(source.partyFields) !==
      JSON.stringify(cyberFormsV2PartyFields)
  )
    throw new Error(
      "The registered agreement differs from the paper selected for review.",
    );
  return edition;
}

/**
 * The v2 reader shows the standard instrument, so outside a draft each
 * certificate must name its published stand-alone instrument. Returns the
 * reason to refuse, or null. A certificate that names another document, or
 * one that could not be verified, keeps the reader from presenting the
 * standard text. `instrument` and `edition` name the document (the v2.0 SAFE
 * by default).
 */
export function cyberFormsV2CertificateRefusal(
  certificate: { uri?: string } | "unverified-external" | undefined,
  safeCid: string,
  instrument: "SAFE" | "token warrant" | "SAFT" | "SAFTE" = "SAFE",
  edition: "v2.0" | "v2.1" = "v2.0",
): string | null {
  if (!certificate)
    return `The registered ${instrument} requires verified certificate terms.`;
  if (certificate === "unverified-external")
    return `The ${instrument} certificate could not be verified, so this copy cannot show the standard ${edition} ${instrument} as its terms.`;
  if (presentationCid(certificate.uri ?? "") !== safeCid)
    return `The ${instrument} certificate identifies a different instrument document from the registered ${edition} ${instrument}. Read the document identified by the certificate for its own terms.`;
  return null;
}
