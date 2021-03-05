---
slug: axios-cookie
title: AxiosのPOST通信でCookieをいじりたい
description: Reactで非同期通信(Ajax)をしたいとき、Axiosを使うことが多いと思います。そのPOST通信でCookieを操作したい時には、少し手間がかかるので、その説明をまとめました。私は、JWT認証したかったため、Cookieを操作する必要がありました。
date: 2021/2/28
imgpath: https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2FAJAX-Language-01.svg?alt=media&token=05053712-6e68-44dc-9818-d22fa4b1a032
type: tech
tag: 
- Cookie
- Ajax
- JWT
---

# やりたいこと
それはズバリ、トークン認証です。JWTってやつです。
そのために、サーバーサイドで発行したトークンをフロントエンドに送り、cookieに保存したい。
そして、保存したトークンでセッション管理したい。

初めてcookieに触れるので、色んなところでハマりました。
同じように困ってる方がいたら、ぜひ参考にしてくれると幸いです。

フロントエンドにReactを使っており、非同期通信にaxiosを使ってます。
サーバーサイドはLumen(Laravel)です。
Dockerで開発しました。

# Axiosの確認
GETやPOSTは正常に動作しており、レスポンスのデータもしっかりしています。
でも、cookieが保存されない。。。
## headerが足りてなくない？
そこで、`withCredentials: true`をヘッダーに追加しなければいけないことを知りました。
```js:
axios.post(url, data, {
  withCredentials: true
})
```
こんな感じです。
しかし、まだ正常にcookieを送受信できません。
しかも、consoleにCORSのエラーが出ています。
`withCredentials: true`を追加する前は出ていなかったのに、追加したら出てきました。

# API(サーバーサイド)の確認
## CORSの設定が適当じゃない？
そこで、APIサーバーの方のCORS対策を再確認してみます。
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

フロントのURLがlocalhost:3100だったので、
```php:
'Access-Control-Allow-Origin' => 'http://localhost:3100'
```
とすることで、無事にcookieが送受信できるようになりました。
