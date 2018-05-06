# backlog-wiki-templater

Backlogのwikiに定型の構造をした文章を作成するツール

## 使い方

1. nodeをインストールする。
1. ライブラリをインストールする。
    ``` bash
    npm install
    ```
1. ビルドする。
    ``` bash
    npm run build
    ```
1. dist下にビルドされたファイルが出力されるので、サーバーに配備する。

## 開発サーバー

1. ローカルで動かしたいときは下のコマンドを実行して、localhostにアクセスする。
    ``` bash
    npm run dev
    ```


## コマンド一覧

``` bash
# インストール
npm install

# 開発サーバ起動
npm run dev

# ソースビルド
npm run build

# ユニットテスト
npm run unit

# 画面テスト
npm run e2e

# 全テスト実行
npm test
```
