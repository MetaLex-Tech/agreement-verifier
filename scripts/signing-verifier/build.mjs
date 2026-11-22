import { createHash } from "node:crypto";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";
import { narrowImports } from "./narrowImports.mjs";

// Exported from the MetaLeX webapp. The bundle step below is unchanged.
const root = new URL("../../", import.meta.url);
const script = await build({
  entryPoints: [fileURLToPath(new URL("page.ts", import.meta.url))],
  platform: "browser",
  bundle: true,
  metafile: true,
  minify: true,
  legalComments: "inline",
  format: "iife",
  target: "es2022",
  supported: { "template-literal": false },
  write: false,
  define: { "process.env.NODE_ENV": '"production"' },
  plugins: [narrowImports],
});
// The application's full registry includes negotiated agreements. Even unused
// search entries can survive bundling when the application initializes its catalog.
const moduleInputs = new Set(
  Object.keys(script.metafile.inputs).map((name) => resolve(name)),
);
for (const name of ["primarySafeRegistration.ts", "registeredAmpr.ts"]) {
  if (
    moduleInputs.has(
      fileURLToPath(new URL("packages/legal-documents/src/" + name, root)),
    )
  )
    throw Error(
      "The standalone verifier imports an application-only financing catalog: " +
        name,
    );
}
const js = script.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");
const template = await readFile(new URL("page.html", import.meta.url), "utf8");
let html = template
  .replace("__HASH__", createHash("sha256").update(js).digest("base64"))
  .replace(
    /<script>\s*\/\* VERIFIER \*\/\s*<\/script>/,
    () => "<script>" + js + "</script>",
  );
// The saved verifier can travel alone, including when it is taken out of an officer copy.
const formats = new URL("../../packages/encryption/formats/", import.meta.url);
for (const [name, mime] of [
  ["commitment-v1.md", "text/markdown"],
  ["conformed-reading-v1.md", "text/markdown"],
  ["document-references.md", "text/markdown"],
  ["commitment-v1-vectors.json", "application/json"],
]) {
  const marker = "__FILE_" + name + "__";
  if (!html.includes(marker))
    throw Error("Missing verifier download for " + name);
  const bytes = await readFile(new URL(name, formats));
  html = html.replace(
    marker,
    "data:" + mime + ";base64," + bytes.toString("base64"),
  );
}
const file = new URL(
  "../../packages/encryption/formats/verifier.html",
  import.meta.url,
);
if (process.argv.includes("--check")) {
  if ((await readFile(file, "utf8")) !== html)
    throw Error("Rebuild the standalone agreement verifier.");
} else await writeFile(file, html);
