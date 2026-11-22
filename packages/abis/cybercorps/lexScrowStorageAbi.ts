/** Generated from cybercorps-contracts v5 `forge build` output. */
export const lexScrowStorageAbi = [
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
                type: "TokenType",
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
                type: "TokenType",
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
            type: "EscrowStatus",
            internalType: "enum EscrowStatus",
          },
        ],
      },
    ],
    stateMutability: "view",
  },
  {
    type: "event",
    name: "DealFinalizedAt",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "agreementRegistry",
        type: "address",
        indexed: false,
        internalType: "address",
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
    name: "DealPaidAt",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "agreementRegistry",
        type: "address",
        indexed: false,
        internalType: "address",
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
    name: "DealVoidedAt",
    inputs: [
      {
        name: "agreementId",
        type: "bytes32",
        indexed: true,
        internalType: "bytes32",
      },
      {
        name: "agreementRegistry",
        type: "address",
        indexed: false,
        internalType: "address",
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
    name: "FeeDistributed",
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
        name: "totalFe",
        type: "uint256",
        indexed: false,
        internalType: "uint256",
      },
    ],
    anonymous: false,
  },
  {
    type: "error",
    name: "CounterPartyNotSet",
    inputs: [],
  },
  {
    type: "error",
    name: "DealAlreadyFinalized",
    inputs: [],
  },
  {
    type: "error",
    name: "DealDoesNotExist",
    inputs: [],
  },
  {
    type: "error",
    name: "DealExpired",
    inputs: [],
  },
  {
    type: "error",
    name: "DealNotFinalized",
    inputs: [],
  },
  {
    type: "error",
    name: "DealNotFullySigned",
    inputs: [],
  },
  {
    type: "error",
    name: "DealNotPaid",
    inputs: [],
  },
  {
    type: "error",
    name: "DealNotVoided",
    inputs: [],
  },
  {
    type: "error",
    name: "DealVoided",
    inputs: [],
  },
  {
    type: "error",
    name: "EscrowNotPaid",
    inputs: [],
  },
  {
    type: "error",
    name: "EscrowNotPending",
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
    name: "TokenTransferMismatch",
    inputs: [
      {
        name: "token",
        type: "address",
        internalType: "address",
      },
      {
        name: "expected",
        type: "uint256",
        internalType: "uint256",
      },
      {
        name: "received",
        type: "uint256",
        internalType: "uint256",
      },
    ],
  },
] as const;
