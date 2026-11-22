import { toHex } from "viem";
import type { CyberFormsV2Regulation } from "./cyberFormsV2";
import { cyberFormsV2PartyFields } from "./cyberFormsV2Editions";
import { safteGlobalFields, saftGlobalFields } from "./safteTerms";
import { warrantGlobalFields } from "./tokenWarrantTerms";

type Instrument = "SAFE with Token Warrant" | "SAFT" | "SAFTE";
type Packet = "safe_tw" | "saft" | "safte";
type Publication = {
  /** The registered (dark) full agreement: a dag-pb root, as Pinata chunks it. */
  cid: string;
  sha256: string;
  /** The dark stand-alone instruments that the certificates name, in order. */
  instrumentCids: readonly string[];
};

/**
 * Publication of the v2.0 token warrant, SAFT and SAFTE editions, published
 * on 2026-11-20 (receipt in
 * notes/verification/cyberforms-v2-siblings-publication.json). A full
 * agreement is larger than one 256 KiB block, so its address is the dag-pb
 * root, not the raw-block address of its SHA-256.
 */
export const cyberFormsV2SiblingPublication: Record<
  `mlx_${Packet}_reg_${"d" | "s"}_v2_0`,
  Publication | null
> = {
  mlx_safe_tw_reg_d_v2_0: {
    cid: "bafybeifsfb5axd7263sjdrq3pj2rvxu3uoouktyollirg44ndu5r6kyfde",
    sha256: "bf6ac170ad154bc16e78209ba5623e3c588e2da31a54962567b4cee9806bba2a",
    instrumentCids: [
      "bafkreih4tw7vrdvhyu2i2mwzv7m3jm54cubwm5m5swcnpcpgvfdxgnzozi",
      "bafkreihwsxyvqoiybit7tbd4u5acfe22nyrqaspc2xcxuhjpeo3fjgflv4",
    ],
  },
  mlx_safe_tw_reg_s_v2_0: {
    cid: "bafybeibediocud3hgibovp7ak2sj52fdhrqnpacgu4b6eejbvnq4dfyusi",
    sha256: "1498921829a2df4698c74404ef0ed3c440ce89a7d8493b1bfe0514ca1258bfc3",
    instrumentCids: [
      "bafkreih5tl23fe3dcepyx6y6hgrcfvkdcdpa6lt4lrpuy3q26tkoqjms2a",
      "bafkreievmqs4vmkrmvuuwgsfu2kc5ndvg77z2rukyn2bdbvlxvvjeogi24",
    ],
  },
  mlx_saft_reg_d_v2_0: {
    cid: "bafybeih5uejli2mafhr5nootcsj7toir437ujeeneeppe4amygcwfm2ham",
    sha256: "f263203307d1933367fb80c2be6337782767d431fe7be23521e5c2b8a870c179",
    instrumentCids: [
      "bafkreifitej7ok35ffp55omk65dp6dv4jbsumylv2q2ogi7iakgmbndeqq",
    ],
  },
  mlx_saft_reg_s_v2_0: {
    cid: "bafybeia4gbf5qyo5pyhrnhdh5qfrlkpjcmpjhjcozvphauxoomfd4lm24u",
    sha256: "7232b2d0f50476e8866ea50847a8155d6557bbed9ceb8af9d4a3b6feb7163442",
    instrumentCids: [
      "bafkreihkuvsprx5ar4gerfpzwgtquaktdkhc5ep2nnwekt53l44nzrck44",
    ],
  },
  mlx_safte_reg_d_v2_0: {
    cid: "bafybeich4q4omgoale6rjz2ouh4o4j4bnuxca5y333jgbnvnqgrbpz55ie",
    sha256: "4f84c8c1b48a6e5ba56773867f9056dd0b562134906286c4e287210b21f71498",
    instrumentCids: [
      "bafkreie5h23p3gyldper6sogenhxzalu7quy2kozvmgvh5kegfwgotnlsi",
    ],
  },
  mlx_safte_reg_s_v2_0: {
    cid: "bafybeiha2twjxffp5f536f3tevi3y3pfof3zaz2mewu3dzqj5v5qrvvax4",
    sha256: "6fa4f9573575c8f35501cc0205bdd23b7a6c45084b5bfe166b5573bebec46905",
    instrumentCids: [
      "bafkreiaa5m3fkg4kdpdckqko2gczkpfobanyr53zlcjkxd7ickhl5ytoaa",
    ],
  },
};

const packets: Record<
  Packet,
  { instrument: Instrument; globalFields: readonly string[] }
> = {
  safe_tw: {
    instrument: "SAFE with Token Warrant",
    globalFields: warrantGlobalFields,
  },
  saft: { instrument: "SAFT", globalFields: saftGlobalFields },
  safte: { instrument: "SAFTE", globalFields: safteGlobalFields },
};

/**
 * The six v2.0 sibling editions, with the v1.6 schema of each predecessor.
 * They join the catalogue lookups only. The natural reading view and the
 * app's release are later work, so the shared reader does not present them.
 */
export const cyberFormsV2SiblingEditions = (
  Object.keys(packets) as Packet[]
).flatMap((packet) =>
  (["Reg D", "Reg S"] as const).map((regulation) => {
    const title =
      `mlx_${packet}_reg_${regulation === "Reg D" ? "d" : "s"}_v2_0` as const;
    return {
      id: toHex(title, { size: 32 }),
      title,
      packet,
      instrument: packets[packet].instrument,
      regulation: regulation as CyberFormsV2Regulation,
      edition: "2.0" as const,
      globalFields: packets[packet].globalFields,
      partyFields: cyberFormsV2PartyFields,
      publication: cyberFormsV2SiblingPublication[title],
    };
  }),
);

export function cyberFormsV2SiblingEdition(templateId: string) {
  return cyberFormsV2SiblingEditions.find(
    (edition) => edition.id === templateId.toLowerCase(),
  );
}

/** Published sibling editions in the shape of the standard edition table. */
export function publishedCyberFormsV2SiblingEditions() {
  return cyberFormsV2SiblingEditions.flatMap((edition) =>
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

type Paper = {
  templateId: string;
  legalContractUri: string;
  globalFields: readonly string[];
  partyFields: readonly string[];
};

/**
 * Returns the sibling edition a registered paper identifies, or undefined for
 * any other template ID. A sibling ID refuses while unpublished, and refuses
 * any title, content address or schema that differs.
 */
export function verifyCyberFormsV2SiblingTemplate(
  source: Paper,
  title: string,
) {
  const edition = cyberFormsV2SiblingEdition(source.templateId);
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
