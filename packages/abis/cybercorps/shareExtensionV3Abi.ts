export const shareExtensionV3Abi = [
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
    name: "PRICE_PRECISION",
    inputs: [],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view",
  },
  {
    type: "function",
    name: "SECURITIES_ACT_LEGEND",
    inputs: [],
    outputs: [{ name: "", type: "string", internalType: "string" }],
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
        internalType: "struct ShareCertData",
        components: [
          {
            name: "terms",
            type: "tuple",
            internalType: "struct SeriesTerms",
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
            name: "certificateData",
            type: "tuple",
            internalType: "struct CertificateData",
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
            name: "mandatoryConversionTriggers",
            type: "tuple[]",
            internalType: "struct MandatoryConversionTrigger[]",
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
            name: "specialVotingRights",
            type: "tuple[]",
            internalType: "struct SpecialVotingRight[]",
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
            type: "tuple[]",
            internalType: "struct TransferRestriction[]",
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
            type: "tuple[]",
            internalType: "struct SplitRecord[]",
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
        internalType: "struct ShareCertData",
        components: [
          {
            name: "terms",
            type: "tuple",
            internalType: "struct SeriesTerms",
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
            name: "certificateData",
            type: "tuple",
            internalType: "struct CertificateData",
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
            name: "mandatoryConversionTriggers",
            type: "tuple[]",
            internalType: "struct MandatoryConversionTrigger[]",
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
            name: "specialVotingRights",
            type: "tuple[]",
            internalType: "struct SpecialVotingRight[]",
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
            type: "tuple[]",
            internalType: "struct TransferRestriction[]",
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
            type: "tuple[]",
            internalType: "struct SplitRecord[]",
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
        ],
      },
    ],
    outputs: [{ name: "", type: "bytes", internalType: "bytes" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "from18DecimalsToString",
    inputs: [{ name: "value", type: "uint256", internalType: "uint256" }],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "pure",
  },
  {
    type: "function",
    name: "getExtensionURI",
    inputs: [{ name: "data", type: "bytes", internalType: "bytes" }],
    outputs: [{ name: "", type: "string", internalType: "string" }],
    stateMutability: "pure",
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
        name: "",
        type: "tuple",
        internalType: "struct ShareCertData",
        components: [
          {
            name: "terms",
            type: "tuple",
            internalType: "struct SeriesTerms",
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
            name: "certificateData",
            type: "tuple",
            internalType: "struct CertificateData",
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
            name: "mandatoryConversionTriggers",
            type: "tuple[]",
            internalType: "struct MandatoryConversionTrigger[]",
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
            name: "specialVotingRights",
            type: "tuple[]",
            internalType: "struct SpecialVotingRight[]",
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
            type: "tuple[]",
            internalType: "struct TransferRestriction[]",
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
            type: "tuple[]",
            internalType: "struct SplitRecord[]",
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
