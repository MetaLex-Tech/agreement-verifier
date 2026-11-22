import { agreementNodes } from "./agreementReferences";

// From pages 1, 2, 11 and 16–19 of the registered CyberStock Reg D v1.0 PDF.
// Locations address the original text after joining PDF layout whitespace.
export type StockValue =
  | "company"
  | "investor"
  | "count"
  | "series"
  | "recordedCount"
  | "paymentToken"
  | "jurisdiction"
  | "exhibitCount"
  | "exhibitPrice"
  | "recordedPrice"
  | "tokenIdentification";
export type StockReference = { value: StockValue } | { label: string };

export const stockPurchaseParagraphs = {
  opening: agreementNodes<StockReference>(
    "This CyberStock Purchase Agreement (this “Agreement”) is being entered into as of the time of completion of the Adoption Procedures by an entity selling and issuing certain Tokenized Shares pursuant to this Agreement (the “Company”) and an individual or entity purchasing such Tokenized Shares pursuant to this Agreement (the “Investor” and together with the Company, the “Parties” and each a “Party”), with the intention of completing the Stock Purchase pursuant to which the Investor will purchase from the Company that number of Tokenized Shares of the applicable Series of Capital Stock of the Company as set forth in the Registered Deal Data, for the Purchase Amount paid by the Investor in Blockchain Tokens. The specific parameters of the Stock (including, without limitation, the Series, par value, original issue price, voting rights, liquidation preference, conversion rights, dividend rights, protective provisions, transfer restrictions and authorized shares of such Series) are set forth in the COI and reflected in the ShareData metadata maintained onchain by the CyberCertPrinter for the relevant Stock Ledger Entry Token(s), and are summarized in Exhibit A.",
    [
      { start: 135, registered: "an entity", reference: { value: "company" } },
      {
        start: 237,
        registered: "an individual or entity",
        reference: { value: "investor" },
      },
      {
        start: 517,
        registered: "that number of Tokenized Shares",
        reference: { value: "count" },
      },
      {
        start: 552,
        registered: "the applicable Series",
        reference: { value: "series" },
      },
      {
        start: 606,
        registered: "as set forth in the Registered Deal Data",
        reference: { value: "recordedCount" },
      },
    ],
  ),
  sale: agreementNodes<StockReference>(
    "1.1 Stock Purchase Terms. The Company hereby sells and issues to the Investor, and the Investor hereby purchases from the Company, the Stock (the “Stock Purchase”), consisting of that number of Tokenized Shares of the applicable Series of Capital Stock of the Company as set forth in the Registered Deal Data (the “Stock” and such Series, the “Applicable Series”), at a price per Tokenized Share (the “Purchase Price Per Share”) equal to the originalIssuePrice for the Applicable Series as set forth in the ShareData maintained by the CyberCertPrinter (the “Original Issue Price”). Each Tokenized Share constituting the Stock shall be recorded as a fully paid and nonassessable share of the Applicable Series in the Tokenized Stock Ledger System by the minting to or assignment to the Investor of one or more Stock Ledger Entry Tokens with metadata reflecting the Investor as the Registered Owner, the unit count of Tokenized Shares represented, the Applicable Series designation, the Original Issue Price, and such other information as is required by the COI, the Bylaws, the ShareExtension Smart Contract associated with the CyberCertPrinter, and applicable law. The aggregate amount payable by the Investor for the Stock (the “Purchase Amount”) shall equal the Purchase Price Per Share multiplied by the number of Tokenized Shares constituting the Stock and shall be paid in Blockchain Tokens consisting of units of the Denomination Token specified in the Registered Deal Data (the “Purchase Amount Tokens”).",
    [
      {
        start: 179,
        registered: "that number of Tokenized Shares",
        reference: { value: "count" },
      },
      {
        start: 214,
        registered: "the applicable Series",
        reference: { value: "series" },
      },
      {
        start: 268,
        registered: "as set forth in the Registered Deal Data",
        reference: { value: "recordedCount" },
      },
      {
        start: 442,
        registered: "originalIssuePrice",
        reference: { label: "original issue price" },
      },
      {
        start: 1419,
        registered:
          "the Denomination Token specified in the Registered Deal Data",
        reference: { value: "paymentToken" },
      },
    ],
  ),
  governingLaw: agreementNodes<StockReference>(
    "5.1 Governing Law. This Agreement shall be governed by and construed under the internal laws of the jurisdiction identified in the governingJurisdiction string variable of the Registered Deal Data (the “Governing Jurisdiction”), regardless of the laws that might otherwise govern under applicable principles of conflicts of laws.",
    [
      {
        start: 96,
        registered:
          "the jurisdiction identified in the governingJurisdiction string variable of the Registered Deal Data",
        reference: { value: "jurisdiction" },
      },
    ],
  ),
  record: agreementNodes<StockReference>(
    "6.2 Registered Deal Data Contents. The Registered Deal Data must include at least the following information:",
    [],
  ),
  purchaseData: agreementNodes<StockReference>(
    "(a) as the globalValues variable of the Registered Deal, a data structure setting forth the following data, which shall correspond to the data fields specified in the globalFields variable of the Agreement Template:",
    [
      {
        start: 4,
        registered:
          "as the globalValues variable of the Registered Deal, a data structure",
        reference: {
          label: "as the purchase terms of the Registered Deal, a record",
        },
      },
      {
        start: 134,
        registered: "the data fields specified in the globalFields variable of",
        reference: { label: "the terms specified in" },
      },
    ],
  ),
  priceData: agreementNodes<StockReference>(
    "(i) the Purchase Price Per Share (which shall equal the Original Issue Price for the Applicable Series as set forth in the ShareData);",
    [
      {
        start: 4,
        registered: "the Purchase Price Per Share",
        reference: { value: "recordedPrice" },
      },
    ],
  ),
  quantityData: agreementNodes<StockReference>(
    "(ii) the number of Tokenized Shares of the Applicable Series to be issued to the Investor (each, a unit of the Stock);",
    [],
  ),
  lawData: agreementNodes<StockReference>(
    "(iii) the name of the jurisdiction whose law will govern this Agreement (the Governing Jurisdiction), as the governingJurisdiction string variable; and",
    [
      {
        start: 102,
        registered: "as the governingJurisdiction string variable",
        reference: { label: "as recorded for the purchase" },
      },
    ],
  ),
  forumData: agreementNodes<StockReference>(
    "(iv) the string “bindingArbitration,” the string “courtResolution” or another string specifying an alternative dispute resolution, as the disputeResolution string variable;",
    [
      {
        start: 5,
        registered:
          "the string “bindingArbitration,” the string “courtResolution” or another string specifying an alternative dispute resolution, as the disputeResolution string variable",
        reference: {
          label:
            "the selection of binding arbitration, court adjudication or another dispute resolution procedure",
        },
      },
    ],
  ),
  partyData: agreementNodes<StockReference>(
    "(b) as the partyValues variables of the Registered Deal, data structures setting forth the following data about the Parties, which shall correspond to the applicable data fields specified in the partyFields variable of the Agreement Template:",
    [
      {
        start: 4,
        registered:
          "as the partyValues variables of the Registered Deal, data structures",
        reference: {
          label: "as the party details of the Registered Deal, records",
        },
      },
      {
        start: 151,
        registered:
          "the applicable data fields specified in the partyFields variable of",
        reference: { label: "the applicable party details specified in" },
      },
    ],
  ),
  issuerData: agreementNodes<StockReference>(
    "(i) a blockchain address of the Company (the “Company Blockchain Address”), the legal name of the Company, details of where the Company can be contacted for purposes of giving notices under this Agreement, the entity type of the Company, and the jurisdiction of incorporation or formation of the Company; and",
    [],
  ),
  investorData: agreementNodes<StockReference>(
    "(ii) a blockchain address of the Investor (the “Investor Blockchain Address”), the legal name of the Investor, details of where the Investor can be contacted for purposes of giving notices under this Agreement, and, if the Investor is an entity, the entity type of the Investor and the jurisdiction of incorporation of the Investor;",
    [],
  ),
  contacts: agreementNodes<StockReference>(
    "(c) the contactDetails setting forth electronic or mailing addresses for the Company and the Investor for purposes of receiving legal notices; and",
    [
      {
        start: 8,
        registered: "contactDetails",
        reference: { label: "contact details" },
      },
    ],
  ),
  constraints: agreementNodes<StockReference>(
    "(d) as additional top-level fields of the Registered Deal stored alongside (and not within) the globalValues variable:",
    [
      {
        start: 7,
        registered:
          "additional top-level fields of the Registered Deal stored alongside (and not within) the globalValues variable",
        reference: {
          label:
            "additional terms recorded for the Registered Deal separately from the purchase terms",
        },
      },
    ],
  ),
  secret: agreementNodes<StockReference>(
    "(i) optionally, a secretHash bytes32 variable equal to the keccak256 hash of a secret string set by the Company in order to restrict who may sign this Agreement as an Investor; and",
    [
      {
        start: 18,
        registered: "secretHash bytes32 variable",
        reference: { label: "32-byte fingerprint" },
      },
      {
        start: 59,
        registered: "keccak256",
        reference: { label: "Keccak-256" },
      },
    ],
  ),
  expiry: agreementNodes<StockReference>(
    "(ii) optionally, an expiry uint256 variable specifying the Unix timestamp after which the Registered Deal may no longer be signed, finalized or otherwise acted upon.",
    [
      {
        start: 20,
        registered: "expiry uint256 variable",
        reference: { label: "expiry expressed as a whole number" },
      },
    ],
  ),
  tokenDefinition: agreementNodes<StockReference>(
    "“Denomination Token” means the fungible Blockchain Token identified by the value of the paymentToken variable in the Registered Deal Data, which is the Blockchain Token used by the Investor to pay the Purchase Amount (typically a stablecoin such as USDC) and in which the Purchase Price Per Share and the Purchase Amount are denominated.",
    [
      {
        start: 57,
        registered:
          "identified by the value of the paymentToken variable in the Registered Deal Data",
        reference: { value: "tokenIdentification" },
      },
    ],
  ),
  forumDefinition: agreementNodes<StockReference>(
    "“Dispute Resolution Method” means (a) if the value of the disputeResolution variable referred to in Section 6.2(a)(iv) is “bindingArbitration,” the dispute resolution procedures set forth on Exhibit B; (b) if the value of such variable is “courtResolution,” the dispute resolution procedures set forth on Exhibit C; and (c) if the value of such variable sets forth or refers to another dispute resolution procedure, such other dispute resolution procedure.",
    [
      {
        start: 41,
        registered:
          "the value of the disputeResolution variable referred to in Section 6.2(a)(iv) is “bindingArbitration,”",
        reference: { label: "binding arbitration is selected," },
      },
      {
        start: 209,
        registered: "the value of such variable is “courtResolution,”",
        reference: { label: "court adjudication is selected," },
      },
      {
        start: 327,
        registered: "the value of such variable sets forth",
        reference: { label: "the recorded selection sets forth" },
      },
    ],
  ),
};
