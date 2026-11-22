import { agreementNodes } from "./agreementReferences";
import type { StockReference } from "./stockPurchaseReferences";

// Registered CyberStock Reg D v1.0, Exhibit A, pages 24–28. The offsets refer
// to each original cell or paragraph after joining lines of PDF text.
export const stockExhibitText = {
  legendNotice: agreementNodes<StockReference>(
    "THE STOCK LEDGER ENTRY TOKEN(S) ISSUED TO THE INVESTOR HEREUNDER MAY BE SUBJECT TO ANY OR ALL OF THE RESTRICTIVE LEGENDS SET FORTH AT THE END OF THIS EXHIBIT A. PLEASE CHECK THE “LEGENDS” METADATA FIELD OF THE STOCK LEDGER ENTRY TOKEN FOR THE CURRENTLY APPLICABLE RESTRICTIVE LEGENDS.",
    [
      {
        start: 178,
        registered: "“LEGENDS” METADATA FIELD",
        reference: { label: "LIST OF RESTRICTIVE LEGENDS" },
      },
    ],
  ),
  administrativeControls: agreementNodes<StockReference>(
    "The Company has certain administrative controls over the Stock Ledger Entry Tokens through the Tokenized Stock Ledger System and the CyberCertPrinter, exercised by the Board of Directors and authorized officers in accordance with the DGCL, the COI and the Bylaws, including controls over the transferability of the Stock Ledger Entry Tokens and the power to revoke, void or reissue a Stock Ledger Entry Token in the circumstances contemplated by the Bylaws (including, without limitation, in the event of a lost, stolen, mutilated or destroyed Stock Ledger Entry Token, the compromise, theft, unauthorized disclosure or loss of any private key, or the occurrence of a Material Adverse Exception Event as defined in the Bylaws). In the event that the Company revokes or voids a Stock Ledger Entry Token, the Company will either issue the Investor a new Stock Ledger Entry Token reflecting the corresponding Tokenized Shares or, if and to the extent the Board of Directors so determines, replace the Tokenized Share with an uncertificated book-entry share or a paper stock certificate, in each case in accordance with the DGCL, the COI and the Bylaws. The Company may also record stock splits and other recapitalization events affecting the Applicable Series onchain through the recordStockSplit function of the ShareExtensionLogic Smart Contract (or its equivalent), with such events reflected in the splitHistory array of the affected Stock Ledger Entry Tokens, in each case in accordance with the COI, the Bylaws and the DGCL.",
    [
      {
        start: 1277,
        registered: "recordStockSplit function",
        reference: { label: "stock split recording function" },
      },
      {
        start: 1400,
        registered: "splitHistory array",
        reference: { label: "split history" },
      },
    ],
  ),
  applicableLegends: agreementNodes<StockReference>(
    "The following restrictive legends are, or may from time to time become, applicable to the Stock Ledger Entry Token(s) issued to the Investor hereunder and the Tokenized Shares represented thereby. The currently applicable restrictive legends (as the same may be modified, removed or added in accordance with the COI, the Bylaws and applicable law) will be reflected in the “Legends” metadata field of the applicable Stock Ledger Entry Token in the Tokenized Stock Ledger System.",
    [
      {
        start: 373,
        registered: "“Legends” metadata field",
        reference: { label: "list of restrictive legends" },
      },
    ],
  ),
};

