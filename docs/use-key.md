---
slug: use-key
title: ReactでkeyDownイベントを簡単に扱えるHooks「useKey | Rooks」
description: Reactアプリでキーボードが押されたときに処理させたい場合は、様々なHooksを用意してくれるライブラリー「Rooks」のuseKeyがおすすめです。useKeyの基本的な使い方をまとめています。
date: 2021/10/14
imgpath: https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Freact-2.png?alt=media&token=b0fecf4e-7725-4a80-9b06-dc974f9d1e55
type: tect
tag:
  - フロントエンド
  - React
  - Libs
---

# この記事のゴール

- useKey を使って簡潔に keyDown イベントを扱えるようになる

今回使ったコードは[こちら](https://github.com/Shinnosuke7031/dev-study/tree/main/rooks-useKey)にあります。

# React で keydown イベント取得

React アプリでキーボードが押されたときに処理させたい場合は、記述が少し複雑になります。
例として、「Enter」を押したときにカウントアップしていくコードを示します。

[こちら](https://github.com/Shinnosuke7031/dev-study/tree/main/rooks-useKey)の例のコードを使っている人は、branch を main にしてください。（デフォルトです）

```typescript:none
import React, { Fragment, useEffect, useState, VFC } from "react";

const App: VFC = () => {
  const [count, setCount] = useState(0);
  const handleKeyDownEnter = (event: KeyboardEvent) => {
    if (event.key === "Enter") {
      setCount(count + 1);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDownEnter);
    return () => {
      document.removeEventListener("keydown", handleKeyDownEnter);
    };
  }, [count]);

  return <Fragment>Count : {count}</Fragment>;
};

export default App;
```

注目していただきたいのは、ここ。

```typescript:none
useEffect(() => {
  document.addEventListener("keydown", handleKeyDownEnter);
  return () => {
    document.removeEventListener("keydown", handleKeyDownEnter);
  };
}, [count]);
```

ポイントは、

- useEffect の deps に state を指定しなければいけない
- アンマウント時にイベントリスナーを除去しないと余計な計算が発生する

時間があったら、アンマウント時の処理を消してみると、動作がすごく重くなることが確認できるのでやってみることをオススメします！

他にも`event.key`で押されたキーの条件分岐をしたり、気にする部分が多くコードも長くなってしまいます。

# useKey

もっとシンプルに keyDown イベント扱いたいと思い、**Rooks**の**useKey**を使ってみました。

## Rooks と useKey

様々な用途に使える Hooks の宝庫、それが**Rooks**です。

私はまだ useKey 以外使ったことがないのですが、今後他にも見て使ってみようと思っています。

まずはインストールしてみましょう。

```none
npm install --save rooks
```

基本的な使い方は以下の通りです。

```typescript:none
import react, { useRef } from "react";
import { useKey } from "rooks"; // useKeyをimport

// 第一引数にkey、第二引数にイベントハンドラを指定
// targetを指定しなければdocument全体がtargetになる
useKey(["Enter"], handleKewDownEnter);

// useRefを使うことでtargetを指定することが可能
const targetRef = useRef();
useKey(["Enter"], handleKewDownEnter, {
  target: targetRef,
});
```

これをふまえて先程の例のコードを書き換えてみましょう。

[こちら](https://github.com/Shinnosuke7031/dev-study/tree/main/rooks-useKey)の例のコードを使っている人は、branch を useKey にしてください。

```typescript:none
import React, { Fragment, useState, VFC } from "react";
import { useKey } from "rooks";

const App: VFC = () => {
  const [count, setCount] = useState(0);
  const handleKewDownEnter = () => setCount(count + 1);
  useKey(["Enter"], handleKewDownEnter);

  return <Fragment>Count : {count}</Fragment>;
};

export default App;
```

いかがでしょうか！？

**useKey**を使うことでかなりすっきりとしたコードになりますね！

私は、今後 keyDown イベントを扱う際はこれを使っていこうと思います。

# 参考

[React で keydown イベントを取得する方法](https://zenn.dev/naoki/articles/b45f0d1b79808b2d307e)
