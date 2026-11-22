import { sha256 } from "viem";
import {
  stockAnnotationSha256,
  stockRendererSha256,
  stockTicketRendererSha256,
} from "../../apps/cybercorps-web/src/features/conformedAgreements/stockReadingRevision";
import {
  reconstructIssuedStock,
  stockReadingProof,
} from "../../apps/cybercorps-web/src/features/conformedAgreements/stockRoundReading";
import {
  reconstructStockTicket,
  stockTicketProof,
} from "../../apps/cybercorps-web/src/features/conformedAgreements/stockTicketReading";
import {
  originalSaleSha256,
  reconstructSaleReading,
  saleReadingProof,
} from "../../apps/cybercorps-web/src/features/secondary-sales/standardSaleProof";
import { standardSaleRendererSha256 } from "../../apps/cybercorps-web/src/features/secondary-sales/standardSaleRendererRevision";
import {
  canonicalizeOpening,
  computeCommitment,
  isInvestorCommitment,
} from "../../packages/encryption/src/commitment";
import {
  conformedSaleVersion,
  isConformedSaleSource,
} from "../../packages/legal-documents/src/conformedSecondarySale";
import {
  type FinancingReceiptRecord,
  financingReceiptRecord,
} from "../../packages/legal-documents/src/financingReceipts";
import { registeredStock } from "../../packages/legal-documents/src/registeredStock";
import { matchingFinancingTemplates } from "../../packages/legal-documents/src/standardFinancingTemplates";
import { confirmFinancingReceipts, financingReceiptRows } from "./financing";
import {
  confirmRegisteredTerms,
  type ReadingEvidence,
} from "./registeredTerms";
import {
  type Agreement,
  agreementId,
  archiveLimit,
  confirmSnapshot,
  connect,
  decimal,
  finalized,
  findDocuments,
  pdfFingerprint,
  readAgreement,
  readEndorsement,
} from "./registry";

function el<T extends HTMLElement = HTMLElement>(id: string) {
  return document.getElementById(id) as T;
}
const input = (id: string) => el<HTMLInputElement>(id);
const val = (id: string) => input(id).value;
const show = (id: string, visible: boolean) => {
  el(id).hidden = !visible;
};
function status(id: string, message = "", error = false) {
  const node = el(id);
  node.textContent = message;
  node.classList.toggle("error", error);
}
function message(error: unknown) {
  // Transport errors can contain an endpoint's API key or verbose raw RPC data.
  return error instanceof Error && error.name === "Error"
    ? error.message
    : "The check could not finish. Check the input and the RPC endpoint’s network, archive access and browser permissions.";
}
function date(seconds: bigint) {
  const value = new Date(Number(seconds) * 1000);
  return Number.isFinite(value.getTime())
    ? value.toISOString()
    : seconds + " seconds since the Unix epoch";
}
let docRequest: AbortController | undefined;
let nameRequest: AbortController | undefined;
let openingLoad = 0;
let comparison = 0;
let selection: { chainId: number; values: string[] } | undefined;
function clearDoc() {
  docRequest?.abort();
  docRequest = undefined;
  el("matches").replaceChildren();
  status("doc-status");
  show("stop", false);
}
function clearComparison() {
  comparison++;
  status("name-status");
}
function clearLookup() {
  nameRequest?.abort();
  nameRequest = undefined;
  selection = undefined;
  el("choice").replaceChildren();
  show("choice-label", false);
  status("record-status");
  clearComparison();
}
let readingRun = 0;
let readingEvidence: ReadingEvidence | undefined;
let financeRecord: FinancingReceiptRecord | undefined;
let financeRequest: AbortController | undefined;
function clearFinanceRequest() {
  financeRequest?.abort();
  financeRequest = undefined;
  status("finance-status");
}
input("finance-rpc").oninput = clearFinanceRequest;
async function checkReadingOnchain(check: "terms" | "receipts") {
  clearFinanceRequest();
  const evidence = readingEvidence;
  const record = financeRecord;
  if (!(check === "terms" ? evidence : record)) return;
  const work = new AbortController();
  financeRequest = work;
  try {
    status(
      "finance-status",
      check === "terms"
        ? "Checking the terms recorded in the registry…"
        : "Checking the registered purchase and its receipts…",
    );
    const snapshot = await finalized(connect(val("finance-rpc"), work.signal));
    let result: string;
    if (check === "terms" && evidence) {
      await confirmRegisteredTerms(snapshot, evidence);
      result =
        "The template, general terms, signing wallets and recorded party fields match the registry at the recorded finalized block. For private fields, this confirms the commitment or ciphertext fingerprint. The disclosed wording, payment and settlement need separate verification.";
    } else if (record) {
      await confirmFinancingReceipts(snapshot, record);
      result =
        (record.kind === "round"
          ? "The company’s round approval, the investor’s registry signature and the allocation match the finalized records returned by this endpoint."
          : "Both ticket signing events, the proposal and settlement match the finalized records returned by this endpoint.") +
        (evidence
          ? " Check the registered terms separately. This receipt check covers only the listed events."
          : "");
    } else return;
    if (!work.signal.aborted) status("finance-status", result);
  } catch (error) {
    if (!work.signal.aborted) status("finance-status", message(error), true);
  }
}
el("check-finance").onclick = () => checkReadingOnchain("receipts");
el("check-terms").onclick = () => checkReadingOnchain("terms");

