import { publishedCyberFormsV2Editions } from "./cyberFormsV2Editions";
import { publishedCyberFormsV2SiblingEditions } from "./cyberFormsV2SiblingEditions";
import { publishedCyberFormsV21Editions } from "./cyberFormsV21Editions";
import { registeredSaftV13 } from "./registeredSaftV13";
import { registeredStock } from "./registeredStock";

// The registry ID, title and IPFS content address identify each registered paper.
// The registered field order is checked before interpreting any signing values.
export const standardFinancingEditions = [
  {
    id: "0x6d6c785f736166655f7265675f645f76315f3300000000000000000000000000",
    title: "mlx_safe_reg_d_v1_3",
    cid: "bafybeih7l2kxncjuwrfgv5gnmpcik43dnn4pxpe4it4u7ti2hgfgrlot2a",
    instrument: "SAFE",
    regulation: "Reg D",
    safeUri:
      "ipfs://bafybeidq7z4sgbh5tqxfehs5rz3r3il76ony3t7psetwge5ctld6lubi5e",
  },
  {
    id: "0x6d6c785f736166655f7265675f735f76315f3300000000000000000000000000",
    title: "mlx_safe_reg_s_v1_3",
    cid: "bafybeieh7jn553jmrjmwee3dsvwf5hkedomey2vhubc3mumlewfpumvlae",
    instrument: "SAFE",
    regulation: "Reg S",
    safeUri:
      "ipfs://bafybeigkcbocfq3p7rscojjej24jajyrhqk6mukgetmlsmyo4f6cp6iqry",
  },
  {
    id: "0x6d6c785f73616674655f7265675f645f76315f33000000000000000000000000",
    title: "mlx_safte_reg_d_v1_3",
    cid: "bafybeiag7xatsusb24evnpyj6ztf62kix36dgbsp3kbazfyvr273ph56ay",
    instrument: "SAFTE",
    regulation: "Reg D",
  },
  {
    id: "0x6d6c785f73616674655f7265675f735f76315f33000000000000000000000000",
    title: "mlx_safte_reg_s_v1_3",
    cid: "bafybeia43r7e566s2jlq4gtaasmtybutujy7fuizhw3fycxtwnstfbkeia",
    instrument: "SAFTE",
    regulation: "Reg S",
  },
  {
    id: "0x6d6c785f736166655f74775f7265675f645f76315f3300000000000000000000",
    title: "mlx_safe_tw_reg_d_v1_3",
    cid: "bafybeiaw3pwov3ahg4bk2hte2hu4pwv34nndoguxyk3umq6f5su3kod6ay",
    instrument: "SAFE with Token Warrant",
    regulation: "Reg D",
    safeUri:
      "ipfs://bafybeidq7z4sgbh5tqxfehs5rz3r3il76ony3t7psetwge5ctld6lubi5e",
    warrantUri:
      "ipfs://bafybeidmtxc6hveimc43uxdkohbi7ubmtkd57irpday2hmhomuyguxtg7a",
  },
  {
    id: "0x6d6c785f736166655f74775f7265675f735f76315f3300000000000000000000",
    title: "mlx_safe_tw_reg_s_v1_3",
    cid: "bafybeicto2raupsj5ad7snxvhmmll2plwyploqho4fg2cibnn2fuhlm2d4",
    instrument: "SAFE with Token Warrant",
    regulation: "Reg S",
    safeUri:
      "ipfs://bafybeigkcbocfq3p7rscojjej24jajyrhqk6mukgetmlsmyo4f6cp6iqry",
    warrantUri:
      "ipfs://bafybeid2ldcznpjva3hf6km75zwsfe6tgaw23qabbapz63cgtmipnwy4kq",
  },
  {
    id: "0x6d6c785f736166655f7265675f645f76315f3400000000000000000000000000",
    title: "mlx_safe_reg_d_v1_4",
    cid: "bafybeibemqrqlcorwqyt5z5sfxuw3mnmptchuudjbetddwqsl4vwuc52ba",
    instrument: "SAFE",
    regulation: "Reg D",
    edition: "1.4",
    safeUri:
      "ipfs://bafkreigvdb3tl4gqjhl4kltitwx2ap6oggpusn7tfe6g5eadoozyc4kq34",
  },
  {
    id: "0x6d6c785f736166655f74775f7265675f645f76315f3400000000000000000000",
    title: "mlx_safe_tw_reg_d_v1_4",
    cid: "bafybeiex744l7xm337shu7w3t2rgmr2nkkvhwi2jvqlbsbp45zwllwxyku",
    instrument: "SAFE with Token Warrant",
    regulation: "Reg D",
    edition: "1.4",
    safeUri:
      "ipfs://bafkreigvdb3tl4gqjhl4kltitwx2ap6oggpusn7tfe6g5eadoozyc4kq34",
    warrantUri:
      "ipfs://bafybeiflfuhmfh4odyvazkv7almx25fqnotz3dude65valnzillsyk5qmm",
  },
  {
    id: "0x6d6c785f736166745f7265675f645f76315f3400000000000000000000000000",
    title: "mlx_saft_reg_d_v1_4",
    cid: "bafybeihtu4tsfei7hm54gfscfcjqy4hf47l3nlplaza2tt4xgzituxxs5i",
    instrument: "SAFT",
    regulation: "Reg D",
    edition: "1.4",
    tokenUri:
      "ipfs://bafybeigdj4enukctao6wuqockermxzpb7wivs2xta2ppgnazyb7qgogqri",
  },
  {
    id: "0x6d6c785f73616674655f7265675f645f76315f34000000000000000000000000",
    title: "mlx_safte_reg_d_v1_4",
    cid: "bafybeid7pq7j3t24kw5cd5cyjr76nlsa3syenoemah3hm64umc34zhwwa4",
    instrument: "SAFTE",
    regulation: "Reg D",
    edition: "1.4",
    tokenUri:
      "ipfs://bafybeidpzvosnjjrng7qjbetnwfmolx3eq3pmji743bhy265adxh2e4qgq",
  },
  {
    id: "0x6d6c785f736166655f7265675f735f76315f3400000000000000000000000000",
    title: "mlx_safe_reg_s_v1_4",
    cid: "bafybeiduhbvdq7hsy542zzpu2hf5bvcavoj6fwn6lswqcc2h456fwvc6yi",
    instrument: "SAFE",
    regulation: "Reg S",
    edition: "1.4",
    safeUri:
      "ipfs://bafkreidp4t7h6xirl7e4lenuywtpauvsmkcgle4exe6xqfid4pfzdcxg4i",
  },
  {
    id: "0x6d6c785f736166655f74775f7265675f735f76315f3400000000000000000000",
    title: "mlx_safe_tw_reg_s_v1_4",
    cid: "bafybeibq73gmxouxjdoqzvuk5nuu5d4i4gmdyuncps3o736v6ehjjzymsu",
    instrument: "SAFE with Token Warrant",
    regulation: "Reg S",
    edition: "1.4",
    safeUri:
      "ipfs://bafkreidp4t7h6xirl7e4lenuywtpauvsmkcgle4exe6xqfid4pfzdcxg4i",
    warrantUri:
      "ipfs://bafybeiezzfyd5chdsdmakkdmdqgzulf5yjafvl7egbs5f2hrmc5mlmqqvu",
  },
  {
    id: "0x6d6c785f736166745f7265675f735f76315f3400000000000000000000000000",
    title: "mlx_saft_reg_s_v1_4",
    cid: "bafybeiecsg2k26yfzajbirs4mqveyk5se3elv3tqft3mo3br4nl4xt7hcm",
    instrument: "SAFT",
    regulation: "Reg S",
    edition: "1.4",
    tokenUri:
      "ipfs://bafybeibgpx4gjuf2ddgnn6eayelepvtknccefnumrwhl3ebhr63j5dv6xq",
  },
  {
    id: "0x6d6c785f73616674655f7265675f735f76315f34000000000000000000000000",
    title: "mlx_safte_reg_s_v1_4",
    cid: "bafybeih2kkairhmeud33qu4ks3e47kzwgn3eqgpqzwluxumnwcs2q6k7qy",
    instrument: "SAFTE",
    regulation: "Reg S",
    edition: "1.4",
    tokenUri:
      "ipfs://bafybeifyfhfbors2casddsimrtg633dripjc5v37itgjetiph5xwjhzmoy",
  },
  {
    id: "0x6d6c785f736166655f7265675f645f76315f3500000000000000000000000000",
    title: "mlx_safe_reg_d_v1_5",
    cid: "bafybeihj25qoysfhnmmw72jecneseg7vi7tqqqgnat3rmx3yq45dlb3aeq",
    instrument: "SAFE",
    regulation: "Reg D",
    edition: "1.5",
    safeUri:
      "ipfs://bafkreigxkcwvogsvmt6bt52iv6efmubvyopromfjjfbvj5nebokrj5zkey",
  },
  {
    id: "0x6d6c785f736166655f74775f7265675f645f76315f3500000000000000000000",
    title: "mlx_safe_tw_reg_d_v1_5",
    cid: "bafybeiflv6kiiqbqvdql6hett3yfy5u42pshyuzj7spiziqvfbexnkf2pi",
    instrument: "SAFE with Token Warrant",
    regulation: "Reg D",
    edition: "1.5",
    safeUri:
      "ipfs://bafkreigxkcwvogsvmt6bt52iv6efmubvyopromfjjfbvj5nebokrj5zkey",
    warrantUri:
      "ipfs://bafybeiaerv4o3kye7ylmf6drzz56p264zs54rwjf37lt2yl535f34cwfwu",
  },
  {
    id: "0x6d6c785f736166745f7265675f645f76315f3500000000000000000000000000",
    title: "mlx_saft_reg_d_v1_5",
    cid: "bafybeibnwbcxyvny7uyjuyddhxttqa7kflvx2zjnpmoqc2wwgsjgtmaiua",
    instrument: "SAFT",
    regulation: "Reg D",
    edition: "1.5",
    tokenUri:
      "ipfs://bafybeiecxy3xuwhamqdeepd3vn4n46p7vy7jn2n4slcsaezxtphwzpet6q",
  },
  {
    id: "0x6d6c785f73616674655f7265675f645f76315f35000000000000000000000000",
    title: "mlx_safte_reg_d_v1_5",
    cid: "bafybeihxkjefb7oe2tp7k5q2moiare7j62hgiu6xke2elfmzigxcww45uy",
    instrument: "SAFTE",
    regulation: "Reg D",
    edition: "1.5",
    tokenUri:
      "ipfs://bafybeiflnu4w6dw7seec6u7ij73euerxj754pft2rm7tod7u5sfimofbjq",
  },
  {
    id: "0x6d6c785f736166655f7265675f735f76315f3500000000000000000000000000",
    title: "mlx_safe_reg_s_v1_5",
    cid: "bafybeigkmgjl46tfstvvjoh3ei7dvrhk27ly2p3g4py5wylvqvj3ppdybq",
    instrument: "SAFE",
    regulation: "Reg S",
    edition: "1.5",
    safeUri:
      "ipfs://bafkreibham7rtjgt5ai6axazqrsdwi75ry3wu2iajkue7b6cbk6h4h3odi",
  },
  {
    id: "0x6d6c785f736166655f74775f7265675f735f76315f3500000000000000000000",
    title: "mlx_safe_tw_reg_s_v1_5",
    cid: "bafybeiefrg3mdwoa2vp4ugzs2agbzhfftv3h4zthvsjqrg3eu6j2jsiq4e",
    instrument: "SAFE with Token Warrant",
    regulation: "Reg S",
    edition: "1.5",
    safeUri:
      "ipfs://bafkreibham7rtjgt5ai6axazqrsdwi75ry3wu2iajkue7b6cbk6h4h3odi",
    warrantUri:
      "ipfs://bafybeiajsjnno3o7l24rcrfoxpt4fgiqddnu45n36vn27grun5roumbr5y",
  },
  {
    id: "0x6d6c785f736166745f7265675f735f76315f3500000000000000000000000000",
    title: "mlx_saft_reg_s_v1_5",
    cid: "bafybeifwrsxqzs2xrkkkh4coetg5y6qtiy3kkmuonxoyny2k4pf4uezbhm",
    instrument: "SAFT",
    regulation: "Reg S",
    edition: "1.5",
    tokenUri:
      "ipfs://bafybeicvnnjlwjox2of7gqnhwatnjkotye6p5srt4kmppdxcq4g7xmkazy",
  },
  {
    id: "0x6d6c785f73616674655f7265675f735f76315f35000000000000000000000000",
    title: "mlx_safte_reg_s_v1_5",
    cid: "bafybeid3migqua643fzcdnxzmji3nhbkv3zfxkgefzyo43mv5znz3lroli",
    instrument: "SAFTE",
    regulation: "Reg S",
    edition: "1.5",
    tokenUri:
      "ipfs://bafybeihhrx6cvxclmurjuejmczxj2s622mgveyi4wqgwpq4sbxmcsegydi",
  },
  {
    id: "0x6d6c785f736166655f7265675f645f76315f3600000000000000000000000000",
    title: "mlx_safe_reg_d_v1_6",
    cid: "bafybeiff2eo3x3bjtwhas44rze6inttudavdlgyu7tpy7hqscorzno3gcq",
    instrument: "SAFE",
    regulation: "Reg D",
    edition: "1.6",
    safeUri:
      "ipfs://bafkreid2o2knyjxmfjyyysb6ifee2ar4gtyxmzsvrp7jjwjdfop4nrtvha",
  },
  {
    id: "0x6d6c785f736166655f74775f7265675f645f76315f3600000000000000000000",
    title: "mlx_safe_tw_reg_d_v1_6",
    cid: "bafybeidplvduw7xuviamehyj3ui64n6imh4x3vuyinzk3nh6lhz4avghym",
    instrument: "SAFE with Token Warrant",
    regulation: "Reg D",
    edition: "1.6",
    safeUri:
      "ipfs://bafkreid2o2knyjxmfjyyysb6ifee2ar4gtyxmzsvrp7jjwjdfop4nrtvha",
    warrantUri:
      "ipfs://bafybeidrfnll5wldx45mgcaxdjvdsutwsvrv5prpknhpybyugiup3dgpri",
  },
  {
    id: "0x6d6c785f736166655f7265675f735f76315f3600000000000000000000000000",
    title: "mlx_safe_reg_s_v1_6",
    cid: "bafybeiazvnxjj3pa2fy3krvzkm3ubb4m4i66rgvonnmwgdpjsygj7eua5y",
    instrument: "SAFE",
    regulation: "Reg S",
    edition: "1.6",
    safeUri:
      "ipfs://bafkreiab5qq3frgvxqj5zmb474a76rfqvteztfpaqt5pl4btie7xyqrycm",
  },
  {
    id: "0x6d6c785f736166655f74775f7265675f735f76315f3600000000000000000000",
    title: "mlx_safe_tw_reg_s_v1_6",
    cid: "bafybeibajmlxhppml55ejjovpxsajwhvuaqwioctag4j4ystteqgb2gsyq",
    instrument: "SAFE with Token Warrant",
    regulation: "Reg S",
    edition: "1.6",
    safeUri:
      "ipfs://bafkreiab5qq3frgvxqj5zmb474a76rfqvteztfpaqt5pl4btie7xyqrycm",
    warrantUri:
      "ipfs://bafybeid6ebum3uu6i6uw4tzgmkscdeaafdrdej4lgmq4ypa4rumwqy26ju",
  },
  {
    id: "0x6d6c785f736166745f7265675f645f76315f3600000000000000000000000000",
    title: "mlx_saft_reg_d_v1_6",
    cid: "bafybeigj262p52hpdxfnmyja5wt2336vpik7db36hg7r4b7lhxlqspo7cu",
    instrument: "SAFT",
    regulation: "Reg D",
    edition: "1.6",
    tokenUri:
      "ipfs://bafybeie4wu73wotvlogr6zr5k3wrblyixd7f2gtazeukmwds22cdaxsise",
  },
  {
    id: "0x6d6c785f736166745f7265675f735f76315f3600000000000000000000000000",
    title: "mlx_saft_reg_s_v1_6",
    cid: "bafybeif3wxvtngmcc2qnznjciif37r2ikaiy2voqulujlc22xd3ynihcey",
    instrument: "SAFT",
    regulation: "Reg S",
    edition: "1.6",
    tokenUri:
      "ipfs://bafybeieitaecaatndsbxbzqk2yzrjviwga7fnc52rvx4iqpt2y4s225qxm",
  },
  {
    id: "0x6d6c785f73616674655f7265675f645f76315f36000000000000000000000000",
    title: "mlx_safte_reg_d_v1_6",
    cid: "bafybeibfyiiwhb6ibrsodzo32cmevo7gpioqtr7de3khjpdglzb3fiheua",
    instrument: "SAFTE",
    regulation: "Reg D",
    edition: "1.6",
    tokenUri:
      "ipfs://bafybeieenlsxyo6d2uyeqtcgprpmuiqrzzjtfeeb5w3ak5mfd2gmrryika",
  },
  {
    id: "0x6d6c785f73616674655f7265675f735f76315f36000000000000000000000000",
    title: "mlx_safte_reg_s_v1_6",
    cid: "bafybeib4fzrqjjozgcl7h3ckkzrnvikli6jbnrhc75lzviu4vnekenp55e",
    instrument: "SAFTE",
    regulation: "Reg S",
    edition: "1.6",
    tokenUri:
      "ipfs://bafybeiduzyblsuyyokle6xdndfzljxbegafabca777ja7yhaf6xrdqf3oy",
  },
  {
    id: "0x6163655f73616665763100000000000000000000000000000000000000000000",
    title: "MetaLeX cyberSAFE jx-neutral-style / Reg S ACE raise v 1",
    cid: "bafybeibwtm7irbxar76nmmg37uxw6oi5mts7flar4wzndsgfhy4tyq36hq",
    instrument: "ACE SAFE",
    regulation: "Reg S",
    safeUri:
      "ipfs://bafybeig6luysoemea2t7rpb5jczd7ojmt26w3ubtplyw577wp3b7ui72we",
  },
  {
    id: "0x6163655f736166655f726567645f763100000000000000000000000000000000",
    title: "MetaLeX cyberSAFE jx-neutral-style / Reg D ACE raise v 1",
    cid: "bafybeifca22x3r2vkcanj446pe2bcn465rseff6ff3h7lwuaeaw54mjugi",
    instrument: "ACE SAFE",
    regulation: "Reg D",
    safeUri:
      "ipfs://bafybeidk3dku6wllvr3tgqe5snwka5jfqre5lwo5eod4a4vc6w6h3u6tqm",
  },
  {
    id: "0x6163655f736166655f7265675f645f7631000000000000000000000000000000",
    title: "MetaLeX cyberSAFE jx-neutral-style / Reg D ACE raise v 1",
    cid: "bafybeifca22x3r2vkcanj446pe2bcn465rseff6ff3h7lwuaeaw54mjugi",
    instrument: "ACE SAFE",
    regulation: "Reg D",
    safeUri:
      "ipfs://bafybeidk3dku6wllvr3tgqe5snwka5jfqre5lwo5eod4a4vc6w6h3u6tqm",
  },
] as const;

/** One public PDF can be used by more than one financing registration. */
export function matchingFinancingTemplates(uris: ReadonlySet<string>) {
  const registeredUris = new Set(
    Array.from(uris, (uri) => uri.replace(/^ipfs:\/\//i, "ipfs://")),
  );
  return [
    ...standardFinancingEditions,
    // v2.0 joins only when cyberFormsV2Publication records its files.
    ...publishedCyberFormsV2Editions(),
    ...publishedCyberFormsV2SiblingEditions(),
    ...publishedCyberFormsV21Editions(),
    ...registeredSaftV13,
    registeredStock,
  ]
    .filter((paper) => registeredUris.has("ipfs://" + paper.cid))
    .map((paper) => ({
      id: paper.id,
      title: paper.title,
      cid: paper.cid,
      name:
        "instrument" in paper
          ? paper.instrument + " (" + paper.regulation + ")"
          : paper.printedTitle,
    }));
}
