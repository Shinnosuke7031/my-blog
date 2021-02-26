import { Fragment, FC, useEffect } from 'react'
import Head from 'next/head'
import MyLayout from '../components/MyLayout'
import fs from 'fs'
import { GetStaticProps } from 'next'
import BlogContent  from '../components/BlogContent'
import NewArrivalsList from '../components/NewArrivalsList'

type StaticProps = {
  blogData: string[]
  title: string
  description: string
}


const Home: FC<StaticProps> = (props) => {
  const blogData = props.blogData
  const title = props.title
  const description = props.description
  // console.log(props.blogData)
  return (
    <Fragment>
      <Head>
        <title>{props.title}</title>
      </Head>
      <MyLayout>
        <NewArrivalsList blogData={blogData} />
        {/* {blogData.map((blog, index) => <BlogContent key={index} blogData={blog} title={title} description={description} />)} */}
      </MyLayout>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const siteData = await import(`../../config.json`);
  const files = fs.readdirSync(process.cwd() + '/docs', 'utf8')

  const blogs = files.filter((fn) => fn.endsWith(".md"))

  const blogData = blogs.map((blog) => {
    const path = `${process.cwd()}/docs/${blog}`
    const data = fs.readFileSync(path, {
      encoding: "utf-8",
    })
    return data
  })
    
  return {
    props: {
      blogData: blogData,
      title: siteData.default.title,
      description: siteData.default.description,
    },
  }
}

export default Home