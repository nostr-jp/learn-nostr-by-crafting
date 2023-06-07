const { currUnixtime, getCliArg } = require("./utils.js");
const {
  relayInit,
  getPublicKey,
  finishEvent
} = require("nostr-tools");
require("websocket-polyfill");

/* Bot用の秘密鍵をここに設定 */
const BOT_PRIVATE_KEY_HEX = ???;

const relayUrl = "wss://relay-jp.nostr.wirednet.jp";

/**
 * リアクションイベントを組み立てる
 * @param {import("nostr-tools").Event} targetEvent リアクション対象のイベント
 */
const composeReaction = (targetEvent) => {
  /* Q-1: リアクションイベントのフィールドを埋めよう  */
  const ev = {
    kind: ???,
    content: ???,
    tags: ???,
    created_at: currUnixtime(),
  };

  // イベントID(ハッシュ値)計算・署名
  return finishEvent(ev, BOT_PRIVATE_KEY_HEX);
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

  /* Q-2: すべてのテキスト投稿を購読しよう */
  const sub = ???;
  sub.on("event", (ev) => {
    try {
      /* Q-3: 「受信した投稿のcontentに対象の単語が含まれていたら、
              その投稿イベントにリアクションする」ロジックを完成させよう */
      // ヒント: ある文字列に指定の単語が含まれているかを判定するには、includes()メソッドを使うとよいでしょう
      ???;
    } catch (err) {
      console.error(err);
    }
  });
};

// コマンドライン引数をリアクション対象の単語とする
const targetWord = getCliArg("error: リアクション対象の単語をコマンドライン引数として設定してください");
main(targetWord).catch((e) => console.error(e));