function offerNetworkChecks(
  evidence?: ReadingEvidence,
  receipts?: FinancingReceiptRecord,
) {
  readingEvidence = evidence;
  financeRecord = receipts;
  show("check-finance", Boolean(receipts));
  show("check-terms", Boolean(evidence));
  el("network-summary").textContent = evidence
    ? "Check the registered agreement onchain"
    : "Check financing receipts onchain";
  show("finance-network", true);
}
let stockOriginalUrl: string | undefined;
function clearReading() {
  if (stockOriginalUrl) URL.revokeObjectURL(stockOriginalUrl);
  stockOriginalUrl = undefined;
  readingRun++;
  clearFinanceRequest();
  readingEvidence = undefined;
  financeRecord = undefined;
  show("finance-network", false);
  (el("finance-network") as HTMLDetailsElement).open = false;
  el("reading-result").replaceChildren();
  status("reading-status");
}
function panel(active: "name" | "doc" | "reading") {
  clearDoc();
  clearLookup();
  clearReading();
  for (const [id, button, panel] of [
    ["name", "tab-name", "name-panel"],
    ["doc", "tab-doc", "doc"],
    ["reading", "tab-reading", "reading-panel"],
  ] as const) {
    show(panel, id === active);
    el(button).setAttribute("aria-pressed", String(id === active));
  }
}
el("tab-doc").onclick = () => panel("doc");
el("tab-name").onclick = () => panel("name");
el("tab-reading").onclick = () => panel("reading");
for (const id of ["reading-json", "reading-original"])
  el(id).oninput = clearReading;
