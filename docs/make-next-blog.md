---
slug: make-next-blog
title: Next.jsでSSGブログサイトを作った話
description: 当サイトは、Next.jsで作りました。なぜNext.jsを採用したのかを書いていきます。最も大きな理由はSSG(静的サイト生成)です。また、ルーティングもすごく簡単で、ストレスフリーに開発できます。
date: 2021/3/2
imgpath: https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Fnextjs-3.svg?alt=media&token=2caf9210-05c4-46e3-87c3-c369ab5c0db0
type: tect
tag: 
- Next.js
- SSG
---

# 初めに
最近、QiitaやZennでブログを書いていましたが、だんだん自分でブログサイトを持ちたくなってきました。

そのため、自作でブログサイトを作ろうと思ったわけです。

# なぜNext.jsなのか
近年、Next.jsの盛り上がりがすごいです。ほんとに。

それに便乗して僕も何か開発してみたかったのです。

例えば、[Appleの機械学習に関するサイト](https://machinelearning.apple.com/)や[Zenn](https://zenn.dev/)、[はてなブログのコーポレートサイト](https://hatenacorp.jp/)でも採用されています。

もちろん、ただ流行りに乗りたかったわけではありません。

Next.jsには、以下のメリットがあります。

## SSG(静的サイト生成)
一番はこれ、SSG(Static Site Generation)です。

ビルド時に必要なデータをとってしまい、各ページのHTMLを生成してくれます。リクエストがあった場合は、このHTMLを返すだけです。

つまり、素のReactより表示が早いんです。

よく、CSR(クライアントサイド)とSSR(サーバーサイドレンダリング)で比較されます。

CSRはブラウザでレンダリングするので、処理速度がユーザーのブラウザやデバイスの性能に依存します。

SSRは、レンダリングされたものをサーバーから返すので、ページ内のコンテンツの表示は早いです。Next.jsで簡単に実装できます！

「あれ？じゃあSSRで良くないか？」

と思うかもしれませんが、SSRはリクエスト時にサーバーでレンダリングするので、閲覧者を待たせてしまいます。閲覧者は不安になりますよね。。。

ということで、最も早く表示できるSSGで必要最低限なところは爆速で表示するようにしました。

そして、必要な部分だけSSRするようにしました。


SSGは、ビルド時にHTMLを生成するため、更新が頻繁に行われるサイトには向きません。

しかし、ブログサイトは1日に何回も更新するわけではないので、SSGで十分かと思います。

## ルーティング
これまで、Reactでルーティングを実装するときは、react-routerを使っていました。

使ったことがある方はわかると思いますが、結構とっかかりにくいですよね。

リロードすると表示されなかったり。動的ルーティングも厄介です。

Next.jsはこの辺のことは非常にシンプルになっています。

例えば`/pages`や`/src/pages`に`index.jsx`や`hello.jsx`、`posts/[id].jsx`を配置すると
- `index.jsx` 　　->　　 `/`
- `hello.jsx` 　　->　　 `/hello`
- `posts/[id].jsx` 　　->　　 `/posts/[id]`
となります。

動的ルーティングも簡単ですよね。

## SEO
SSGでは、すでにHTMLファイルがサーバー上にあるため、SEOが向上します。

SSRでもSEOは向上しますが、サーバーの負荷が大きいです。

# 使用技術・ライブラリ
マークダウンでブログを書くので、これに関するライブラリについてです。

## react-markdown
マークダウンをHTMLに変換するものです。必須ですね。

## react-syntax-highlighter
ハイライトをつけるためのものです。主にコードのハイライトに使います。

非常にシンプルで使いやすい。

しかし、そのままではコードにファイル名をつけることができないため、自分で実装しました(後で記事にします)。

↓こんなかんじ↓
```typescript:Test.tsx
import { FC } from 'react'

const Test: FC<{}> = () => (<p>This is Test.tsx</p>)

export default Test
```

## gray-matter
マークダウンファイル(以下、mdファイル)に記述した記事自体だけでなく、記事のタイトルや日付などのフロントマッター(Front Matter)も取得するときに便利です。
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
このようなmdファイルがあったら、
```javascript:
import matter from "gray-matter"
const matteredData = matter(props.blogStringData)
```
とすると、記事の本体である`matteredData.content`と記事のフロントマッター部分のメタ情報が入った`matteredData.data`でそれぞれ取得できます。

マークダウン関係は以上です。

## TypeScript
やはり型をつけるとエラーがどこにあるかわかりやすくて良いですねー。開発効率上がりますよね。

## Material-UI
UIコンポーネントを提供してくれます。NOSUKE BLOGでは、トップページのLineUp部分に使ってます。

## next/dynamic
これは`import dynamic from 'next/dynamic'`と記述すると使用できます。

もともとNext.jsに搭載されている機能なので、ここに載せるか悩んだのですが、工夫した点なので書きます。


ブログ記事が多くなると、最初に取得するHTMLも増えてしまい大変なことになります。

SEOに関係する記事のメタ情報を除き、記事本体はSSRするようにしました。

先ほど、「SSRはリクエスト時にサーバーでレンダリングするので、閲覧者を待たせてしまいます」と記述したのですが、ヘッダーやフッター、ローディング画面などはすぐに表示されるので(SSG)、SSRを使いました。


つまり、**SSGとSSRの融合**ですね。


これを可能にするのがnext/dynamicです。
```javascript:
import dynamic from 'next/dynamic'
const DynamicBlogContent = dynamic(
  () => import('../../components/BlogContent'),
  { loading: () => <div className={styles.loader}></div> }
)
```
DynamicBlogContentは通常のコンポーネントと同じ使い方ができます。

なおかつ、DynamicBlogContentだけSSRできます。便利ですね〜

# まとめ
自分のブログサイトを持つこと、開発することは本当に楽しい！
