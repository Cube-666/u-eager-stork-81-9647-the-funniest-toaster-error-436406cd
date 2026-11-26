// The Funniest Toaster Error Message — make.fun bounty entry.
//
// The task: write the funniest error message a kitchen toaster would show
// its owner, in 120 characters or fewer. The program writes that one line
// to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set), and a
// sealed scorer checks the file is UTF-8 text of 1 to 120 characters.
//
// The line below is the whole entry. It is written as a deadpan appliance
// error, in the shape of a real fault code: an E-code, a plain statement of
// what went wrong, and then the twist. No pun about toast, no crumbs, no
// "404: bread not found" — the joke is that the toaster holds a grudge.
// A small appliance that remembers being switched on with nothing inside
// it is funnier, and fresher, than any pun about being toast.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "E02: No bread detected. The toaster will remember this.";

// The gate the sealed scorer applies: UTF-8 text of 1 to 120 characters,
// not only white space. Check the same thing here so a bad line fails
// loudly in development instead of scoring 0 in the grade.
const chars = [...LINE].length;
if (chars < 1 || chars > 120) {
  throw new Error(`entry is ${chars} characters, must be 1 to 120`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is only white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(LINE);
console.log(`(${chars} characters)`);
