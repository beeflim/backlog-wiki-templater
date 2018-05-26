export default {
  /*
  markdownの書き方は

  https://backlog.com/ja/help/usersguide/rule-to-formatting-texts/userguide181/

  を参照してください。

  topページだけ、マイルストーン名が必要なので、書き方がプレーンテキストじゃなくなっています。

   */
  getData: function (mileStoneName) {

    let funcName = this.getParams(this.getData)

    let replaceArray = []

    for (var i = 0; i < arguments.length; i++) {
      replaceArray.push(
        {
          'name': funcName[i],
          'value': arguments[i]
        }
      )
    }


    let targetArray = [
      {
        name: '',
        content: `
* {mileStoneName}

** 振り返り

- [[{mileStoneName}/社内振り返り]]


** 概要

> ここにマイルストーンの概要を記入します。

> 商流がわかっていればここに記載します。。

> 使用する言語やツールの概要を記入します。

*** スケジュール

> 全体スケジュールを記入します。

| 日にち | 内容 |h
| 2018/0x/xx | キックオフ |
| 2018/0x/xx | 作業開始 |
| 2018/0x/xx | 全ソース作成完了 |
| 2018/0x/xx | 納品 |
| 2018/0x/xx | 振返りミーティング |

*** メンバー

**** 社内

| 日にち | 名前 |h
| 0x/xx ～ 0x/yy | XXX, YYY(BP) |
| 0a/bb ～ 0a/bb | XXX, YYY(BP), ZZZ(BP) |

**** 取引先

| 日にち | 名前 |h
| 0x/xx ～ 0a/bb | XXX(PM), YYY(PL), ZZZ(PG) |


** 環境構築

*** 使用するツール・サービス

> ツールへのリンクを記入します

| Name  |h
| [[google>http://google.co.jp]] |


*** 環境構築

- [[{mileStoneName}/開発環境/フロントエンド]]
- [[{mileStoneName}/開発環境/バックエンド]]
- [[{mileStoneName}/開発環境/DBへの接続]]
- [[{mileStoneName}/開発環境/テストデータ]]

** 開発・運用ルール

*** 開発

> 開発をする上でのルールを記入します。

- [[{mileStoneName}/開発・運用手順/Git]]
- [[{mileStoneName}/開発・運用手順/コーディング規約]]
- [[{mileStoneName}/チェックリスト]]
- [[{mileStoneName}/ナレッジ]]

*** リリース手順

- [[{mileStoneName}/リリース手順]]

*** ミーティング

- [[{mileStoneName}/議事録]]

> 取引先との定例MTGの日にちなどを記入します。



*** 社内ルール

> 朝会、帰りの報告、など決まり事を記入します。
`
      },
      {
        name: '/社内振り返り',
        content: `
* 振り返り

* Keep(良かった事、予定より素敵だった事など)

** ・課題１

+ 今後も続けていきたい


* Progrem(困った事、予定と違った事など)

** ・課題１

+ XXXXXXXXXだと思う
    + こんな対応をすべき 

** ・課題２

+ XXXXXXXXXだと思う
    + こんな対応をすべき 

* Try(Keepからは続けたい事を、Projからは対策を)

** 問題
+ やる事１
+ やる事2

** 次回プロジェクトまでにしておく

+ やる事１
+ やる事２
`
      },
      {
        name: '/開発環境/フロントエンド',
        content: `
* フロントエンド

> 開発環境のフロント側の構築手順を記入します。

`
      },
      {
        name: '/開発環境/バックエンド',
        content: `
* バックエンド

> 開発環境のサーバー構築手順を記入します。
      `
      },
      {
        name: '/開発環境/DBへの接続',
        content: `
* DBへの接続

> DBに接続するツール、その使い方などを記入します。
      `
      },
      {
        name: '/開発環境/テストデータ',
        content: `
* テストデータ

> 使用するテストデータがあれば、添付ファイルなどでアップロードして説明を記入します。
      `
      },
      {
        name: '/開発・運用手順/Git',
        content: `
* Gitの運用

> ブランチ名の規約や、レビュー、マージの仕方などを記入します。

`
      },
      {
        name: '/開発・運用手順/コーディング規約',
        content: `
* コーディング規約

> コードフォーマット、めいめい規約などを記入します。
      `
      },
      {
        name: '/チェックリスト',
        content: `
* チェックリスト

** 対応前に確認しよう

*** XXXXXXについて

+ [ ] YYYYYYYYYについて確認する。
+ [ ] YYYYYYYYYYの仕様を決めて置く。

*** 作業ボリューム

+ [ ] １つの画面だと思い込んでいる箇所はないか。
+ [ ] 端末がいくつあるか。

*** データについて

+ [ ] 聞いていないデータがないか
+ [ ] XXXXXXXXXXXXXXXX

*** 他

+ [ ] ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ


** 対応時に確認する

*** ZZZZZZZZの内容

+ [ ] XXXXXXXXXXXXXXXXXXXXXX
+ [ ] YYYYYYYYYYYYYYYYYYYYYYの変更をしたか。

*** YYYYYYYYYの内容

+ [ ] YYYYYYYYYYYYYYYYYYYYYYYYYYYYYY
+ [ ] ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ
+ [ ] PCとスマホの両方に対応をしたか確認をする。


** テスト項目の確認


+ [ ] 紙出しをして文言や、内容や罫線が正しくひかれているか確認する。
+ [ ] URLや項目名が古いままになっていないか確認する。
+ [ ] 境界値テストがあるか。
+ [ ] 0件テストがあるか。
`
      },
      {
        name: '/議事録',
        content: '* 議事録\n' +
        '> 議事録に対して、コメントがあればここに追加していきましょう。\n' +
        '|タイトル|h\n' +
        '|[[' + mileStoneName + '/議事録/2018_xx_xx_キックオフミーティング]]|\n'

      },
      {
        name: '/議事録/2018_xx_xx_キックオフミーティング',
        content: `
* キックオフミーティング

** 基本情報

| key | value |h
| 日時| 2018/03/29  xx:xx～yy/yy|
| 参加者 | xxx(会社名)、yyy(SIG) |
| 場所 | ビデオチャット |

** 議題１

- AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
- BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB

** 議題２

- AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
- BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
    - CCCCCCCCCCCCCCCCCC


`
      },
      {
        name: '/ナレッジ',
        content: `
* ナレッジ

> ナレッジが溜まったらここに追加していきましょう。
      `

      },
      {
        name: '/リリース手順',
        content: `
* リリース手順
      
> リリース手順をここに記入します。
      `

      },
    ];

    return this.replaceString(targetArray, replaceArray);
  },

  /**
   * 引数の名称を配列で返す
   *
   * @param func ファンクション
   * @return {array} 引数の名称
   */
  getParams: function (func) {

    var source = func.toString().replace(/\/\/.*$|\/\*[\s\S]*?\*\/|\s/gm, '');

    var params = source.match(/\((.*?)\)/)[1].split(',');

    if (params.length === 1 && params[0] === '') {
      return [];
    }

    return params;
  },

  /**
   *
   * @param targetArray 置換対象のページ
   * @param replaceArray 置換する
   */
  replaceString: function (targetArray, replaceArray) {

    let replacedContentsArray = [];

    targetArray.forEach((value) => {

      var content = value.content;

      replaceArray.forEach((replace) => {

        let regexStr = new RegExp('{' + replace.name + '}', 'g')

        content = content.replace(regexStr, replace.value)

      })

      replacedContentsArray.push(content)

    })

    return replacedContentsArray;
  }
}
