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
  const ev = {
    pubkey: BOT_PUBLIC_KEY_HEX,
    /* Q-1: リアクションイベントの kind, content, tags を設定しよう  */
    kind: ???,
    content: ???,
    tags: [
      [???],
      [???],
    ],
    created_at: currUnixtime(),
  };
  const id = getEventHash(ev);
  const sig = signEvent(ev, BOT_PRIVATE_KEY_HEX);

  return { ...ev, id, sig };
};

// リレーにイベントを送信する
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

  // すべてのテキスト投稿を購読
  const sub = relay.sub([
    { kinds: [1], since: currUnixtime() },
  ]);
  sub.on("event", (ev) => {
    /* Q-2: 「受信した投稿のcontentにtargetWordが含まれていたら、
          その投稿イベントにリアクションする」ロジックを完成させよう */
  });
};

// コマンドライン引数をリアクション対象ワードとする
const targetWord = getCliArg("specify target word to react!");
main(targetWord).catch((e) => console.error(e));
