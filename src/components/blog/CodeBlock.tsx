import React, { Fragment, FC } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface P {
  value: string;
  language?: string;
}

const CodeBlock: FC<P> = ({ language, value }) => {
  // Markdownで```javascript:hoge.jsx ...```と入力すると、languageにjavascript:hoge.jsxが入る
  // そのため、':'で分けて、コードの言語とファイル名をゲットだぜ
  const [codeLanguage, fname] =
    language !== 'none' ? language.split(':') : [undefined, 'none'];
  return (
    <Fragment>
      {fname !== 'none' && fname !== '' && (
        <p className="fname">&nbsp;{fname}&nbsp;</p>
      )}
      <SyntaxHighlighter language={codeLanguage} style={darcula}>
        {fname !== 'none' && fname !== '' ? '\n' + value : value}
      </SyntaxHighlighter>

      <style jsx>{`
        .fname {
          position: absolute;
          width: fit-content;
          margin: 0 0 0 0.5vw;
          color: #ffffff;
          border-bottom: #ffffff 1px solid;
          background-color: #2b2b2b;
          z-index: 99;
        }
      `}</style>
    </Fragment>
  );
};

export default CodeBlock;
