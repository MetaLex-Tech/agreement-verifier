import { CarBufferReader } from "@ipld/car/buffer-reader";
import { exporter } from "ipfs-unixfs-exporter";
import { importBytes, type WritableStorage } from "ipfs-unixfs-importer";
import { CID } from "multiformats/cid";
import { sha256, sha512 } from "multiformats/hashes/sha2";

export class UnverifiedSaleContentAddress extends Error {
  constructor() {
    super("The PDF bytes could not be verified against the registered paper.");
  }
}
/** Flat file addresses supported by the registered-paper check. Compute each profile once per PDF. */
export async function* registeredFileUris(bytes: Uint8Array) {
  const sink: WritableStorage = { put: (cid) => cid };
  const legacy = await importBytes(bytes, sink, { profile: "unixfs-v0-2015" });
  yield "ipfs://" + legacy.cid.toString();
  yield "ipfs://" + legacy.cid.toV1().toString();
  for (const profile of ["unixfs-v0-2015", "unixfs-v1-2025"] as const) {
    const raw = await importBytes(bytes, sink, {
      profile,
      cidVersion: 1,
      rawLeaves: true,
    });
    yield "ipfs://" + raw.cid.toString();
  }
}

/** A flat PDF can prove a file CID directly. A nested path requires the directory links. */
export async function verifyRegisteredFile(uri: string, bytes: Uint8Array) {
  if (/^ipfs:\/\/(?:Qm[1-9A-HJ-NP-Za-km-z]{44}|b[a-z2-7]{20,100})$/.test(uri)) {
    for await (const candidate of registeredFileUris(bytes)) {
      if (candidate === uri) return;
      if (uri.startsWith("ipfs://Qm")) break; // Only the first profile produces a CIDv0.
    }
  }
  throw new UnverifiedSaleContentAddress();
}

export async function registeredFileFromArchive(
  uri: string,
  archive: Uint8Array,
  fileLimit: number,
  archiveLimit: number,
) {
  return openRegisteredFileArchive(archive, archiveLimit).readFile(
    uri,
    fileLimit,
  );
}

const invalid = () =>
  Error("The archive does not verify the registered agreement.");

/** Index a single-root CAR once when checking several registered file paths. */
export function openRegisteredFileArchive(
  archive: Uint8Array,
  archiveLimit: number,
) {
  if (archive.length > archiveLimit) throw invalid();
  const reader = CarBufferReader.fromBytes(archive);
  const roots = reader.getRoots();
  const root = roots[0];
  if (roots.length !== 1 || !root) throw invalid();
  return {
    root,
    readFile: (uri: string, fileLimit: number) =>
      readArchiveFile(reader, root, uri, fileLimit, archiveLimit),
  };
}

async function readArchiveFile(
  reader: CarBufferReader,
  archiveRoot: CID,
  uri: string,
  fileLimit: number,
  archiveLimit: number,
) {
  if (!uri.startsWith("ipfs://") || uri.includes("?") || uri.includes("#"))
    throw invalid();
  const [root, ...encoded] = uri.slice(7).split("/");
  const cid = CID.parse(root!);
  const path = encoded.map((part) => {
    const name = decodeURIComponent(part);
    if (
      !name ||
      name === "." ||
      name === ".." ||
      /[/\\?#]/.test(name) ||
      Array.from(name).some((c) => c.charCodeAt(0) < 32)
    )
      throw invalid();
    return name;
  });
  if (!archiveRoot.equals(cid)) throw invalid();
  let reads = 0;
  let traversalBytes = 0;
  const file = await exporter([cid.toString(), ...path].join("/"), {
    async *get(id) {
      if (++reads > 8192 || (id.code !== 0x55 && id.code !== 0x70))
        throw invalid();
      const block = reader.get(id);
      if (!block) throw invalid();
      traversalBytes += block.bytes.byteLength;
      if (traversalBytes > archiveLimit * 2) throw invalid();
      const hash = id.multihash;
      const digest =
        hash.code === 0
          ? block.bytes
          : hash.code === 0x12
            ? (await sha256.digest(block.bytes)).digest
            : hash.code === 0x13
              ? (await sha512.digest(block.bytes)).digest
              : undefined;
      if (
        !digest ||
        hash.digest.length !== digest.length ||
        !hash.digest.every((byte, i) => byte === digest[i])
      )
        throw invalid();
      yield block.bytes;
    },
  });
  if (
    (file.type !== "file" && file.type !== "raw") ||
    file.size <= 0n ||
    file.size > BigInt(fileLimit)
  )
    throw invalid();
  const output = new Uint8Array(Number(file.size));
  let offset = 0;
  for await (const part of file.content({ blockReadConcurrency: 1 })) {
    if (offset + part.length > output.length) throw invalid();
    output.set(part, offset);
    offset += part.length;
  }
  if (offset !== output.length) throw invalid();
  return output;
}
