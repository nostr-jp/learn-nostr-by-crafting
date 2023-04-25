const {nip19} = require('nostr-tools');

if (process.argv.length <= 2) {
  console.error("specify bach32 encoded ids (npub1..., nsec1..., note1..., nevent1...)");
  process.exit(1);
}

const {type, data} = nip19.decode(process.argv[2])

const out = (() => {
  switch (type) {
    case "npub":
      return `public key: ${data}`;
    case "nsec":
      return `!!! HANDLE WITH CARE !!! private key: ${data}`;
    case "note":
      return `event id: ${data}`;
    case "nevent":
      return `event id: ${data.id}, author's pubkey: ${data.author ?? "(not found)"}`
    default:
      return `type ${type} is not supported!`
  } 
})()

console.log(out)
