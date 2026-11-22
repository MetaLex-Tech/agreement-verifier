import { type AgreementNode, renderReferences } from "./agreementReferences";
import type {
  CertificateLegendRecord,
  conformedPrimarySafe,
} from "./conformedPrimaryRound";
import { readableCertificateTerms } from "./readableCertificateTerms";
import {
  type RegisteredStockSource,
  registeredStock,
  verifyRegisteredStock,
} from "./registeredStock";
import { registeredStockClauses } from "./registeredStockClauses";
import { type StockCertificateReading, stockParameters } from "./stockExhibitA";
import type { StockReference, StockValue } from "./stockPurchaseReferences";

export type { StockCertificateReading } from "./stockExhibitA";

type StockRound = {
  source: RegisteredStockSource;
  title: string;
  company: {
    name: string;
    address: string;
    type: string;
    jurisdiction: string;
    party: readonly string[];
  };
  identification: string;
  paymentToken: string;
  paymentTokenAddress?: string;
  series: string;
  consideration: string;
  adoptionLimits: string;
  certificateTerms: readonly string[];
  stockCertificates?: readonly StockCertificateReading[];
  legalDetails: string;
  legends: readonly CertificateLegendRecord[];
} & (
  | {
      phase: "issuer";
      price: string;
      law: string;
      resolution: string;
      minimum: string;
      maximum: string;
    }
  | {
      phase: "ticket";
      stage: "offer" | "escrow" | "settled";
      investor?: readonly string[];
      investorWallet: string;
      globalValues: readonly string[];
      external: boolean;
    }
  | ({
      investor: readonly string[];
      investorWallet: string;
      globalValues: readonly string[];
    } & ({ phase: "investor" } | { phase: "issued"; quantity: string }))
);

