const { currUnixtime, getCliArg } = require("./utils.js");
const { relayInit, getPublicKey, getEventHash, signEvent } = require("nostr-tools");
require("websocket-polyfill");

const PRIVATE_KEY_HEX = /* Q: 秘密鍵をhex形式に変換してここに設定しよう */

const relayUrl = "wss://relay-jp.nostr.wirednet.jp";

/**
 * テキスト投稿イベントを組み立てる
 * @param {string} content 
 */
const composePost = (content) => {
  const pubkey = getPublicKey(PRIVATE_KEY_HEX); // 公開鍵は秘密鍵から導出される
  const ev = {
    /* Q: イベントの pubkey, kind, content を設定してみよう */
    tags: [],
    created_at: currUnixtime(),
  }
  const id = /* Q: イベントのハッシュ値を求めてみよう */
  const sig = /* Q: イベントの署名を生成してみよう */

  return {...ev, id, sig}
}

const main = async (content) => {
  const relay = relayInit(relayUrl);
  relay.on("error", () => {
    console.error("failed to connect");
  });

  await relay.connect();

  const post = composePost(content);

  const pub = /* Q: Relayのメソッドを使ってイベントを発行してみよう */

  pub.on('ok', () => {
    console.log("succeess!");
    relay.close();
  })
  pub.on('failed', () => {
    console.log("failed to send event")
    relay.close();
  })
};

const content = getCliArg();
main(content).catch((e) => console.error(e));
