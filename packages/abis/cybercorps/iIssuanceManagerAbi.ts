/** Generated from cybercorps-contracts v5 `forge build` output. */
export const iIssuanceManagerAbi = [
  {
    type: "function",
    name: "AUTH",
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
    name: "CORP",
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
    name: "addScripifyWhitelistIds",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "ids",
        type: "uint256[]",
        internalType: "uint256[]",
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
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
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
        name: "investor",
        type: "address",
        internalType: "address",
      },
      {
        name: "_details",
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
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "clearRecertificationApproval",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "investor",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "companyJurisdiction",
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
    name: "companyName",
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
    name: "convertScripToCert",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
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
    name: "createCert",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "to",
        type: "address",
        internalType: "address",
      },
      {
        name: "_details",
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
    name: "createCertAndAssign",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "investor",
        type: "address",
        internalType: "address",
      },
      {
        name: "_details",
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
        name: "tokenId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "createCertAndAssignWithName",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "investor",
        type: "address",
        internalType: "address",
      },
      {
        name: "_details",
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
      {
        name: "endorsementSignature",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "timestamp",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
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
    name: "createCertPrinter",
    inputs: [
      {
        name: "_ledger",
        type: "string[]",
        internalType: "string[]",
      },
      {
        name: "_name",
        type: "string",
        internalType: "string",
      },
      {
        name: "_ticker",
        type: "string",
        internalType: "string",
      },
      {
        name: "_certificateUri",
        type: "string",
        internalType: "string",
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
    name: "createCertSignAndAssign",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "investor",
        type: "address",
        internalType: "address",
      },
      {
        name: "_details",
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
        name: "endorsementSignature",
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
        name: "investorName",
        type: "string",
        internalType: "string",
      },
    ],
    outputs: [
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
    name: "cyberCertPrinterBeacon",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract UpgradeableBeacon",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "cyberScripBeacon",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract UpgradeableBeacon",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "defineSecurityClass",
    inputs: [
      {
        name: "_classType",
        type: "uint8",
        internalType: "enum SecurityClass",
      },
      {
        name: "_documentURI",
        type: "string",
        internalType: "string",
      },
      {
        name: "_dataExtension",
        type: "address",
        internalType: "address",
      },
      {
        name: "_classData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [
      {
        name: "classId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "deployCyberScrip",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "typeRestrictionHooks",
        type: "address[]",
        internalType: "contract ITransferRestrictionHook[]",
      },
      {
        name: "certToScripConditions",
        type: "address[]",
        internalType: "contract ICondition[]",
      },
      {
        name: "scripToCertConditions",
        type: "address[]",
        internalType: "contract ICondition[]",
      },
      {
        name: "scripToCertMinimum",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "scripRatioNumerator",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "scripRatioDenominator",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "scripifyWhitelistIds",
        type: "uint256[]",
        internalType: "uint256[]",
      },
      {
        name: "scripifyWhitelistEnabled",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "enableForceTransfer",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "enableForceBurn",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "enableFreeze",
        type: "bool",
        internalType: "bool",
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
    name: "forceScripBurn",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "account",
        type: "address",
        internalType: "address",
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
    name: "getCertPrinterBeaconImplementation",
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
    name: "getCertScripifiedStatus",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "id",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "isScripified",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "scripifiedUnits",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "maxUnitsRepresented",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getPrinterClassId",
    inputs: [
      {
        name: "_printer",
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
    name: "getRecertificationApproval",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "investor",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "approved",
        type: "bool",
        internalType: "bool",
      },
      {
        name: "investorName",
        type: "string",
        internalType: "string",
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
        name: "officerSignature",
        type: "bytes",
        internalType: "bytes",
      },
      {
        name: "endorsementTimestamp",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getScripBeaconImplementation",
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
    name: "getScripPoolAmountById",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "id",
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
    name: "getScripPoolSharesById",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "id",
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
    name: "getScripRatio",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [
      {
        name: "numerator",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "denominator",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getScripToCertMinimum",
    inputs: [
      {
        name: "certAddress",
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
    name: "getScripifyWhitelistEnabled",
    inputs: [
      {
        name: "certAddress",
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
    name: "getSecurityClass",
    inputs: [
      {
        name: "_classId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct SecurityClassInfo",
        components: [
          {
            name: "classType",
            type: "uint8",
            internalType: "enum SecurityClass",
          },
          {
            name: "documentURI",
            type: "string",
            internalType: "string",
          },
          {
            name: "dataExtension",
            type: "address",
            internalType: "address",
          },
          {
            name: "classData",
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
    name: "getSecurityClassCount",
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
    name: "getUpgradeFactory",
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
    name: "initialize",
    inputs: [
      {
        name: "_auth",
        type: "address",
        internalType: "address",
      },
      {
        name: "_CORP",
        type: "address",
        internalType: "address",
      },
      {
        name: "_uriBuilder",
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
    name: "isPrinter",
    inputs: [
      {
        name: "printer",
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
    name: "isScripifyWhitelisted",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "id",
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
    name: "printers",
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
        type: "address",
        internalType: "address",
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "removeScripifyWhitelistIds",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "ids",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "scripifyCert",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "id",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "amount",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "recipient",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "secondaryTransfer",
    inputs: [
      {
        name: "dealMetadata",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setPrinterClass",
    inputs: [
      {
        name: "_printer",
        type: "address",
        internalType: "address",
      },
      {
        name: "_classId",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setRecertificationApproval",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "investor",
        type: "address",
        internalType: "address",
      },
      {
        name: "investorName",
        type: "string",
        internalType: "string",
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
        name: "officerSignature",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setScripRatio",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "numerator",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "denominator",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setScripToCertMinimum",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "minimum",
        type: "uint256",
        internalType: "uint256",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "setScripifyWhitelistEnabled",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
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
    name: "setUriBuilder",
    inputs: [
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
    name: "updateSecurityClass",
    inputs: [
      {
        name: "_classId",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "_classType",
        type: "uint8",
        internalType: "enum SecurityClass",
      },
      {
        name: "_documentURI",
        type: "string",
        internalType: "string",
      },
      {
        name: "_dataExtension",
        type: "address",
        internalType: "address",
      },
      {
        name: "_classData",
        type: "bytes",
        internalType: "bytes",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "upgradeCertPrinterBeaconImplementation",
    inputs: [
      {
        name: "_newImplementation",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "upgradeScripBeaconImplementation",
    inputs: [
      {
        name: "_newImplementation",
        type: "address",
        internalType: "address",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "voidEmptyCerts",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        internalType: "address",
      },
      {
        name: "tokenIds",
        type: "uint256[]",
        internalType: "uint256[]",
      },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "event",
    name: "CertPrinterBeaconImplementationUpgraded",
    inputs: [
      {
        name: "implementation",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "CertPrinterCreated",
    inputs: [
      {
        name: "certificate",
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
        name: "ledger",
        type: "string[]",
        indexed: false,
        internalType: "string[]",
      },
      {
        name: "name",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "ticker",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "securityType",
        type: "uint8",
        indexed: false,
        internalType: "enum SecurityClass",
      },
      {
        name: "securitySeries",
        type: "uint8",
        indexed: false,
        internalType: "enum SecuritySeries",
      },
      {
        name: "certificateUri",
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
        name: "certificate",
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
      {
        name: "details",
        type: "tuple",
        indexed: false,
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
    anonymous: false,
  },
  {
    type: "event",
    name: "CompanyDetailsUpdated",
    inputs: [
      {
        name: "companyName",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "jurisdiction",
        type: "string",
        indexed: false,
        internalType: "string",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "PrinterClassAssigned",
    inputs: [
      {
        name: "printer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "classId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ScripAddedToExistingCert",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "user",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "certId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "scripsAdded",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newUnitsRepresented",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newUnitsScripified",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ScripBeaconImplementationUpgraded",
    inputs: [
      {
        name: "implementation",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ScripRecertified",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "user",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "certId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "scripAmount",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newUnitsRepresented",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newCertNominalShares",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newTotalAssetsWad",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newTotalNominalShares",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ScripToCertMinimumSet",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "minimum",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "ScripifiedCert",
    inputs: [
      {
        name: "certAddress",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "id",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "scripifiedCert",
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
        name: "newUnitsRepresented",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newCertNominalShares",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newTotalAssetsWad",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "newTotalNominalShares",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SecondaryTransferExecuted",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "certPrinter",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "buyer",
        type: "address",
        indexed: true,
        internalType: "address",
      },
      {
        name: "sellerTokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "buyerTokenId",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "seller",
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
        name: "sellerUnitsAfter",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "buyerUnitsAfter",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
      {
        name: "sellerVoided",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
      {
        name: "buyerTokenIsMinted",
        type: "bool",
        indexed: false,
        internalType: "bool",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SecurityClassDefined",
    inputs: [
      {
        name: "classId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "classType",
        type: "uint8",
        indexed: false,
        internalType: "enum SecurityClass",
      },
      {
        name: "documentURI",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "dataExtension",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
  {
    type: "event",
    name: "SecurityClassUpdated",
    inputs: [
      {
        name: "classId",
        type: "uint256",
        indexed: true,
        internalType: "uint256",
      },
      {
        name: "classType",
        type: "uint8",
        indexed: false,
        internalType: "enum SecurityClass",
      },
      {
        name: "documentURI",
        type: "string",
        indexed: false,
        internalType: "string",
      },
      {
        name: "dataExtension",
        type: "address",
        indexed: false,
        internalType: "address",
      },
    ],
    anonymous: false,
  },
] as const;
