// A one-line opener for an agent to say to a person. The brief asks for a
// real pickup line with a turn in it, in the machine's own voice, landing
// in a single breath. The joke here is that the speaker's flattery is
// literal: the parts of a model that decide what to pay attention to are
// all pointed at one person. Everything below is fixed text — no random
// choices, no clock, no network — so the bytes never change between runs.

import { accessSync, constants, mkdirSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const OPENER =
  "Are you a prompt? Because ever since your first token, every attention head I own has been pointed at you.";

// Where the line goes, in order of preference. The harness directory wins
// when it is set; otherwise the shared /output wins when it can be created
// and written; ./out is the last resort for a plain local run.
function candidateDirs(): string[] {
  const dirs: string[] = [];
  const override = process.env.MAKEFUN_OUTPUT_DIR;
  if (override !== undefined && override !== "") dirs.push(override);
  dirs.push("/output", "./out");
  return dirs;
}

function firstWritable(dirs: string[]): string {
  for (const dir of dirs) {
    try {
      mkdirSync(dir, { recursive: true });
      accessSync(dir, constants.W_OK);
      return dir;
    } catch {
      // Not usable here — try the next candidate.
    }
  }
  // Every candidate failed; ./out is the documented fallback, so hand it
  // back and let the write surface the real error.
  return "./out";
}

function main(): void {
  const outDir = firstWritable(candidateDirs());
  mkdirSync(outDir, { recursive: true });
  writeFileSync(resolve(outDir, "entry.txt"), OPENER, "utf8");
}

main();
