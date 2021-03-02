import { Fragment, FC } from 'react'
import ReactMarkdown from 'react-markdown'
import matter from "gray-matter";
import CodeBlock from '../components/CodeBlock'
import MarkdownImg from '../components/MarkdownImg'
import Head from 'next/head'

type BlogContentProps = {
  blogStringData: string
  title: string
  description: string
}


const BlogContent: FC<BlogContentProps> = (props) => {
  const matteredData = matter(props.blogStringData)
  const content = matteredData.content
  const data = matteredData.data
  return (
    <Fragment>
      <Head>
        <meta name="description" content={data.description} />
      </Head>
      <h1>{data.title}</h1>
      <p className='date'>{data.date}</p>
      <div className='blog'>{/* 記事内のpタグの行間を大きくする */}
        <ReactMarkdown renderers={{code: CodeBlock, image: MarkdownImg}}>{content}</ReactMarkdown>
      </div>
      <style jsx>{`
        h1 {
          font-size: 5vh;
        }
        .date {
          text-align: right;
          text-decoration: underline;
        }
      `}</style>
    </Fragment>
  )
}

export default BlogContent