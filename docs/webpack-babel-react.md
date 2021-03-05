---
slug: webpack-babel-react
title: (webpack + Babel編)React開発環境構築
description: create-react-app(CRA)は簡単にReactのプロジェクトができますが、環境構築については丸投げですよね。webpackとBabelでReactの開発環境を1から自分で構築する方法をまとめました。
date: 2021/3/1
imgpath: https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Freact-2.svg?alt=media&token=deb078bd-642f-4f12-b2b1-12bc29572368
type: tect
tag: 
- React
- webpack
- Babel
---

# 初めに
create-react-app(CRA)は簡単にReactのプロジェクトができますが、環境構築については丸投げでブラックボックスになってしまう。。。
しかも、無駄なファイルがある。。。

そこで、1から環境を構築してみます。
注意 : Node.jsとnpmは使える前提で進めます

# 前置き
React
Reactは、フロントエンド開発において世界中でもっとも利用されているJavaScriptライブラリです。

主な特徴は以下の3つ！（詳細は公式サイト参照）

- 宣言的なview
- コンポーネントベース
- 一度学習すれば、どこでも使える

## webpack
webpackとは、複数のJavaScript(以下JS)ファイルを一つにまとめたJSファイルを生成してくれます。この、まとめる処理をバンドルと言います。

このバンドルされたJSファイルをHTMLに埋め込むと、Reactで記述したものが表示されます。

## Babel
こちらは、JavaScriptのコンパイラです。Reactには新しいJSを記述します。
しかし、全てのブラウザが新しいバージョンのJSに対応しているわけではありません。

そこで活躍するのがBabelです！新しいバージョンで書かれたJSを古いバージョンに変換してくれます。
これによって、多くのブラウザでReactを動作させることができます。

# 環境構築
## 開発環境の確認
Node.jsとnpmは以下を想定しています。

```none
$ node -v
v12.18.0
```

```none
$ npm -v
6.14.1
```

まずはディレクトリを作成して移動します。

```none
$ mkdir  rwp-study && cd rwp-study
$ mkdir src dist
```
```none
$ npm init -y
```
## Reactのインストール
```none
$ npm i  react react-dom
```
## Babelのインストール
```none
$ npm i --save-dev babel-loader @babel/core @babel/preset-env @babel/preset-react
```
- babel-loader : webpackでBabelを使うために必要
- @babel/core : Babelのコア
- @babel/preset-env : コンパイルするときにターゲットを指定するもの
- @babel/preset-react : Reactをコンパイルするもの

## webpackのインストール
```none
$ npm i --save-dev webpack webpack-cli html-webpack-plugin webpack-dev-server
```
- webpack : webpack本体です！
- webpack-cil : webpackをコマンド操作するのに必要
- html-webpack-plugin : webpackでHTMLを操作するのに必要
- webpack-dev-server : ローカル環境で開発するためのサーバー。ソースコードを変更すると検知してブラウザをリロードしてくれる。
これで必要なものはインストールできました。これから設定していきます。

# Babelの設定
プロジェクトのルートに「.babelrc」を作成し、以下のように記述します。


```:.babelrc
{
  "presets": [
    "@babel/preset-env", // 新しいバージョンのJS -> 古いバージョンのJS(es5)
    "@babel/preset-react" // React用のプラグイン
  ]
}
```
## webpackの設定
プロジェクトのルートに「webpack.config.js」を作成し、以下のように記述します。

```javascript:webpack.config.js
const path = require('path');
//webpackでHTMLを扱うためのプラグイン
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  // bundleの開始位置
  entry: './src/Index.js',
  // bundleされたファイルの場所
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist/'),
  },
  module: {
    // babelで[js, jsx]をコンパイル
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  // [/src/index.html]を[dist/index.html]に生成
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
  ],
  // webpack-dev-serverの設定
  devServer: {
        contentBase: path.join(__dirname, 'dist'),// ベースとなる参照するディレクトリ
    port: 3000,
    host: 'localhost',
    open: true // サーバーを起動させたときにブラウザを開く
    },
};
```
## コンポーネントの作成
「/src/Index.js」にコンポーネントを以下のように作成します。


```javascript:Index.js
import React from 'react';
import ReactDOM from 'react-dom';
const Index = () => {
  return (
    <h1>Hello React with webpack-Babel!!</h1>
  );
};
ReactDOM.render(<Index />, document.getElementById('root'));
```
上記のJSファイルを埋め込むための「/src/index.html」を以下のように作成します。


```javascript:index.html
<!DOCTYPE html>
<html lang="jp">
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```
これで、各ファイルの準備ができました。

しかし、開発サーバー(webpack-dev-server)の起動コマンドを設定していないため、「package.json」の"scripts"を以下のように変更します。

```json:package.json
"scripts": {
  "start": "webpack serve --mode development",
  "build": "webpack --progress --mode production"
},
```
これで、環境構築各ファイルの準備ができました!

## 開発サーバーの起動
早速、サーバーを起動してみましょう。以下のコマンドを実行して起動できます。

```none
$ npm start
```

「http://localhost:3000」にこんな感じで表示されます。

これで開発環境の構築が完了しました！

「/src/Index.js」を変更すると、自動でリロードされるので確認してみて下さい！

本番用にビルドする際は、

```none
$ npm run build
```
と打てば、「/dist」に「index.html」と「main.js」生成されます。

デプロイするときは、この「index.html」と「main.js」を配置するだけで大丈夫です！
例えば、GitHub pagesで公開する際は、「/dist」を公開するようにGitHub上で設定すればできます。

