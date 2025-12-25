import { deobfuscate } from "#src";
import { describe, expect, test } from "bun:test";
import * as fs from "node:fs";
import * as path from "node:path";

const SAMPLES_DIR = path.join(import.meta.dir, "samples");

function loadFixture(name: string): string {
  const filePath = path.join(SAMPLES_DIR, name, "input.js");
  return fs.readFileSync(filePath, "utf-8");
}

describe("deobfuscate", () => {
  const fixtureNames = fs.readdirSync(SAMPLES_DIR);
  for (const name of fixtureNames) {
    test(name, async () => {
      const input = loadFixture(name);
      const result = await deobfuscate(input);
      expect(result).toMatchSnapshot();
    });
  }
});
