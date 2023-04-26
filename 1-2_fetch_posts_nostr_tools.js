const { currUnixtime } = require("./utils.js");
const { relayInit } = require("nostr-tools");
require("websocket-polyfill");

const relayUrl = "wss://relay-jp.nostr.wirednet.jp";

const main = async () => {
  const relay = /* Q-1: Relayを初期化してみよう */

  relay.on("error", () => {
    console.error("failed to connect");
  });

  /* Q-2: Relayのメソッドを呼び出してリレーに接続してみよう */

  const sub = /* Q-3: Relayのメソッドを使ってイベントを購読してみよう */

  // メッセージタイプごとにリスナーを設定できる
  sub.on("event", (ev) => {
    // Nostrイベントオブジェクトがコールバックに渡る
    console.log(ev);
  });

  sub.on("eose", () => {
    console.log("****** EOSE ******");
  });
};

main().catch((e) => console.error(e));
