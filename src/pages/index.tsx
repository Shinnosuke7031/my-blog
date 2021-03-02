import { Fragment, FC } from 'react'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import MyLayout from '../components/MyLayout'
import NavOfSiteAndContactMe from '../components/NavOfSiteAndContactMe'
import NavOfTwitterAndGithub from '../components/NavOfTwitterAndGithub'
import fs from 'fs'
import { GetStaticProps } from 'next'
import matter from 'gray-matter'
import styles from '../styles/animation.module.css'

const DynamicNewArrivalsList = dynamic(
  () => import('../components/NewArrivalsList'),
  { loading: () => <div className={styles.loader}></div> }
)


type StaticProps = {
  blogData: string[]
  title: string
  description: string
}


const Home: FC<StaticProps> = (props) => {
  const blogData = props.blogData
  const title = props.title
  const description = props.description
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <MyLayout>
        <NavOfSiteAndContactMe />
        <NavOfTwitterAndGithub />
        <div className="welcome">
          <p>当ブログは、WEBやプログラミングについて学んだことの備忘録です。</p>
          <p>また、それ以外にも日常的なことや趣味についても書いてます。</p>
        </div>
        <h1>Lineup</h1>
        <DynamicNewArrivalsList blogData={blogData} />
      </MyLayout>
      <style jsx>{`
        h1 {
          margin-bottom: -0.2rem;
        }
        .welcome {
          margin: 0 auto;
          padding: 1rem;
          font-size: 1rem;
          width: 80%;
          background-color: #ffffff;
          border-radius: 0.4rem;
          box-shadow: 3px 3px 3px 3px #000000;
        }
      `}</style>
    </Fragment>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const siteData = await import(`../../config.json`);
  const files = fs.readdirSync(process.cwd() + '/docs', 'utf8')

  const blogs = files.filter((fn) => fn.endsWith(".md"))

  const blogDataString = blogs.map((blog) => {
    const path = `${process.cwd()}/docs/${blog}`
    const data = fs.readFileSync(path, {
      encoding: "utf-8",
    })
    return data
  })

  const matteredData = blogDataString.map(blog => matter(blog))
  const blogDateArray = matteredData.map(el => {
    const timeSppietdBefore: string = el.data.date
    const timeSppietd: number[] = timeSppietdBefore.split('/').map(el => Number(el))
    return timeSppietd[0] * 24 * 366 + timeSppietd[1] * 24 * 31 + timeSppietd[2] * 24
  })
  
  for (let index = 0; index < blogDateArray.length-1; index++) {
    for (let index2 = 0; index2 < blogDateArray.length; index2++) {

      if (blogDateArray[index2] < blogDateArray[index2+1]) {
        let tmp = blogDateArray[index2]
        blogDateArray[index2] = blogDateArray[index2+1]
        blogDateArray[index2+1] = tmp
        
        let tmp2 = blogDataString[index2]
        blogDataString[index2] = blogDataString[index2+1]
        blogDataString[index2+1] = tmp2
      }

    }
  }
  return {
    props: {
      blogData: blogDataString,
      title: siteData.default.title,
      description: siteData.default.description,
    },
  }
}

export default Home