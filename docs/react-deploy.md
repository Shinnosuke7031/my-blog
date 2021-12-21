---
slug: react-deploy
title: create-react-appで作ったReactアプリをVercelにデプロイ
description: Reactを初めて触る人は、CRA(create-react-app)でプロジェクトを作ると思います。作ったものは、どうせなら公開して世界中の人にみてもらいたいですよね。デプロイの仕方は、色々あるのですが、特にデプロイが簡単なVercelについてまとめました。
date: 2021/5/2
imgpath: https://drive.google.com/uc?id=1ymy5zwd0U4hHmnYlbOuN97WskRAO7oHZ
type: tect
tag:
  - フロントエンド
  - React
  - Vercel
---

# 初めに

React を初めて触る人は、CRA(create-react-app)でプロジェクトを作ると思います。
作ったものは、どうせなら公開して世界中の人にみてもらいたいですよね。
デプロイの仕方は、色々あるのですが、特にデプロイが簡単な Vercel についてまとめました。

注意 : Node.js と npm は使える前提で進めます

# 前置き

## CRA

React は、フロントエンド開発において世界中でもっとも利用されている JavaScript ライブラリです。

そんな React の環境構築を簡単にできるものがあります。

それが CRA(create-react-app)です。

余計なものも少々インストールされますが、コマンド一発で環境構築できるのは本当にすごいです。

0 から自分で環境構築したい方は、[こちら](https://nosuke-blog.site/blog/webpack-babel-react)をご覧ください。ただし、今回紹介する方法ではデプロイできないので気をつけて下さいね。

## Vercel

Vercel とは、ZEIT 社の提供するフロントエンド向けのホスティングサービスです。AWS のフロントエンド版とも言われています。

CDN やサーバレスアーキテクチャを新たに勉強することなく、Vercel に連携した GitHub に Push するだけで世界中の CDN でキャッシュされ、高パフォーマンスを期待できます。

当ブログは Next.js でできていますが、Vercel でデプロイしています。

というのも、Next.js の開発は、Vercel を提供する ZEIT 社が中心になって行われています。そのため、Next.js と相性が抜群です。

個人利用のホビープランなら無料で使えるので、初めてデプロイするには最適だと思います。

# React プロジェクトの作成

この章では、CRA で React プロジェクトの作成の仕方を紹介します。

すでに、作成済みだったり、知ってる人は[こちら](https://nosuke-blog.site/blog/react-deploy#GitHubの設定)へスキップしてください。

## CRA で作成

まずは、以下の環境があることを確認してください。

- Node >= v10.16
- npm >= v5.6

確認できたら、以下のコマンドで React アプリの作成が始まります。

```none
npx create-react-app deploytest
```

そして、`Happy hacking!`と表示されたら完了です。簡単すぎ！

# GitHub の設定

GitHub の設定をします。まずは、ディレクトリの移動をしてください。

```none
cd deploytest
```

続いて、[GitHub](https://github.com/)の方でリポジトリを作成しておいてください。ここでは、`https://github.com/user/deploytest.git`とします。

そして、以下のコマンドで Git の設定をしてください。

```none
git init
git add .
git commit -m "First Commit"
git remote add origin https://github.com/user/deploytest.git
git push -u origin master
```

これで、Push できました！

# Vercel の設定

[Vercel](https://vercel.com)にログインしてください。初めての方は、新規登録してください。

ダッシュボードの画面に来たら、「New Project」をクリックしてください。

次に、「Import Git Repository」から、`https://github.com/user/deploytest.git`を入力します。

そしたら、GitHub と Vercel の連携について聞かれるので、承認します。

すると、「FRAMEWORK PRESET」の項目が表示されると思うので、「Create React App」を選択して「Deploy」をクリック。

これで、時間を待てばデプロイ完了です。以上です。これだけで、React アプリを世界中に公開できました。

# コードを更新した場合

コードを更新した場合は、以下のコマンドを打つことを忘れないでください。

```none
npm run build
```

そして、GitHub の master(もしくは main)に push するだけで、更新が反映されたものがデプロイされます。

いつも通り Git を使うだけで、デプロイも勝手にやってくれるので、非常に便利ですね！

# まとめ

いかがですが？　とても簡単ですよね！！

お名前.com などで取得したドメインも設定できるので、ぜひやってみてください！
（当ブログもお名前.com で取得したドメインを Vercel で設定しています）