el("read-sale").onclick = async () => {
  clearReading();
  const run = readingRun;
  try {
    const proof = input("reading-json").files?.[0];
    const original = input("reading-original").files?.[0];
    if (!proof)
      throw Error("Choose the JSON attachment from the completed agreement.");
    if (
      proof.size > 16 * 1024 * 1024 ||
      (original?.size ?? 0) > 8 * 1024 * 1024
    )
      throw Error("The selected files exceed the supported size.");
    const [json, bytes] = await Promise.all([
      proof.text(),
      original?.arrayBuffer(),
    ]);
    if (run !== readingRun) return;
    const decoded = JSON.parse(json);
    const ticket =
      decoded?.evidence?.renderer === "settled-standard-stock-ticket-v1";
    if (
      ticket ||
      decoded?.evidence?.renderer === "issued-standard-stock-round-v1"
    ) {
      if (!bytes || !original)
        throw Error(
          "Choose the original registered stock purchase PDF to reproduce the agreement.",
        );
      if (
        bytes.byteLength !== registeredStock.size ||
        sha256(new Uint8Array(bytes)) !== "0x" + registeredStock.sha256
      )
        throw Error(
          "The original PDF differs from the registered stock purchase template.",
        );
      if (
        decoded.evidence.rendererSha256 !==
          (ticket ? stockTicketRendererSha256 : stockRendererSha256) ||
        decoded.evidence.annotationsSha256 !== stockAnnotationSha256
      )
        throw Error(
          "The reading uses a different revision. Open the verifier supplied with the completed agreement.",
        );
      const proof = (ticket ? stockTicketProof : stockReadingProof).safeParse(
        decoded,
      );
      if (!proof.success)
        throw Error(
          "The file does not contain complete standard stock purchase evidence.",
        );
      const { evidence, readingSha256 } = proof.data;
      const { nodes, digest } =
        evidence.renderer === "settled-standard-stock-ticket-v1"
          ? reconstructStockTicket(evidence)
          : reconstructIssuedStock(evidence);
      if (digest !== readingSha256)
        throw Error(
          "The supplied evidence and the reconstructed wording disagree.",
        );
      const fragment = document.createDocumentFragment();
      for (const node of nodes) {
        if (node.kind === "original-pages") {
          stockOriginalUrl = URL.createObjectURL(
            new Blob([bytes], { type: "application/pdf" }),
          );
          const link = document.createElement("a");
          link.href = stockOriginalUrl + "#page=" + node.first;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent =
            "Read the incorporated documents on pages " +
            node.first +
            "–" +
            node.last +
            " of the verified original";
          fragment.append(link);
        } else {
          const element = document.createElement(
            node.kind === "heading" ? "h3" : "p",
          );
          element.textContent = node.text;
          fragment.append(element);
        }
      }
      el("reading-result").replaceChildren(fragment);
      offerNetworkChecks(evidence, evidence.receipts);
      status(
        "reading-status",
        "The registered PDF matches. The reconstructed stock purchase terms and signature page match the fingerprint supplied with this copy. Anyone can compute that fingerprint. Private values come from the party download. You can check the registered terms and transaction receipts below.",
      );
      return;
    }
    if (decoded?.format === "metalex-financing-receipts-v1") {
      const result = financingReceiptRecord.safeParse(decoded);
      if (!result.success)
        throw Error(
          "The file does not contain a consistent set of standard financing receipts.",
        );
      const record = result.data;
      if (bytes) {
        const original = await pdfFingerprint(new Uint8Array(bytes));
        if (run !== readingRun) return;
        const uri = record.legalContractUri.replace(/^ipfs:\/\//i, "ipfs://");
        if (!original.uris.has(uri))
          throw Error(
            "The selected PDF differs from the original identified by the financing receipts.",
          );
      }
      const fragment = document.createDocumentFragment();
      const details = document.createElement("p");
      details.textContent =
        "Agreement " +
        record.agreementId +
        " on chain " +
        record.chainId +
        ". Company wallet " +
        record.company +
        (record.kind === "round"
          ? ". Officer who approved the round terms "
          : ". Signing officer ") +
        record.officer +
        ". Investor " +
        record.investor +
        ".";
      fragment.append(details);
      for (const [label, event] of financingReceiptRows(record)) {
        const row = document.createElement("p");
        row.textContent =
          label +
          " · " +
          date(BigInt(event.timestamp)) +
          "\nTransaction " +
          event.transactionHash +
          "\nBlock " +
          event.number +
          " · " +
          event.hash;
        fragment.append(row);
      }
      el("reading-result").replaceChildren(fragment);
      offerNetworkChecks(undefined, record);
      status(
        "reading-status",
        (bytes
          ? "The PDF matches the original template identified in this file. "
          : "") +
          "The dates and transactions below come from the attached receipts. To confirm them independently, check them against an archive RPC endpoint.",
      );
      return;
    }
    if (!bytes)
      throw Error("Choose the original PDF to reproduce the sale agreement.");
    if (sha256(new Uint8Array(bytes)) !== originalSaleSha256)
      throw Error(
        "The original PDF differs from the registered standard sale template.",
      );
    if (
      decoded?.evidence?.renderer === "standard-secondary-sale-v1" &&
      decoded.evidence.rendererSha256 !== standardSaleRendererSha256
    )
      throw Error(
        "This reading uses a different renderer revision. Use a trusted verifier for the revision supplied with the PDF.",
      );
    const result = saleReadingProof.safeParse(decoded);
    if (!result.success)
      throw Error(
        "The evidence does not match the supported completed standard sale format.",
      );
    const { evidence, readingSha256 } = result.data;
    const { nodes, digest } = reconstructSaleReading(evidence);
    if (digest !== readingSha256)
      throw Error(
        "The supplied evidence and the reconstructed wording disagree.",
      );
    const privateFields = [
      ...evidence.seller.fields,
      ...evidence.purchaser.fields,
    ].filter((f) => f.disclosure !== "recorded");
    const lines = [
      "The original PDF matches the registered template. The wording below matches the fingerprint in the supplied evidence. Anyone can create an evidence file and compute its fingerprint.",
      "The recomputed IDs cover the parties’ wallets, template, offer salt, fill index, general terms and manager. Independently confirm the sale onchain to authenticate its amount, position, recorded party details and settlement. This offline reading does not check signatures or the completed PDF pages.",
    ];
    if (privateFields.length)
      lines.push(
        "Private party values are reproduced as supplied by the authorized download. This check does not authenticate the decryption or open a commitment.",
      );
    const fragment = document.createDocumentFragment();
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = "Evidence used for this reading";
    details.append(summary);
    const list = document.createElement("ul");
    const add = (text: string) => {
      const item = document.createElement("li");
      item.textContent = text;
      list.append(item);
    };
    add(
      "Recorded chain " +
        evidence.chainId +
        ", registry " +
        evidence.registry +
        ", finalized block " +
        evidence.finalized.number +
        " (" +
        evidence.finalized.hash +
        ").",
    );
    for (const [role, party] of [
      ["Seller", evidence.seller],
      ["Purchaser", evidence.purchaser],
    ] as const) {
      for (const [i, field] of party.fields.entries()) {
        if (field.disclosure === "recorded") continue;
        const term = [
          "party type",
          "name",
          "signer",
          "signing capacity",
          "notice contact",
        ][i];
        add(
          role +
            "’s " +
            term +
            (field.disclosure === "agreement-party-disclosure"
              ? " was supplied by the party download for commitment " +
                field.commitment +
                "."
              : " was supplied by agreement-party decryption. The recorded ciphertext fingerprint is " +
                field.ciphertextSha256 +
                "."),
        );
      }
    }
    details.append(list);
    fragment.append(details);
    for (const node of nodes) {
      const element = document.createElement(
        node.kind === "heading" ? "h3" : "p",
      );
      element.textContent = node.text;
      fragment.append(element);
    }
    el("reading-result").replaceChildren(fragment);
    offerNetworkChecks(evidence);
    status("reading-status", lines.join("\n"));
  } catch (error) {
    if (run === readingRun)
      status(
        "reading-status",
        error instanceof SyntaxError
          ? "The evidence file contains invalid JSON."
          : message(error),
        true,
      );
  }
};
for (const id of ["pdf", "car", "doc-id", "doc-rpc", "start"])
  el(id).oninput = clearDoc;
el("stop").onclick = () => {
  clearDoc();
  status("doc-status", "Search cancelled. Coverage is incomplete.");
};
const drop = el("drop");
drop.ondragover = (e) => {
  e.preventDefault();
  drop.classList.add("over");
};
drop.ondragleave = () => drop.classList.remove("over");
drop.ondrop = (e) => {
  e.preventDefault();
  drop.classList.remove("over");
  clearDoc();
  if (e.dataTransfer?.files.length === 1)
    input("pdf").files = e.dataTransfer.files;
  else {
    input("pdf").value = "";
    status("doc-status", "Choose one PDF.", true);
  }
};
function display(record: Agreement) {
  const article = document.createElement("article");
  article.className = "record";
  const title = document.createElement("h3");
  title.textContent = "Matching agreement · " + record.status;
  article.append(title);
  const list = document.createElement("dl");
  function add(label: string, value: string) {
    const dt = document.createElement("dt");
    const dd = document.createElement("dd");
    dt.textContent = label;
    dd.textContent = value;
    list.append(dt, dd);
  }
  add("Agreement ID", record.id);
  add("Registered reference", record.uri);
  for (const [i, wallet] of record.parties.entries()) {
    add(
      "Party " + (i + 1),
      wallet +
        " · " +
        (record.signed[i]
          ? "Signed " + date(record.signed[i]!)
          : "Awaiting signature"),
    );
  }
  article.append(list);
  el("matches").append(article);
}
function describeTemplate(
  fingerprint: Awaited<ReturnType<typeof pdfFingerprint>>,
  digest: string,
) {
  const matches = matchingFinancingTemplates(fingerprint.uris);
  const entries = matches.map((paper) =>
    [
      paper.name,
      "Registered title " + paper.title,
      "Template ID " + paper.id,
      "ipfs://" + paper.cid,
    ].join("\n"),
  );
  if ("0x" + fingerprint.sha256 === originalSaleSha256) {
    const sources = [...fingerprint.uris].filter(isConformedSaleSource);
    if (sources.length)
      entries.push(
        [
          "Secondary Sale and Assignment Agreement v" + conformedSaleVersion,
          ...sources,
        ].join("\n"),
      );
  }
  if (!entries.length)
    return (
      "No matching original was found in this verifier’s standard template catalog.\n\n" +
      digest
    );
  return [
    matches.length > 1
      ? "Original template match. These registration IDs share the same PDF."
      : "Original template match.",
    ...entries,
    digest,
    "To check a particular agreement and its signing record, use the finalized registry.",
  ].join("\n\n");
}

function documentSearch(signal: AbortSignal) {
  const id = val("doc-id").trim();
  const start = val("start").trim();
  const options = {
    id: id ? agreementId(id) : undefined,
    from: !id && start ? decimal(start, "start block") : undefined,
  };
  return { client: connect(val("doc-rpc").trim(), signal), id, options };
}

el("doc-mode").onchange = () => {
  clearDoc();
  const offline = val("doc-mode") === "offline";
  show("registry-options", !offline);
  show("template-help", offline);
  el("search").textContent = offline ? "Identify template" : "Check document";
};
el("search").onclick = async () => {
  clearDoc();
  const work = new AbortController();
  docRequest = work;
  let digest = "";
  try {
    const file = input("pdf").files?.[0];
    if (!file) throw Error("Choose a PDF to check.");
    const registry =
      val("doc-mode") === "offline" ? undefined : documentSearch(work.signal);
    show("stop", true);
    status("doc-status", "Hashing the PDF in this browser…");
    const car = registry ? input("car").files?.[0] : undefined;
    if (car && car.size > archiveLimit)
      throw Error("Choose a CAR file of 27 MiB or less.");
    const fingerprint = await pdfFingerprint(
      new Uint8Array(await file.arrayBuffer()),
      car ? new Uint8Array(await car.arrayBuffer()) : undefined,
    );
    digest = "PDF SHA-256 · " + fingerprint.sha256;
    work.signal.throwIfAborted();
    if (!registry) {
      status("doc-status", describeTemplate(fingerprint, digest));
      return;
    }
    const { client, id, options } = registry;
    status("doc-status", digest + "\nReading the finalized registry…");
    const s = await finalized(client);
    const result = await findDocuments(s, fingerprint, {
      ...options,
      signal: work.signal,
      progress: (through) => {
        if (!work.signal.aborted)
          status(
            "doc-status",
            digest +
              "\nSearched through block " +
              through +
              " of " +
              s.number +
              ".",
          );
      },
    });
    work.signal.throwIfAborted();
    const coverage = id
      ? "Agreement " + id
      : "Blocks " +
        result.from +
        "–" +
        s.number +
        " · " +
        result.inspected +
        " agreement(s) examined";
    const outcome = result.records.length
      ? result.records.length + " matching agreement(s)."
      : result.unsupported
        ? "No match among verifiable references."
        : "No matching agreement.";
    const unknown = result.unsupported
      ? " " +
        result.unsupported +
        " agreement reference(s) could not be verified from this PDF."
      : "";
    status(
      "doc-status",
      outcome +
        unknown +
        "\n" +
        coverage +
        "\nChain " +
        s.chainId +
        " · Registry " +
        s.registry +
        "\nFinalized block " +
        s.number +
        " · " +
        s.hash +
        "\n" +
        digest,
    );
    result.records.forEach(display);
  } catch (error) {
    if (!work.signal.aborted)
      status(
        "doc-status",
        [digest, "Check incomplete. " + message(error)]
          .filter(Boolean)
          .join("\n"),
        true,
      );
  } finally {
    if (docRequest === work) {
      docRequest = undefined;
      show("stop", false);
    }
  }
};
const fields = {
  chainId: "chain",
  contract: "origin",
  position: "position",
  field: "field",
  value: "value",
  salt: "salt",
} as const;
function opening() {
  return canonicalizeOpening({
    chainId: val("chain"),
    contract: val("origin"),
    position: val("position"),
    field: val("field"),
    value: val("value"),
    salt: val("salt"),
  });
}
for (const id of Object.values(fields))
  el(id).oninput = () => {
    openingLoad++;
    input("opening-file").value = "";
    clearComparison();
  };
el("opening-file").onchange = async () => {
  const generation = ++openingLoad;
  clearComparison();
  try {
    const file = input("opening-file").files?.[0];
    if (!file) return;
    for (const id of Object.values(fields)) input(id).value = "";
    const parsed = JSON.parse(await file.text());
    const opened = canonicalizeOpening(parsed?.opening ?? parsed);
    if (openingLoad !== generation) return;
    for (const [key, id] of Object.entries(fields))
      input(id).value = opened[key as keyof typeof fields];
    status(
      "name-status",
      "Opening loaded. Choose the recorded commitment to compare.",
    );
  } catch {
    if (generation === openingLoad) {
      for (const id of Object.values(fields)) input(id).value = "";
      status(
        "name-status",
        "The file does not contain a valid v1 opening.",
        true,
      );
    }
  }
};
el("source").onchange = () => {
  clearLookup();
  const source = val("source");
  show("pasted", source === "paste");
  show("remote", source !== "paste");
  show("ag-label", source === "agreement");
  show("let-fields", source === "let");
};
for (const id of ["name-rpc", "name-id", "printer", "token", "slot"])
  el(id).oninput = clearLookup;
el("recorded").oninput = clearComparison;
el("choice").onchange = clearComparison;
el("load-record").onclick = async () => {
  clearLookup();
  const work = new AbortController();
  nameRequest = work;
  try {
    const source = val("source");
    const s = await finalized(connect(val("name-rpc").trim(), work.signal));
    const options: Array<[string, string]> = [];
    function add(label: string, value: string) {
      if (isInvestorCommitment(value)) options.push([label, value]);
    }
    if (source === "agreement") {
      const r = await readAgreement(s, agreementId(val("name-id").trim()));
      if (!r) throw Error("No agreement with that ID was found.");
      for (const [i, value] of r.values.entries())
        add(`Agreement field ${i + 1} · ${r.globals[i]}`, value);
      for (const [party, row] of r.rows.entries()) {
        for (const [i, value] of row.entries()) {
          add(
            `Party ${party + 1} · field ${i + 1} · ${r.fields[i] ?? "Unlabelled"}`,
            value,
          );
        }
      }
      await confirmSnapshot(s);
    } else {
      const endorsement = await readEndorsement(
        s,
        val("printer").trim(),
        val("token"),
        val("slot"),
      );
      add("Endorsee " + endorsement.endorsee, endorsement.endorseeName);
    }
    work.signal.throwIfAborted();
    selection = { chainId: s.chainId, values: options.map(([, v]) => v) };
    for (const [i, [label]] of options.entries())
      el("choice").append(new Option(label, String(i)));
    show("choice-label", options.length > 0);
    status(
      "record-status",
      (options.length
        ? "Choose the recorded field."
        : "This record has no v1 commitment in the selected fields.") +
        "\nChain " +
        s.chainId +
        " · Finalized block " +
        s.number +
        " · " +
        s.hash,
    );
  } catch (error) {
    if (!work.signal.aborted)
      status("record-status", "Lookup incomplete. " + message(error), true);
  }
};
el("compare").onclick = async () => {
  clearComparison();
  const pending = comparison;
  try {
    const o = opening();
    const online = val("source") !== "paste";
    if (online && String(selection?.chainId) !== o.chainId)
      throw Error("Read a record on the opening’s chain before comparing.");
    const target = online
      ? selection?.values[Number(val("choice"))]
      : val("recorded").trim();
    if (!isInvestorCommitment(target))
      throw Error("Choose or paste a v1 commitment.");
    const calculated = await computeCommitment(o);
    if (pending !== comparison) return;
    const match = target === calculated;
    status(
      "name-status",
      (match
        ? "Match. The opening produces the recorded commitment."
        : "Mismatch. The opening produces a different commitment.") +
        "\nComputed · " +
        calculated,
      !match,
    );
  } catch (error) {
    if (pending === comparison) {
      el<HTMLDetailsElement>("context").open = true;
      status("name-status", message(error), true);
    }
  }
};