export function conformedStockRound(input: StockRound) {
  verifyRegisteredStock(input.source, input.title);
  const { company, paymentToken } = input;
  const investor = input.phase === "issuer" ? undefined : input.investor;
  if (company.party.length !== 5 || !company.name.trim())
    throw Error("The stock purchase agreement does not identify the company.");
  const ticket = input.phase === "ticket" ? input : undefined;
  const openOffer = ticket?.stage === "offer" && !investor;
  if (
    input.phase !== "issuer" &&
    (input.globalValues.length !== 5 ||
      (!openOffer &&
        (investor?.length !== 5 ||
          (!ticket?.external &&
            (!investor[0]?.trim() ||
              investor[1]?.toLowerCase() !==
                input.investorWallet.toLowerCase())))))
  )
    throw Error(
      "The stock purchase terms or parties do not match the agreement.",
    );
  const [price, requested, law, resolution, provisions] =
    input.phase === "issuer"
      ? [input.price, undefined, input.law, input.resolution, undefined]
      : input.globalValues;
  if (
    !ticket?.external &&
    (!price?.trim() || (input.phase !== "issuer" && !requested?.trim()))
  )
    throw Error("The stock purchase agreement is missing terms.");
  const shareCount = (value: string | undefined, tokenized = false) =>
    `${value} ${tokenized ? "tokenized " : ""}${/^1(?:\.0+)?$/.test(value ?? "") ? "share" : "shares"}`;
  const forum =
    resolution === "bindingArbitration"
      ? "binding arbitration under Exhibit B"
      : resolution === "courtResolution"
        ? "court adjudication under Exhibit C"
        : resolution;
  function partyText(row: readonly string[]) {
    return [
      row[3] && `The recorded party type is ${row[3]}.`,
      row[4] && `The recorded jurisdiction is ${row[4]}.`,
    ]
      .filter(Boolean)
      .join(" ");
  }
  function notice(role: string, contact: string) {
    return contact.trim()
      ? `The ${role} receives legal notices at ${contact}.`
      : `The agreement gives no notice address for the ${role}.`;
  }
  const priceText = price?.trim()
    ? `${price} ${paymentToken}`
    : "an amount unspecified in the recorded offer";
  const evidence = {
    lawSelection: law?.trim()
      ? `The governing jurisdiction is ${law}.`
      : "The recorded terms do not identify a governing jurisdiction.",
    forumSelection: forum?.trim()
      ? `Disputes are resolved by ${forum}.`
      : "The recorded terms do not specify a dispute resolution procedure.",
    signedQuantity:
      input.phase === "ticket"
        ? !requested?.trim()
          ? "The offer records no purchase quantity."
          : input.stage === "offer"
            ? `The Company offers ${shareCount(requested)} under this agreement.`
            : `The agreement specifies ${shareCount(requested)}.`
        : input.phase === "issued"
          ? `The Investor signed for ${shareCount(requested)}. The Company issued ${shareCount(input.quantity)}.`
          : input.phase === "investor"
            ? `The Investor requests ${shareCount(requested)}. The issued certificate will record the final allocation.`
            : `The Investor will specify the investment when signing. The round accepts investments between ${input.minimum} and ${input.maximum}.`,
    companyParty: [
      `The Company is ${company.name} at ${company.address}.`,
      company.type && `Its entity type is ${company.type}.`,
      company.jurisdiction && `Its jurisdiction is ${company.jurisdiction}.`,
      company.party[0] && `Its party record names ${company.party[0]}.`,
      company.party[1] &&
        `Its party record gives the address ${company.party[1]}.`,
      partyText(company.party),
    ]
      .filter(Boolean)
      .join(" "),
    investorParty: investor
      ? ticket?.external
        ? [
            investor[0]
              ? `The Investor is ${investor[0]}.`
              : "The offer records no investor name.",
            investor[1]?.toLowerCase() !== ticket.investorWallet.toLowerCase()
              ? `The signing wallet is ${ticket.investorWallet}. ${investor[1] ? "The offer records the investor address as " + investor[1] + "." : "The offer records no investor address."}`
              : `The Investor’s wallet is ${investor[1]}.`,
            partyText(investor),
          ]
            .filter(Boolean)
            .join(" ")
        : `The Investor is ${investor[0]} at ${investor[1]}. ${partyText(investor)}`.trim()
      : "The Investor will identify its name, wallet and capacity when signing.",
    companyContact: notice("Company", company.party[2]),
    investorContact: investor
      ? notice("Investor", investor[2])
      : "The Investor will supply its notice address when signing.",
  };
  const certificateNotes = [
    ...(input.stockCertificates?.flatMap(({ certificate, additional }) =>
      additional.map((text) =>
        certificate ? `${certificate}. ${text}` : text,
      ),
    ) ?? input.certificateTerms),
    ...[readableCertificateTerms(input.legalDetails)].filter(Boolean),
    ...input.legends.flatMap(({ certificate, legends }) => [
      `Restrictive legends for ${certificate}`,
      ...(legends === null
        ? ["The restrictive legends could not be verified."]
        : legends.length
          ? legends.map((l) =>
              l.trim() ? l : "The record contains an empty legend entry.",
            )
          : ["The certificate records no restrictive legends."]),
    ]),
  ];
  type Paragraph = ReturnType<
    typeof conformedPrimarySafe
  >["paragraphs"][number];
  type Content = Paragraph["content"];
  function purchaseValue(value: StockValue): Content {
    switch (value) {
      case "company":
        return [company.name];
      case "investor":
        return investor
          ? [
              investor[0] ||
                `the investor signing at ${ticket?.investorWallet ?? investor[1]}`,
            ]
          : [{ text: "[Investor name]", future: true }];
      case "count":
        if (input.phase === "issuer")
          return [
            { text: "[Number of shares]", future: true },
            " Tokenized Shares",
          ];
        if (!requested?.trim()) return ["the number of Tokenized Shares"];
        return [
          requested +
            (/^1(?:\.0+)?$/.test(requested)
              ? " Tokenized Share"
              : " Tokenized Shares"),
        ];
      case "series":
        return [input.series];
      case "exhibitCount":
        if (input.phase === "issuer")
          return [
            { text: "[Number of shares]", future: true },
            ` to be specified when the Investor signs. The round accepts investments between ${input.minimum} and ${input.maximum}.`,
          ];
        return [evidence.signedQuantity];
      case "exhibitPrice":
        return [
          price?.trim() ? priceText : "Unspecified in the recorded offer",
        ];
      case "recordedCount":
        if (input.phase === "issued")
          return [`in the signed terms (${shareCount(input.quantity)} issued)`];
        if (input.phase === "issuer")
          return ["to be specified when the Investor signs"];
        return [
          requested?.trim()
            ? "in the recorded terms"
            : "(quantity unspecified in the recorded offer)",
        ];
      case "recordedPrice":
        return ["the Purchase Price Per Share (" + priceText + ")"];
      case "paymentToken":
        return [
          input.paymentTokenAddress
            ? "the Denomination Token at " + input.paymentTokenAddress
            : "the Denomination Token specified for this purchase",
        ];
      case "tokenIdentification":
        return [
          input.paymentTokenAddress
            ? "at " + input.paymentTokenAddress
            : "identified in the payment terms for this purchase",
        ];
      case "jurisdiction":
        return [
          law?.trim()
            ? law
            : "the jurisdiction left unspecified in the recorded terms",
        ];
    }
  }
  function naturalContent(
    nodes: readonly AgreementNode<StockReference>[],
  ): Content {
    return nodes.flatMap<Content[number]>((node) => {
      if (typeof node === "string") return [node];
      const ref = node.reference;
      return "value" in ref ? purchaseValue(ref.value) : [ref.label];
    });
  }
  const recordedValues = {
    quantity: [evidence.signedQuantity],
    law: [evidence.lawSelection],
    forum: [evidence.forumSelection],
    company: [evidence.companyParty],
    investor: [evidence.investorParty],
    contacts: [evidence.companyContact, evidence.investorContact],
    limits: [input.adoptionLimits],
  };
  const paragraphs = registeredStockClauses.flatMap<Paragraph>((text) => {
    if (typeof text !== "string" && "schedule" in text) {
      const schedule = stockParameters.flatMap<Paragraph>(
        ({ key, title, body }) => {
          const row: Paragraph = {
            heading: false,
            content: [title, ". ", ...naturalContent(body)],
          };
          const facts =
            input.stockCertificates?.flatMap(({ certificate, parameters }) =>
              (parameters[key] ?? []).map((fact) =>
                certificate ? `${certificate}. ${fact}` : fact,
              ),
            ) ?? [];
          if (key === "issuer") facts.push(evidence.companyParty);
          if (key === "aggregate") facts.push(input.consideration);
          return [
            row,
            ...facts.map((fact) => ({ heading: false, content: [fact] })),
          ];
        },
      );
      return [
        ...schedule,
        ...certificateNotes.map((note) => ({
          heading: false,
          content: [note],
        })),
      ];
    }
    if (typeof text !== "string" && !("heading" in text)) {
      const content = naturalContent(text.body);
      return [
        { heading: false, content },
        ...(text.evidence
          ? recordedValues[text.evidence].map((value) => ({
              heading: false,
              content: [value],
            }))
          : []),
      ];
    }
    if (typeof text !== "string") {
      const prospective = input.phase === "issuer";
      if (!prospective && typeof provisions !== "string")
        throw Error(
          "The additional provisions for this purchase could not be verified.",
        );
      if (!prospective && !provisions?.trim()) return [];
      const body = renderReferences(text.body, () =>
        prospective
          ? "Any additional text supplied for this purchase"
          : "The following text",
      );
      return [
        { heading: true, content: [text.heading] },
        { heading: false, content: [body] },
        ...(provisions === undefined
          ? []
          : [{ heading: false, content: [provisions] }]),
      ];
    }
    return [
      {
        heading: /^(?:EXHIBIT [A-E]\b|Part [1-3]:|[1-7]\. )/.test(text),
        content: [
          text,
          ...(input.phase !== "issued" &&
          ticket?.stage !== "settled" &&
          text.startsWith("EXHIBIT E ")
            ? [
                " ",
                {
                  text: "Read the charter, bylaws and transaction agreements",
                  href: `https://ipfs.filebase.io/ipfs/${registeredStock.cid}#page=${registeredStock.firstAttachmentPage}`,
                },
              ]
            : []),
        ],
      },
    ];
  });
  return {
    title: registeredStock.printedTitle,
    uri: "ipfs://" + registeredStock.cid,
    identification:
      input.identification +
      " Exhibit E reproduces the attachments to the registered form, including the certified charter of MetaLeX Labs, Inc. The issuer named in this purchase is " +
      company.name +
      ".",
    paragraphs,
  };
}
