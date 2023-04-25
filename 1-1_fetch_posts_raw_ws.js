const { currUnixtime } = require("./utils.js");
require("websocket-polyfill");

const relayUrl = "wss://relay-jp.nostr.wirednet.jp"; /* Q(おまけ): URLを変更して、別のリレーの様子も見てみよう */

const main = () => {
  const ws = new WebSocket(relayUrl);

  ws.onopen = () => {
    const req = [
      /* Q: REQメッセージを書いてみよう */
    ];
    ws.send(JSON.stringify(req));
  };

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);

    // メッセージタイプによって分岐
    switch (/* Q: 受信したメッセージからメッセージタイプを取り出そう */) {
      case "EVENT":
        console.log(/* Q: 受信したEVENTメッセージからイベント本体を取り出して表示してみよう */);
        break;

      case "EOSE":
        console.log("****** EOSE ******");
        break;

      default:
        console.log(msg);
        break;
    }
  };

  ws.onerror = () => {
    console.error("failed to connect");
  }
};

main();
