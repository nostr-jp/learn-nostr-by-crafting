const { generatePrivateKey, getPublicKey, nip19 } = require("nostr-tools");

const privkey = generatePrivateKey();
const pubkey = getPublicKey(privkey);

console.log("private key: %s (%s)", privkey, nip19.nsecEncode(privkey));
console.log("public key : %s (%s)", pubkey, nip19.npubEncode(pubkey));
