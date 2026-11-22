# Agreement verifier

One HTML page that checks MetaLeX agreement evidence without MetaLeX. It runs
in your browser. Your files stay on your computer.

## What it checks

- **A signed document.** Select a PDF. The page looks in the onchain agreement
  registry, through a blockchain RPC endpoint that you choose, for agreements
  that refer to exactly those bytes. It shows each agreement ID, the signing
  wallets, the signing times and the status. Offline, it identifies MetaLeX's
  standard registered templates.
- **A name or field.** Load an opening file (a value, a random salt and its
  field context) and compare it with a commitment recorded onchain. This works
  offline.
- **A completed agreement.** Select the evidence attached to a completed PDF.
  The page rebuilds the reading of the agreement and checks it against the
  original template.

The page only reads. It does not sign, send transactions or decrypt data.

## Get the page

The page is pinned on IPFS. See [PUBLISHED.md](PUBLISHED.md) for every version.

Latest version (2026-11-22):

- IPFS address: `bafybeiaooetyjbptkzxrffkyzqn2ugcvudir6sugsfjvnalqqlvl77gbqy`
- SHA-256: `fb8cb67b8190b8cbbcd5eef2e0ad5bfb617d7d757c53f05bfcd79c25dc017b0f`

Fetch it with an IPFS node (`ipfs get <address>`) or a public IPFS gateway that
serves HTML, for example
`https://ipfs.filebase.io/ipfs/bafybeiaooetyjbptkzxrffkyzqn2ugcvudir6sugsfjvnalqqlvl77gbqy`.
Save the file, check its SHA-256, and open it from your disk. The same file is
in this repository at `packages/encryption/formats/verifier.html`.

## Rebuild the page

You need [Bun](https://bun.sh) 1.3 and Node.js 20 or later.

```bash
bun install --frozen-lockfile
bun run check
sha256sum -c checksums.txt
```

`bun run check` rebuilds the page from the sources in this repository and
stops if the result differs from the committed `verifier.html` by one byte.
`sha256sum -c` confirms that the committed file is the pinned version. A
GitHub Actions job runs the same three commands on each push.

## Formats

- [Commitment format v1](packages/encryption/formats/commitment-v1.md) and its
  [test vectors](packages/encryption/formats/commitment-v1-vectors.json)
- [Document references](packages/encryption/formats/document-references.md)
- [Conformed reading v1](packages/encryption/formats/conformed-reading-v1.md)

## Where the files come from

The files are an export of the MetaLeX webapp at the commit in `SOURCE_COMMIT`.
`exported-files.txt` lists them. The export holds only the files that the build
reads. `scripts/signing-verifier/build.mjs` is the bundle step of the webapp
build, without its revision fingerprint step: the committed revision files
stand in for it.

## License

The source code is under the [MIT License](LICENSE). See [NOTICE](NOTICE) for
the legal template text and the third-party packages.
