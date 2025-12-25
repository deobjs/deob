import { parseSync } from "oxc-parser";
import { print } from "esrap";
import ts from "esrap/languages/ts";
import { format, type FormatOptions } from "oxfmt";

interface Config {
  formatOptions: FormatOptions;
}

export async function deobfuscate(source: string, config?: Config): Promise<string> {
  const FILE_NAME = "index.js";
  const ast = parseSync(FILE_NAME, source).program;

  /* deobfuscate here */

  const code = print(ast, ts()).code;

  const output = await format(FILE_NAME, code, config?.formatOptions);

  return output.code;
}
