---
slug: axios-cookie
title: AxiosのPOST通信でCookieをいじりたい
description: Reactで非同期通信(Ajax)をしたいとき、Axiosを使うことが多いと思います。そのPOST通信でCookieを操作したい時には、少し手間がかかるので、その説明をまとめました。私は、JWT認証したかったため、Cookieを操作する必要がありました。
date: 2021/2/28
imgpath: https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2FAJAX-Language-01.png?alt=media&token=f227ac7c-4791-43c1-a784-35cfb2efbed3
type: tech
tag:
  - Cookie
  - Ajax
  - JWT
---

# やりたいこと

それはズバリ、トークン認証です。JWT ってやつです。
そのために、サーバーサイドで発行したトークンをフロントエンドに送り、cookie に保存したい。
そして、保存したトークンでセッション管理したい。

初めて cookie に触れるので、色んなところでハマりました。
同じように困ってる方がいたら、ぜひ参考にしてくれると幸いです。

フロントエンドに React を使っており、非同期通信に axios を使ってます。
サーバーサイドは Lumen(Laravel)です。
Docker で開発しました。

# Axios の確認

GET や POST は正常に動作しており、レスポンスのデータもしっかりしています。
でも、cookie が保存されない。。。

## header が足りてなくない？

そこで、`withCredentials: true`をヘッダーに追加しなければいけないことを知りました。

```js:
axios.post(url, data, {
  withCredentials: true
})
```

こんな感じです。
しかし、まだ正常に cookie を送受信できません。
しかも、console に CORS のエラーが出ています。
`withCredentials: true`を追加する前は出ていなかったのに、追加したら出てきました。

# API(サーバーサイド)の確認

## CORS の設定が適当じゃない？

そこで、API サーバーの方の CORS 対策を再確認してみます。

```php:
$headers = [
            'Access-Control-Allow-Origin'      => '*',
            'Access-Control-Allow-Methods'     => 'POST, GET, OPTIONS, PUT, DELETE',
            'Access-Control-Allow-Credentials' => 'true',
            'Access-Control-Max-Age'           => '86400',
            'Access-Control-Allow-Headers'     => 'Content-Type, Authorization, X-Requested-With'
        ];
```

特に重要なのが`Access-Control-Allow-Origin`なのですが、`*`になってるし問題なさそう。

。。。と思っていたら、ここが問題だったのです。
どうやら、`withCredentials: true`をヘッダーに追加した場合、`Access-Control-Allow-Origin`にワイルドカードを使うのはダメみたいです。

フロントの URL が localhost:3100 だったので、

```php:
'Access-Control-Allow-Origin' => 'http://localhost:3100'
```

とすることで、無事に cookie が送受信できるようになりました。
