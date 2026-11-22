export const shareExtensionLogicAbi = [
  {
    type: "function",
    name: "encodeExtensionData",
    inputs: [
      {
        name: "data",
        type: "tuple",
        internalType: "struct ShareCertDataLayer",
        components: [
          {
            name: "certificateData",
            type: "tuple[]",
            internalType: "struct CertificateData[]",
            components: [
              { name: "isPartlyPaid", type: "bool", internalType: "bool" },
              { name: "amountPaid", type: "uint256", internalType: "uint256" },
              {
                name: "totalConsideration",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "sourceAuthorityURI",
                type: "string",
                internalType: "string",
              },
              {
                name: "representationType",
                type: "uint8",
                internalType: "enum ShareRepresentationType",
              },
              {
                name: "holdingPeriodTackingApplied",
                type: "bool",
                internalType: "bool",
              },
            ],
          },
          {
            name: "terms",
            type: "tuple[]",
            internalType: "struct SeriesTerms[]",
            components: [
              { name: "seriesName", type: "string", internalType: "string" },
              { name: "parValue", type: "uint256", internalType: "uint256" },
              {
                name: "authorizedShares",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "originalIssuePrice",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "effectiveDate",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "sourceAuthorityURI",
                type: "string",
                internalType: "string",
              },
              {
                name: "liquidationPreferenceMultiple",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "liquidationPreferenceType",
                type: "uint8",
                internalType: "enum LiquidationPreferenceType",
              },
              {
                name: "participationCap",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "seniorityRank",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "dividendType",
                type: "uint8",
                internalType: "enum DividendType",
              },
              {
                name: "dividendRate",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "dividendAccrualStartDate",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "dividendCompounding",
                type: "bool",
                internalType: "bool",
              },
              {
                name: "dividendIncreasesLiquidationAmount",
                type: "bool",
                internalType: "bool",
              },
              { name: "isConvertible", type: "bool", internalType: "bool" },
              {
                name: "targetConversionSeriesId",
                type: "string",
                internalType: "string",
              },
              {
                name: "conversionPrice",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "antiDilutionType",
                type: "uint8",
                internalType: "enum AntiDilutionType",
              },
              {
                name: "allowsFractionalConversion",
                type: "bool",
                internalType: "bool",
              },
              {
                name: "hasMandatoryConversion",
                type: "bool",
                internalType: "bool",
              },
              {
                name: "votesPerShare",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "designatedBoardSeats",
                type: "uint8",
                internalType: "uint8",
              },
              {
                name: "hasClassVotingRights",
                type: "bool",
                internalType: "bool",
              },
              {
                name: "hasSeriesVotingRights",
                type: "bool",
                internalType: "bool",
              },
              { name: "isRedeemable", type: "bool", internalType: "bool" },
              {
                name: "redemptionType",
                type: "uint8",
                internalType: "enum RedemptionType",
              },
              {
                name: "redemptionPrice",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "redemptionSchedule",
                type: "string",
                internalType: "string",
              },
              {
                name: "redemptionTriggerDescription",
                type: "string",
                internalType: "string",
              },
              { name: "hasPayToPlay", type: "bool", internalType: "bool" },
              {
                name: "payToPlayTermsURI",
                type: "string",
                internalType: "string",
              },
              {
                name: "hasRegistrationRights",
                type: "bool",
                internalType: "bool",
              },
              {
                name: "registrationRightsURI",
                type: "string",
                internalType: "string",
              },
              { name: "hasProRataRights", type: "bool", internalType: "bool" },
              {
                name: "proRataRightsURI",
                type: "string",
                internalType: "string",
              },
              {
                name: "hasInformationRights",
                type: "bool",
                internalType: "bool",
              },
              {
                name: "informationRightsURI",
                type: "string",
                internalType: "string",
              },
              {
                name: "hasDragAlongRights",
                type: "bool",
                internalType: "bool",
              },
              {
                name: "dragAlongTermsURI",
                type: "string",
                internalType: "string",
              },
            ],
          },
          {
            name: "conversionTriggers",
            type: "tuple[][]",
            internalType: "struct MandatoryConversionTrigger[][]",
            components: [
              {
                name: "triggerType",
                type: "uint8",
                internalType: "enum MandatoryConversionTriggerType",
              },
              {
                name: "primaryThreshold",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "secondaryThreshold",
                type: "uint256",
                internalType: "uint256",
              },
              {
                name: "additionalConditions",
                type: "string",
                internalType: "string",
              },
              { name: "description", type: "string", internalType: "string" },
            ],
          },
          {
            name: "votingRights",
            type: "tuple[][]",
            internalType: "struct SpecialVotingRight[][]",
            components: [
              { name: "matterType", type: "string", internalType: "string" },
              {
                name: "votesPerShare",
                type: "uint256",
                internalType: "uint256",
              },
              { name: "threshold", type: "uint256", internalType: "uint256" },
              { name: "isVetoRight", type: "bool", internalType: "bool" },
              {
                name: "scope",
                type: "uint8",
                internalType: "enum VotingScope",
              },
              { name: "description", type: "string", internalType: "string" },
            ],
          },
          {
            name: "transferRestrictions",
            type: "tuple[][]",
            internalType: "struct TransferRestriction[][]",
            components: [
              {
                name: "restrictionType",
                type: "uint8",
                internalType: "enum TransferRestrictionType",
              },
              {
                name: "restrictionText",
                type: "string",
                internalType: "string",
              },
              {
                name: "sourceAgreement",
                type: "string",
                internalType: "string",
              },
              { name: "isRemovable", type: "bool", internalType: "bool" },
              {
                name: "exceptions",
                type: "tuple[]",
                internalType: "struct TransferRestrictionException[]",
                components: [
                  {
                    name: "exceptionType",
                    type: "string",
                    internalType: "string",
                  },
                  {
                    name: "exceptionText",
                    type: "string",
                    internalType: "string",
                  },
                  {
                    name: "requiresEvidence",
                    type: "bool",
                    internalType: "bool",
                  },
                ],
              },
            ],
          },
          {
            name: "splitHistory",
            type: "tuple[][]",
            internalType: "struct SplitRecord[][]",
            components: [
              { name: "numerator", type: "uint256", internalType: "uint256" },
              { name: "denominator", type: "uint256", internalType: "uint256" },
              { name: "timestamp", type: "uint256", internalType: "uint256" },
              {
                name: "sourceAuthorityURI",
                type: "string",
                internalType: "string",
              },
            ],
          },
          {
            name: "overwriteConversionTriggers",
            type: "bool",
            internalType: "bool",
          },
          { name: "overwriteVotingRights", type: "bool", internalType: "bool" },
          {
            name: "overwriteTransferRestrictions",
            type: "bool",
            internalType: "bool",
          },
          { name: "overwriteSplitHistory", type: "bool", internalType: "bool" },
        ],
      },
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "pure",
  },
] as const;
