const { currUnixtime } = require("./utils.js");
const {
  relayInit,
  getPublicKey,
  finishEvent,
  nip19
} = require("nostr-tools");
require("websocket-polyfill");

/* Bot用の秘密鍵をここに設定 */
const BOT_PRIVATE_KEY_HEX = ???;

const relayUrl = "wss://relay-jp.nostr.wirednet.jp";

/**
 * テキスト投稿イベント(リプライ)を組み立てる
 * @param {string} content 投稿内容
 * @param {import("nostr-tools").Event} targetEvent リプライ対象のイベント
 */
const composeReplyPost = (content, targetEvent) => {
  /* Q-1: これまで学んだことを思い出しながら、
          リプライを表現するイベントを組み立てよう */
  ???;
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

/* 無限リプライループ対策 */
// リプライクールタイム
const COOL_TIME_DUR_SEC = 60

// 公開鍵ごとに、最後にリプライを返した時刻(unixtime)を保持するMap
const lastReplyTimePerPubkey = new Map()

// 引数の公開鍵にリプライしても安全か?
// 最後にリプライを返した時点からクールタイム分の時間が経過していない場合、安全でない
const isSafeToReply = (pubkey) => {
  const now = currUnixtime()
  const lastReplyTime = lastReplyTimePerPubkey.get(pubkey)
  if (lastReplyTime !== undefined && now - lastReplyTime < COOL_TIME_DUR_SEC) {
    return false
  }
  lastReplyTimePerPubkey.set(pubkey, now)
  return true
}

// メイン関数
const main = async () => {
  const relay = relayInit(relayUrl);
  relay.on("error", () => {
    console.error("failed to connect");
  });

  await relay.connect();
  console.log("connected to relay");

  /* Q-2: 「このBotの公開鍵へのリプライ」を絞り込むフィルタを設定して、イベントを購読しよう */
  // ヒント: nostr-toolsのgetPublicKey()関数を使って、秘密鍵(BOT_PRIVATE_KEY_HEX)から公開鍵を得ることができます
  const sub = ???;

  sub.on("event", (ev) => {
    // リプライしても安全なら、リプライイベントを組み立てて送信する
    if (isSafeToReply(ev.pubkey)) {
      const replyPost = composeReplyPost("こんにちは！", ev);
      publishToRelay(relay, replyPost);
    }
  });
};

main().catch((e) => console.error(e));
