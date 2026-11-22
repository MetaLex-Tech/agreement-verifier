export const registeredStock = {
  id: "0x6d6574616c65785f637962657273746f636b5f7265675f645f76315f30000000",
  title: "metalex_cyberstock_reg_d_v1_0",
  printedTitle: "CYBER STOCK PURCHASE AGREEMENT (simultaneous sign/close)",
  cid: "bafybeih6uxz6xp2ncfow5achl6xz5yzz7hhicmi66embxk4wc7f5l6fhey",
  sha256: "3cf0a73c927c78049f7c3aaa537f64748c5997048f2c97c6511bd3134c722176",
  size: 5_243_827,
  pages: 197,
  firstAttachmentPage: 41,
} as const;

export type RegisteredStockSource = {
  templateId: string;
  legalContractUri: string;
  globalFields: readonly string[];
  partyFields: readonly string[];
};

export function verifyRegisteredStock(
  source: RegisteredStockSource,
  title: string,
) {
  const globals = [
    "purchasePricePerShare",
    "numTokenizedShares",
    "governingJurisdiction",
    "disputeResolution",
    "customProvisions",
  ];
  const party = ["name", "evmAddress", "contactDetails"];
  const same = (a: readonly string[], b: readonly string[]) =>
    a.length === b.length && a.every((v, i) => v === b[i]);
  if (
    source.templateId.toLowerCase() !== registeredStock.id ||
    source.legalContractUri.replace(/^ipfs:\/\//i, "ipfs://") !==
      "ipfs://" + registeredStock.cid ||
    title !== registeredStock.title ||
    !same(source.globalFields, globals) ||
    ![
      ["investorType", "investorJurisdiction"],
      ["entityType", "entityJurisdiction"],
    ].some((names) => same(source.partyFields, [...party, ...names]))
  )
    throw Error(
      "The registered stock purchase agreement differs from the selected paper.",
    );
}
