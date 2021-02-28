---
slug: test3
title: テスト記事
description: これはテストです
date: 2021/2/26
type: diary
tag: 
- test
- aaa
- bbb
---

# h1

Normal text

```typescript:Test.tsx
import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism"

interface P {
  value: string
  language?: string
}

const CodeBlock: React.FC<P> = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={'javascript'} style={darcula}>
      {value}
    </SyntaxHighlighter>
  )
}

export default CodeBlock
```

## h2

Normal text

```typescript:Test.tsx
import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism"

interface P {
  value: string
  language?: string
}

const CodeBlock: React.FC<P> = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={'javascript'} style={darcula}>
      {value}
    </SyntaxHighlighter>
  )
}

export default CodeBlock
```

### h3

Normal text

```typescript:Test.tsx
import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism"

interface P {
  value: string
  language?: string
}

const CodeBlock: React.FC<P> = ({ language, value }) => {
  return (
    <SyntaxHighlighter language={'javascript'} style={darcula}>
      {value}
    </SyntaxHighlighter>
  )
}

export default CodeBlock
```