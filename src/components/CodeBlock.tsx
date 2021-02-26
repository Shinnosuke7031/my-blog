import React from "react"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism"

interface P {
  value: string
  language?: string
}

const CodeBlock: React.FC<P> = ({ language, value }) => {
  // Markdownで```javascript:hoge.jsx ...```と入力すると、languageにjavascript:hoge.jsxが入る
  // そのため、':'で分けて、コードの言語とファイル名をゲットだぜ
  const [ codeLanguage, fname ] = language.split(':')
  return (
    <React.Fragment>
      <p className='fname'>&nbsp;{fname}&nbsp;</p>
      <SyntaxHighlighter language={codeLanguage} style={darcula}>
        {value}
      </SyntaxHighlighter>
      
      <style jsx>{`
        .fname {
          position: absolute;
          width: fit-content;
          padding: 0 0.1vw;
          margin: 0 0 -3.1vh 0.5vw;
          color: #ffffff;
          border-bottom: #ffffff 1px solid;
          background-color: #2b2b2b;
          z-index: 999999 
        }
      `}</style>
    </React.Fragment>
  )
}

export default CodeBlock