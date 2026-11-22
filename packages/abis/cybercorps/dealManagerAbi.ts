/** Generated from cybercorps-contracts v5 `forge build` output. */
export const dealManagerAbi = [
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
    name: "acceptOffer",
    inputs: [
      {
        name: "params",
        type: "tuple",
        internalType: "struct AcceptOfferParams",
        components: [
          {
            name: "offerId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "units",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "exemptionPathway",
            type: "uint8",
            internalType: "enum ExemptionPathway",
          },
          {
            name: "buyerName",
            type: "string",
            internalType: "string",
          },
          {
            name: "buyerHostingMode",
            type: "uint8",
            internalType: "enum HostingMode",
          },
          {
            name: "adminMultisig",
            type: "address",
            internalType: "address",
          },
          {
            name: "sellerTokenId",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "acceptorPartyValues",
            type: "string[]",
            internalType: "string[]",
          },
          {
            name: "acceptorAgreementSig",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "openEndorsementSig",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
      {
        name: "forAddr",
        type: "address",
        internalType: "address",
      },
      {
        name: "nonce",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "sig",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "settlementAgreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "acceptOffer",
    inputs: [
      {
        name: "params",
        type: "tuple",
        internalType: "struct AcceptOfferParams",
        components: [
          {
            name: "offerId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "units",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "exemptionPathway",
            type: "uint8",
            internalType: "enum ExemptionPathway",
          },
          {
            name: "buyerName",
            type: "string",
            internalType: "string",
          },
          {
            name: "buyerHostingMode",
            type: "uint8",
            internalType: "enum HostingMode",
          },
          {
            name: "adminMultisig",
            type: "address",
            internalType: "address",
          },
          {
            name: "sellerTokenId",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "acceptorPartyValues",
            type: "string[]",
            internalType: "string[]",
          },
          {
            name: "acceptorAgreementSig",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "openEndorsementSig",
            type: "bytes",
            internalType: "bytes",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "settlementAgreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "addCondition",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "condition",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "cancelOffer",
    inputs: [
      {
        name: "offerId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "forAddr",
        type: "address",
        internalType: "address",
      },
      {
        name: "nonce",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "sig",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "cancelOffer",
    inputs: [
      {
        name: "offerId",
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
    name: "counterPartyValues",
    inputs: [
      {
        name: "",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "",
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
    name: "finalizeDeal",
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
    name: "finalizeSecondaryTradeAgreement",
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
    name: "getClosingConditions",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getCounterPartyValues",
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
        type: "string[]",
        internalType: "string[]",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getDefaultIntegrator",
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
    name: "getMinTradeThreshold",
    inputs: [],
    outputs: [
      {
        name: "units",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "consideration",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getOffer",
    inputs: [
      {
        name: "offerId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct Offer",
        components: [
          {
            name: "spvAddress",
            type: "address",
            internalType: "address",
          },
          {
            name: "offeror",
            type: "address",
            internalType: "address",
          },
          {
            name: "side",
            type: "uint8",
            internalType: "enum OfferSide",
          },
          {
            name: "certPrinter",
            type: "address",
            internalType: "address",
          },
          {
            name: "tokenId",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "units",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "paymentToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "consideration",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "expectedExemptionPathway",
            type: "uint8",
            internalType: "enum ExemptionPathway",
          },
          {
            name: "validUntil",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "counterpartyRestrictions",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "additionalTerms",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "integrator",
            type: "address",
            internalType: "address",
          },
          {
            name: "status",
            type: "uint8",
            internalType: "enum OfferStatus",
          },
          {
            name: "unitsAccepted",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "paymentAccepted",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "unitsFinalized",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "offerId",
            type: "bytes32",
            internalType: "bytes32",
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
            name: "offerorPartyValues",
            type: "string[]",
            internalType: "string[]",
          },
          {
            name: "offerorAgreementSig",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "openEndorsementSig",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "buyerName",
            type: "string",
            internalType: "string",
          },
          {
            name: "buyerHostingMode",
            type: "uint8",
            internalType: "enum HostingMode",
          },
          {
            name: "adminMultisig",
            type: "address",
            internalType: "address",
          },
          {
            name: "settlementAgreementIds",
            type: "bytes32[]",
            internalType: "bytes32[]",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPathwayThresholdConditions",
    inputs: [
      {
        name: "pathway",
        type: "uint8",
        internalType: "enum ExemptionPathway",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address[]",
        internalType: "address[]",
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
    name: "getSecondaryEscrow",
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
        internalType: "struct SecondaryEscrow",
        components: [
          {
            name: "counterparty",
            type: "address",
            internalType: "address",
          },
          {
            name: "paymentToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "paymentAmount",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "units",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "acceptedAt",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "expiry",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "status",
            type: "uint8",
            internalType: "enum SecondaryEscrowStatus",
          },
          {
            name: "feeDestination",
            type: "address",
            internalType: "address",
          },
          {
            name: "offerId",
            type: "bytes32",
            internalType: "bytes32",
          },
          {
            name: "tokenId",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "buyerName",
            type: "string",
            internalType: "string",
          },
          {
            name: "buyerHostingMode",
            type: "uint8",
            internalType: "enum HostingMode",
          },
          {
            name: "adminMultisig",
            type: "address",
            internalType: "address",
          },
          {
            name: "openEndorsementSig",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "exemptionPathway",
            type: "uint8",
            internalType: "enum ExemptionPathway",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getSettlementWindow",
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
    name: "getSpvThresholdConditions",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address[]",
        internalType: "address[]",
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
    name: "isPathwayEnabled",
    inputs: [
      {
        name: "pathway",
        type: "uint8",
        internalType: "enum ExemptionPathway",
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
        internalType: "contract IIssuanceManager",
      },
    ],
    stateMutability: "view",
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
    name: "postOffer",
    inputs: [
      {
        name: "params",
        type: "tuple",
        internalType: "struct PostOfferParams",
        components: [
          {
            name: "side",
            type: "uint8",
            internalType: "enum OfferSide",
          },
          {
            name: "certPrinter",
            type: "address",
            internalType: "address",
          },
          {
            name: "tokenId",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "units",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "paymentToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "consideration",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "exemptionPathway",
            type: "uint8",
            internalType: "enum ExemptionPathway",
          },
          {
            name: "validUntil",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "counterpartyRestrictions",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "additionalTerms",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "integrator",
            type: "address",
            internalType: "address",
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
            name: "offerorPartyValues",
            type: "string[]",
            internalType: "string[]",
          },
          {
            name: "offerorAgreementSig",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "openEndorsementSig",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "buyerName",
            type: "string",
            internalType: "string",
          },
          {
            name: "buyerHostingMode",
            type: "uint8",
            internalType: "enum HostingMode",
          },
          {
            name: "adminMultisig",
            type: "address",
            internalType: "address",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "offerId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "postOffer",
    inputs: [
      {
        name: "params",
        type: "tuple",
        internalType: "struct PostOfferParams",
        components: [
          {
            name: "side",
            type: "uint8",
            internalType: "enum OfferSide",
          },
          {
            name: "certPrinter",
            type: "address",
            internalType: "address",
          },
          {
            name: "tokenId",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "units",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "paymentToken",
            type: "address",
            internalType: "address",
          },
          {
            name: "consideration",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "exemptionPathway",
            type: "uint8",
            internalType: "enum ExemptionPathway",
          },
          {
            name: "validUntil",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "counterpartyRestrictions",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "additionalTerms",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "integrator",
            type: "address",
            internalType: "address",
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
            name: "offerorPartyValues",
            type: "string[]",
            internalType: "string[]",
          },
          {
            name: "offerorAgreementSig",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "openEndorsementSig",
            type: "bytes",
            internalType: "bytes",
          },
          {
            name: "buyerName",
            type: "string",
            internalType: "string",
          },
          {
            name: "buyerHostingMode",
            type: "uint8",
            internalType: "enum HostingMode",
          },
          {
            name: "adminMultisig",
            type: "address",
            internalType: "address",
          },
        ],
      },
      {
        name: "forAddr",
        type: "address",
        internalType: "address",
      },
      {
        name: "nonce",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "sig",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "offerId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "proposeAndSignDeal",
    inputs: [
      {
        name: "_certPrinterAddress",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_paymentToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "_paymentAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_templateId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "_salt",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_globalValues",
        type: "string[]",
        internalType: "string[]",
      },
      {
        name: "_parties",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_certDetails",
        type: "tuple[]",
        internalType: "struct CertificateDetails[]",
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
        name: "proposer",
        type: "address",
        internalType: "address",
      },
      {
        name: "signature",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "_partyValues",
        type: "string[][]",
        internalType: "string[][]",
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
      {
        name: "expiry",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "certIds",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "proposeAndSignNewCertsDeal",
    inputs: [
      {
        name: "salt",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_certData",
        type: "tuple[]",
        internalType: "struct DealManagerStorage.CyberCertData[]",
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
        name: "_templateId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "_globalValues",
        type: "string[]",
        internalType: "string[]",
      },
      {
        name: "_parties",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_paymentAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_partyValues",
        type: "string[][]",
        internalType: "string[][]",
      },
      {
        name: "signature",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "_details",
        type: "tuple[]",
        internalType: "struct CertificateDetails[]",
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
        name: "conditions",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "secretHash",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "expiry",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "stableAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "certPrinterAddress",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "id",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "certIds",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "proposeDeal",
    inputs: [
      {
        name: "_certPrinterAddress",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_paymentToken",
        type: "address",
        internalType: "address",
      },
      {
        name: "_paymentAmount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_templateId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "_salt",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_globalValues",
        type: "string[]",
        internalType: "string[]",
      },
      {
        name: "_parties",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "_certDetails",
        type: "tuple[]",
        internalType: "struct CertificateDetails[]",
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
        name: "_partyValues",
        type: "string[][]",
        internalType: "string[][]",
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
      {
        name: "expiry",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "certIds",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    stateMutability: "nonpayable",
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
    name: "refundVoidedDeal",
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
    name: "removeConditionAt",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
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
    name: "revokeDeal",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "signer",
        type: "address",
        internalType: "address",
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
    name: "setClosingConditions",
    inputs: [
      {
        name: "conditions",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setCorp",
    inputs: [
      {
        name: "_corp",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setDealRegistry",
    inputs: [
      {
        name: "_dealRegistry",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setDefaultIntegrator",
    inputs: [
      {
        name: "integrator",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setIssuanceManager",
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
    name: "setMinTradeThreshold",
    inputs: [
      {
        name: "units",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "consideration",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPathwayThresholdConditions",
    inputs: [
      {
        name: "pathway",
        type: "uint8",
        internalType: "enum ExemptionPathway",
      },
      {
        name: "conditions",
        type: "address[]",
        internalType: "address[]",
      },
      {
        name: "enabled",
        type: "bool",
        internalType: "bool",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setSettlementWindow",
    inputs: [
      {
        name: "window",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setSpvThresholdConditions",
    inputs: [
      {
        name: "conditions",
        type: "address[]",
        internalType: "address[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "signAndFinalizeDeal",
    inputs: [
      {
        name: "signer",
        type: "address",
        internalType: "address",
      },
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
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
        name: "_fillUnallocated",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
      {
        name: "secret",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "signDealAndPay",
    inputs: [
      {
        name: "signer",
        type: "address",
        internalType: "address",
      },
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "signature",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "partyValues",
        type: "string[]",
        internalType: "string[]",
      },
      {
        name: "_fillUnallocated",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "name",
        type: "string",
        internalType: "string",
      },
      {
        name: "secret",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "signToVoid",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "signer",
        type: "address",
        internalType: "address",
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
    name: "syncVoidedSecondaryTradeAgreement",
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
    type: "function",
    name: "voidExpiredDeal",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "signer",
        type: "address",
        internalType: "address",
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
    name: "voidExpiredSecondaryTradeAgreement",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "signer",
        type: "address",
        internalType: "address",
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
    name: "voidSecondaryTradeAgreement",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "signer",
        type: "address",
        internalType: "address",
      },
      {
        name: "signature",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "nonce",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "authSig",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "voidSecondaryTradeAgreement",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "signer",
        type: "address",
        internalType: "address",
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
    type: "event",
    name: "ClosingConditionsSet",
    inputs: [
      {
        name: "conditions",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
      {
        name: "setter",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DealFinalized",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "signer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "corp",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "dealRegistry",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "fillUnallocated",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DealProposed",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "certAddress",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
      {
        name: "certId",
        type: "uint256[]",
        indexed: false,
        internalType: "uint256[]",
      },
      {
        name: "paymentToken",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "paymentAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "templateId",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "corp",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "dealRegistry",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "parties",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
      {
        name: "conditions",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
      {
        name: "hasSecret",
        type: "bool",
        indexed: false,
        internalType: "bool",
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
    name: "MinTradeThresholdSet",
    inputs: [
      {
        name: "minUnits",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "minConsideration",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "setter",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OfferAccepted",
    inputs: [
      {
        name: "offerId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "settlementAgreementId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "acceptor",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "units",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "paymentToken",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "paymentAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "acceptedAt",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "agreementExpiry",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "buyerName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "buyerHostingMode",
        type: "uint8",
        indexed: false,
        internalType: "enum HostingMode",
      },
      {
        name: "adminMultisig",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "openEndorsementSig",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
      {
        name: "exemptionPathway",
        type: "uint8",
        indexed: false,
        internalType: "enum ExemptionPathway",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OfferCancelled",
    inputs: [
      {
        name: "offerId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "offeror",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OfferPosted",
    inputs: [
      {
        name: "offerId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "offeror",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "certPrinter",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "spvAddress",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "side",
        type: "uint8",
        indexed: false,
        internalType: "enum OfferSide",
      },
      {
        name: "tokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "units",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "paymentToken",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "consideration",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "expectedExemptionPathway",
        type: "uint8",
        indexed: false,
        internalType: "enum ExemptionPathway",
      },
      {
        name: "validUntil",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "integrator",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "templateId",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
      {
        name: "buyerName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "buyerHostingMode",
        type: "uint8",
        indexed: false,
        internalType: "enum HostingMode",
      },
      {
        name: "adminMultisig",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "counterpartyRestrictions",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PathwayThresholdConditionsSet",
    inputs: [
      {
        name: "pathway",
        type: "uint8",
        indexed: true,
        internalType: "enum ExemptionPathway",
      },
      {
        name: "conditions",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
      {
        name: "enabled",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      {
        name: "setter",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SecondaryFeeDistributed",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "feeToken",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "feeDestination",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "fee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "integratorFee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "platformFee",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SecondaryTradeAgreementFinalized",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "seller",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "buyer",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "units",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "consideration",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "thresholdConditions",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
      {
        name: "closingConditions",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SecondaryTradeAgreementVoided",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SettlementWindowSet",
    inputs: [
      {
        name: "window",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "setter",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SpvThresholdConditionsSet",
    inputs: [
      {
        name: "conditions",
        type: "address[]",
        indexed: false,
        internalType: "address[]",
      },
      {
        name: "setter",
        type: "address",
        indexed: false,
        internalType: "address",
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
    name: "BelowMinTradeThreshold",
    inputs: [],
  },
  {
    type: "error",
    name: "BorgAuthACL_ZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "CertificateVoided",
    inputs: [],
  },
  {
    type: "error",
    name: "ConditionAlreadyExists",
    inputs: [],
  },
  {
    type: "error",
    name: "ConditionDoesNotExist",
    inputs: [],
  },
  {
    type: "error",
    name: "CounterPartyValueMismatch",
    inputs: [],
  },
  {
    type: "error",
    name: "DealNotExpired",
    inputs: [],
  },
  {
    type: "error",
    name: "DealNotPending",
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
    name: "ExemptionPathwayMismatch",
    inputs: [
      {
        name: "offered",
        type: "uint8",
        internalType: "enum ExemptionPathway",
      },
      {
        name: "elected",
        type: "uint8",
        internalType: "enum ExemptionPathway",
      },
    ],
  },
  {
    type: "error",
    name: "ExemptionPathwayNotEnabled",
    inputs: [
      {
        name: "pathway",
        type: "uint8",
        internalType: "enum ExemptionPathway",
      },
    ],
  },
  {
    type: "error",
    name: "ExemptionPathwayRequired",
    inputs: [],
  },
  {
    type: "error",
    name: "FailedCall",
    inputs: [],
  },
  {
    type: "error",
    name: "IntegratorNotWhitelisted",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidInitialization",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidSecondaryAuthSignature",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidSecondaryCondition",
    inputs: [],
  },
  {
    type: "error",
    name: "MissingAdminMultisig",
    inputs: [],
  },
  {
    type: "error",
    name: "MissingCertPrinter",
    inputs: [],
  },
  {
    type: "error",
    name: "NotCertOwner",
    inputs: [],
  },
  {
    type: "error",
    name: "NotInitializing",
    inputs: [],
  },
  {
    type: "error",
    name: "NotOfferor",
    inputs: [],
  },
  {
    type: "error",
    name: "NotPartyToAgreement",
    inputs: [],
  },
  {
    type: "error",
    name: "NotRefImplementation",
    inputs: [],
  },
  {
    type: "error",
    name: "NotSigner",
    inputs: [],
  },
  {
    type: "error",
    name: "OfferAlreadyExists",
    inputs: [],
  },
  {
    type: "error",
    name: "OfferExpired",
    inputs: [],
  },
  {
    type: "error",
    name: "OfferNotAvailable",
    inputs: [],
  },
  {
    type: "error",
    name: "PartyValuesLengthMismatch",
    inputs: [],
  },
  {
    type: "error",
    name: "ReentrancyGuardReentrantCall",
    inputs: [],
  },
  {
    type: "error",
    name: "SecondaryAuthReplayed",
    inputs: [],
  },
  {
    type: "error",
    name: "SecondaryConditionAlreadyExists",
    inputs: [],
  },
  {
    type: "error",
    name: "SecondaryConditionInterfaceUnsupported",
    inputs: [
      {
        name: "condition",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "SecondaryConditionsNotMet",
    inputs: [
      {
        name: "condition",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "SecondaryEscrowNotFound",
    inputs: [],
  },
  {
    type: "error",
    name: "SecondaryTradeAgreementAlreadyFinalized",
    inputs: [],
  },
  {
    type: "error",
    name: "SecondaryTradeAgreementAlreadyVoided",
    inputs: [],
  },
  {
    type: "error",
    name: "SecondaryTradeAgreementExpired",
    inputs: [],
  },
  {
    type: "error",
    name: "SecondaryTradeAgreementNotExpired",
    inputs: [],
  },
  {
    type: "error",
    name: "SecondaryTradeAgreementNotVoided",
    inputs: [],
  },
  {
    type: "error",
    name: "SecondaryTradeSellerOwnershipChanged",
    inputs: [],
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
    name: "UnitsExceedOffer",
    inputs: [],
  },
  {
    type: "error",
    name: "UnknownCertPrinter",
    inputs: [],
  },
  {
    type: "error",
    name: "ZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "ZeroConsiderationFill",
    inputs: [],
  },
] as const;
