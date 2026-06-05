"use strict";

const bip39 = require("bip39");
const ecc = require("tiny-secp256k1");
const { BIP32Factory } = require("bip32");
const bitcoin = require("bitcoinjs-lib");

const bip32 = BIP32Factory(ecc);
const DERIVATION_PATH = "m/84'/0'/0'/0/0";

const vectors = [
  {
    name: "v4 regression vector 1",
    mnemonic: "sense license nose practice portion trend actress engine benefit theory life grow",
    expected: "bc1qzvwstt3q2yh0anlxf69q5tguzw6xrcvk89ans9"
  },
  {
    name: "v4 regression vector 2",
    mnemonic: "blush seven tuition lion aim point agent since illness autumn ritual tornado",
    expected: "bc1q7g4ur8vm9erfce7quqseef5lhyy7tl2hzr88ql"
  },
  {
    name: "BIP39/BIP84 common vector",
    mnemonic: "abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about",
    expected: "bc1qcr8te4kr609gcawutmrza0j4xv80jy8z306fyu"
  }
];

function deriveFirstBip84Address(mnemonic) {
  if (!bip39.validateMnemonic(mnemonic)) {
    throw new Error("Invalid BIP39 mnemonic in test vector");
  }

  const seed = bip39.mnemonicToSeedSync(mnemonic, "");
  const root = bip32.fromSeed(seed, bitcoin.networks.bitcoin);
  const child = root.derivePath(DERIVATION_PATH);
  const payment = bitcoin.payments.p2wpkh({
    pubkey: Buffer.from(child.publicKey),
    network: bitcoin.networks.bitcoin
  });

  if (!payment.address) {
    throw new Error("Failed to derive P2WPKH address");
  }

  return payment.address;
}

for (const vector of vectors) {
  const actual = deriveFirstBip84Address(vector.mnemonic);
  if (actual !== vector.expected) {
    console.error(`${vector.name}: expected ${vector.expected}, got ${actual}`);
    process.exit(1);
  }
  console.log(`${vector.name}: ${actual}`);
}

console.log(`All ${vectors.length} BIP84 vectors passed (${DERIVATION_PATH}).`);
