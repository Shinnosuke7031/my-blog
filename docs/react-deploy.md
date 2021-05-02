---
slug: react-deploy
title: create-react-appで作ったReactアプリをVercelにデプロイ
description: Reactを初めて触る人は、CRA(create-react-app)でプロジェクトを作ると思います。作ったものは、どうせなら公開して世界中の人にみてもらいたいですよね。デプロイの仕方は、色々あるのですが、特にデプロイが簡単なVercelについてまとめました。
date: 2021/5/2
imgpath: https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Freact-2.svg?alt=media&token=deb078bd-642f-4f12-b2b1-12bc29572368
type: tect
tag: 
- React
- Vercel
---

# 初めに
Reactを初めて触る人は、CRA(create-react-app)でプロジェクトを作ると思います。
作ったものは、どうせなら公開して世界中の人にみてもらいたいですよね。
デプロイの仕方は、色々あるのですが、特にデプロイが簡単なVercelについてまとめました。

注意 : Node.jsとnpmは使える前提で進めます

# 前置き
## CRA
Reactは、フロントエンド開発において世界中でもっとも利用されているJavaScriptライブラリです。

そんなReactの環境構築を簡単にできるものがあります。

それがCRA(create-react-app)です。


余計なものも少々インストールされますが、コマンド一発で環境構築できるのは本当にすごいです。


0から自分で環境構築したい方は、[こちら](https://nosuke-blog.site/blog/webpack-babel-react)をご覧ください。ただし、今回紹介する方法ではデプロイできないので気をつけて下さいね。

## Vercel
Vercelとは、ZEIT社の提供するフロントエンド向けのホスティングサービスです。AWSのフロントエンド版とも言われています。

CDNやサーバレスアーキテクチャを新たに勉強することなく、Vercelに連携したGitHubにPushするだけで世界中のCDNでキャッシュされ、高パフォーマンスを期待できます。

当ブログはNext.jsでできていますが、Vercelでデプロイしています。

というのも、Next.jsの開発は、Vercelを提供するZEIT社が中心になって行われています。そのため、Next.jsと相性が抜群です。

個人利用のホビープランなら無料で使えるので、初めてデプロイするには最適だと思います。

# Reactプロジェクトの作成
この章では、CRAでReactプロジェクトの作成の仕方を紹介します。

すでに、作成済みだったり、知ってる人は[こちら](https://nosuke-blog.site/blog/react-deploy#GitHubの設定)へスキップしてください。

## CRAで作成
まずは、以下の環境があることを確認してください。

- Node >= v10.16
- npm >= v5.6

確認できたら、以下のコマンドでReactアプリの作成が始まります。
```none
npx create-react-app deploytest
```
そして、`Happy hacking!`と表示されたら完了です。簡単すぎ！

# GitHubの設定
GitHubの設定をします。まずは、ディレクトリの移動をしてください。
```none
cd deploytest
```
続いて、[GitHub](https://github.com/)の方でリポジトリを作成しておいてください。ここでは、`https://github.com/user/deploytest.git`とします。

そして、以下のコマンドでGitの設定をしてください。
```none
git init
git add .
git commit -m "First Commit"
git remote add origin https://github.com/user/deploytest.git
git push -u origin master
```
これで、Pushできました！

# Vercelの設定
[Vercel](https://vercel.com)にログインしてください。初めての方は、新規登録してください。

ダッシュボードの画面に来たら、「New Project」をクリックしてください。

次に、「Import Git Repository」から、`https://github.com/user/deploytest.git`を入力します。

そしたら、GitHubとVercelの連携について聞かれるので、承認します。

すると、「FRAMEWORK PRESET」の項目が表示されると思うので、「Create React App」を選択して「Deploy」をクリック。

これで、時間を待てばデプロイ完了です。以上です。これだけで、Reactアプリを世界中に公開できました。

# コードを更新した場合
コードを更新した場合は、以下のコマンドを打つことを忘れないでください。

```none
npm run build
```

そして、GitHubのmaster(もしくはmain)にpushするだけで、更新が反映されたものがデプロイされます。

いつも通りGitを使うだけで、デプロイも勝手にやってくれるので、非常に便利ですね！

# まとめ
いかがですが？　とても簡単ですよね！！

お名前.comなどで取得したドメインも設定できるので、ぜひやってみてください！
（当ブログもお名前.comで取得したドメインをVercelで設定しています）