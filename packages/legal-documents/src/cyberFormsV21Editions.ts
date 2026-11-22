import { toHex } from "viem";
import type {
  CyberFormsV2Instrument,
  CyberFormsV2PacketKind,
  CyberFormsV2Regulation,
} from "./cyberFormsV2";
import {
  cyberFormsV2GlobalFields,
  cyberFormsV2PartyFields,
  verifyCyberFormsV2Template,
} from "./cyberFormsV2Editions";
import { safteGlobalFields, saftGlobalFields } from "./safteTerms";
import { warrantGlobalFields } from "./tokenWarrantTerms";

type Title = `mlx_${CyberFormsV2PacketKind}_reg_${"d" | "s"}_v2_1`;
type Publication = {
  /** The registered (dark) full agreement's content address. */
  cid: string;
  sha256: string;
  /** The dark stand-alone instruments that the certificates name, in order. */
  instrumentCids: readonly string[];
};

/**
 * Publication of the eight v2.1 editions (purchase agreement V3.1 with the
 * SAFE, the SAFE with token warrant, the SAFT or the SAFTE v2.1, each in
 * Reg D and Reg S), published 2026-11-20 from the files written by
 * `bun run --cwd packages/legal-documents cyberforms:v2.1-pdfs <folder>`
 * (receipt in notes/verification/cyberforms-v2.1-publication.json; all 34
 * files matched their SHA-256 through the gateway). Each records the
 * registered (dark) full agreement's content address and SHA-256 and the
 * dark stand-alone instruments' content addresses. A full agreement is
 * larger than one 256 KiB block, so its address is the dag-pb root.
 *
 * Recording publication does not make v2.1 readable or selectable: no app
 * lookup or release manifest reads this table.
 */
export const cyberFormsV21Publication: Record<Title, Publication | null> = {
  mlx_safe_reg_d_v2_1: {
    cid: "bafybeihqel5diceuqncig3jzpj3h7yztutevvttba6sl2j7gsukneumxei",
    sha256: "90591b95e1b355ecd8cfd3672f7cc692301c3a7b327632f172c7863798b13e75",
    instrumentCids: [
      "bafkreiacbc2f6xu2jsvi6zytfp2crqo5a3cnx5fnkkbcep6udedgl2hm2m",
    ],
  },
  mlx_safe_reg_s_v2_1: {
    cid: "bafybeiftbw77zwnal4z6p3tundd4yiydxy5vbyegcnxu4a2iokzig2gogy",
    sha256: "8711a2ef7c23fd976d5f744b61940431fb29fbbd4d20ee4a00e740236bf5acee",
    instrumentCids: [
      "bafkreidu5ufxc2vlmufdoeviyvks6efhjkcgejzyw5k2nvkny427fonrvu",
    ],
  },
  mlx_safe_tw_reg_d_v2_1: {
    cid: "bafybeick6aak6ro34kolbhx6ipwokvqvogt5k6ovyyixs52nwocbvsl5bi",
    sha256: "9452b1107682c9fa913ca290374634b7c882f1d42c720717cb6416692de738ac",
    instrumentCids: [
      "bafkreiacbc2f6xu2jsvi6zytfp2crqo5a3cnx5fnkkbcep6udedgl2hm2m",
      "bafkreiamvoitwyy66ou6njalpcqpxnnvm7jvngiyidvqj3n5btd7liycxq",
    ],
  },
  mlx_safe_tw_reg_s_v2_1: {
    cid: "bafybeiahvm72wj4wcog3ti35vuarbhvbdvgwoz6pm4dpvrtcyssrexq7y4",
    sha256: "edfb1282b79dd8844b7669f5dcb39adf55c4ed924a3310b58a62c8b7a3f4a1e1",
    instrumentCids: [
      "bafkreidu5ufxc2vlmufdoeviyvks6efhjkcgejzyw5k2nvkny427fonrvu",
      "bafkreihxnvepiqqb7n7sdooe3x5m5i5ggatf4llczqfjvh7dkyjlk2jcva",
    ],
  },
  mlx_saft_reg_d_v2_1: {
    cid: "bafybeidmenuuexcqkckrnddjlwuceni64foxrpdempndp25lvlvvhd5ykq",
    sha256: "480b09ad35829364b790b813b74d6ee6c3cc8443daf29a806a6a7641b7b464a1",
    instrumentCids: [
      "bafkreibob4xuel4bxoxikce3kmio5r3hovz6uw6okq7234n4l6q5434afa",
    ],
  },
  mlx_saft_reg_s_v2_1: {
    cid: "bafybeidmaymukqeltkbc2kzf4htazz2xl2dxedjpxfj6dwdqrvxhpbgfiq",
    sha256: "095d71168797dd3ef415a3f3f9e1ee5f86d8acc097b07ec056849eeb00be37dd",
    instrumentCids: [
      "bafkreigkrl7ri6n6jxfs5hc3vxrkwp2hufzyx4tegc2tigftpfzjg2hknu",
    ],
  },
  mlx_safte_reg_d_v2_1: {
    cid: "bafybeigwm34xkvv63o6wkuajh3ellbktwn7fnud36vlsyspuc25ixwndiy",
    sha256: "568829c860e52ef68ebfdbba4c113777463918b85477db16e510b01d185f2085",
    instrumentCids: [
      "bafkreihrkvttzgrr3fimxlfwcw2aycalndgdjhqneb7gphbfig26p7nyau",
    ],
  },
  mlx_safte_reg_s_v2_1: {
    cid: "bafybeie6c3yja6neh2b7fu5m3nndjslegvvc3ramfgvwaggyqkoq7vkdue",
    sha256: "b0e627b87930f4730a956c66ebed35f027361fea8e0d71228a689ff01357e1c5",
    instrumentCids: [
      "bafkreidr2dattkgvizys3heywj2sxoi55ujuscoxkl7f6ruvv4sd5duxyy",
    ],
  },
};

