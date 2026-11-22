/** Generated with solc 0.8.28 from cybercorps-contracts d0d488e6f5a45bc096604caab1aa518186cc9d06:src/interfaces/ISecondaryTradeStorage.sol. */
export const iSecondaryTradeStorageAbi = [
  {
    inputs: [],
    name: "BelowMinTradeThreshold",
    type: "error",
  },
  {
    inputs: [],
    name: "CertificateVoided",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum ExemptionPathway",
        name: "offered",
        type: "uint8",
      },
      {
        internalType: "enum ExemptionPathway",
        name: "elected",
        type: "uint8",
      },
    ],
    name: "ExemptionPathwayMismatch",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "enum ExemptionPathway",
        name: "pathway",
        type: "uint8",
      },
    ],
    name: "ExemptionPathwayNotEnabled",
    type: "error",
  },
  {
    inputs: [],
    name: "ExemptionPathwayRequired",
    type: "error",
  },
  {
    inputs: [],
    name: "IntegratorNotWhitelisted",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSecondaryAuthSignature",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidSecondaryCondition",
    type: "error",
  },
  {
    inputs: [],
    name: "MissingAdminMultisig",
    type: "error",
  },
  {
    inputs: [],
    name: "MissingCertPrinter",
    type: "error",
  },
  {
    inputs: [],
    name: "NotCertOwner",
    type: "error",
  },
  {
    inputs: [],
    name: "NotOfferor",
    type: "error",
  },
  {
    inputs: [],
    name: "NotPartyToAgreement",
    type: "error",
  },
  {
    inputs: [],
    name: "NotSigner",
    type: "error",
  },
  {
    inputs: [],
    name: "OfferAlreadyExists",
    type: "error",
  },
  {
    inputs: [],
    name: "OfferExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "OfferNotAvailable",
    type: "error",
  },
  {
    inputs: [],
    name: "SecondaryAuthReplayed",
    type: "error",
  },
  {
    inputs: [],
    name: "SecondaryConditionAlreadyExists",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "condition",
        type: "address",
      },
    ],
    name: "SecondaryConditionInterfaceUnsupported",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "condition",
        type: "address",
      },
    ],
    name: "SecondaryConditionsNotMet",
    type: "error",
  },
  {
    inputs: [],
    name: "SecondaryEscrowNotFound",
    type: "error",
  },
  {
    inputs: [],
    name: "SecondaryTradeAgreementAlreadyFinalized",
    type: "error",
  },
  {
    inputs: [],
    name: "SecondaryTradeAgreementAlreadyVoided",
    type: "error",
  },
  {
    inputs: [],
    name: "SecondaryTradeAgreementExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "SecondaryTradeAgreementNotExpired",
    type: "error",
  },
  {
    inputs: [],
    name: "SecondaryTradeAgreementNotVoided",
    type: "error",
  },
  {
    inputs: [],
    name: "SecondaryTradeSellerOwnershipChanged",
    type: "error",
  },
  {
    inputs: [],
    name: "UnitsExceedOffer",
    type: "error",
  },
  {
    inputs: [],
    name: "UnknownCertPrinter",
    type: "error",
  },
  {
    inputs: [],
    name: "ZeroConsiderationFill",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "conditions",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "address",
        name: "setter",
        type: "address",
      },
    ],
    name: "ClosingConditionsSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "offerId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "settlementAgreementId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "acceptor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "units",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "paymentAmount",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "acceptedAt",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "agreementExpiry",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "string",
        name: "buyerName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "enum HostingMode",
        name: "buyerHostingMode",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "address",
        name: "adminMultisig",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "openEndorsementSig",
        type: "bytes",
      },
      {
        indexed: false,
        internalType: "enum ExemptionPathway",
        name: "exemptionPathway",
        type: "uint8",
      },
    ],
    name: "OfferAccepted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "offerId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "offeror",
        type: "address",
      },
    ],
    name: "OfferCancelled",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "offerId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "offeror",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "certPrinter",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "spvAddress",
        type: "address",
      },
      {
        indexed: false,
        internalType: "enum OfferSide",
        name: "side",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokenId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "units",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "paymentToken",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "consideration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "enum ExemptionPathway",
        name: "expectedExemptionPathway",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "validUntil",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "integrator",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes32",
        name: "templateId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "string",
        name: "buyerName",
        type: "string",
      },
      {
        indexed: false,
        internalType: "enum HostingMode",
        name: "buyerHostingMode",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "address",
        name: "adminMultisig",
        type: "address",
      },
      {
        indexed: false,
        internalType: "bytes",
        name: "counterpartyRestrictions",
        type: "bytes",
      },
    ],
    name: "OfferPosted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "enum ExemptionPathway",
        name: "pathway",
        type: "uint8",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "conditions",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "enabled",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "address",
        name: "setter",
        type: "address",
      },
    ],
    name: "PathwayThresholdConditionsSet",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "agreementId",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "feeToken",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "feeDestination",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "integratorFee",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "platformFee",
        type: "uint256",
      },
    ],
    name: "SecondaryFeeDistributed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "agreementId",
        type: "bytes32",
      },
      {
        indexed: false,
        internalType: "address",
        name: "seller",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "buyer",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "units",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "consideration",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "thresholdConditions",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "address[]",
        name: "closingConditions",
        type: "address[]",
      },
    ],
    name: "SecondaryTradeAgreementFinalized",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "agreementId",
        type: "bytes32",
      },
    ],
    name: "SecondaryTradeAgreementVoided",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address[]",
        name: "conditions",
        type: "address[]",
      },
      {
        indexed: false,
        internalType: "address",
        name: "setter",
        type: "address",
      },
    ],
    name: "SpvThresholdConditionsSet",
    type: "event",
  },
] as const;
