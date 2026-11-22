/** Generated from cybercorps-contracts v5 `forge build` output. */
export const cyberCorpFactoryAbi = [
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
    name: "__cyberCert20Implementation",
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
    name: "__cyberCertPrinterImplementation",
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
    name: "computeDeploymentSalt",
    inputs: [
      {
        name: "salt",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "companyName",
        type: "string",
        internalType: "string",
      },
      {
        name: "companyType",
        type: "string",
        internalType: "string",
      },
      {
        name: "companyJurisdiction",
        type: "string",
        internalType: "string",
      },
      {
        name: "companyContactDetails",
        type: "string",
        internalType: "string",
      },
      {
        name: "defaultDisputeResolution",
        type: "string",
        internalType: "string",
      },
      {
        name: "_companyPayable",
        type: "address",
        internalType: "address",
      },
      {
        name: "_officer",
        type: "tuple",
        internalType: "struct CompanyOfficer",
        components: [
          {
            name: "eoa",
            type: "address",
            internalType: "address",
          },
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "contact",
            type: "string",
            internalType: "string",
          },
          {
            name: "title",
            type: "string",
            internalType: "string",
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
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "cyberAgreementFactory",
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
    name: "cyberCorpSingleFactory",
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
    name: "dealManagerFactory",
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
    name: "deployAndInitializeRoundManager",
    inputs: [
      {
        name: "salt",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "cyberCorpAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deployCyberCorp",
    inputs: [
      {
        name: "salt",
        type: "bytes32",
        internalType: "bytes32",
      },
      {
        name: "companyName",
        type: "string",
        internalType: "string",
      },
      {
        name: "companyType",
        type: "string",
        internalType: "string",
      },
      {
        name: "companyJurisdiction",
        type: "string",
        internalType: "string",
      },
      {
        name: "companyContactDetails",
        type: "string",
        internalType: "string",
      },
      {
        name: "defaultDisputeResolution",
        type: "string",
        internalType: "string",
      },
      {
        name: "_companyPayable",
        type: "address",
        internalType: "address",
      },
      {
        name: "_officer",
        type: "tuple",
        internalType: "struct CompanyOfficer",
        components: [
          {
            name: "eoa",
            type: "address",
            internalType: "address",
          },
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "contact",
            type: "string",
            internalType: "string",
          },
          {
            name: "title",
            type: "string",
            internalType: "string",
          },
        ],
      },
    ],
    outputs: [
      {
        name: "cyberCorpAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "authAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "issuanceManagerAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "dealManagerAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "roundManagerAddress",
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deployCyberCorpAndCreateOffer",
    inputs: [
      {
        name: "salt",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "companyName",
        type: "string",
        internalType: "string",
      },
      {
        name: "companyType",
        type: "string",
        internalType: "string",
      },
      {
        name: "companyJurisdiction",
        type: "string",
        internalType: "string",
      },
      {
        name: "companyContactDetails",
        type: "string",
        internalType: "string",
      },
      {
        name: "defaultDisputeResolution",
        type: "string",
        internalType: "string",
      },
      {
        name: "_companyPayable",
        type: "address",
        internalType: "address",
      },
      {
        name: "_officer",
        type: "tuple",
        internalType: "struct CompanyOfficer",
        components: [
          {
            name: "eoa",
            type: "address",
            internalType: "address",
          },
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "contact",
            type: "string",
            internalType: "string",
          },
          {
            name: "title",
            type: "string",
            internalType: "string",
          },
        ],
      },
      {
        name: "_certData",
        type: "tuple[]",
        internalType: "struct CyberCorpFactory.CyberCertData[]",
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
    ],
    outputs: [
      {
        name: "cyberCorpAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "authAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "issuanceManagerAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "dealManagerAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "roundManagerAddress",
        type: "address",
        internalType: "address",
      },
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
    name: "deployCyberCorpAndCreateRound",
    inputs: [
      {
        name: "salt",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "seriesType",
        type: "uint8",
        internalType: "enum SecuritySeries",
      },
      {
        name: "companyName",
        type: "string",
        internalType: "string",
      },
      {
        name: "companyType",
        type: "string",
        internalType: "string",
      },
      {
        name: "companyJurisdiction",
        type: "string",
        internalType: "string",
      },
      {
        name: "companyContactDetails",
        type: "string",
        internalType: "string",
      },
      {
        name: "defaultDisputeResolution",
        type: "string",
        internalType: "string",
      },
      {
        name: "_companyPayable",
        type: "address",
        internalType: "address",
      },
      {
        name: "_officer",
        type: "tuple",
        internalType: "struct CompanyOfficer",
        components: [
          {
            name: "eoa",
            type: "address",
            internalType: "address",
          },
          {
            name: "name",
            type: "string",
            internalType: "string",
          },
          {
            name: "contact",
            type: "string",
            internalType: "string",
          },
          {
            name: "title",
            type: "string",
            internalType: "string",
          },
        ],
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
        name: "templateId",
        type: "bytes32",
        internalType: "bytes32",
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
        name: "metadataSignature",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "roundType",
        type: "uint8",
        internalType: "enum RoundType",
      },
      {
        name: "conditions",
        type: "address[]",
        internalType: "address[]",
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
    outputs: [
      {
        name: "cyberCorpAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "authAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "issuanceManagerAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "dealManagerAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "roundManagerAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "roundId",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    stateMutability: "nonpayable",
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
        name: "_registryAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "_issuanceManagerFactory",
        type: "address",
        internalType: "address",
      },
      {
        name: "_cyberCorpSingleFactory",
        type: "address",
        internalType: "address",
      },
      {
        name: "_dealManagerFactory",
        type: "address",
        internalType: "address",
      },
      {
        name: "_roundManagerFactory",
        type: "address",
        internalType: "address",
      },
      {
        name: "_uriBuilder",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "issuanceManagerFactory",
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
    name: "lexchexAuth",
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
    name: "registryAddress",
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
    name: "roundManagerFactory",
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
    name: "setCyberAgreementFactory",
    inputs: [
      {
        name: "_cyberAgreementFactory",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setCyberCorpSingleFactory",
    inputs: [
      {
        name: "_cyberCorpSingleFactory",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setDealManagerFactory",
    inputs: [
      {
        name: "_dealManagerFactory",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setIssuanceManagerFactory",
    inputs: [
      {
        name: "_issuanceManagerFactory",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setLexchexAuth",
    inputs: [
      {
        name: "_lexchexAuth",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRoundManagerFactory",
    inputs: [
      {
        name: "_roundManagerFactory",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setStable",
    inputs: [
      {
        name: "_stable",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "stable",
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
    name: "uriBuilder",
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
    name: "AgreementDeployed",
    inputs: [
      {
        name: "agreementFactory",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "agreement",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "lexscrow",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "salt",
        type: "bytes32",
        indexed: false,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CyberAgreementFactoryUpdated",
    inputs: [
      {
        name: "cyberAgreementFactory",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "oldCyberAgreementFactory",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CyberCorpDeployed",
    inputs: [
      {
        name: "cyberCorp",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "auth",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "issuanceManager",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "dealManager",
        type: "address",
        indexed: false,
        internalType: "address",
      },
      {
        name: "cyberCORPName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "cyberCORPType",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "cyberCORPContactDetails",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "cyberCORPJurisdiction",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "defaultDisputeResolution",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "_companyPayable",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CyberCorpSingleFactoryUpdated",
    inputs: [
      {
        name: "cyberCorpSingleFactory",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "oldCyberCorpFactory",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DealManagerFactoryUpdated",
    inputs: [
      {
        name: "dealManagerFactory",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "oldDealFactory",
        type: "address",
        indexed: false,
        internalType: "address",
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
    name: "IssuanceManagerFactoryUpdated",
    inputs: [
      {
        name: "issuanceManagerFactory",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "oldIssuanceFactory",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "LexchexAuthUpdated",
    inputs: [
      {
        name: "lexchexAuth",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "oldLexchexAuth",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoundManagerDeployed",
    inputs: [
      {
        name: "cyberCorp",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "roundManager",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoundManagerFactoryUpdated",
    inputs: [
      {
        name: "roundManagerFactory",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "oldRoundManagerFactory",
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
    name: "BorgAuthACL_ZeroAddress",
    inputs: [],
  },
  {
    type: "error",
    name: "Create2EmptyBytecode",
    inputs: [],
  },
  {
    type: "error",
    name: "DeploymentFailed",
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
    name: "FailedCall",
    inputs: [],
  },
  {
    type: "error",
    name: "FailedDeployment",
    inputs: [],
  },
  {
    type: "error",
    name: "IncompatibleComponentFactory",
    inputs: [
      {
        name: "factory",
        type: "address",
        internalType: "address",
      },
    ],
  },
  {
    type: "error",
    name: "InsufficientBalance",
    inputs: [
      {
        name: "balance",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "needed",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
  {
    type: "error",
    name: "InvalidInitialization",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidMetadataSignature",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidSalt",
    inputs: [],
  },
  {
    type: "error",
    name: "NotInitializing",
    inputs: [],
  },
  {
    type: "error",
    name: "RoundManagerAlreadyExists",
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
] as const;
