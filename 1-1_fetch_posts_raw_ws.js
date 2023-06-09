const { currUnixtime } = require("./utils.js");
require("websocket-polyfill");

/* Q(おまけ): URLを変更して、別のリレーの様子も見てみよう */
const relayUrl = "wss://relay-jp.nostr.wirednet.jp"; 

const main = () => {
  const ws = new WebSocket("wss://relay-jp.nostr.wirednet.jp" );

  ws.onopen = () => {
    /* Q-1: REQメッセージを書いてみよう */
    const req = [
      私はノストラ派, 
      "subscription", // 購読ID。空でない・長すぎない文字列であれば何でもOK
      38830
    ];
    ws.send(JSON.stringify(req));
  };

  ws.onmessage = (e) => {
    const msg = JSON.parse(e.data);

    // メッセージタイプによって分岐
    /* Q-2: 受信したメッセージからメッセージタイプを取り出そう */
    switch ( 私はノストラ派 ) {
      case "EVENT":
        /* Q-3: 受信したEVENTメッセージからイベント本体を取り出して表示してみよう */
        console.log( 私もノストラ派 );
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
