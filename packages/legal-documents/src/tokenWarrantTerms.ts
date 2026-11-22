import {
  describeTokenTerm,
  signedCliffSummary,
  unlockIntervalCount,
} from "./safteTerms";

export const warrantGlobalFields = [
  "purchaseAmount",
  "postMoneyValuationCap",
  "expirationTime",
  "governingJurisdiction",
  "disputeResolution",
  "exercisePriceMethod",
  "exercisePrice",
  "unlockStartTimeType",
  "unlockStartTime",
  "unlockingPeriod",
  "latestExpirationTime",
  "unlockingCliffPeriod",
  "unlockingCliffPercentage",
  "unlockingIntervalType",
  "tokenCalculationMethod",
  "minCompanyReserve",
  "tokenPremiumMultiplier",
] as const;

export type TokenWarrantTerms = {
  exerciseMethod: string;
  exercisePrice: string;
  startBasis: string;
  startDate: string;
  period: string;
  latestExpiry: string;
  cliffPeriod: string;
  cliffPercent: string;
  interval: string;
  calculation: string;
  reserve: string;
  premium: string;
};

export type WarrantPair = {
  safeIndex: number;
  warrantIndex: number;
  safeUri: string;
  warrantUri: string;
  safeProvisions: string;
  safeSeriesTerms?: string;
  warrantProvisions: string;
  warrantSeriesTerms?: string;
  terms: TokenWarrantTerms;
};

export function signedWarrantValues(
  values: readonly string[],
): TokenWarrantTerms {
  if (values.length !== warrantGlobalFields.length)
    throw Error(
      "The token warrant terms differ from the registered agreement.",
    );
  return {
    exerciseMethod: values[5]!,
    exercisePrice: values[6]!,
    startBasis: values[7]!,
    startDate: values[8]!,
    period: values[9]!,
    latestExpiry: values[10]!,
    cliffPeriod: values[11]!,
    cliffPercent: values[12]!,
    interval: values[13]!,
    calculation: values[14]!,
    reserve: values[15]!,
    premium: values[16]!,
  };
}

export function warrantDocumentTerms(values: TokenWarrantTerms) {
  return {
    exerciseMethod: describeTokenTerm(values.exerciseMethod),
    exercisePrice: values.exercisePrice || "an unspecified price",
    startBasis: describeTokenTerm(values.startBasis),
    startDate: values.startDate
      ? "The recorded start time is " + values.startDate + "."
      : "No separate start time is specified.",
    period: unlockIntervalCount(values.period),
    latestExpiry: values.latestExpiry || "unspecified",
    cliffPeriod: unlockIntervalCount(values.cliffPeriod),
    cliffPercent: values.cliffPercent || "unspecified",
    interval: describeTokenTerm(values.interval),
    calculation: describeTokenTerm(values.calculation),
    reserve: values.reserve || "unspecified",
    premium: values.premium || "unspecified",
  };
}

export function signedWarrantSummary(values: TokenWarrantTerms) {
  const t = warrantDocumentTerms(values);
  return `The purchase agreement specifies an exercise price of ${t.exercisePrice} ${t.exerciseMethod}. The latest warrant expiration is ${t.latestExpiry}. Tokens are calculated using ${t.calculation}, with a minimum company reserve of ${t.reserve} and a premium multiplier of ${t.premium}. Unlocking begins ${t.startBasis}. ${t.startDate} Each interval is ${t.interval}. The recorded unlocking period is ${t.period}. ${signedCliffSummary(values)}`;
}