/** The global fields of each template: unchanged from v2.0. */
const packets: Record<
  CyberFormsV2PacketKind,
  { instrument: string; globalFields: readonly string[] }
> = {
  safe: { instrument: "SAFE", globalFields: cyberFormsV2GlobalFields },
  safe_tw: {
    instrument: "SAFE with Token Warrant",
    globalFields: warrantGlobalFields,
  },
  saft: { instrument: "SAFT", globalFields: saftGlobalFields },
  safte: { instrument: "SAFTE", globalFields: safteGlobalFields },
};

/**
 * The eight v2.1 editions. The template ID is the title right-padded to 32
 * bytes, as in v1.6 and v2.0; the party fields are the v2.0 party fields.
 *
 * The published editions join the reading lookups (`naturalSafeRegistration`,
 * `hasConformedTicket`, `matchingFinancingTemplates`,
 * `standardFinancingOriginalUri`) and the shared natural reader. They join no
 * presentation pair. A new round or ticket selects one only through the
 * app's release manifest.
 */
export const cyberFormsV21Editions = (
  Object.keys(packets) as CyberFormsV2PacketKind[]
).flatMap((packet) =>
  (["Reg D", "Reg S"] as const).map((regulation) => {
    const title =
      `mlx_${packet}_reg_${regulation === "Reg D" ? "d" : "s"}_v2_1` as const;
    return {
      id: toHex(title, { size: 32 }),
      title,
      packet,
      instrument: packets[packet].instrument,
      regulation: regulation as CyberFormsV2Regulation,
      edition: "2.1" as const,
      globalFields: packets[packet].globalFields,
      partyFields: cyberFormsV2PartyFields,
      publication: cyberFormsV21Publication[title],
    };
  }),
);

export function cyberFormsV21Edition(templateId: string) {
  return cyberFormsV21Editions.find(
    (edition) => edition.id === templateId.toLowerCase(),
  );
}

export function publishedCyberFormsV21Edition(templateId: string) {
  const edition = cyberFormsV21Edition(templateId);
  const publication = edition?.publication;
  return edition && publication ? { ...edition, publication } : undefined;
}

/** Published v2.1 editions in the shape of the standard edition table. */
export function publishedCyberFormsV21Editions() {
  return cyberFormsV21Editions.flatMap((edition) =>
    edition.publication
      ? [
          {
            id: edition.id,
            title: edition.title,
            cid: edition.publication.cid,
            instrument: edition.instrument,
            regulation: edition.regulation,
            edition: edition.edition,
          },
        ]
      : [],
  );
}

/**
 * The published v2.1 editions in the shape of the v1.6 registrations that
 * the natural reading paths use: the instrument documents that the
 * certificates name, as `safeUri` (SAFE), `safeUri` and `warrantUri` (SAFE
 * with token warrant) or `tokenUri` (SAFT, SAFTE).
 */
