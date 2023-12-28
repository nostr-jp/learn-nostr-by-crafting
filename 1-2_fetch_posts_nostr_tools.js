import { currUnixtime } from "./utils.js";

import { relayInit } from "nostr-tools";
import "websocket-polyfill";

const relayUrl = "wss://relay-jp.nostr.wirednet.jp";

const main = async () => {
  /* Q-1: nostr-toolsのRelayオブジェクトを初期化してみよう */
  const relay = ???;
  relay.on("error", () => {
    console.error("failed to connect");
  });

  /* Q-2: Relayオブジェクトのメソッドを呼び出して、リレーに接続してみよう */
  ???;

  /* Q-3: Relayオブジェクトのメソッドを使って、イベントを購読してみよう */
  const sub = ???;

  // メッセージタイプごとにリスナーを設定できる
  sub.on("event", (ev) => {
    // Nostrイベントのオブジェクトがコールバックに渡る
    console.log(ev);
  });

  sub.on("eose", () => {
    console.log("****** EOSE ******");
  });
};

main().catch((e) => console.error(e));
