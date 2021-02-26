---
slug: terms2copy2
title: My Second Blog
description: This Description Of My Second Blog.
date: 25-September-2020
tag: 
- test
- aaa
- bbb
---

# h1

## h2

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