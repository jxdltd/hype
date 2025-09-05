import { Glob } from "bun";
import { codeToHtml } from "shiki";

const snippets = new Glob("./src/snippets/**/*.{ts,tsx}");

for await (const snippet of snippets.scan(".")) {
  const file = snippet.split("/").pop();
  const name = file?.split(".")[0];
  const extension = file?.split(".")[1];

  const code = await Bun.file(snippet).text();

  const html = await codeToHtml(code, {
    lang: extension,
    theme: "vitesse-dark",
  });

  Bun.write(`./src/snippets/${name}.html`, html);
}
