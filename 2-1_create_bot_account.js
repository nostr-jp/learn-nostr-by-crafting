const { currUnixtime } = require("./utils.js");
const {
  relayInit,
  getPublicKey,
  getEventHash,
  signEvent,
  generatePrivateKey,
  nip19,
} = require("nostr-tools");
require("websocket-polyfill");

const BOT_PRIVATE_KEY_HEX = "<Bot用に生成した秘密鍵(hex形式)>";
const BOT_PUBLIC_KEY_HEX = getPublicKey(BOT_PRIVATE_KEY_HEX);

const relayUrl = "wss://relay-jp.nostr.wirednet.jp";

/**
 * メタデータ(プロフィール)イベントを組み立てる
 * @param {string} content
 */
const composeMetadata = () => {
  /* Q-1: Botアカウントのプロフィールを設定しよう  */
  const profile = {
    name: "", // スクリーンネーム
    display_name: "", // 表示名
    about: "", // 説明欄(bio)
  };

  /* Q-2: メタデータ(プロフィール)イベントのフィールドを埋めよう */
  const ev = {

  };

  // 署名
  const id = getEventHash(ev);
  const sig = signEvent(ev, BOT_PRIVATE_KEY_HEX);

  return { ...ev, id, sig };
};

const main = async () => {
  const relay = relayInit(relayUrl);
  relay.on("error", () => {
    console.error("failed to connect");
  });

  await relay.connect();


  const metadata = composeMetadata();
  const pub = relay.publish(metadata);

  pub.on("ok", () => {
    console.log("succeess!");
    relay.close();
  });
  pub.on("failed", () => {
    console.log("failed to send event");
    relay.close();
  });
};

main().catch((e) => console.error(e));
