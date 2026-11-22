// Offsets address UTF-16 code units in an immutable source string. Resolve values
// only after splitting the source. An inserted value is always a literal leaf.
export type ReferenceSpan<R> = {
  start: number;
  registered: string;
  reference: R;
};
export type AgreementNode<R> = string | { registered: string; reference: R };

export function agreementNodes<R>(
  source: string,
  spans: ReferenceSpan<R>[],
): AgreementNode<R>[] {
  const nodes: AgreementNode<R>[] = [];
  let cursor = 0;
  for (const span of [...spans].sort((a, b) => a.start - b.start)) {
    if (
      !span.registered ||
      span.start < cursor ||
      !source.startsWith(span.registered, span.start)
    )
      throw Error(
        "The agreement annotation does not match its registered source.",
      );
    if (span.start > cursor) nodes.push(source.slice(cursor, span.start));
    nodes.push({ registered: span.registered, reference: span.reference });
    cursor = span.start + span.registered.length;
  }
  if (cursor < source.length) nodes.push(source.slice(cursor));
  return nodes;
}

export function renderReferences<R>(
  nodes: AgreementNode<R>[],
  natural?: (ref: R) => string,
) {
  return nodes
    .map((node) =>
      typeof node === "string"
        ? node
        : natural
          ? natural(node.reference)
          : node.registered,
    )
    .join("");
}

export function additionalTermsSection(
  value: string,
  edition: "standard" | "custom",
) {
  if (typeof value !== "string")
    throw Error("The additional terms could not be verified.");
  if (value === "" || value === (edition === "standard" ? "None" : "None."))
    return [];
  return [
    {
      heading:
        edition === "standard" ? "8. Additional terms" : "6. Additional terms",
      paragraphs: [value],
    },
  ];
}

export type SaleValueKey =
  | "units"
  | "payment"
  | "tokenId"
  | "printer"
  | "pathway";
export type SaleReadingValues = Record<SaleValueKey, string | undefined>;
export type FieldMark = { start: number; value: string };
const futureLabels: Record<SaleValueKey, string> = {
  units: "Units purchased",
  payment: "Purchase price",
  tokenId: "Source position",
  printer: "Certificate contract",
  pathway: "Exemption pathway",
};

export function futureSaleValue(key: SaleValueKey) {
  return "[" + futureLabels[key] + "]";
}

export function readSaleValue(key: SaleValueKey, values: SaleReadingValues) {
  const value = values[key];
  return value === undefined
    ? { text: futureSaleValue(key), future: true }
    : { text: value, future: false };
}

export function readMarkedReferences<R>(
  nodes: AgreementNode<R>[],
  resolve: (ref: R) => { text: string; future?: boolean },
) {
  let text = "";
  const marks: FieldMark[] = [];
  for (const node of nodes) {
    if (typeof node === "string") {
      text += node;
      continue;
    }
    const value = resolve(node.reference);
    if (value.future) marks.push({ start: text.length, value: value.text });
    text += value.text;
  }
  return { text, marks };
}
