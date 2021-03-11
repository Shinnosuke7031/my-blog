---
slug: adding-search-blog
title: Next.js製ブログサイトに記事検索機能を実装した話
description: 当ブログに記事検索機能を追加しました。Next.jsのgetStaticPropsから得た情報を元に、検索できるようにしました。また、ReactのuseMemoを使うことでメモ化させることで余計な再計算を防いでます。Dynamic importも使ってます。
date: 2021/3/11
imgpath: https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Fnextjs-3.svg?alt=media&token=2caf9210-05c4-46e3-87c3-c369ab5c0db0
type: tect
tag: 
- Next.js
- React
- SSG
---

# はじめに
当サイトは`Next.js`で作っていますが、`getStaticProps`でSSG時に各記事の情報を取得し、タイトルとタグを元に記事を検索できる機能を追加しました。

この検索機能は、[こちら](https://nosuke-blog.site/articles)の記事一覧の一番上と、PCで見ている方は各記事の右上にあるので使ってみてください。

# 使用したもの
## useMemo
Hooksの一種で、処理した結果をメモ化してくれます。

メモ化とは、簡単に言うと、不要な計算をしないためパフォーマンスが向上します。

## SSG関連
ビルド時にブログ記事の情報を取得して、それを検索機能コンポーネントにpropsで渡しています。

## SSR関連
検索機能コンポーネントは、SEOにはほぼ関係なく、生成されるHTMLファイルも大きくなるため、SSGのメリットが少ないです。

そのため、この検索機能コンポーネントはNext.jsのDynamic importでSSRするようにしました。

これで、検索機能を含むページのサイズを抑えることができます。

# 検索機能実装
## 検索結果のメモ化
```typescript:
const [ filterQuery, setFilterQuery ] = useState("")
// 検索処理
const filteredBlog = useMemo(() => {
  // propsからブログのメタデータであるblogMetaDataを受け取る
  let tmpBlogs= props.blogMetaData

  tmpBlogs = tmpBlogs.filter(el => {
    const isTagIncluded = el.tag.map((e: any) => e.toLowerCase().includes(filterQuery.toLowerCase()))
    return el.title.toLowerCase().includes(filterQuery.toLowerCase()) || isTagIncluded.includes(true)
  });

  if (filterQuery === "") return []
  else return tmpBlogs

}, [filterQuery])

const handleFilter = (e: React.ChangeEvent<HTMLInputElement>): void => {
  const { name, value } = e.target
  setFilterQuery(value)
}
```
入力フォームに変更があった際に`handleFilter`が呼び出され、入力フォームの文字をstateである`filterQuery`にセットしてます。

`filterQuery`に変更があった時だけ、検索処理をするようにしてます。

そして、`filter`では、各ブログのタイトルとタグ、`filterQuery`を全部小文字にして、`filterQuery`をタイトルかタグを含んでたら`true`を返すようにしました。


これだけです！意外とコード量は少なかったですね。

## 検索機能コンポーネントの読み込み
検索機能コンポーネントは、
```typescript:
import dynamic from 'next/dynamic'
const DynamicSerachBlog = dynamic(
  () => import('../components/blog/SearchBlog'),
  { loading: () => <div className={styles.loader}></div> }
)
```
とするだけで、普通のコンポーネントのように`<DynamicSerachBlog />`として扱えて、SSRできます。

もちろんpropsも通常のコンポーネントと同じように渡せます。詳しくは今後の記事にまとめますね。

