/**
 * Generated from cybercorps-contracts `forge build` output of RoundManager
 * DEPLOY_VERSION "5.1" (develop 8463cd0). It is a strict superset of the
 * version 5 ABI: every version 5 item keeps its exact signature, and the
 * minimum-raise functions, events and errors are added. A version 5 Round
 * Manager does not implement the added items; check the version first
 * (features/roundMinimum).
 */
export const roundManagerAbi = [
  {
    type: "constructor",
    inputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "AUTH",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract BorgAuth",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "DEPLOY_VERSION",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "SETTLE_WINDOW",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "UPGRADE_INTERFACE_VERSION",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string",
        internalType: "string",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "allocate",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "allocatedAmount",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "closeRoundNow",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "computeFee",
    inputs: [
      {
        name: "size",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "conditionCheck",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "createRound",
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
        name: "certData",
        type: "tuple[]",
        internalType: "struct CyberCertData[]",
        components: [
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "symbol",
            type: "string",
            internalType: "string",
          },
          {
            name: "uri",
            type: "string",
            internalType: "string",
          },
          {
            name: "securityClass",
            type: "uint8",
            internalType: "enum SecurityClass",
          },
          {
            name: "securitySeries",
            type: "uint8",
            internalType: "enum SecuritySeries",
          },
          {
            name: "extension",
            type: "address",
            internalType: "address",
          },
          {
            name: "seriesData",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "defaultLegend",
            type: "string[]",
            internalType: "string[]",
          },
        ],
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
  {
    type: "function",
    name: "createRoundWithMinimum",
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
        name: "certData",
        type: "tuple[]",
        internalType: "struct CyberCertData[]",
        components: [
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "symbol",
            type: "string",
            internalType: "string",
          },
          {
            name: "uri",
            type: "string",
            internalType: "string",
          },
          {
            name: "securityClass",
            type: "uint8",
            internalType: "enum SecurityClass",
          },
          {
            name: "securitySeries",
            type: "uint8",
            internalType: "enum SecuritySeries",
          },
          {
            name: "extension",
            type: "address",
            internalType: "address",
          },
          {
            name: "seriesData",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "defaultLegend",
            type: "string[]",
            internalType: "string[]",
          },
        ],
      },
      {
        name: "minRaise",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "deadline",
        type: "uint256",
        internalType: "uint256",
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
  {
    type: "function",
    name: "createRoundWithPrintersAndMinimum",
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
      {
        name: "minRaise",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "deadline",
        type: "uint256",
        internalType: "uint256",
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
  {
    type: "function",
    name: "getCommittedAmount",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEscrowDetails",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct Escrow",
        components: [
          {
            name: "agreementId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "counterParty",
            type: "address",
            internalType: "address",
          },
          {
            name: "corpAssets",
            type: "tuple[]",
            internalType: "struct Token[]",
            components: [
              {
                name: "tokenType",
                type: "uint8",
                internalType: "enum TokenType",
              },
              {
                name: "tokenAddress",
                type: "address",
                internalType: "address",
              },
              {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "isFee",
                type: "bool",
                internalType: "bool",
              },
            ],
          },
          {
            name: "buyerAssets",
            type: "tuple[]",
            internalType: "struct Token[]",
            components: [
              {
                name: "tokenType",
                type: "uint8",
                internalType: "enum TokenType",
              },
              {
                name: "tokenAddress",
                type: "address",
                internalType: "address",
              },
              {
                name: "tokenId",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "amount",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "isFee",
                type: "bool",
                internalType: "bool",
              },
            ],
          },
          {
            name: "signature",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "expiry",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "status",
            type: "uint8",
            internalType: "enum EscrowStatus",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getLexChex",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPlatformPayable",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPrimarySecurity",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "cls",
        type: "uint8",
        internalType: "enum SecurityClass",
      },
      {
        name: "series",
        type: "uint8",
        internalType: "enum SecuritySeries",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRound",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
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
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoundMinimum",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "minRaise",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "deadline",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "met",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "raised",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "committed",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getRoundPriceInfo",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
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
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "_auth",
        type: "address",
        internalType: "address",
      },
      {
        name: "_corp",
        type: "address",
        internalType: "address",
      },
      {
        name: "_dealRegistry",
        type: "address",
        internalType: "address",
      },
      {
        name: "_issuanceManager",
        type: "address",
        internalType: "address",
      },
      {
        name: "_upgradeFactory",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "issuanceManager",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IIssuanceManager",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "markMinimumMet",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "committedIds",
        type: "bytes32[]",
        internalType: "bytes32[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "onERC1155Received",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "onERC721Received",
    inputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "address",
        internalType: "address",
      },
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes4",
        internalType: "bytes4",
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "proxiableUUID",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "recallEOI",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "recallEOI",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "isVoidAgreement",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "reject",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "isVoidAgreement",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "reject",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "roundExists",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bool",
        internalType: "bool",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "setCommitments",
    inputs: [
      {
        name: "agreementIds",
        type: "bytes32[]",
        internalType: "bytes32[]",
      },
      {
        name: "amounts",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setLexChex",
    inputs: [
      {
        name: "_lexchex",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPrimarySecurity",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "cls",
        type: "uint8",
        internalType: "enum SecurityClass",
      },
      {
        name: "series",
        type: "uint8",
        internalType: "enum SecuritySeries",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRoundEndTime",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "newEndTime",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRoundMinimum",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "minRaise",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "deadline",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRoundPricePerShare",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "price",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "priceDecimals",
        type: "uint8",
        internalType: "uint8",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "settle",
    inputs: [
      {
        name: "agreementIds",
        type: "bytes32[]",
        internalType: "bytes32[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "submitEOI",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "eoi",
        type: "tuple",
        internalType: "struct EOI",
        components: [
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "investorType",
            type: "string",
            internalType: "string",
          },
          {
            name: "jurisdiction",
            type: "string",
            internalType: "string",
          },
          {
            name: "contact",
            type: "string",
            internalType: "string",
          },
          {
            name: "minAmount",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "maxAmount",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "expiry",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "naturalPerson",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "lexchexDetails",
            type: "tuple",
            internalType: "struct LexChexDetails",
            components: [
              {
                name: "request",
                type: "tuple",
                internalType: "struct MintRequest",
                components: [
                  {
                    name: "uuid",
                    type: "uint256",
                    internalType: "uint256",
                  },
                  {
                    name: "owner",
                    type: "address",
                    internalType: "address",
                  },
                  {
                    name: "investorName",
                    type: "string",
                    internalType: "string",
                  },
                  {
                    name: "investorType",
                    type: "string",
                    internalType: "string",
                  },
                  {
                    name: "investorJurisdiction",
                    type: "string",
                    internalType: "string",
                  },
                  {
                    name: "investorContact",
                    type: "string",
                    internalType: "string",
                  },
                  {
                    name: "mintPrice",
                    type: "uint256",
                    internalType: "uint256",
                  },
                  {
                    name: "expiry",
                    type: "uint256",
                    internalType: "uint256",
                  },
                  {
                    name: "paymentToken",
                    type: "address",
                    internalType: "address",
                  },
                ],
              },
              {
                name: "templateId",
                type: "bytes32",
                internalType: "bytes32",
              },
              {
                name: "salt",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "globalValues",
                type: "string[]",
                internalType: "string[]",
              },
              {
                name: "parties",
                type: "address[]",
                internalType: "address[]",
              },
              {
                name: "partyValues",
                type: "string[][]",
                internalType: "string[][]",
              },
              {
                name: "agreementSignature",
                type: "bytes",
                internalType: "bytes",
              },
            ],
          },
        ],
      },
      {
        name: "globalValues",
        type: "string[]",
        internalType: "string[]",
      },
      {
        name: "partyValues",
        type: "string[]",
        internalType: "string[]",
      },
      {
        name: "signature",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "salt",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "conditions",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "secretHash",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "upgradeToAndCall",
    inputs: [
      {
        name: "newImplementation",
        type: "address",
        internalType: "address",
      },
      {
        name: "data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "userRoles",
    inputs: [
      {
        name: "user",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "AllocationCommitted",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "roundId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "committedTotal",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AllocationMade",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "roundId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "buyer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "allocatedAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "totalRaised",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "certIds",
        type: "uint256[]",
        indexed: false,
        internalType: "uint256[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "AllocationUncommitted",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "roundId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "committedTotal",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "EOIRecalled",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "investor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "roundId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "EOIRejected",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "investor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "roundId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "EOISubmitted",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "roundId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "investor",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "corp",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "minAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "maxAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "expiry",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Initialized",
    inputs: [
      {
        name: "version",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "LexChexUpdated",
    inputs: [
      {
        name: "lexChex",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "oldLexChex",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PMVCSubseriesLabelSet",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "pmvc",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "label",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoundClosed",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "closedAt",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoundCreated",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "corp",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "round",
        type: "tuple",
        indexed: false,
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
        name: "publicRound",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoundEndTimeUpdated",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "oldEndTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newEndTime",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoundMinimumMet",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "committedTotal",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoundMinimumSet",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "minRaise",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "deadline",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoundSnapshotSet",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "totalCapitalSecuritiesOutstanding",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "totalConvertingSecurities",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "totalOptionsIssuedAndOutstanding",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "totalPromisedOptions",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "unissuedOptionPoolPreRound",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "unissuedOptionPoolIncreaseIncludedInCalc",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "cCapUsed",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoundingPolicySet",
    inputs: [
      {
        name: "roundId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "mode",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
      {
        name: "priceDecimals",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
      {
        name: "shareDecimals",
        type: "uint8",
        indexed: false,
        internalType: "uint8",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Upgraded",
    inputs: [
      {
        name: "implementation",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "AddressEmptyCode",
    inputs: [
      {
        name: "target",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "AgreementConditionsNotMet",
    inputs: [],
  },
  {
    type: "error",
    name: "AgreementNotInRound",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "AlreadyAllocated",
    inputs: [],
  },
  {
    type: "error",
    name: "ArrayLengthMismatch",
    inputs: [],
  },
  {
    type: "error",
    name: "BorgAuthACL_ZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "CommitmentListInvalid",
    inputs: [],
  },
  {
    type: "error",
    name: "CommitmentLocked",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "DealNotPaid",
    inputs: [],
  },
  {
    type: "error",
    name: "EOIExpired",
    inputs: [],
  },
  {
    type: "error",
    name: "EOINotExpired",
    inputs: [],
  },
  {
    type: "error",
    name: "ERC1967InvalidImplementation",
    inputs: [
      {
        name: "implementation",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "ERC1967NonPayable",
    inputs: [],
  },
  {
    type: "error",
    name: "EndTimeAfterMinimumDeadline",
    inputs: [],
  },
  {
    type: "error",
    name: "EndTimeReductionRestricted",
    inputs: [],
  },
  {
    type: "error",
    name: "FailedCall",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidAllocation",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidAmount",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidCert",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidCertPrinter",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidEscrowedSignature",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidInitialization",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidIssuanceManager",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidMinimum",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidParties",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidRound",
    inputs: [],
  },
  {
    type: "error",
    name: "MinimumAlreadyMet",
    inputs: [],
  },
  {
    type: "error",
    name: "MinimumAlreadySet",
    inputs: [],
  },
  {
    type: "error",
    name: "MinimumNotMet",
    inputs: [],
  },
  {
    type: "error",
    name: "MinimumNotMet",
    inputs: [],
  },
  {
    type: "error",
    name: "NotCommitted",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "NotCommitted",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "NotCompanyOfficer",
    inputs: [
      {
        name: "signer",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "NotEOISubmitter",
    inputs: [],
  },
  {
    type: "error",
    name: "NotInitializing",
    inputs: [],
  },
  {
    type: "error",
    name: "NotRefImplementation",
    inputs: [],
  },
  {
    type: "error",
    name: "ReentrancyGuardReentrantCall",
    inputs: [],
  },
  {
    type: "error",
    name: "RoundAlreadyExists",
    inputs: [],
  },
  {
    type: "error",
    name: "RoundNotOpen",
    inputs: [],
  },
  {
    type: "error",
    name: "SafeERC20FailedOperation",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "SettleWindowTooShort",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "UUPSUnauthorizedCallContext",
    inputs: [],
  },
  {
    type: "error",
    name: "UUPSUnsupportedProxiableUUID",
    inputs: [
      {
        name: "slot",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
  },
  {
    type: "error",
    name: "ZeroAddress",
    inputs: [],
  },
] as const;
