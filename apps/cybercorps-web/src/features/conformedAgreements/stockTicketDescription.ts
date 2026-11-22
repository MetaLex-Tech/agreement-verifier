import type { StockCertificateReading } from "@metalex-web/legal-documents/conformed-stock-round";
import { formatUnits, type Hex, zeroHash } from "viem";
import type { describeStockShare } from "./stockSeriesDescription";

export function describeTicketStock(
  certificates: readonly {
    label: string;
    terms: { unitsRepresented: bigint; legalDetails: string } | null;
    details: ReturnType<typeof describeStockShare> | null;
  }[],
  stage: "offer" | "escrow" | "settled",
) {
  const descriptions = certificates.map(({ label, terms, details }) => {
    if (!terms)
      return {
        series: undefined,
        paragraphs: [
          `The recorded terms and share count of ${label} in this externally created offer could not be verified.`,
        ],
      };
    const quantity = formatUnits(terms.unitsRepresented, 18);
    if (!details)
      return {
        series: undefined,
        paragraphs: [
          `The stock terms of ${label} in this externally created offer could not be verified. The recorded certificate quantity is ${quantity}.`,
        ],
      };
    const count = quantity + " " + (quantity === "1" ? "share" : "shares");
    const holdingText = (shares: string) =>
      stage === "offer"
        ? `The Company proposes ${shares}.`
        : stage === "escrow"
          ? `The escrow holds ${shares}.`
          : `The settlement delivered ${shares} to the Investor.`;
    const holding = holdingText(label + " representing " + count);
    return {
      series: details.series,
      paragraphs: [holding, ...details.paragraphs],
      reading: {
        ...details.reading,
        parameters: {
          ...details.reading.parameters,
          count: [certificates.length > 1 ? holdingText(count) : holding],
        },
      },
    };
  });
  const series = Array.from(
    new Set(descriptions.map((d) => d.series).filter(Boolean)),
  );
  return {
    series:
      series.length && descriptions.every((d) => d.series)
        ? series.join(" and ")
        : "the stock identified in the offer",
    stockCertificates: descriptions.length
      ? descriptions.map(
          (d, i): StockCertificateReading => ({
            certificate:
              d.reading && descriptions.length > 1
                ? certificates[i]!.label
                : undefined,
            ...(d.reading ?? { parameters: {}, additional: d.paragraphs }),
          }),
        )
      : undefined,
    certificateTerms: descriptions.length
      ? descriptions.flatMap((d) => d.paragraphs)
      : [
          "This externally created offer identifies no stock certificate in escrow.",
        ],
    legalDetails: certificates
      .flatMap((c) =>
        c.terms?.legalDetails
          ? [
              certificates.length > 1
                ? `For ${c.label}.\n${c.terms.legalDetails}`
                : c.terms.legalDetails,
            ]
          : [],
      )
      .join("\n"),
  };
}

export function stockTicketAdoption(
  secretHash: Hex,
  registryExpiry: bigint,
  settled: boolean,
) {
  const secret =
    secretHash === zeroHash
      ? `The agreement ${settled ? "required" : "requires"} no signing secret.`
      : `Signing ${settled ? "required" : "requires"} a secret with registered hash ${secretHash}.`;
  const date =
    registryExpiry > 8640000000000n
      ? "Unix time " + registryExpiry
      : new Date(Number(registryExpiry) * 1000).toISOString();
  return (
    secret +
    " " +
    (registryExpiry
      ? `The registry deadline ${settled ? "was" : "is"} ${date}.`
      : `The agreement ${settled ? "had" : "has"} no registry deadline.`)
  );
}
