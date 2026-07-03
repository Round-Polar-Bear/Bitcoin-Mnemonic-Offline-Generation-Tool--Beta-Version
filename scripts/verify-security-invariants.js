"use strict";

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const htmlPath = path.join(root, "Bitcoin-Mnemonic-Offline-Generation-Tool-SECURE-Passphrase.html");
const readmePath = path.join(root, "README.md");
const html = fs.readFileSync(htmlPath, "utf8");
const readme = fs.readFileSync(readmePath, "utf8");

const required = [
  ["CSP blocks connections", /connect-src\s+'none'/],
  ["top-level frame guard", /window\.top\s*!==\s*window\.self/],
  ["secure random source", /cryptoObj\.getRandomValues\(arr\)/],
  ["primary passphrase input", /id="passphrase-input"/],
  ["confirmation passphrase input", /id="passphrase-confirm"/],
  ["passphrase equality gate", /passphrase\s*!==\s*passphraseConfirm\.value/],
  ["input invalidates generated result", /function handlePassphraseInput\(\)[\s\S]*?clearGeneratedResult\(\)/],
  ["clear resets passphrase fields", /btnClear\.addEventListener[\s\S]*?resetPassphraseFields\(\)/],
  ["pagehide cleanup", /addEventListener\('pagehide',\s*cleanupSensitiveData\)/],
  ["print protection", /@media print[\s\S]*?body\s*>\s*\*/]
];

for (const [name, pattern] of required) {
  if (!pattern.test(html)) {
    throw new Error(`Missing security invariant: ${name}`);
  }
}

const forbiddenHtml = [
  ["external script", /<script[^>]+src\s*=/i],
  ["iframe", /<iframe\b/i],
  ["form", /<form\b/i],
  ["fetch", /\bfetch\s*\(/],
  ["XMLHttpRequest", /\bXMLHttpRequest\b/],
  ["WebSocket", /\bWebSocket\b/],
  ["sendBeacon", /\bsendBeacon\b/],
  ["Math.random", /Math\.random\s*\(/]
];

for (const [name, pattern] of forbiddenHtml) {
  if (pattern.test(html)) {
    throw new Error(`Forbidden capability found in HTML: ${name}`);
  }
}

if (readme.split(/\r?\n/).some(line => /^\s*(?:\$\s*)?npx\s+serve\b/.test(line))) {
  throw new Error("README must not recommend npx serve");
}
if (!/http\.server 8000 --bind 127\.0\.0\.1/.test(readme)) {
  throw new Error("README must bind the optional server to 127.0.0.1");
}

console.log(`All ${required.length + forbiddenHtml.length + 2} security invariants passed.`);
