import { CID } from "multiformats/cid";
import { create as multihash } from "multiformats/hashes/digest";
import {
  type Address,
  createPublicClient,
  decodeEventLog,
  getAbiItem,
  type Hex,
  http,
  isAddress,
  isAddressEqual,
  type PublicClient,
  toHex,
  zeroHash,
} from "viem";
import { cyberAgreementRegistryAbi as registryAbi } from "../../packages/abis/cybercorps/cyberAgreementRegistry";
import { cyberCertPrinterAbi } from "../../packages/abis/cybercorps/cyberCertPrinterAbi";
import { cyberCertPrinterAbiV4 } from "../../packages/abis/cybercorps/cyberCertPrinterAbiV4";
import { supportedCorpContractMajor } from "../../packages/document-signing/src/corpContractVersion";
import { probeRegistryRuntimeCompatibility } from "../../packages/document-signing/src/server/registryCompatibilityCore";
import { GOVERNANCE_DOCUMENT_REGISTRY_MATRIX as matrix } from "../../packages/document-signing/src/server/registryMatrix";
import {
  isManagedPrivateDocument,
  parsePrivateDocumentReference,
} from "../../packages/legal-documents/src/privateSigningReference";
import {
  openRegisteredFileArchive,
  registeredFileUris,
} from "../../packages/legal-documents/src/registeredAgreementFile";

export function decimal(value: string, what: string) {
  if (!/^(0|[1-9]\d{0,77})$/.test(value) || BigInt(value) >= 2n ** 256n)
    throw Error("Enter a valid " + what + ".");
  return BigInt(value);
}
export function agreementId(value: string): Hex {
  if (!/^0x[a-fA-F0-9]{64}$/.test(value))
    throw Error("Enter the 32-byte agreement ID.");
  return value as Hex;
}
export function connect(endpoint: string, signal: AbortSignal) {
  const url = new URL(endpoint);
  if (
    !(
      url.protocol === "https:" ||
      (url.protocol === "http:" &&
        ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname))
    ) ||
    url.username ||
    url.password ||
    url.hash
  )
    throw Error("Enter an HTTPS RPC endpoint or a local HTTP endpoint.");
  return createPublicClient({
    transport: http(url.href, {
      retryCount: 0,
      timeout: 30000,
      fetchOptions: {
        credentials: "omit",
        redirect: "error",
        referrerPolicy: "no-referrer",
      },
      fetchFn: (input, init) =>
        fetch(input, {
          ...init,
          signal: init?.signal
            ? AbortSignal.any([signal, init.signal])
            : signal,
        }),
    }),
  });
}
export type Snapshot = {
  client: PublicClient;
  chainId: number;
  registry: Address;
  number: bigint;
  hash: Hex;
  timestamp: bigint;
};
export async function finalized(client: PublicClient): Promise<Snapshot> {
  const [chainId, block] = await Promise.all([
    client.getChainId(),
    client.getBlock({ blockTag: "finalized" }),
  ]);
  return verifiedSnapshot(client, chainId, block);
}

export async function verifiedSnapshot(
  client: PublicClient,
  chainId: number,
  block: { number: bigint; hash: Hex; timestamp: bigint },
): Promise<Snapshot> {
  const checked = await probeRegistryRuntimeCompatibility({
    chainId,
    client,
    matrix,
    blockNumber: block.number,
  });
  if (!checked.isCompatible || !checked.registryAddress)
    throw Error(
      "This network or registry implementation has no matching runtime review.",
    );
  return {
    client,
    chainId,
    registry: checked.registryAddress,
    number: block.number,
    hash: block.hash,
    timestamp: block.timestamp,
  };
}
export async function recordedSnapshot(
  latest: Snapshot,
  record: {
    chainId: number;
    registry: Address;
    finalized: { number: string; hash: Hex };
  },
): Promise<Snapshot> {
  const height = BigInt(record.finalized.number);
  if (
    latest.chainId !== record.chainId ||
    !isAddressEqual(latest.registry, record.registry) ||
    latest.number < height
  )
    throw Error(
      "The endpoint does not cover the recorded network, registry and finalized block.",
    );
  const block = await latest.client.getBlock({ blockNumber: height });
  if (
    block.number !== height ||
    block.hash !== record.finalized.hash ||
    (height === latest.number && block.hash !== latest.hash)
  )
    throw Error(
      "The recorded finalized block differs from the canonical block.",
    );
  const historical =
    height === latest.number
      ? latest
      : await verifiedSnapshot(latest.client, latest.chainId, block);
  if (!isAddressEqual(historical.registry, record.registry))
    throw Error(
      "The registry at the recorded block differs from the supplied record.",
    );
  return historical;
}

