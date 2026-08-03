/**
 * Builds artifact.html — the copy of the app used for the hosted version.
 *
 * It is the same page as index.html with the document wrapper removed, because
 * the host supplies its own <!doctype>, <head> and <body>. Everything else,
 * styles and script alike, is copied verbatim so the two can't drift.
 *
 *   node tools/build-artifact.js
 */
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");
const src = fs.readFileSync(path.join(root, "index.html"), "utf8");

const style = (src.match(/<style>[\s\S]*?<\/style>/) || [])[0];
const body = (src.match(/<body>\n([\s\S]*?)\n<\/body>/) || [])[1];
if (!style || !body) throw new Error("index.html is not shaped as expected — check the <style>/<body> blocks");

const out = `<title>FocusTree — get it done, grow a forest</title>\n${style}\n${body}\n`;
fs.writeFileSync(path.join(root, "artifact.html"), out);
console.log(`artifact.html written (${out.length} bytes)`);
