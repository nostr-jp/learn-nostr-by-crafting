const { nip19 } = require("nostr-tools");

if (process.argv.length <= 2) {
  console.error(
    "usage: npm run to-hex <bech32 ID (npub, nprofile, nsec, note, nevent)>"
  );
  process.exit(1);
}

const { type, data } = nip19.decode(process.argv[2]);

const out = (() => {
  switch (type) {
    case "npub":
      return `公開鍵: ${data}`;
    case "nprofile":
      return `公開鍵: ${data.pubkey}`;
    case "nsec":
      return `!!! 取り扱い注意 !!! 秘密鍵: ${data}`;
    case "note":
      return `イベントID: ${data}`;
    case "nevent":
      return `イベントID: ${data.id}, イベント発行者の公開鍵: ${
        data.author ?? "(不明)"
      }`;
    default:
      return `${type}: この種類のIDには対応していません! `;
  }
})();

console.log(out);
