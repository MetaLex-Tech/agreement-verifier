/**
 * `RoundManager.createRoundWithPrinters` (cybercorps-contracts PR #192), with
 * the errors only it raises. A round issues from LET contracts the company
 * already has instead of deploying new ones. Its round struct is the v5
 * `createRound` struct, so a call encodes the same round draft.
 *
 * The function is not in every deployed v5 Round Manager: callers probe the
 * company's own Round Manager (`roundManagerIssuesFromExistingPrinters`)
 * before they offer it. Verified on MetaLeX Labs' Ethereum Round Manager
 * (implementation 0x090703278cf61533b96be0b461941a22f74699d7) at block
 * 26,350,545.
 */
export const roundManagerWithPrintersAbi = [
  {
    type: "function",
    name: "createRoundWithPrinters",
    inputs: [
      {
        name: "roundDraft",
        type: "tuple",
        internalType: "struct Round",
        components: [
          {
            name: "id",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "seriesType",
            type: "uint8",
            internalType: "enum SecuritySeries",
          },
          {
            name: "raiseCap",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "minTicket",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "maxTicket",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "roundType",
            type: "uint8",
            internalType: "enum RoundType",
          },
          {
            name: "startTime",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "endTime",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "templateId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "certPrinter",
            type: "address[]",
            internalType: "address[]",
          },
          {
            name: "paymentToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "pricePerUnit",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "valuation",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "raised",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "roundConditions",
            type: "address[]",
            internalType: "address[]",
          },
          {
            name: "roundPricePerShare",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "roundPriceDecimals",
            type: "uint8",
            internalType: "uint8",
          },
          {
            name: "primarySecurityClass",
            type: "uint8",
            internalType: "enum SecurityClass",
          },
          {
            name: "primarySecuritySeries",
            type: "uint8",
            internalType: "enum SecuritySeries",
          },
          {
            name: "authorityOfficer",
            type: "address",
            internalType: "address",
          },
          {
            name: "officerName",
            type: "string",
            internalType: "string",
          },
          {
            name: "officerTitle",
            type: "string",
            internalType: "string",
          },
          {
            name: "legalDetails",
            type: "string[]",
            internalType: "string[]",
          },
          {
            name: "extensionData",
            type: "bytes[]",
            internalType: "bytes[]",
          },
          {
            name: "roundPartyValues",
            type: "string[]",
            internalType: "string[]",
          },
          {
            name: "escrowedSignature",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "publicRound",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "allowTimedOffers",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "restrictEndTimeReduction",
            type: "bool",
            internalType: "bool",
          },
        ],
      },
      {
        name: "certPrinters",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
  },
  { type: "error", name: "InvalidCertPrinter", inputs: [] },
  { type: "error", name: "DuplicateCertPrinter", inputs: [] },
] as const;
