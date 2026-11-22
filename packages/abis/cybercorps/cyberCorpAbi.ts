/** Generated from cybercorps-contracts v5 `forge build` output. */
export const cyberCorpAbi = [
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
    name: "addEscrowedOfficerSignature",
    inputs: [
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
    name: "addOfficer",
    inputs: [
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
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "clearExtension",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "companyOfficers",
    inputs: [
      {
        name: "",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
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
    stateMutability: "view",
  },
  {
    type: "function",
    name: "companyPayable",
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
    name: "cyberCORPContactDetails",
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
    name: "cyberCORPJurisdiction",
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
    name: "cyberCORPName",
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
    name: "cyberCORPType",
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
    name: "cyberCertPrinterImplementation",
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
    name: "dealManager",
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
    name: "defaultDisputeResolution",
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
    name: "escrowedOfficerSignatures",
    inputs: [
      {
        name: "",
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
    name: "extension",
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
    name: "extensionData",
    inputs: [],
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
    name: "extensionType",
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
    name: "getEscrowedOfficerSignature",
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
        type: "bytes",
        internalType: "bytes",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getEscrowedOfficerSignatureCount",
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
    name: "getExtensionURI",
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
    name: "initialize",
    inputs: [
      {
        name: "_auth",
        type: "address",
        internalType: "address",
      },
      {
        name: "_cyberCORPName",
        type: "string",
        internalType: "string",
      },
      {
        name: "_cyberCORPType",
        type: "string",
        internalType: "string",
      },
      {
        name: "_cyberCORPJurisdiction",
        type: "string",
        internalType: "string",
      },
      {
        name: "_cyberCORPContactDetails",
        type: "string",
        internalType: "string",
      },
      {
        name: "_defaultDisputeResolution",
        type: "string",
        internalType: "string",
      },
      {
        name: "_issuanceManager",
        type: "address",
        internalType: "address",
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
        name: "_upgradeFactory",
        type: "address",
        internalType: "address",
      },
      {
        name: "_roundManager",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "isCyberCORPOfficer",
    inputs: [
      {
        name: "_address",
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
    name: "removeOfficer",
    inputs: [
      {
        name: "_address",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "removeOfficerAt",
    inputs: [
      {
        name: "_index",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "roundManager",
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
    name: "setCompanyPayable",
    inputs: [
      {
        name: "_companyPayable",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setDealManager",
    inputs: [
      {
        name: "_dealManager",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setEscrowedOfficerSignature",
    inputs: [
      {
        name: "index",
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
    name: "setExtension",
    inputs: [
      {
        name: "_extension",
        type: "address",
        internalType: "address",
      },
      {
        name: "_extensionType",
        type: "bytes32",
        internalType: "bytes32",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setExtensionData",
    inputs: [
      {
        name: "_extensionData",
        type: "bytes",
        internalType: "bytes",
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
    name: "setRoundManager",
    inputs: [
      {
        name: "_roundManager",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setcyberCORPDetails",
    inputs: [
      {
        name: "_cyberCORPName",
        type: "string",
        internalType: "string",
      },
      {
        name: "_cyberCORPType",
        type: "string",
        internalType: "string",
      },
      {
        name: "_cyberCORPJurisdiction",
        type: "string",
        internalType: "string",
      },
      {
        name: "_cyberCORPContactDetails",
        type: "string",
        internalType: "string",
      },
      {
        name: "_defaultDisputeResolution",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "updateOfficer",
    inputs: [
      {
        name: "_index",
        type: "uint256",
        internalType: "uint256",
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
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "upgradeFactory",
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
    name: "CompanyPayableUpdated",
    inputs: [
      {
        name: "companyPayable",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "oldCompanyPayable",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CyberCORPDetailsUpdated",
    inputs: [
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
        name: "cyberCORPJurisdiction",
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
        name: "defaultDisputeResolution",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CyberCORPExtensionDataUpdated",
    inputs: [
      {
        name: "extensionType",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "extensionData",
        type: "bytes",
        indexed: false,
        internalType: "bytes",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CyberCORPExtensionSet",
    inputs: [
      {
        name: "extension",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "extensionType",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "DealManagerUpdated",
    inputs: [
      {
        name: "oldDealManager",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newDealManager",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "EscrowedOfficerSignatureAdded",
    inputs: [
      {
        name: "index",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "officer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "EscrowedOfficerSignatureUpdated",
    inputs: [
      {
        name: "index",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "officer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "IssuanceManagerUpdated",
    inputs: [
      {
        name: "oldIssuanceManager",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newIssuanceManager",
        type: "address",
        indexed: true,
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
    name: "OfficerAdded",
    inputs: [
      {
        name: "officer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "index",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OfficerRemoved",
    inputs: [
      {
        name: "officer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "index",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "OfficerUpdated",
    inputs: [
      {
        name: "officer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "index",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "RoundManagerUpdated",
    inputs: [
      {
        name: "oldRoundManager",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "newRoundManager",
        type: "address",
        indexed: true,
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
    name: "DuplicateOfficer",
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
    name: "ExtensionNotConfigured",
    inputs: [],
  },
  {
    type: "error",
    name: "ExtensionTypeNotSupported",
    inputs: [],
  },
  {
    type: "error",
    name: "FailedCall",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidEscrowSignatureIndex",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidExtension",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidInitialization",
    inputs: [],
  },
  {
    type: "error",
    name: "InvalidOfficerIndex",
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
    name: "SignatureRequired",
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