type Registration = {
  id: `0x${string}`;
  title: string;
  cid: string;
  regulation: CyberFormsV2Regulation;
  edition: "2.1";
};
export type CyberFormsV21Registration =
  | (Registration & { instrument: "SAFE"; safeUri: string })
  | (Registration & {
      instrument: "SAFE with Token Warrant";
      safeUri: string;
      warrantUri: string;
    })
  | (Registration & { instrument: "SAFT" | "SAFTE"; tokenUri: string });

export function naturalCyberFormsV21Registrations(): CyberFormsV21Registration[] {
  return cyberFormsV21Editions.flatMap(
    (edition): CyberFormsV21Registration[] => {
      const publication = edition.publication;
      if (!publication) return [];
      const [first, second] = publication.instrumentCids;
      const row: Registration = {
        id: edition.id,
        title: edition.title,
        cid: publication.cid,
        regulation: edition.regulation,
        edition: edition.edition,
      };
      switch (edition.packet) {
        case "safe":
          return [{ ...row, instrument: "SAFE", safeUri: `ipfs://${first}` }];
        case "safe_tw":
          return [
            {
              ...row,
              instrument: "SAFE with Token Warrant",
              safeUri: `ipfs://${first}`,
              warrantUri: `ipfs://${second}`,
            },
          ];
        default:
          // The SAFT and the SAFTE name one instrument document.
          return [
            {
              ...row,
              instrument: edition.packet === "saft" ? "SAFT" : "SAFTE",
              tokenUri: `ipfs://${first}`,
            },
          ];
      }
    },
  );
}

type Paper = {
  templateId: string;
  legalContractUri: string;
  globalFields: readonly string[];
  partyFields: readonly string[];
};

/**
 * Returns the v2.1 edition a registered paper identifies, or undefined for
 * any other template ID. A v2.1 ID refuses while unpublished, and refuses any
 * title, content address or schema that differs.
 */
export function verifyCyberFormsV21Template(source: Paper, title: string) {
  const edition = cyberFormsV21Edition(source.templateId);
  if (!edition) return undefined;
  const publication = edition.publication;
  if (
    !publication ||
    title !== edition.title ||
    !/^ipfs:\/\//i.test(source.legalContractUri) ||
    source.legalContractUri.replace(/^ipfs:\/\//i, "") !== publication.cid ||
    JSON.stringify(source.globalFields) !==
      JSON.stringify(edition.globalFields) ||
    JSON.stringify(source.partyFields) !== JSON.stringify(edition.partyFields)
  )
    throw new Error(
      "The registered agreement differs from the paper selected for review.",
    );
  return edition;
}

/** A registered paper that the natural v2 reader presents. */
export type CyberFormsPaper = {
  edition: "2.0" | "2.1";
  packet: CyberFormsV2PacketKind;
  regulation: CyberFormsV2Regulation;
  title: string;
  /** The registered (dark) full agreement. */
  cid: string;
  /** The stand-alone instruments that the certificates name, in Exhibit A order. */
  instrumentCids: readonly string[];
};

/**
 * Returns the natively authored paper that a registered template identifies:
 * the v2.0 SAFE or one of the eight v2.1 editions. Any other template ID
 * gives undefined (the v1.x readers and the v2.0 siblings keep their own
 * paths). A v2 ID refuses any title, content address or schema that differs.
 */
export function verifyCyberFormsPaper(
  source: Paper,
  title: string,
): CyberFormsPaper | undefined {
  const safe = verifyCyberFormsV2Template(source, title);
  if (safe)
    return {
      edition: "2.0",
      packet: "safe",
      regulation: safe.regulation,
      title: safe.title,
      cid: safe.publication!.cid,
      instrumentCids: [safe.publication!.safeCid],
    };
  const v21 = verifyCyberFormsV21Template(source, title);
  if (!v21) return undefined;
  return {
    edition: "2.1",
    packet: v21.packet,
    regulation: v21.regulation,
    title: v21.title,
    cid: v21.publication!.cid,
    instrumentCids: v21.publication!.instrumentCids,
  };
}

/** The instrument names that the readers and refusals use. */
export const cyberFormsInstrumentNames: Record<
  CyberFormsV2Instrument,
  "SAFE" | "token warrant" | "SAFT" | "SAFTE"
> = {
  safe: "SAFE",
  warrant: "token warrant",
  saft: "SAFT",
  safte: "SAFTE",
};
