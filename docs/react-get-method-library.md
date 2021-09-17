---
slug: react-get-method-library
title: Reactでデータ取得するおすすめの方法はSWRだ！
description: Reactで外部APIから情報を取得する方法は、Fetch APIやaxiosが有名ですが、データ取得のためのReact HooksであるSWR(stale-while-revalidate)を紹介します。
date: 2021/9/17
imgpath: https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Freact-2.png?alt=media&token=b0fecf4e-7725-4a80-9b06-dc974f9d1e55
type: tect
tag:
  - フロントエンド
  - React
  - SWR
---

# はじめに

React で外部 API から情報を取得したいとき、皆さんはどうしていますか？

Fetch API や axios が有名どころだと思います。

しかし、今回オススメするのは「自動的に継続的にデータ更新」をしてくれる Hooks である**SWR**について紹介したいと思います。

# この記事の目的

- React でデータ取得の各種ライブラリについて知る
- Fetch API、axios と SWR の違いとは？

# Fetch API

## 概要

まずは、Fetch API の基本的な使い方を見てみましょう。

```javascript:none
export default function Index () {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("/api/url", {method: "GET"})
    .then(res => res.json())
    .then(resData => setData(resData));
    .catch(error => console.error(error))
  }, []);

  return (
    <ul>
      {data.map(el => <li key={el.id}> {el.title} </li>)}
    </ul>
  );
}
```

今回は、JSON データを取得し、`setData`で`data`を更新することを想定します。

また、`useEffect`の第 2 引数を空配列にして、最初にマウントされる時だけデータを取得するようにしています。

まずは、fetch は

```javascript:none
fetch("APIのURL", {各種パラメータ})
```

を最初に記述します。データ取得は GET メソッドなので、`{method: "GET"}`としています。

次に、`then`でレスポンスを受け取りますが、ここではまだ JSON データではないので`json()`を記述する必要があります。

その次の`then`でデータを state にセットします。

## 注意点

エラーハンドリングには注意が必要です。

データ取得時にエラーが発生しても、`catch`でエラー内容を取得できないことがあります（404 や 500 エラーなど）。

正確にエラーハンドリングするには、`then`では以下のようにする必要があります。

```javascript:none
.then(res => {
  if(!res.ok) {
    console.error(res)
  } else {
    res.json()
  }
})
```

# axios

続いて、axios の基本的な使い方を見てみましょう。

```javascript:none
export default function Index () {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("/api/url")
    .then(res => setData(res.data));
    .catch(error => console.error(error))
  }, []);

  return (
    <ul>
      {data.map(el => <li key={el.id}> {el.title} </li>)}
    </ul>
  );
}
```

まずは、axios は

```javascript:none
axios.get("APIのURL")
```

を最初に記述します。データ取得は GET メソッドなので、`get()`メソッドを使います。

また、返ってくるデータは JSON 形式なのでパースの必要がないので、Fetch API よりもシンプルになります。

さらに、Fetch API のデメリットである 404 や 500 エラー問題も解決でき、エラーの場合は必ず`catch`部分の処理が実行されます。

# SWR

## 概要＆メリット

さて、本題の SWR です。

こちらは、React フレームワークである Next.js も手がけている Vercel によって開発されています。

SWR は、

1. まずキャッシュからデータを返す
2. フェッチリクエストを送る
3. 最後に最新のデータを持ってくる
   という流れで処理されます。

メリットは以下の通りです。

- 非同期処理が非常に簡単
- 高速で軽量
- 再利用可能
- リアクティブな動作
- 継続的かつ自動的にデータの更新

非同期処理がシンプルになるだけではなく、データのキャッシュ・データ更新も自動に行ってくれる素晴らしいライブラリです。

## 基本的な使い方

SWR の基本的な使い方をみてみましょう。

```javascript:none
const fetcher = url => axios.get(url).then(res => res.data);

export default function Index () {

  const { data, error } = useSWR("/api/url", fetcher);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <ul>
      {data.map(el => <li key={el.id}> {el.title} </li>)}
    </ul>
  );
}
```

まずは fetcher 関数を作成する必要があります。

```javascript:none
const fetcher = url => axios.get(url).then(res => res.data);
// fetchでもOK
const fetcher = url => fetch(url).then(res => res.json())；
```

SWR と axios・Fetch API を比較すると言いましたが、正確には SWR でもこれらを使うことになります。

しかし、axios・Fetch API はこの 1 行のみの記述で大丈夫です。

そして、

```javascript:none
const { data, error } = useSWR("/api/url", fetcher);
```

でデータとエラー内容を取得できます。

データを読み込み中の時は、`data`は`undefined`になるので、ローディング中の表示も簡単に実装できます。

## 再利用可能な関数にする

複数のコンポーネントでデータ取得したいときは、SWR 部分を切り離して関数にできます。

```javascript:none
function fetchData () {
  const { data, error } = useSWR(`/api/url`, fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}
```

```javascript:none
const fetcher = url => axios.get(url).then(res => res.data);

export default function Index () {

  const { data, isLoading, isError } = fetchData();

  if (isLoading) return <div>loading...</div>;
  if (isError) return <div>failed to load</div>;

  return (
    <ul>
      {data.map(el => <li key={el.id}> {el.title} </li>)}
    </ul>
  );
}
```

このように、驚くほど簡単にデータ取得部分を再利用できます。驚くほどです！！(公式も「驚くほど簡単」と言っています ww)

# 結論

SWR は、Fetch API や axios では複雑になるデータ取得の状態管理が**驚くほど**簡単に扱えます。

また、複数コンポーネントで SWR でデータ取得してもリクエストは重複しないので、Redux の store に保存したり、props のバケツリレーもする必要がないようですので、ぜひ使ってみてください！
