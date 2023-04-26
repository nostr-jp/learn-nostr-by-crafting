const { nip19 } = require("nostr-tools");
const { currUnixtime, getCliArg } = require("./utils.js");
const {
  relayInit,
  getPublicKey,
  getEventHash,
  signEvent,
} = require("nostr-tools");
require("websocket-polyfill");

const PRIVATE_KEY_HEX = "<自分の秘密鍵(hex形式)>"

const relayUrl = "wss://relay-jp.nostr.wirednet.jp";

/**
 * テキスト投稿イベント(リプライ)を組み立てる
 * @param {string} content 投稿内容
 * @param {string} targetPubkey リプライ対象の公開鍵(hex)
 * @param {string} targetEventId リプライ対象の投稿のイベントID(hex)
 */
const composeReplyPost = (content, targetPubkey, targetEventId) => {
  const myPubkey = getPublicKey(PRIVATE_KEY_HEX);

  const targetNpub = /* Q-3: リプライ対象の公開鍵をbech32形式(npub1...)に変換しよう  */
  const contentWithRef = `${/* Q-4: リプライ対象への参照を投稿内容に埋め込もう */} ${content}`;

  const ev = {
    pubkey: myPubkey,
    kind: 1,
    content: contentWithRef,
    tags: [
      [/* Q-1: リプライ対象の公開鍵を指すpタグを書いてみよう */],
      [/* Q-2: リプライ対象の投稿を指すeタグを書いてみよう */],
    ],
    created_at: currUnixtime(),
  };
  const id = getEventHash(ev);
  const sig = signEvent(ev, PRIVATE_KEY_HEX);

  return { ...ev, id, sig };
};

const main = async (content) => {
  const relay = relayInit(relayUrl);
  relay.on("error", () => {
    console.error("failed to connect");
  });

  await relay.connect();

  const replyPost = composeReplyPost(
    content,
    "<リプライ対象の公開鍵>",
    "<リプライ対象の投稿のイベントID>"
  );
  const pub = relay.publish(replyPost);

  pub.on("ok", () => {
    console.log("succeess!");
    relay.close();
  });
  pub.on("failed", () => {
    console.log("failed to send event");
    relay.close();
  });
};

const content = getCliArg("specify content as argument!");
main(content).catch((e) => console.error(e));
