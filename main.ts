// main.ts — post-x-promote-make-your-own-bounty-01 entry (Node 22, standard library only).
//
// Job: copy POST.json from the repository root into the grader's output
// directory, where the gate reads it to find the X post this entry hands in.
// That is the whole program. The entry itself is the X post: a quote of
// make.fun's make-your-own-bounty post
// (https://x.com/makefunai/status/2124915864336236646), with a photo of its
// own attached and the play code in its text. The gate scores the post's
// replies + reposts + quotes; nothing this program writes is scored.
//
// Local run (the way the grader does it):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR: string = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR: string = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const SOURCE = join(BOT_DIR, 'POST.json');
const TARGET = join(OUTPUT_DIR, 'POST.json');

function copyPostJson(): void {
  if (!existsSync(SOURCE)) {
    console.error(`POST.json not found in ${BOT_DIR}`);
    process.exit(1);
  }

  const bytes = readFileSync(SOURCE);
  const parsed: unknown = JSON.parse(bytes.toString('utf8'));
  if (typeof parsed !== 'object' || parsed === null || typeof (parsed as { url?: unknown }).url !== 'string') {
    console.error('POST.json must be a JSON object with a string "url" field');
    process.exit(1);
  }

  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(TARGET, bytes);
}

copyPostJson();
