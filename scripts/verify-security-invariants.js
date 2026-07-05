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
  ["print protection", /@media print[\s\S]*?body\s*>\s*\*/],
  ["mnemonic cards use a direct-child selector", /#mnemonic\s*>\s*\.mnemonic-word/],
  ["mnemonic word class", /wordSpan\.className\s*=\s*'mnemonic-word'/],
  ["mnemonic index class", /indexLabel\.className\s*=\s*'word-index'/],
  ["mnemonic text class", /wordLabel\.className\s*=\s*'word-text'/],
  ["init gate flag exists", /let securityChecksPassed\s*=\s*false/],
  ["passphrase validation respects init gate", /btnGenerate\.disabled\s*=\s*!securityChecksPassed\s*\|\|\s*generationInProgress\s*\|\|\s*invalid/],
  ["controls unlock respects init gate", /btnGenerate\.disabled\s*=\s*locked\s*\|\|\s*!securityChecksPassed/],
  ["generate entry checks init gate", /if\s*\(!securityChecksPassed\)\s*\{\s*alert/],
  ["wordlist hash verified before population", /if\s*\(hashHex !== expectedHash\)\s*\{[\s\S]{0,200}?\}\s*[\s\S]{0,100}?WORDLIST\.push\(\.\.\.EMBEDDED_BIP39_WORDLIST\)/]
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
  ["Math.random", /Math\.random\s*\(/],
  ["broad mnemonic span selector", /#mnemonic\s+span\s*(?:\{|:)/]
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
