import { fileURLToPath } from "node:url";

// The standalone verifier bundles a few application files that import wide
// entry points: the legal-documents index loads every template, the ABI index
// loads every contract family and the generated sources hold every Typst
// template. When the verifier is bundled, these three imports resolve to narrow
// modules instead. The importing files keep their exact text, so the renderer
// fingerprints that completed copies carry still match. esbuild stops the build
// if a narrow module lacks a name that an importer uses.
const root = new URL("../../", import.meta.url);
const file = (path) => fileURLToPath(new URL(path, root));

export const narrowImports = {
  name: "verifier-narrow-imports",
  setup(build) {
    build.onResolve({ filter: /^@metalex-web\/legal-documents$/ }, () => ({
      path: file("scripts/signing-verifier/legalDocumentsIndex.ts"),
    }));
    build.onResolve({ filter: /^@metalex-web\/abis$/ }, () => ({
      path: file("packages/abis/cybercorps/index.ts"),
    }));
    build.onResolve({ filter: /^\.\/generated\/sources$/ }, (args) =>
      args.importer.endsWith("/legal-documents/src/standardSaleReferences.ts")
        ? {
            path: file(
              "packages/legal-documents/src/generated/secondarySaleRegistrySource.ts",
            ),
          }
        : undefined,
    );
  },
};
