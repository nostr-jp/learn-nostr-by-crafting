const { currUnixtime, getCliArg } = require("./utils.js");
const {
  relayInit,
  getPublicKey,
  getEventHash,
  signEvent,
} = require("nostr-tools");
require("websocket-polyfill");

const BOT_PRIVATE_KEY_HEX = "2-1で生成したBot用秘密鍵(hex)";
const BOT_PUBLIC_KEY_HEX = getPublicKey(BOT_PRIVATE_KEY_HEX);

const relayUrl = "wss://relay-jp.nostr.wirednet.jp";

/**
 * リアクションイベントを組み立てる
 * @param {import("nostr-tools").Event} targetEvent リアクション対象のイベント
 */
const composeReaction = (targetEvent) => {
  /* Q-1: リアクションイベントのフィールドを埋めよう  */
  const ev = {

  };

  // 署名
  const id = getEventHash(ev);
  const sig = signEvent(ev, BOT_PRIVATE_KEY_HEX);

  return { ...ev, id, sig };
};

// リレーにイベントを送信
const publishToRelay = (relay, ev) => {
  const pub = relay.publish(ev);
  pub.on("ok", () => {
    console.log("succeess!");
  });
  pub.on("failed", () => {
    console.log("failed to send event");
  });
};

const main = async (targetWord) => {
  const relay = relayInit(relayUrl);
  relay.on("error", () => {
    console.error("failed to connect");
  });

  await relay.connect();
  console.log("connected to relay");

  const sub = /* Q-2: すべてのテキスト投稿を購読しよう */
  sub.on("event", (ev) => {
    /* Q-3: 「受信した投稿のcontentに対象の単語が含まれていたら、
            その投稿イベントにリアクションする」ロジックを完成させよう */
  });
};

// コマンドライン引数をリアクション対象の単語とする
const targetWord = getCliArg("specify target word to react!");
main(targetWord).catch((e) => console.error(e));
