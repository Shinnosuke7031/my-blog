---
slug: make-next-blog
title: Next.jsでSSGブログサイトを作った話
description: 当サイトは、Next.jsで作りました。なぜNext.jsを採用したのかを書いていきます。最も大きな理由はSSG(静的サイト生成)です。また、ルーティングもすごく簡単で、ストレスフリーに開発できます。
date: 2021/3/2
imgpath: https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Fnextjs-3.png?alt=media&token=68053a5f-f2f2-45ca-9ba1-779169974a92
type: tect
tag:
  - Next.js
  - SSG
---

# 初めに

最近、Qiita や Zenn でブログを書いていましたが、だんだん自分でブログサイトを持ちたくなってきました。

そのため、自作でブログサイトを作ろうと思ったわけです。

# なぜ Next.js なのか

近年、Next.js の盛り上がりがすごいです。ほんとに。

それに便乗して僕も何か開発してみたかったのです。

例えば、[Apple の機械学習に関するサイト](https://machinelearning.apple.com/)や[Zenn](https://zenn.dev/)、[はてなブログのコーポレートサイト](https://hatenacorp.jp/)でも採用されています。

もちろん、ただ流行りに乗りたかったわけではありません。

Next.js には、以下のメリットがあります。

## SSG(静的サイト生成)

一番はこれ、SSG(Static Site Generation)です。

ビルド時に必要なデータをとってしまい、各ページの HTML を生成してくれます。リクエストがあった場合は、この HTML を返すだけです。

つまり、素の React より表示が早いんです。

よく、CSR(クライアントサイド)と SSR(サーバーサイドレンダリング)で比較されます。

CSR はブラウザでレンダリングするので、処理速度がユーザーのブラウザやデバイスの性能に依存します。

SSR は、レンダリングされたものをサーバーから返すので、ページ内のコンテンツの表示は早いです。Next.js で簡単に実装できます！

「あれ？じゃあ SSR で良くないか？」

と思うかもしれませんが、SSR はリクエスト時にサーバーでレンダリングするので、閲覧者を待たせてしまいます。閲覧者は不安になりますよね。。。

ということで、最も早く表示できる SSG で必要最低限なところは爆速で表示するようにしました。

そして、必要な部分だけ SSR するようにしました。

SSG は、ビルド時に HTML を生成するため、更新が頻繁に行われるサイトには向きません。

しかし、ブログサイトは 1 日に何回も更新するわけではないので、SSG で十分かと思います。

## ルーティング

これまで、React でルーティングを実装するときは、react-router を使っていました。

使ったことがある方はわかると思いますが、結構とっかかりにくいですよね。

リロードすると表示されなかったり。動的ルーティングも厄介です。

Next.js はこの辺のことは非常にシンプルになっています。

例えば`/pages`や`/src/pages`に`index.jsx`や`hello.jsx`、`posts/[id].jsx`を配置すると

- `index.jsx` 　　->　　 `/`
- `hello.jsx` 　　->　　 `/hello`
- `posts/[id].jsx` 　　->　　 `/posts/[id]`
  となります。

動的ルーティングも簡単ですよね。

## SEO

SSG では、すでに HTML ファイルがサーバー上にあるため、SEO が向上します。

SSR でも SEO は向上しますが、サーバーの負荷が大きいです。

# 使用技術・ライブラリ

マークダウンでブログを書くので、これに関するライブラリについてです。

## react-markdown

マークダウンを HTML に変換するものです。必須ですね。

## react-syntax-highlighter

ハイライトをつけるためのものです。主にコードのハイライトに使います。

非常にシンプルで使いやすい。

しかし、そのままではコードにファイル名をつけることができないため、自分で実装しました(後で記事にします)。

↓ こんなかんじ ↓

```typescript:Test.tsx
import { FC } from 'react'

const Test: FC<{}> = () => (<p>This is Test.tsx</p>)

export default Test
```

## gray-matter

マークダウンファイル(以下、md ファイル)に記述した記事自体だけでなく、記事のタイトルや日付などのフロントマッター(Front Matter)も取得するときに便利です。

```md:test.md
---
slug: test-blog
title: Test記事
description: 当サイトは、Next.jsで作りました。
date: 2021/3/2
type: tect
tag:
- hoge
- hogehoge
---
<!-- 以下本文 -->
HogeHoge

```

このような md ファイルがあったら、

```javascript:
import matter from "gray-matter"
const matteredData = matter(props.blogStringData)
```

とすると、記事の本体である`matteredData.content`と記事のフロントマッター部分のメタ情報が入った`matteredData.data`でそれぞれ取得できます。

マークダウン関係は以上です。

## TypeScript

やはり型をつけるとエラーがどこにあるかわかりやすくて良いですねー。開発効率上がりますよね。

## Material-UI

UI コンポーネントを提供してくれます。NOSUKE BLOG では、トップページの LineUp 部分に使ってます。

## next/dynamic

これは`import dynamic from 'next/dynamic'`と記述すると使用できます。

もともと Next.js に搭載されている機能なので、ここに載せるか悩んだのですが、工夫した点なので書きます。

ブログ記事が多くなると、最初に取得する HTML も増えてしまい大変なことになります。

SEO に関係する記事のメタ情報を除き、記事本体は SSR するようにしました。

先ほど、「SSR はリクエスト時にサーバーでレンダリングするので、閲覧者を待たせてしまいます」と記述したのですが、ヘッダーやフッター、ローディング画面などはすぐに表示されるので(SSG)、SSR を使いました。

つまり、**SSG と SSR の融合**ですね。

これを可能にするのが next/dynamic です。

```javascript:
import dynamic from 'next/dynamic'
const DynamicBlogContent = dynamic(
  () => import('../../components/BlogContent'),
  { loading: () => <div className={styles.loader}></div> }
)
```

DynamicBlogContent は通常のコンポーネントと同じ使い方ができます。

なおかつ、DynamicBlogContent だけ SSR できます。便利ですね〜

# まとめ

自分のブログサイトを持つこと、開発することは本当に楽しい！
