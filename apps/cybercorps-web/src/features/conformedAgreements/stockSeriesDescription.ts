import type { shareExtensionV3Abi } from "@metalex-web/abis";
import type { StockCertificateReading } from "@metalex-web/legal-documents/conformed-stock-round";
import { type ContractFunctionReturnType, formatUnits } from "viem";

export type Share = ContractFunctionReturnType<
  typeof shareExtensionV3Abi,
  "view",
  "resolveCert"
>;
const amount = (value: bigint) => formatUnits(value, 18);

const date = (time: bigint) =>
  time === 0n
    ? "unspecified"
    : time > 8640000000000n
      ? `Unix time ${time}`
      : new Date(Number(time) * 1000).toISOString();

function option(index: number, choices: readonly string[]) {
  return choices[index] ?? `unrecognized recorded option ${index}`;
}

export function stockSeriesDescription(
  share: Share,
  shareClass: string,
  proposed = false,
) {
  const { terms: t, certificateData: c } = share;
  const series = t.seriesName || shareClass;
  const rights = [
    [
      "payToPlay",
      "Pay-to-play provisions",
      t.hasPayToPlay,
      t.payToPlayTermsURI,
    ],
    [
      "registration",
      "Registration rights",
      t.hasRegistrationRights,
      t.registrationRightsURI,
    ],
    ["proRata", "Pro rata rights", t.hasProRataRights, t.proRataRightsURI],
    [
      "information",
      "Information rights",
      t.hasInformationRights,
      t.informationRightsURI,
    ],
    [
      "dragAlong",
      "Drag-along rights",
      t.hasDragAlongRights,
      t.dragAlongTermsURI,
    ],
  ] as const;

  const seriesName = t.seriesName
    ? "The series is " + t.seriesName + "."
    : "The certificate gives no separate series name.";
  const parValue = `Par value is ${amount(t.parValue)} per share.`;
  const issuePrice = `The original issue price is ${amount(t.originalIssuePrice)} per share.`;
  const authorized = `The series has ${amount(t.authorizedShares)} authorized shares.`;
  const effective =
    t.effectiveDate > 0n
      ? `The series took effect on ${date(t.effectiveDate)}.`
      : "";
  const seriesAuthority = t.sourceAuthorityURI
    ? `The series identifies its authority at ${t.sourceAuthorityURI}.`
    : "";
  const liquidation = `The liquidation preference is ${amount(t.liquidationPreferenceMultiple)} times the original issue price. It is ${option(t.liquidationPreferenceType, ["nonparticipating", "participating", "capped participating"])}. The recorded participation cap is ${amount(t.participationCap)} and the seniority rank is ${t.seniorityRank}.`;
  const dividends = `The dividend provision is ${option(t.dividendType, ["none", "noncumulative", "cumulative"])}. The recorded dividend rate is ${amount(t.dividendRate)}.${t.dividendAccrualStartDate ? " Dividends accrue from " + date(t.dividendAccrualStartDate) + "." : ""} Dividends ${t.dividendCompounding ? "compound" : "do not compound"}`;
  const dividendEffect = t.dividendIncreasesLiquidationAmount
    ? "increase"
    : "do not increase";
  const conversion = `The shares ${t.isConvertible ? "are" : "are not"} convertible. The recorded conversion price is ${amount(t.conversionPrice)}.${t.targetConversionSeriesId ? " The target series is " + t.targetConversionSeriesId + "." : ""} Anti-dilution protection is ${option(t.antiDilutionType, ["none", "broad-based weighted average", "narrow-based weighted average", "full ratchet"])}. The terms ${t.allowsFractionalConversion ? "permit" : "do not permit"} fractional conversion and ${t.hasMandatoryConversion ? "provide" : "do not provide"} for mandatory conversion.`;
  const votes = `Each share carries ${amount(t.votesPerShare)} votes.`;
  const seats = `The series has ${t.designatedBoardSeats} designated board seats.`;
  const voting = `Class voting rights ${t.hasClassVotingRights ? "apply" : "do not apply"}. Series voting rights ${t.hasSeriesVotingRights ? "apply" : "do not apply"}.`;
  const redemption = [
    `The shares ${t.isRedeemable ? "are" : "are not"} redeemable. The recorded redemption method is ${option(t.redemptionType, ["none", "at the holder’s option", "at the company’s option", "mandatory", "event-triggered"])} and the recorded price is ${amount(t.redemptionPrice)}.`,
    ...(t.redemptionSchedule
      ? [`Redemption schedule. ${t.redemptionSchedule}`]
      : []),
    ...(t.redemptionTriggerDescription
      ? [`Redemption trigger. ${t.redemptionTriggerDescription}`]
      : []),
  ];
  const triggers = share.mandatoryConversionTriggers.map((v) =>
    `Mandatory conversion upon ${option(v.triggerType, ["a qualified IPO", "a class vote", "a deemed liquidation", "a custom event"])}. The two recorded thresholds are ${amount(v.primaryThreshold)} and ${amount(v.secondaryThreshold)}. ${v.additionalConditions} ${v.description}`.trim(),
  );
  const specialVotes = share.specialVotingRights.map((v) =>
    `A ${option(v.scope, ["class-wide", "series-specific"])} vote on ${v.matterType} carries ${amount(v.votesPerShare)} votes per share at a threshold of ${formatUnits(v.threshold, 2)}%. ${v.isVetoRight ? "This is a veto right." : "This vote carries no veto."} ${v.description}`.trim(),
  );
  const restrictions = share.transferRestrictions.flatMap((r) => [
    `The transfer restriction is ${option(r.restrictionType, ["none", "board consent", "right of first refusal and co-sale", "lock-up", "Securities Act restriction", "custom"])}. ${r.restrictionText} ${r.sourceAgreement} The restriction ${r.isRemovable ? "can" : "cannot"} be removed.`,
    ...r.exceptions.map(
      (e) =>
        `Exception ${e.exceptionType}. ${e.exceptionText} Evidence is ${e.requiresEvidence ? "required" : "optional"}.`,
    ),
  ]);
  const splits = share.splitHistory.map((s) =>
    `Split of ${s.numerator} for ${s.denominator} on ${date(s.timestamp)}. ${s.sourceAuthorityURI}`.trim(),
  );
  const paid = c.isPartlyPaid ? "partly paid" : "fully paid";
  const representation = option(c.representationType, [
    "certificated",
    "uncertificated",
    "tokenized",
  ]);
  const holding = c.holdingPeriodTackingApplied
    ? "The Rule 144 holding period includes the prior holder’s period as recorded on the predecessor certificate."
    : "The Rule 144 holding period begins on the date of issuance.";
  const payment = proposed
    ? `The proposed certificate specifies ${amount(c.amountPaid)} as paid and ${amount(c.totalConsideration)} as total consideration. Allocation will determine the shares and the payment actually settled.`
    : `The certificate records payment of ${amount(c.amountPaid)} against a subscription price of ${amount(c.totalConsideration)}.`;
  const certificateAuthority = c.sourceAuthorityURI
    ? `The certificate identifies its authority at ${c.sourceAuthorityURI}.`
    : "";
  const rightsText = rights.map(([key, label, applies, uri]) => ({
    key,
    text: `${label} ${applies ? "apply" : "do not apply"}.${uri ? " The record refers to " + uri + "." : ""}`,
  }));
  const parameters: StockCertificateReading["parameters"] = {
    shareClass: [
      `The certificate printer identifies the security type as ${shareClass}.`,
    ],
    series: [seriesName],
    parValue: [parValue],
    issuePrice: [issuePrice],
    authorized: [authorized],
    liquidation: [
      liquidation,
      `Dividends ${dividendEffect} the liquidation amount.`,
    ],
    dividends: [dividends + "."],
    conversion: [conversion, ...triggers],
    voting: [votes + " " + voting],
    seats: [seats],
    protective: specialVotes,
    restrictions,
    redemption,
    paid: [
      c.isPartlyPaid
        ? "The certificate records partly paid shares. The purchase agreement requires fully paid shares."
        : "The certificate describes its shares as fully paid.",
      payment,
    ],
    representation: [
      `The certificate records the representation as ${representation}.`,
    ],
    holding: [holding],
  };
  for (const right of rightsText) parameters[right.key] = [right.text];
  const reading: StockCertificateReading = {
    parameters,
    additional: [
      effective,
      seriesAuthority,
      ...splits,
      certificateAuthority,
    ].filter(Boolean),
  };

  // Issuer-adopted papers keep their existing certificate description. Exhibit A
  // places the same recorded facts under the rows of the registered stock form.
  const paragraphs = [
    [
      `The share class is ${shareClass}.`,
      seriesName,
      parValue,
      issuePrice,
      authorized,
    ].join(" "),
    effective,
    seriesAuthority,
    liquidation,
    `${dividends} and ${dividendEffect} the liquidation amount.`,
    conversion,
    [votes, seats, voting].join(" "),
    ...redemption,
    ...rightsText.map((right) => right.text),
    ...triggers,
    ...specialVotes,
    ...restrictions,
    ...splits,
    `The certificate describes its shares as ${paid} and their representation as ${representation}. ${holding}`,
    payment,
    certificateAuthority,
  ].filter(Boolean);
  return { series, reading, paragraphs };
}

export function describeStockShare(
  share: Share,
  kind: string,
  record?: { id: bigint; documentURI: string },
  proposed = false,
) {
  const description = stockSeriesDescription(share, kind, proposed);
  if (record?.id) {
    const registeredClass = `The ${proposed ? "proposed " : ""}certificate belongs to the issuer’s registered class ${record.id}.${record.documentURI ? " Its governing document is " + record.documentURI + "." : ""}`;
    description.reading.parameters.shareClass?.push(registeredClass);
    description.paragraphs.push(registeredClass);
  }
  return description;
}
