---
slug: markdown-codeblock-filename
title: react-syntax-highlighterでファイル名を表示する方法
description: react-syntax-highlighterはハイライトをつけるためのものです。主にコードのハイライトに使います。react-markdownやgray-matterと一緒に使うことで、マークダウンをhtmlに変換できますが、そのプログラムのファイル名は表示できません。この記事では私が実装した表示方法を紹介します。
date: 2021/3/10
imgpath: https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Ficonfinder_markdown_298823.png?alt=media&token=14cc8363-dd94-4dc4-885a-a90595e24f9a
type: tect
tag: 
- react-syntax-highlighter
- react-markdown
- gray-matter
---

# はじめに
[こちらの記事](https://nosuke-blog.site/blog/make-next-blog)で、Next.jsを使ってブログサイトを作った話をしました。

今回は、その中でもマークダウンについて話していきます！


マークダウン関連で使用するライブラリは
- react-syntax-highlighter
- react-markdown
- gray-matter
です。

# 前提
Next.jsで動かす前提で書いています。

しかし、Next.jsを知らなくても、Reactの基本を知っていればこの記事を理解できると思います。

# 各ライブラリについて
## react-markdown
マークダウンをHTMLに変換するものです。Reactでマークダウンを扱う時は必須ですね。

## gray-matter
マークダウンファイル(以下、mdファイル)に記述したメタ情報(記事のタイトルや日付など)が取得できます。

## react-syntax-highlighter
ハイライトをつけるためのものです。主にコードのハイライトに使います。

↓こんなかんじ↓
```typescript:Test.tsx
const Test: FC<{}> = () => <p>This is Test.tsx</p>
```

ファイル名が表示されていますが、少し手を加えないと表示されません。

# ファイル名の表示
## 扱うマークダウンファイル
```md:test.md
---
slug: test-blog
title: Test記事
description: 当サイトは、Next.jsで作りました。
date: 2021/3/2
type: tect
tag: 
- hoge
---
    # ここから下が本文

    ```javascript:hoge.js
    console.log('hogehoge')
    ```

```
＊インデントされているのは、バッククオートをコードブロック内に表示させるためです。実際のマークダウンでは、インデントはいりません。

## 変更前
```typescript:BlogContent.tsx
import { Fragment, FC } from 'react'
import ReactMarkdown from 'react-markdown'
import matter from "gray-matter"
import CodeBlock from './CodeBlock'

type BlogContentProps = {
  blogStringData: string
}

const BlogContent: FC<BlogContentProps> = (props) => {
  const matteredData = matter(props.blogStringData)
  const content = matteredData.content
  const data = matteredData.data
  return (
    <Fragment>
      <h1>{data.title}</h1>
      <p>{data.date}</p>
      <div>
        <ReactMarkdown renderers={{code: CodeBlock}}>{content}</ReactMarkdown>
      </div>
    </Fragment>
  )
}

export default BlogContent
```

重要な部分について説明します。
```typescript:
//propsからmdファイルの中身を受け取ってます。
const matteredData = matter(props.blogStringData)
//記事本文
const content = matteredData.content
//メタ情報
const data = matteredData.data
```
`gray-matter`の`matter`で、mdファイルに記述された記事本文部分とメタ情報部分に分けることができます。

```javacript:
<ReactMarkdown renderers={{code: CodeBlock}}>{content}</ReactMarkdown>
```
`react-markdown`の`ReactMarkdown`で、本文をhtmlに変えています。

`render`に`{code: コンポーネント}`と書くことで、コードブロックをいじれます。


それでは、そのコードブロックのコンポーネントを見てみましょう。

```typescript:CodeBlock.tsx
import { Fragment, FC } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism"

interface CodeBlockProps {
  value: string
  language?: string
}

const CodeBlock: FC<CodeBlockProps> = ({ language, value }) => {
  return (
    <Fragment>
      <SyntaxHighlighter language={language} style={darcula}>
        {value}
      </SyntaxHighlighter>
    </Fragment>
  )
}

export default CodeBlock
```

`SyntaxHighlighter`では
- `language` -> `javascript:hoge.js`
- `value` -> `console.log('hogehoge')`

となります。

## 変更後
それでは、ファイル名が表示されるようにしましょう。

```typescript:CodeBlock.tsx
import { Fragment, FC } from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism"

interface CodeBlockProps {
  value: string
  language?: string
}

const CodeBlock: FC<CodeBlockProps> = ({ language, value }) => {
  // Markdownで```javascript:hoge.js ...```の場合、languageにjavascript:hoge.jsxが入る
  // そのため、':'で分けて、コードの言語とファイル名をゲットだぜ
  const [ codeLanguage, fname ] = language!=="none" ? language.split(':') : [undefined, 'none']
  return (
    <Fragment>
      //fnameが定義されていればファイル名を表示
      {fname !== "none" && fname !== "" && <p className='fname'>&nbsp;{fname}&nbsp;</p>}
      <SyntaxHighlighter language={codeLanguage} style={darcula}>
        //ファイル名と被らんように改行を先頭につける
        {fname !== "none" && fname !== "" ? '\n'+value : value}
      </SyntaxHighlighter>
      
      <style jsx>{`
        .fname {
          position: absolute;
          width: fit-content;
          margin: 0 0 0 0.5vw;
          color: #ffffff;
          border-bottom: #ffffff 1px solid;
          background-color: #2b2b2b;
          z-index: 100;
        }
      `}</style>
    </Fragment>
  )
}

export default CodeBlock
```
`language`には`javascript:hoge.js`が入るので、「:」で区切ってしまえば良いわけです。

ファイル名を表示させると、コードブロックの１行目と少し被ってしますので、改行から始めるようにしてます。

しかし、ターミナルのコマンドなどをコードブロックで表示する際は、ファイルの種類は定義しないと思います。

↓こんな感じ
```none
npm run dev
```

その場合は、` ```none 〜 ``` `とすれば、ファイル名は表示されないようにして、改行もしないようにしてます。


これで、コードブロックにファイル名が表示されました！

＼(^ω^)／