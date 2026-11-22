export const zkPassportVerifierAbi = [
  {
    type: "function",
    name: "verify",
    inputs: [
      {
        name: "params",
        type: "tuple",
        internalType: "struct ProofVerificationParams",
        components: [
          { name: "version", type: "bytes32", internalType: "bytes32" },
          {
            name: "proofVerificationData",
            type: "tuple",
            internalType: "struct ProofVerificationData",
            components: [
              { name: "vkeyHash", type: "bytes32", internalType: "bytes32" },
              { name: "proof", type: "bytes", internalType: "bytes" },
              {
                name: "publicInputs",
                type: "bytes32[]",
                internalType: "bytes32[]",
              },
            ],
          },
          { name: "committedInputs", type: "bytes", internalType: "bytes" },
          {
            name: "serviceConfig",
            type: "tuple",
            internalType: "struct ServiceConfig",
            components: [
              {
                name: "validityPeriodInSeconds",
                type: "uint256",
                internalType: "uint256",
              },
              { name: "domain", type: "string", internalType: "string" },
              { name: "scope", type: "string", internalType: "string" },
              { name: "devMode", type: "bool", internalType: "bool" },
            ],
          },
        ],
      },
    ],
    outputs: [
      { name: "verified", type: "bool", internalType: "bool" },
      { name: "uniqueIdentifier", type: "bytes32", internalType: "bytes32" },
      {
        name: "helper",
        type: "address",
        internalType: "contract IZKPassportHelper",
      },
    ],
    stateMutability: "nonpayable",
  },
] as const;
