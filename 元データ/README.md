# CSS Nite Coder's High 2022 (Part 3) - three.js + Blenderで3DCGを実装する

これは2022年11月25日開催の[Coder's High 2022 (Part 3)](https://cssnite.doorkeeper.jp/events/141697)のセッションの1つ、「three.js + Blenderで3DCGを実装する」の資料＆実演データです。

台本とスライドは`documents`フォルダに、サンプルコードは`codes`フォルダに、Blenderデータは`scenes`フォルダに入っています。

## サンプルデータの起動の仕方

はじめに`codes`フォルダへ移動します。

```shell
cd codes
```

次に依存関係をインストールします。

```shell
npm install
# or
yarn install
```

最後に起動コマンドを叩けば立ち上がります。

```shell
npm run dev
# or
yarn run dev
```

`index.html`の中で、JavaScriptのファイルをコメントアウトしています。
ステップごとにファイルを分けてあるので、説明を読みながらコメントアウトを解除して、コードを確認してください。

それぞれのステップは次のようになっています。

1. three.jsでのチュートリアルとほぼ同じ内容
2. glTFファイルのインポート
3. 色の設定
4. 影の設定
5. マウスの動きに追従するオブジェクトの動き
6. マウスの動きに追従するライト
7. スクロール時のエフェクト
8. 画面リサイズ時の処理
