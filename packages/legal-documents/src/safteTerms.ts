// Signed field order in the registered token agreements.
export const safteGlobalFields = [
  "purchaseAmount",
  "postMoneyValuationCap",
  "protocolUSDValuationAtTimeofInvestment",
  "expirationTime",
  "governingJurisdiction",
  "disputeResolution",
  "unlockStartTimeType",
  "unlockStartTime",
  "unlockingPeriod",
  "unlockingCliffPeriod",
  "unlockingCliffPercentage",
  "unlockingIntervalType",
  "tokenCalculationMethod",
  "minCompanyReserve",
  "tokenPremiumMultiplier",
] as const;

export const saftGlobalFields = [
  "purchaseAmount",
  "protocolValuationCap",
  "governingJurisdiction",
  "disputeResolution",
  "unlockStartTimeType",
  "unlockStartTime",
  "unlockingPeriod",
  "unlockingCliffPeriod",
  "unlockingCliffPercentage",
  "unlockingIntervalType",
] as const;

export type TokenUnlockTerms = {
  uri?: string;
  startBasis: string;
  startDate: string;
  period: string;
  cliffPeriod: string;
  cliffPercent: string;
  interval: string;
  customProvisions: string;
  seriesTerms?: string;
};

export type SafteTerms = TokenUnlockTerms & {
  protocolCap: string;
  calculation: string;
  reserve: string;
  premium: string;
};

const wording: Readonly<Record<string, string>> = {
  perToken: "per token purchased",
  perWarrant: "per exercise regardless of the number of tokens purchased",
  agreementExecutionTime: "when the agreement is entered into",
  agreementDateTime: "when the agreement is entered into",
  tokenWarrantTime: "when the agreement is entered into",
  tgeTime: "at the token launch event",
  setTime: "at the specified time",
  byBlock: "one blockchain block",
  blockly: "one blockchain block",
  bySeconds: "one second",
  secondly: "one second",
  hourly: "one hour",
  daily: "one day",
  monthly: "one month",
  equityProRataToCompanyReserve: "the equity-to-reserve method",
  equityProRataToTokenSupply: "the equity-to-supply method",
  dollarProRataToProtocolVal: "the purchase-to-protocol-value method",
};

export function describeTokenTerm(value: string) {
  return Object.hasOwn(wording, value)
    ? wording[value]!
    : value || "unspecified";
}

export function unlockIntervalCount(value: string) {
  return /^\d+$/.test(value)
    ? value + (value === "1" ? " interval" : " intervals")
    : value.replace(/^(\d+)\s+(months|days|hours|seconds|blocks)$/, "$1 $2") ||
        "unspecified";
}

export function unlockDocumentTerms(values: TokenUnlockTerms) {
  return {
    startDate: values.startDate
      ? `The recorded start time is ${values.startDate}.`
      : "No separate start time is specified.",
    startBasis: describeTokenTerm(values.startBasis),
    period: values.period || "unspecified",
    cliffPeriod: values.cliffPeriod || "unspecified",
    cliffPercent: values.cliffPercent || "unspecified",
    interval: describeTokenTerm(values.interval),
  };
}

export function safteDocumentTerms(values: SafteTerms) {
  return {
    ...unlockDocumentTerms(values),
    protocolCap: values.protocolCap
      ? `The protocol valuation cap is ${values.protocolCap}.`
      : "No protocol valuation cap is specified.",
    calculation: describeTokenTerm(values.calculation),
    reserve: values.reserve || "unspecified",
    premium: values.premium || "unspecified",
  };
}
function signedUnlockValues(
  values: readonly string[],
  start: number,
): TokenUnlockTerms {
  const [startBasis, startDate, period, cliffPeriod, cliffPercent, interval] =
    values.slice(start);
  return {
    startBasis: startBasis!,
    startDate: startDate!,
    period: period!,
    cliffPeriod: cliffPeriod!,
    cliffPercent: cliffPercent!,
    interval: interval!,
    customProvisions: "",
  };
}
export function signedSaftValues(values: readonly string[]) {
  if (values.length !== saftGlobalFields.length)
    throw Error("The SAFT terms do not match the registered agreement.");
  return signedUnlockValues(values, 4);
}
export function signedCliffSummary({
  cliffPeriod,
  cliffPercent,
}: Partial<Pick<TokenUnlockTerms, "cliffPeriod" | "cliffPercent">>) {
  if (cliffPeriod === undefined || cliffPercent === undefined) {
    const period = cliffPeriod?.trim()
      ? unlockIntervalCount(cliffPeriod)
      : "unavailable";
    const percentage = cliffPercent?.trim() || "unavailable";
    return `The recorded cliff period is ${period}. The recorded cliff percentage is ${percentage}.`;
  }
  if (!cliffPeriod.trim() && !cliffPercent.trim())
    return "No unlocking cliff is specified.";
  return `The cliff is ${unlockIntervalCount(cliffPeriod)} and releases ${cliffPercent || "unspecified"}.`;
}

export function signedUnlockSummary(values: TokenUnlockTerms) {
  const terms = unlockDocumentTerms(values);
  return `Unlocking starts ${terms.startBasis}. ${terms.startDate} Each interval is ${terms.interval}. The unlocking period is ${unlockIntervalCount(terms.period)}. ${signedCliffSummary(values)}`;
}
/** These are the agreement values submitted to the wallet. Certificate terms
 * in Exhibit E come separately from the actual draft or issued certificate. */
export function signedSafteValues(values: readonly string[]): SafteTerms {
  if (values.length !== safteGlobalFields.length)
    throw Error("The SAFTE terms do not match the registered agreement.");
  return {
    protocolCap: values[2]!,
    ...signedUnlockValues(values, 6),
    calculation: values[12]!,
    reserve: values[13]!,
    premium: values[14]!,
  };
}
export function signedSafteTerms(signed: SafteTerms) {
  const terms = safteDocumentTerms(signed);
  return `The purchase agreement specifies the following token terms. ${terms.protocolCap} The calculation uses ${terms.calculation}. The minimum company reserve is ${terms.reserve} and the premium multiplier is ${terms.premium}. ${signedUnlockSummary(signed)}`;
}