export const stockParameters = [
  {
    key: "issuer",
    title: "Issuer (the Company)",
    body: agreementNodes<StockReference>(
      "The entity identified as the Company in the partyValues for the Company in the Registered Deal Data, including by its legal name, entity type and jurisdiction of incorporation or formation",
      [
        {
          start: 44,
          registered: "partyValues for the Company",
          reference: { label: "recorded company particulars" },
        },
      ],
    ),
  },
  {
    key: "shareClass",
    title: "Share Class",
    body: agreementNodes<StockReference>(
      "As set forth in the shareClassKey field of the ShareData maintained by the CyberCertPrinter",
      [
        {
          start: 20,
          registered: "shareClassKey field",
          reference: { label: "share class identifier" },
        },
      ],
    ),
  },
  {
    key: "series",
    title: "Series Name (the Applicable Series)",
    body: agreementNodes<StockReference>(
      "As set forth in the seriesName field of the ShareData",
      [
        {
          start: 20,
          registered: "seriesName field",
          reference: { label: "series name" },
        },
      ],
    ),
  },
  {
    key: "parValue",
    title: "Par Value Per Share",
    body: agreementNodes<StockReference>(
      "As set forth in the parValue field of the ShareData",
      [
        {
          start: 20,
          registered: "parValue field",
          reference: { label: "par value" },
        },
      ],
    ),
  },
  {
    key: "issuePrice",
    title:
      "Original Issue Price (per Tokenized Share of the Applicable Series)",
    body: agreementNodes<StockReference>(
      "As set forth in the originalIssuePrice field of the ShareData",
      [
        {
          start: 20,
          registered: "originalIssuePrice field",
          reference: { label: "original issue price" },
        },
      ],
    ),
  },
  {
    key: "count",
    title: "Number of Tokenized Shares Being Purchased by the Investor",
    body: agreementNodes<StockReference>(
      "As set forth in the Registered Deal Data",
      [
        {
          start: 0,
          registered: "As set forth in the Registered Deal Data",
          reference: { value: "exhibitCount" },
        },
      ],
    ),
  },
  {
    key: "price",
    title: "Purchase Price Per Share",
    body: agreementNodes<StockReference>(
      "As set forth in the Registered Deal Data, which shall equal the Original Issue Price for the Applicable Series as set forth in the ShareData",
      [
        {
          start: 0,
          registered: "As set forth in the Registered Deal Data",
          reference: { value: "exhibitPrice" },
        },
      ],
    ),
  },
  {
    key: "aggregate",
    title: "Aggregate Purchase Amount",
    body: agreementNodes<StockReference>(
      "Number of Tokenized Shares × Purchase Price Per Share, payable in Purchase Amount Tokens consisting of the Denomination Token specified in the Registered Deal Data",
      [
        {
          start: 103,
          registered:
            "the Denomination Token specified in the Registered Deal Data",
          reference: { value: "paymentToken" },
        },
      ],
    ),
  },
  {
    key: "paid",
    title: "Partly Paid Status",
    body: agreementNodes<StockReference>(
      "For Stock Purchases under this template, isPartlyPaid shall be false, and amountPaid shall equal totalConsideration shall equal the Aggregate Purchase Amount, such that each Tokenized Share constituting the Stock is fully paid and nonassessable under DGCL §§152 and 156",
      [
        {
          start: 41,
          registered: "isPartlyPaid shall be false",
          reference: { label: "the shares shall not be partly paid" },
        },
        {
          start: 74,
          registered: "amountPaid",
          reference: { label: "the amount paid" },
        },
        {
          start: 97,
          registered: "totalConsideration",
          reference: { label: "the total consideration" },
        },
      ],
    ),
  },
  {
    key: "voting",
    title: "Voting Rights",
    body: agreementNodes<StockReference>(
      "As set forth in the votesPerShare, hasClassVotingRights and hasSeriesVotingRights fields of the ShareData, the COI and applicable law",
      [
        {
          start: 20,
          registered:
            "votesPerShare, hasClassVotingRights and hasSeriesVotingRights fields",
          reference: {
            label:
              "records of votes per share, class voting rights and series voting rights",
          },
        },
      ],
    ),
  },
  {
    key: "liquidation",
    title: "Liquidation Preference",
    body: agreementNodes<StockReference>(
      "As set forth in the liquidationPreferenceMultiple, liquidationPreferenceType, participationCap, seniorityRank and dividendIncreasesLiquidationAmount fields of the ShareData, and the COI",
      [
        {
          start: 20,
          registered:
            "liquidationPreferenceMultiple, liquidationPreferenceType, participationCap, seniorityRank and dividendIncreasesLiquidationAmount fields",
          reference: {
            label:
              "records of the liquidation preference multiple and type, participation cap, seniority rank and whether dividends increase the liquidation amount",
          },
        },
      ],
    ),
  },
  {
    key: "conversion",
    title: "Conversion",
    body: agreementNodes<StockReference>(
      "As set forth in the isConvertible, conversionPrice, antiDilutionType, targetConversionSeriesId, allowsFractionalConversion and hasMandatoryConversion fields of the ShareData, the mandatoryConversionTriggers array of the ShareData, and the COI",
      [
        {
          start: 20,
          registered:
            "isConvertible, conversionPrice, antiDilutionType, targetConversionSeriesId, allowsFractionalConversion and hasMandatoryConversion fields",
          reference: {
            label:
              "records of convertibility, conversion price, anti-dilution type, target conversion series, fractional conversion and mandatory conversion",
          },
        },
        {
          start: 179,
          registered: "mandatoryConversionTriggers array",
          reference: { label: "list of mandatory conversion triggers" },
        },
      ],
    ),
  },
  {
    key: "dividends",
    title: "Dividends",
    body: agreementNodes<StockReference>(
      "As set forth in the dividendType, dividendRate, dividendAccrualStartDate and dividendCompounding fields of the ShareData, and the COI",
      [
        {
          start: 20,
          registered:
            "dividendType, dividendRate, dividendAccrualStartDate and dividendCompounding fields",
          reference: {
            label:
              "records of dividend type, rate, accrual start date and compounding",
          },
        },
      ],
    ),
  },
  {
    key: "protective",
    title: "Protective Provisions",
    body: agreementNodes<StockReference>(
      "As set forth in the specialVotingRights array of the ShareData (which captures any protective provisions as entries with isVetoRight set to true), and the COI",
      [
        {
          start: 20,
          registered: "specialVotingRights array",
          reference: { label: "list of special voting rights" },
        },
        {
          start: 108,
          registered: "entries with isVetoRight set to true",
          reference: { label: "entries designated as veto rights" },
        },
      ],
    ),
  },
  {
    key: "restrictions",
    title: "Transfer Restrictions",
    body: agreementNodes<StockReference>(
      "As set forth in the transferRestrictions array of the ShareData, the Bylaws, the Transaction Agreements (if any), and applicable securities laws",
      [
        {
          start: 20,
          registered: "transferRestrictions array",
          reference: { label: "list of transfer restrictions" },
        },
      ],
    ),
  },
  {
    key: "redemption",
    title: "Redemption Rights",
    body: agreementNodes<StockReference>(
      "As set forth in the isRedeemable, redemptionType, redemptionPrice, redemptionSchedule and redemptionTriggerDescription fields of the ShareData, and the COI",
      [
        {
          start: 20,
          registered:
            "isRedeemable, redemptionType, redemptionPrice, redemptionSchedule and redemptionTriggerDescription fields",
          reference: {
            label:
              "records of redeemability, redemption type, price, schedule and triggers",
          },
        },
      ],
    ),
  },
  {
    key: "authorized",
    title: "Authorized Shares of the Applicable Series",
    body: agreementNodes<StockReference>(
      "As set forth in the authorizedShares field of the ShareData and the COI",
      [
        {
          start: 20,
          registered: "authorizedShares field",
          reference: { label: "authorized share count" },
        },
      ],
    ),
  },
  {
    key: "seats",
    title: "Designated Board Seats (if any)",
    body: agreementNodes<StockReference>(
      "As set forth in the designatedBoardSeats field of the ShareData, and the COI, Bylaws or Transaction Agreements as applicable",
      [
        {
          start: 20,
          registered: "designatedBoardSeats field",
          reference: { label: "designated board seat count" },
        },
      ],
    ),
  },
  {
    key: "payToPlay",
    title: "Pay-to-Play",
    body: agreementNodes<StockReference>(
      "As set forth in the hasPayToPlay and payToPlayTermsURI fields of the ShareData, the COI and the Transaction Agreements (if any)",
      [
        {
          start: 20,
          registered: "hasPayToPlay and payToPlayTermsURI fields",
          reference: {
            label:
              "records of whether pay-to-play applies and where to find its terms",
          },
        },
      ],
    ),
  },
  {
    key: "registration",
    title: "Registration Rights",
    body: agreementNodes<StockReference>(
      "As set forth in the hasRegistrationRights and registrationRightsURI fields of the ShareData, and the Transaction Agreements (if any)",
      [
        {
          start: 20,
          registered: "hasRegistrationRights and registrationRightsURI fields",
          reference: {
            label:
              "records of whether registration rights apply and where to find their terms",
          },
        },
      ],
    ),
  },
  {
    key: "proRata",
    title: "Pro Rata Rights",
    body: agreementNodes<StockReference>(
      "As set forth in the hasProRataRights field of the ShareData, the COI and the Transaction Agreements (if any)",
      [
        {
          start: 20,
          registered: "hasProRataRights field",
          reference: { label: "record of whether pro rata rights apply" },
        },
      ],
    ),
  },
  {
    key: "information",
    title: "Information Rights",
    body: agreementNodes<StockReference>(
      "As set forth in the hasInformationRights field of the ShareData, and the Transaction Agreements (if any)",
      [
        {
          start: 20,
          registered: "hasInformationRights field",
          reference: { label: "record of whether information rights apply" },
        },
      ],
    ),
  },
  {
    key: "dragAlong",
    title: "Drag-Along Rights",
    body: agreementNodes<StockReference>(
      "As set forth in the hasDragAlongRights and dragAlongTermsURI fields of the ShareData, the COI and the Transaction Agreements (if any)",
      [
        {
          start: 20,
          registered: "hasDragAlongRights and dragAlongTermsURI fields",
          reference: {
            label:
              "records of whether drag-along rights apply and where to find their terms",
          },
        },
      ],
    ),
  },
  {
    key: "holding",
    title: "Rule 144 Holding Period",
    body: agreementNodes<StockReference>(
      'Commences on the date of issuance of the relevant Stock Ledger Entry Token, except where holdingPeriodTackingApplied in the CertificateData of the ShareData is set to true, in which case tacking from a prior holder applies in accordance with Rule 144 and the metadata of the predecessor Stock Ledger Entry Token from which tacking is claimed."',
      [
        {
          start: 89,
          registered:
            "holdingPeriodTackingApplied in the CertificateData of the ShareData is set to true",
          reference: {
            label:
              "the certificate details in the ShareData record that holding-period tacking applies",
          },
        },
      ],
    ),
  },
  {
    key: "representation",
    title: "Onchain Representation",
    body: agreementNodes<StockReference>(
      "One or more Stock Ledger Entry Tokens (ERC-721) minted by the CyberCertPrinter, with representationType = Tokenized, and with the foregoing parameters reflected in the ShareData metadata as described in the ShareExtension Smart Contract.",
      [
        {
          start: 85,
          registered: "representationType = Tokenized",
          reference: { label: "the representation recorded as tokenized" },
        },
      ],
    ),
  },
] as const;

export type StockParameter = (typeof stockParameters)[number]["key"];
export type StockCertificateReading = {
  certificate?: string;
  parameters: Partial<Record<StockParameter, string[]>>;
  additional: string[];
};
