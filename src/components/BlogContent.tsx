import { Fragment, FC, useEffect } from 'react'
import Head from 'next/head'
import MyLayout from '../components/MyLayout'

import fs from 'fs'
import { GetStaticProps } from 'next'
import ReactMarkdown from 'react-markdown'
import matter from "gray-matter";
import CodeBlock from '../components/CodeBlock'

type StaticProps = {
  blogData: string
  title: string
  description: string
}

// type typeBlogData = {
//   slug: string
//   title: string
//   description: string
//   date: string
//   tag: string | string[]
// }

// type typeMatteredData = {
//   content: string
//   data: typeBlogData
// }

const Home: FC<StaticProps> = (props) => {
  const tmp = matter(props.blogData)
  const content = tmp.content
  console.log("Index -> props", props);
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
      </Head>
      <MyLayout>
        <p>This is Nosuke Blog</p>
        <ReactMarkdown renderers={{code: CodeBlock}}>{content}</ReactMarkdown>

      </MyLayout>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const siteData = await import(`../../config.json`);
  const blogData = fs.readFileSync(process.cwd() + '/docs/terms.md', 'utf8')

  return {
    props: {
      blogData: blogData,
      title: siteData.default.title,
      description: siteData.default.description,
    },
  };
}

export default Home