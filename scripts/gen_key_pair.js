const { generatePrivateKey, getPublicKey, nip19 } = require("nostr-tools");

const privkey = generatePrivateKey();
const pubkey = getPublicKey(privkey);

console.log("秘密鍵: %s (%s)", privkey, nip19.nsecEncode(privkey));
console.log("公開鍵: %s (%s)", pubkey, nip19.npubEncode(pubkey));
