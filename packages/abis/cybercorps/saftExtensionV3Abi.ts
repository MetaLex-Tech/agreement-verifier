export const saftExtensionV3Abi = [
  {
    type: "function",
    name: "AUTH",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract BorgAuth" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "EXTENSION_TYPE",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "EXTENSION_TYPE_V3",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "PERCENTAGE_PRECISION",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "UPGRADE_INTERFACE_VERSION",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decodeExtensionData",
    inputs: [{ name: "data", type: "bytes", internalType: "bytes" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct SAFTDataV2",
        components: [
          {
            name: "unlockStartTimeType",
            type: "uint8",
            internalType: "enum UnlockStartTimeType",
          },
          { name: "unlockStartTime", type: "uint256", internalType: "uint256" },
          { name: "unlockingPeriod", type: "uint256", internalType: "uint256" },
          {
            name: "unlockingCliffPeriod",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "unlockingCliffPercentage",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "unlockingIntervalType",
            type: "uint8",
            internalType: "enum UnlockingIntervalType",
          },
          { name: "customProvisions", type: "string", internalType: "string" },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "decodeSeriesExtensionData",
    inputs: [{ name: "data", type: "bytes", internalType: "bytes" }],
    outputs: [
      {
        name: "",
        type: "tuple",
        internalType: "struct SAFTSeriesData",
        components: [
          { name: "seriesName", type: "string", internalType: "string" },
          {
            name: "tokenGenerationEventDate",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "governingDocumentURIs",
            type: "string[]",
            internalType: "string[]",
          },
          { name: "customProvisions", type: "string", internalType: "string" },
        ],
      },
    ],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "encodeExtensionData",
    inputs: [
      {
        name: "data",
        type: "tuple",
        internalType: "struct SAFTDataV2",
        components: [
          {
            name: "unlockStartTimeType",
            type: "uint8",
            internalType: "enum UnlockStartTimeType",
          },
          { name: "unlockStartTime", type: "uint256", internalType: "uint256" },
          { name: "unlockingPeriod", type: "uint256", internalType: "uint256" },
          {
            name: "unlockingCliffPeriod",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "unlockingCliffPercentage",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "unlockingIntervalType",
            type: "uint8",
            internalType: "enum UnlockingIntervalType",
          },
          { name: "customProvisions", type: "string", internalType: "string" },
        ],
      },
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "encodeSeriesExtensionData",
    inputs: [
      {
        name: "data",
        type: "tuple",
        internalType: "struct SAFTSeriesData",
        components: [
          { name: "seriesName", type: "string", internalType: "string" },
          {
            name: "tokenGenerationEventDate",
            type: "uint256",
            internalType: "uint256",
          },
          {
            name: "governingDocumentURIs",
            type: "string[]",
            internalType: "string[]",
          },
          { name: "customProvisions", type: "string", internalType: "string" },
        ],
      },
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getExtensionURI",
    inputs: [{ name: "data", type: "bytes", internalType: "bytes" }],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "getResolvedExtensionURI",
    inputs: [
      { name: "printer", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "initialize",
    inputs: [{ name: "_auth", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    type: "function",
    name: "proxiableUUID",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "resolveCert",
    inputs: [
      { name: "printer", type: "address", internalType: "address" },
      { name: "tokenId", type: "uint256", internalType: "uint256" },
    ],
    outputs: [
      {
        name: "resolved",
        type: "tuple",
        internalType: "struct SAFTResolvedData",
        components: [
          {
            name: "series",
            type: "tuple",
            internalType: "struct SAFTSeriesData",
            components: [
              { name: "seriesName", type: "string", internalType: "string" },
              {
                name: "tokenGenerationEventDate",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "governingDocumentURIs",
                type: "string[]",
                internalType: "string[]",
              },
              {
                name: "customProvisions",
                type: "string",
                internalType: "string",
              },
            ],
          },
          {
            name: "certificate",
            type: "tuple",
            internalType: "struct SAFTDataV2",
            components: [
              {
                name: "unlockStartTimeType",
                type: "uint8",
                internalType: "enum UnlockStartTimeType",
              },
              {
                name: "unlockStartTime",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "unlockingPeriod",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "unlockingCliffPeriod",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "unlockingCliffPercentage",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "unlockingIntervalType",
                type: "uint8",
                internalType: "enum UnlockingIntervalType",
              },
              {
                name: "customProvisions",
                type: "string",
                internalType: "string",
              },
            ],
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "supportsExtensionType",
    inputs: [
      { name: "extensionType", type: "bytes32", internalType: "bytes32" },
    ],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "supportsResolvedExtensionData",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "upgradeToAndCall",
    inputs: [
      { name: "newImplementation", type: "address", internalType: "address" },
      { name: "data", type: "bytes", internalType: "bytes" },
    ],
    outputs: [],
    stateMutability: "payable",
  },
  {
    type: "function",
    name: "userRoles",
    inputs: [{ name: "user", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
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
    inputs: [{ name: "target", type: "address", internalType: "address" }],
  },
  { type: "error", name: "BorgAuthACL_ZeroAddress", inputs: [] },
  {
    type: "error",
    name: "ERC1967InvalidImplementation",
    inputs: [
      { name: "implementation", type: "address", internalType: "address" },
    ],
  },
  { type: "error", name: "ERC1967NonPayable", inputs: [] },
  { type: "error", name: "FailedCall", inputs: [] },
  { type: "error", name: "InvalidInitialization", inputs: [] },
  { type: "error", name: "NotInitializing", inputs: [] },
  { type: "error", name: "UUPSUnauthorizedCallContext", inputs: [] },
  {
    type: "error",
    name: "UUPSUnsupportedProxiableUUID",
    inputs: [{ name: "slot", type: "bytes32", internalType: "bytes32" }],
  },
] as const;
