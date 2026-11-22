/** Generated from cybercorps-contracts v5 `forge build` output. */
export const iLedgerEntryTokenAbi = [
  {
    type: "function",
    name: "acquisitionTimestamp",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "addCertLegend",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "newLegend",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addCertRestrictiveLegend",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "newLegend",
        type: "tuple",
        internalType: "struct RestrictiveLegend",
        components: [
          {
            name: "restrictionType",
            type: "uint8",
            internalType: "enum RestrictionType",
          },
          {
            name: "title",
            type: "string",
            internalType: "string",
          },
          {
            name: "text",
            type: "string",
            internalType: "string",
          },
          {
            name: "jurisdiction",
            type: "string",
            internalType: "string",
          },
          {
            name: "referenceId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "effectiveTimestamp",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "expirationTimestamp",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "active",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addDefaultLegend",
    inputs: [
      {
        name: "newLegend",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addDefaultRestrictiveLegend",
    inputs: [
      {
        name: "newLegend",
        type: "tuple",
        internalType: "struct RestrictiveLegend",
        components: [
          {
            name: "restrictionType",
            type: "uint8",
            internalType: "enum RestrictionType",
          },
          {
            name: "title",
            type: "string",
            internalType: "string",
          },
          {
            name: "text",
            type: "string",
            internalType: "string",
          },
          {
            name: "jurisdiction",
            type: "string",
            internalType: "string",
          },
          {
            name: "referenceId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "effectiveTimestamp",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "expirationTimestamp",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "active",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addEndorsement",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "newEndorsement",
        type: "tuple",
        internalType: "struct Endorsement",
        components: [
          {
            name: "endorser",
            type: "address",
            internalType: "address",
          },
          {
            name: "timestamp",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "signatureHash",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "registry",
            type: "address",
            internalType: "address",
          },
          {
            name: "agreementId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "endorsee",
            type: "address",
            internalType: "address",
          },
          {
            name: "endorseeName",
            type: "string",
            internalType: "string",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addIssuerSignature",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "signature",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "approve",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "assignCert",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "details",
        type: "tuple",
        internalType: "struct CertificateDetails",
        components: [
          {
            name: "signingOfficerName",
            type: "string",
            internalType: "string",
          },
          {
            name: "signingOfficerTitle",
            type: "string",
            internalType: "string",
          },
          {
            name: "investmentAmountUSD",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "issuerUSDValuationAtTimeOfInvestment",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "unitsRepresented",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "legalDetails",
            type: "string",
            internalType: "string",
          },
          {
            name: "extensionData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
      {
        name: "name",
        type: "string",
        internalType: "string",
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
    name: "backfillAcquisitionTimestamps",
    inputs: [
      {
        name: "startIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "count",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "backfillLookThroughTally",
    inputs: [
      {
        name: "startIndex",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "count",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "balanceOf",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "balance",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "balanceOfLegalOwner",
    inputs: [
      {
        name: "owner",
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
    type: "function",
    name: "certificateUri",
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
    name: "decreaseUnitsReserved",
    inputs: [
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
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "defaultLegend",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "string[]",
        internalType: "string[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "defaultRestrictiveLegends",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "tuple[]",
        internalType: "struct RestrictiveLegend[]",
        components: [
          {
            name: "restrictionType",
            type: "uint8",
            internalType: "enum RestrictionType",
          },
          {
            name: "title",
            type: "string",
            internalType: "string",
          },
          {
            name: "text",
            type: "string",
            internalType: "string",
          },
          {
            name: "jurisdiction",
            type: "string",
            internalType: "string",
          },
          {
            name: "referenceId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "effectiveTimestamp",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "expirationTimestamp",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "active",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "endorseAndTransfer",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "newEndorsement",
        type: "tuple",
        internalType: "struct Endorsement",
        components: [
          {
            name: "endorser",
            type: "address",
            internalType: "address",
          },
          {
            name: "timestamp",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "signatureHash",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "registry",
            type: "address",
            internalType: "address",
          },
          {
            name: "agreementId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "endorsee",
            type: "address",
            internalType: "address",
          },
          {
            name: "endorseeName",
            type: "string",
            internalType: "string",
          },
        ],
      },
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "endorseCertificate",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "endorser",
        type: "address",
        internalType: "address",
      },
      {
        name: "signature",
        type: "bytes",
        internalType: "bytes",
      },
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
    name: "getActiveCertificateDetails",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct CertificateDetails",
        components: [
          {
            name: "signingOfficerName",
            type: "string",
            internalType: "string",
          },
          {
            name: "signingOfficerTitle",
            type: "string",
            internalType: "string",
          },
          {
            name: "investmentAmountUSD",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "issuerUSDValuationAtTimeOfInvestment",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "unitsRepresented",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "legalDetails",
            type: "string",
            internalType: "string",
          },
          {
            name: "extensionData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getApproved",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCertRestrictiveLegendAt",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct RestrictiveLegend",
        components: [
          {
            name: "restrictionType",
            type: "uint8",
            internalType: "enum RestrictionType",
          },
          {
            name: "title",
            type: "string",
            internalType: "string",
          },
          {
            name: "text",
            type: "string",
            internalType: "string",
          },
          {
            name: "jurisdiction",
            type: "string",
            internalType: "string",
          },
          {
            name: "referenceId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "effectiveTimestamp",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "expirationTimestamp",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "active",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCertRestrictiveLegendCount",
    inputs: [
      {
        name: "tokenId",
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
    name: "getCertificateDetails",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct CertificateDetails",
        components: [
          {
            name: "signingOfficerName",
            type: "string",
            internalType: "string",
          },
          {
            name: "signingOfficerTitle",
            type: "string",
            internalType: "string",
          },
          {
            name: "investmentAmountUSD",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "issuerUSDValuationAtTimeOfInvestment",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "unitsRepresented",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "legalDetails",
            type: "string",
            internalType: "string",
          },
          {
            name: "extensionData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDefaultRestrictiveLegendAt",
    inputs: [
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct RestrictiveLegend",
        components: [
          {
            name: "restrictionType",
            type: "uint8",
            internalType: "enum RestrictionType",
          },
          {
            name: "title",
            type: "string",
            internalType: "string",
          },
          {
            name: "text",
            type: "string",
            internalType: "string",
          },
          {
            name: "jurisdiction",
            type: "string",
            internalType: "string",
          },
          {
            name: "referenceId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "effectiveTimestamp",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "expirationTimestamp",
            type: "uint64",
            internalType: "uint64",
          },
          {
            name: "active",
            type: "bool",
            internalType: "bool",
          },
          {
            name: "data",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDefaultRestrictiveLegendCount",
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
    name: "getEndorsementHistory",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "endorser",
        type: "address",
        internalType: "address",
      },
      {
        name: "endorseeName",
        type: "string",
        internalType: "string",
      },
      {
        name: "registry",
        type: "address",
        internalType: "address",
      },
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "timestamp",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "signatureHash",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "endorsee",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getExtension",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
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
    name: "getIssuerSignatureAt",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getIssuerSignatureCount",
    inputs: [
      {
        name: "tokenId",
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
    name: "getSeriesInfo",
    inputs: [],
    outputs: [
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
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "holderCount",
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
    name: "increaseUnitsReserved",
    inputs: [
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
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "defaultLegend",
        type: "string[]",
        internalType: "string[]",
      },
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
      {
        name: "ticker",
        type: "string",
        internalType: "string",
      },
      {
        name: "_certificateUri",
        type: "string",
        internalType: "string",
      },
      {
        name: "_issuanceManager",
        type: "address",
        internalType: "address",
      },
      {
        name: "_securityType",
        type: "uint8",
        internalType: "enum SecurityClass",
      },
      {
        name: "_securitySeries",
        type: "uint8",
        internalType: "enum SecuritySeries",
      },
      {
        name: "_extension",
        type: "address",
        internalType: "address",
      },
      {
        name: "_seriesData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isApprovedForAll",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        internalType: "address",
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
    name: "isLegalHolder",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
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
    name: "isTokenLegalTransferable",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
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
    name: "isVoided",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
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
    name: "issuanceManager",
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
    name: "issueTimestamp",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "legalOwnerOf",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
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
    name: "legalTransferable",
    inputs: [],
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
    name: "lookThroughBadge",
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
    name: "lookThroughHolderCount",
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
    name: "name",
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
    name: "ownerOf",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "removeCertLegendAt",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeCertRestrictiveLegendAt",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeDefaultLegendAt",
    inputs: [
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeDefaultRestrictiveLegendAt",
    inputs: [
      {
        name: "index",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "resyncHolder",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "resyncHolders",
    inputs: [
      {
        name: "owners",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "safeMint",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "details",
        type: "tuple",
        internalType: "struct CertificateDetails",
        components: [
          {
            name: "signingOfficerName",
            type: "string",
            internalType: "string",
          },
          {
            name: "signingOfficerTitle",
            type: "string",
            internalType: "string",
          },
          {
            name: "investmentAmountUSD",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "issuerUSDValuationAtTimeOfInvestment",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "unitsRepresented",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "legalDetails",
            type: "string",
            internalType: "string",
          },
          {
            name: "extensionData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
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
    name: "safeMintAndAssign",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "details",
        type: "tuple",
        internalType: "struct CertificateDetails",
        components: [
          {
            name: "signingOfficerName",
            type: "string",
            internalType: "string",
          },
          {
            name: "signingOfficerTitle",
            type: "string",
            internalType: "string",
          },
          {
            name: "investmentAmountUSD",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "issuerUSDValuationAtTimeOfInvestment",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "unitsRepresented",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "legalDetails",
            type: "string",
            internalType: "string",
          },
          {
            name: "extensionData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
      {
        name: "ownerName",
        type: "string",
        internalType: "string",
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
    name: "safeMintAndAssign",
    inputs: [
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "details",
        type: "tuple",
        internalType: "struct CertificateDetails",
        components: [
          {
            name: "signingOfficerName",
            type: "string",
            internalType: "string",
          },
          {
            name: "signingOfficerTitle",
            type: "string",
            internalType: "string",
          },
          {
            name: "investmentAmountUSD",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "issuerUSDValuationAtTimeOfInvestment",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "unitsRepresented",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "legalDetails",
            type: "string",
            internalType: "string",
          },
          {
            name: "extensionData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
      {
        name: "investorName",
        type: "string",
        internalType: "string",
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
    name: "safeMintFromAndAssign",
    inputs: [
      {
        name: "sourceTokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "details",
        type: "tuple",
        internalType: "struct CertificateDetails",
        components: [
          {
            name: "signingOfficerName",
            type: "string",
            internalType: "string",
          },
          {
            name: "signingOfficerTitle",
            type: "string",
            internalType: "string",
          },
          {
            name: "investmentAmountUSD",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "issuerUSDValuationAtTimeOfInvestment",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "unitsRepresented",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "legalDetails",
            type: "string",
            internalType: "string",
          },
          {
            name: "extensionData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
      {
        name: "ownerName",
        type: "string",
        internalType: "string",
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
    name: "safeTransferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "safeTransferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "data",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setAcquisitionTimestamp",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "ts",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setApprovalForAll",
    inputs: [
      {
        name: "operator",
        type: "address",
        internalType: "address",
      },
      {
        name: "approved",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setGlobalLegalTransferable",
    inputs: [
      {
        name: "value",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setGlobalRestrictionHook",
    inputs: [
      {
        name: "hookAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setGlobalTransferable",
    inputs: [
      {
        name: "_transferable",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setIssueTimestamp",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "ts",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setLookThroughBadge",
    inputs: [
      {
        name: "badge",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRestrictionHook",
    inputs: [
      {
        name: "_id",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_hookAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setSeriesData",
    inputs: [
      {
        name: "_seriesData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setTokenLegalTransferable",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "value",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setTokenTransferable",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "value",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "supportsInterface",
    inputs: [
      {
        name: "interfaceId",
        type: "bytes4",
        internalType: "bytes4",
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
    name: "symbol",
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
    name: "tokenByIndex",
    inputs: [
      {
        name: "index",
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
    name: "tokenOfLegalOwnerByIndex",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "index",
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
    name: "tokenOfOwnerByIndex",
    inputs: [
      {
        name: "owner",
        type: "address",
        internalType: "address",
      },
      {
        name: "index",
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
    name: "tokenURI",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
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
    name: "totalSupply",
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
    name: "transferFrom",
    inputs: [
      {
        name: "from",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "unitsReserved",
    inputs: [
      {
        name: "tokenId",
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
    name: "unvoidCert",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateCertificateDetails",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "details",
        type: "tuple",
        internalType: "struct CertificateDetails",
        components: [
          {
            name: "signingOfficerName",
            type: "string",
            internalType: "string",
          },
          {
            name: "signingOfficerTitle",
            type: "string",
            internalType: "string",
          },
          {
            name: "investmentAmountUSD",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "issuerUSDValuationAtTimeOfInvestment",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "unitsRepresented",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "legalDetails",
            type: "string",
            internalType: "string",
          },
          {
            name: "extensionData",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateCertificateTackedFromAcquisitionDate",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "ts",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateDefaultLegend",
    inputs: [
      {
        name: "_ledger",
        type: "string[]",
        internalType: "string[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateIssuanceManager",
    inputs: [
      {
        name: "_issuanceManager",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "usLookThroughHolderCount",
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
    name: "usTallyExpiry",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "uint64",
        internalType: "uint64",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "voidCert",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "AcquisitionTimestampSet",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "acquisitionTimestamp",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Approval",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "approved",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ApprovalForAll",
    inputs: [
      {
        name: "owner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "operator",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "approved",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CertLegendsChanged",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CertificateAssigned",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwnerName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "issuerName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CertificateCreated",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "investor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "amount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "cap",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CertificateDetailsUpdated",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CertificateEndorsed",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "endorser",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "endorsee",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "endorseeName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "registry",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "agreementId",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "index",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CertificateSigned",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "signature",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CertificateUnvoided",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CertificateVoided",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "timestamp",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Converted",
    inputs: [
      {
        name: "oldTokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "newTokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CyberCertPrinter_CertificateCreated",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CyberCertTransfer",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DefaultLegendsChanged",
    inputs: [],
    anonymous: false,
  },
  {
    type: "event",
    name: "GlobalLegalTransferableSet",
    inputs: [
      {
        name: "legalTransferable",
        type: "bool",
        indexed: true,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "GlobalRestrictionHookSet",
    inputs: [
      {
        name: "hookAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "GlobalTransferableSet",
    inputs: [
      {
        name: "transferable",
        type: "bool",
        indexed: true,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "HookStatusChanged",
    inputs: [
      {
        name: "enabled",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "IssuanceManagerUpdated",
    inputs: [
      {
        name: "issuanceManager",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "previousIssuanceManager",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "IssueTimestampSet",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "issueTimestamp",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "LegalOwnerChanged",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newOwnerName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "acquisitionTimestamp",
        type: "uint64",
        indexed: false,
        internalType: "uint64",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "LookThroughBadgeSet",
    inputs: [
      {
        name: "badge",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RestrictionHookSet",
    inputs: [
      {
        name: "id",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "hookAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SeriesDataSet",
    inputs: [
      {
        name: "extension",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SeriesExtensionSet",
    inputs: [
      {
        name: "extension",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "TokenLegalTransferableSet",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "legalTransferable",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "Transfer",
    inputs: [
      {
        name: "from",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "UnitsReservedUpdated",
    inputs: [
      {
        name: "tokenId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "unitsReserved",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "WhitelistUpdated",
    inputs: [
      {
        name: "account",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "whitelisted",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "CertificateReserved",
    inputs: [],
  },
  {
    type: "error",
    name: "ConversionNotImplemented",
    inputs: [],
  },
  {
    type: "error",
    name: "EndorsementNotSignedOrInvalid",
    inputs: [],
  },
  {
    type: "error",
    name: "ExceedsAvailableUnits",
    inputs: [],
  },
  {
    type: "error",
    name: "ExceedsReservedUnits",
    inputs: [],
  },
  {
    type: "error",
    name: "ExtensionTypeNotSupported",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidEndorsement",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidLegendIndex",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidTokenId",
    inputs: [],
  },
  {
    type: "error",
    name: "LegalOwnerIndexOutOfBounds",
    inputs: [],
  },
  {
    type: "error",
    name: "LegalOwnerNotTransferable",
    inputs: [],
  },
  {
    type: "error",
    name: "NotIssuanceManager",
    inputs: [],
  },
  {
    type: "error",
    name: "SignatureRequired",
    inputs: [],
  },
  {
    type: "error",
    name: "TokenDoesNotExist",
    inputs: [],
  },
  {
    type: "error",
    name: "TokenNotTransferable",
    inputs: [],
  },
  {
    type: "error",
    name: "TransferRestricted",
    inputs: [
      {
        name: "reason",
        type: "string",
        internalType: "string",
      },
    ],
  },
  {
    type: "error",
    name: "URIQueryForNonexistentToken",
    inputs: [],
  },
  {
    type: "error",
    name: "URISetForNonexistentToken",
    inputs: [],
  },
  {
    type: "error",
    name: "VoidCertificate",
    inputs: [],
  },
] as const;
