import { Fragment, FC } from 'react'
import ReactMarkdown from 'react-markdown'
import matter from "gray-matter";
import CodeBlock from './blog/CodeBlock'
import MarkdownImg from './blog/MarkdownImg'
import Heading from './blog/Heading'
import Paper from '@material-ui/core/Paper'

type BlogContentProps = {
  blogStringData: string
}


const BlogContent: FC<BlogContentProps> = (props) => {
  const matteredData = matter(props.blogStringData)
  const content = matteredData.content
  const data = matteredData.data
  return (
    <Fragment>
      <Paper elevation={3} style={{padding: '1rem',}}>
        <h1>{data.title}</h1>
        <p className='date'>{data.date}</p>
        <div className='blog'>{/* 記事内のpタグの行間を大きくする */}
          <ReactMarkdown renderers={{code: CodeBlock, image: MarkdownImg, heading: Heading}}>{content}</ReactMarkdown>
        </div>
      </Paper>
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