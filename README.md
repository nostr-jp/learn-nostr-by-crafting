# 「手を動かして学ぶ Nostrプロトコル」 演習環境
[Hello Nostr! 先住民が教えるNosteの歩き方](https://nip-book.nostr-jp.org/book/1/) ([技術書典](https://techbookfest.org/)にて頒布) 内の記事「手を動かして学ぶ Nostrプロトコル」(pp.65-75) の演習環境を含むリポジトリです。

## 演習環境のセットアップ

以下のコマンドで演習環境をセットアップします。実行前に、Node.jsをインストールしておいてください。

```bash
git clone https://github.com/nostr-jp/learn-nostr-by-crafting.git
cd learn-nostr-by-crafting
npm install
```

## 演習の進め方

演習環境には、演習の各節に対応するソースファイルが用意されています。ファイル名の先頭(1-1〜2-3)が、対応する節を表します。 
本文の説明に従ってソースコードの /* Q-1: ... */ となっている部分に適切なコードを書いて、目的の機能を実装していきましょう。

## npmスクリプト

以下のnpmスクリプトが用意されていますので、必要に応じて利用してください。

- `gen-key-pair`: 秘密鍵と公開鍵のペアを生成
- `to-hex <bech32形式のデータ>`: `npub...` `nsec...` のようなフォーマット(bech32形式といいます)のデータを、16進文字列形式に変換
  - bech32形式では、先頭の文字列(接頭辞)がデータの種類を表します。以下にNostrで使われている接頭辞の例を示します
  - `npub...`: 公開鍵
  - `nprofile...`: 公開鍵 + 付加情報
  - `nsec...`: 秘密鍵
  - `note...`: 投稿のイベントID
  - `nevent...`: 一般の(投稿に限らない)イベントID + 付加情報
- `sub-reply <リレーURL> <公開鍵(hex形式)>`: 指定したリレーに接続し、指定した公開鍵を対象とするリプライを購読して表示
  - 1-4節の演習にて、リプライ実装チェッカーからのリプライ(チェック結果)を受け取るのに使うとよいでしょう

## ヒント
- 1-2節以降で利用する nostr-tools のGitリポジトリは[こちら](https://github.com/nbd-wtf/nostr-tools)
- 1-3節: 自分が普段利用している秘密鍵を調べるには?
  - Webブラウザ拡張機能(NIP-07)を利用している場合は、拡張機能のオプションから確認できるはずです
  - Amethystの場合: 画面左上のアイコンをタップ →「Backup Keys」→「Copy my secret key」
  - Damusの場合: 画面左上のアイコンをタップ→「設定」→「鍵」→「ログイン用秘密鍵」を確認
- 1-4節: 各種Nostrクライアントで投稿のイベントIDを調べる方法。取得できるIDはbech32形式のため、npmスクリプト`to-hex` を使ってhex形式に変換する必要があります
  - Snort: 投稿下方の ︙ →「Copy ID」
  - Iris: 投稿右上の … →「Copy Note ID」
  - Rabbit: 投稿下方の … →「IDをコピー」
  - nostter: 投稿右下の {…} →「Note ID」を確認
- 1-4節: 各種Nostrクライアントで投稿者の公開鍵を調べる方法。取得できるIDはbech32形式のため、npmスクリプト`to-hex` を使ってhex形式に変換する必要があります
  - Snort: 投稿者のアイコンをクリック → 表示されるプロフィール画面で`npub`から始まる文字列を確認
  - Iris: 投稿者のアイコンをクリック → 右上の … → 「Copy User ID」
  - Rabbit: 投稿者のアイコンをクリック → 表示されるプロフィール画面で`npub`から始まる文字列を確認
  - nostter: 投稿者のアイコンをクリック → 表示されるプロフィール画面で`npub`または`nprofile`から始まる文字列を確認
- 1-4節: リプライの実装が正しいか確認してくれる [リプライ実装チェッカーbot](https://nostx.shino3.net.npub1y75tnycxnpp8z23fkql4xn597x3alnd728xa93ujxtxvxrktvm5qf3rg9u/) を用意しています。公開鍵は以下の通り

  ```
  27a8b993069842712a29b03f534e85f1a3dfcdbe51cdd2c79232ccc30ecb66e8
  ```
