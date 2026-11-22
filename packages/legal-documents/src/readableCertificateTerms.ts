export function readableCertificateTerms(original: string) {
  return original
    .split(/\\n|[|\r\n]/)
    .filter(Boolean)
    .map((term) => {
      if (term.startsWith("Governing law: "))
        return `The governing law recorded for the certificate is ${term.slice("Governing law: ".length)}.`;
      if (term.startsWith("Dispute resolution method: ")) {
        const value = term.slice("Dispute resolution method: ".length);
        return `The certificate records ${value === "bindingArbitration" ? "binding arbitration" : value === "courtResolution" ? "court resolution" : value} for dispute resolution.`;
      }
      return term;
    })
    .join(" ");
}
