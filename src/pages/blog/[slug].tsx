import React, { FC } from "react"
import MyLayout from '../../components/MyLayout'
import { GetStaticProps } from "next"
import fs from 'fs'
import matter from "gray-matter"
import BlogContent  from '../../components/BlogContent'
import Head from 'next/head'

type typeBlogDataArray = {
  slug: string
  title: string
  description: string
  date: string
  tag: string | string[]
}

type BlogPageProps = {
  blogStringData: string
  title: string
  description: string
}

const BlogPage: FC<BlogPageProps> = (props) => {
  const title = matter(props.blogStringData).data.title
  return (
    <React.Fragment>
      <Head>
        <title>{title}</title>
      </Head>

      <MyLayout>
        <BlogContent blogStringData={props.blogStringData} title={props.title} description={props.description} />
      </MyLayout>
    </React.Fragment>
  )
}

export async function getStaticPaths() {
  const files = fs.readdirSync(process.cwd() + '/docs', 'utf8')
  const blogs = files.filter((fn) => fn.endsWith(".md"))
  const blogStringDataArr = blogs.map((blog) => {
    const path = `${process.cwd()}/docs/${blog}`
    const data = fs.readFileSync(path, {
      encoding: "utf-8",
    })
    return data
  })
  const matteredData = blogStringDataArr.map(blog => matter(blog))
  const blogDataArray = matteredData.map(el => el.data)
  const paths = blogDataArray.map((path: typeBlogDataArray) => ({
    params: { slug: path.slug },
  }))

  return { paths, fallback: false }
}

export const getStaticProps: GetStaticProps = async ({params}) => {
  const file = fs.readFileSync(`${process.cwd()}/docs/${params.slug}.md`, 'utf8')
  const siteData = await import(`../../../config.json`);
  

  return {
    props : {
      blogStringData: file,
      title: siteData.default.title,
      description: siteData.default.description,
    }
  }

}
export default BlogPage