export async function confirmSnapshot(s: Snapshot) {
  if (
    (await s.client.getBlock({ blockNumber: s.number })).hash !== s.hash ||
    (await s.client.getChainId()) !== s.chainId
  )
    throw Error("The network or finalized block changed. Run the check again.");
}
// The issuer publication form accepts a 25 MiB agreement and 2 MiB of CAR overhead.
const fileLimit = 25 * 1024 * 1024;
export const archiveLimit = fileLimit + 2 * 1024 * 1024;
type Classification = "candidate" | "different" | "unsupported";

export async function pdfFingerprint(
  bytes: Uint8Array<ArrayBuffer>,
  car?: Uint8Array,
) {
  if (new TextDecoder().decode(bytes.subarray(0, 5)) !== "%PDF-")
    throw Error("Choose the original PDF file.");
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
  const sha256 = toHex(digest).slice(2);
  const uris = new Set<string>();
  for await (const uri of registeredFileUris(bytes)) uris.add(uri);
  uris.add("ipfs://" + CID.createV1(0x55, multihash(0x12, digest)).toString());
  let archive: ReturnType<typeof openRegisteredFileArchive> | undefined;
  if (car) {
    try {
      archive = openRegisteredFileArchive(car, archiveLimit);
    } catch {
      throw Error("Choose a valid IPFS CAR file with one root, up to 27 MiB.");
    }
  }
  const checked = new Map<string, Classification>();
  async function classify(uri: string): Promise<Classification> {
    if (isManagedPrivateDocument(uri)) {
      const ref = parsePrivateDocumentReference(uri);
      if (!ref) return "unsupported";
      return ref.documentSha256 === sha256 ? "candidate" : "different";
    }
    if (uris.has(uri)) return "candidate";
    if (!uri.startsWith("ipfs://")) return "unsupported";
    const cached = checked.get(uri);
    if (cached) return cached;
    try {
      const [root, ...path] = uri.slice(7).split("/");
      const cid = CID.parse(root!);
      if (!path.length && cid.code === 0x55 && cid.multihash.code === 0x12) {
        if (cid.multihash.digest.length !== digest.length) return "unsupported";
        return cid.multihash.digest.every((byte, i) => byte === digest[i])
          ? "candidate"
          : "different";
      }
      // A different UnixFS chunk layout can identify the very same file.
      if (!archive?.root.equals(cid)) return "unsupported";
      const original = await archive.readFile(uri, fileLimit);
      const kind =
        original.length === bytes.length &&
        original.every((byte, i) => byte === bytes[i])
          ? "candidate"
          : "different";
      checked.set(uri, kind);
      return kind;
    } catch {
      checked.set(uri, "unsupported");
      return "unsupported";
    }
  }
  return { sha256, uris, classify };
}
type Fingerprint = Awaited<ReturnType<typeof pdfFingerprint>>;
export async function readAgreement(s: Snapshot, id: Hex) {
  const common = {
    address: s.registry,
    abi: registryAbi,
    args: [id],
    blockNumber: s.number,
  } as const;
  const [template, count, , finalized, voided, , expiry] =
    await s.client.readContract({ ...common, functionName: "agreements" });
  if (template === zeroHash) return null;
  const [
    confirmed,
    uri,
    globals,
    fields,
    values,
    parties,
    rows,
    signed,
    total,
    complete,
  ] = await s.client.readContract({
    ...common,
    functionName: "getContractDetails",
  });
  if (
    template !== confirmed ||
    !parties.length ||
    globals.length !== values.length ||
    parties.length !== rows.length ||
    parties.length !== signed.length ||
    count !== total ||
    BigInt(signed.filter((t) => t > 0n).length) !== count ||
    complete !== (count === BigInt(parties.length))
  )
    throw Error("The registry returned inconsistent agreement details.");
  const status = voided
    ? "Voided"
    : finalized
      ? "Finalized"
      : complete
        ? "Fully signed"
        : expiry > 0n && expiry < s.timestamp
          ? "Expired"
          : count > 0n
            ? "Partly signed"
            : "Awaiting signatures";
  return {
    id,
    template,
    uri,
    globals,
    fields,
    values,
    parties,
    rows,
    signed,
    status,
  };
}
export type Agreement = NonNullable<Awaited<ReturnType<typeof readAgreement>>>;
async function matches(record: Agreement, pdf: Fingerprint) {
  const classification = await pdf.classify(record.uri);
  if (classification !== "candidate") return classification;
  const hashes = record.values.filter(
    (_, i) => record.globals[i] === "documentSha256",
  );
  if (
    (isManagedPrivateDocument(record.uri) || hashes.length > 0) &&
    (hashes.length !== 1 || hashes[0]?.toLowerCase() !== pdf.sha256)
  )
    return "unsupported";
  return "match";
}
async function firstRegistryBlock(s: Snapshot) {
  // This reviewed proxy has retained its address since deployment. An archive read
  // failure must interrupt the search rather than exclude the early history.
  let lo = 0n;
  let hi = s.number;
  while (lo < hi) {
    const mid = (lo + hi) / 2n;
    const code = await s.client.getCode({
      address: s.registry,
      blockNumber: mid,
    });
    if (code && code !== "0x") hi = mid;
    else lo = mid + 1n;
  }
  return lo;
}
export async function findDocuments(
  s: Snapshot,
  pdf: Fingerprint,
  options: {
    id?: Hex;
    from?: bigint;
    progress: (through: bigint) => void;
    signal: AbortSignal;
  },
) {
  const records: Agreement[] = [];
  let unsupported = 0;
  let inspected = 0;
  const inspect = async (id: Hex, template?: Hex) => {
    const record = await readAgreement(s, id);
    if (!record && !template) return;
    if (!record || (template && record.template !== template))
      throw Error(
        "An agreement could not be reconciled with its creation log.",
      );
    const check = await matches(record, pdf);
    if (check === "match") records.push(record);
    if (check === "unsupported") unsupported++;
  };
  let from = options.from ?? 0n;
  if (options.id) {
    inspected++;
    await inspect(options.id);
  } else {
    if (options.from === undefined) from = await firstRegistryBlock(s);
    if (from > s.number)
      throw Error("The start block is after the finalized block.");
    const created = getAbiItem({ abi: registryAbi, name: "ContractCreated" });
    const seen = new Set<string>();
    const templates = new Map<Hex, Classification>();
    let span = 65536n;
    for (let first = from; first <= s.number; ) {
      options.signal.throwIfAborted();
      const last = first + span - 1n > s.number ? s.number : first + span - 1n;
      let logs;
      try {
        logs = await s.client.getLogs({
          address: s.registry,
          event: created,
          fromBlock: first,
          toBlock: last,
          strict: false,
        });
        if (logs.length >= 1000 && last > first)
          throw Error("Split this range to avoid provider result limits.");
        if (logs.length >= 1000)
          throw Error("The single-block RPC result may be truncated.");
      } catch (error) {
        options.signal.throwIfAborted();
        if (last === first) throw error;
        span = (last - first + 1n) / 2n;
        continue;
      }
      for (const log of logs) {
        const { contractId, templateId } = decodeEventLog({
          abi: [created],
          data: log.data,
          topics: log.topics,
          strict: true,
        }).args;
        if (
          log.removed ||
          log.address.toLowerCase() !== s.registry.toLowerCase() ||
          log.blockNumber === null ||
          !log.blockHash ||
          log.blockNumber < first ||
          log.blockNumber > last ||
          seen.has(contractId)
        )
          throw Error("The RPC returned inconsistent creation logs.");
        seen.add(contractId);
        inspected++;
        let kind = templates.get(templateId);
        if (!kind) {
          const [uri] = await s.client.readContract({
            address: s.registry,
            abi: registryAbi,
            functionName: "getTemplateDetails",
            args: [templateId],
            blockNumber: s.number,
          });
          kind = await pdf.classify(uri);
          templates.set(templateId, kind);
        }
        if (kind === "candidate") await inspect(contractId, templateId);
        else if (kind === "unsupported") unsupported++;
      }
      options.progress(last);
      first = last + 1n;
    }
  }
  await confirmSnapshot(s);
  return { records, unsupported, inspected, from };
}
export async function readEndorsement(
  s: Snapshot,
  address: string,
  token: string,
  index: string,
) {
  if (!isAddress(address)) throw Error("Enter the LET printer address.");
  const id = decimal(token, "certificate number");
  const slot = decimal(index, "endorsement index");
  const common = { address, blockNumber: s.number } as const;
  const version = supportedCorpContractMajor(
    await s.client.readContract({
      ...common,
      abi: cyberCertPrinterAbi,
      functionName: "DEPLOY_VERSION",
    }),
  );
  if (!version) throw Error("The printer reported an unsupported version.");
  const abi = version === 4 ? cyberCertPrinterAbiV4 : cyberCertPrinterAbi;
  const result = await s.client.readContract({
    ...common,
    abi,
    functionName: "getEndorsementHistory",
    args: [id, slot],
  });
  await confirmSnapshot(s);
  return result;
}
