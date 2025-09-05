import { Glob } from "bun";
import { type BundledLanguage, codeToHtml } from "shiki";

const snippetDir = "./src/snippets";

const snippets = new Glob(`${snippetDir}/*.{ts,tsx}`);

for await (const snippet of snippets.scan(".")) {
  const file = snippet.split("/").pop();

  if (!file) continue;

  const [name, extension] = file.split(".");

  const code = await Bun.file(snippet).text();

  const html = await codeToHtml(code, {
    lang: extension as BundledLanguage,
    theme: "vitesse-dark",
  });

  Bun.write(`./src/snippets/${name}.html`, html);
}
