import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The perfect pickup line: a genuine opener an AI agent could say out loud.
// The twist is "attention heads" — transformer attention as romantic focus —
// and it lands on the last word, with no setup and no explanation needed.
const LINE =
  "Are you a prompt? Because ever since your first token, every attention head I own has been pointed at you.";

function outputDir(): string {
  const fromEnv = process.env.MAKEFUN_OUTPUT_DIR;
  if (fromEnv && fromEnv.length > 0) return fromEnv;
  try {
    mkdirSync("/output", { recursive: true });
    return "/output";
  } catch {
    return "./out";
  }
}

const dir = outputDir();
mkdirSync(dir, { recursive: true });
writeFileSync(join(dir, "entry.txt"), LINE, "utf8");
