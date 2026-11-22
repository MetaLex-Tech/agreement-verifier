export const aceSafeExtensionAbi = [
  {
    type: "function",
    name: "EXTENSION_TYPE",
    inputs: [],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
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
        internalType: "struct ACESAFEData",
        components: [
          {
            name: "denominationToken",
            type: "string",
            internalType: "string",
          },
          {
            name: "customProvisions",
            type: "string",
            internalType: "string",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "encodeExtensionData",
    inputs: [
      {
        name: "data",
        type: "tuple",
        internalType: "struct ACESAFEData",
        components: [
          {
            name: "denominationToken",
            type: "string",
            internalType: "string",
          },
          {
            name: "customProvisions",
            type: "string",
            internalType: "string",
          },
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
] as const;
