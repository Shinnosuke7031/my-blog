import { FC, Fragment } from "react"
import { GetStaticProps } from "next"
import Head from 'next/head'
import dynamic from 'next/dynamic'
import MyLayout from '../../components/MyLayout'
import ProfileCard from '../../components/ProfileCard'
import BlogIndex from '../../components/blog/BlogIndex'
import fs from 'fs'
import matter from "gray-matter"
import { useMediaQuery } from "react-responsive"
import styles from '../../styles/animation.module.css'
import Paper from '@material-ui/core/Paper'

const DynamicBlogContent = dynamic(
  () => import('../../components/BlogContent'),
  { loading: () => <div className={styles.loader}></div> }
)

const DynamicSerachBlog = dynamic(
  () => import('../../components/blog/SearchBlog'),
  { loading: () => <div className={styles.loader}></div> }
)

type typeBlogDataArray = {
  slug: string
  title: string
  description: string
  date: string
  imgpath: string
  tag: string[]
}

type BlogPageProps = {
  blogStringData: string
  title: string
  description: string
  allStringData: string[]
}

const BlogPage: FC<BlogPageProps> = (props) => {
  const matteredData = matter(props.blogStringData).data
  const title = matteredData.title
  const description = matteredData.description
  const isPCScreen = useMediaQuery({ query: '(min-width: 1100px)'})
  const metaData = props.allStringData.map(el => matter(el)).map(data => ({
    slug: data.data.slug,
    title: data.data.title,
    description: data.data.description,
    date: data.data.date,
    type: data.data.type,
    tag: data.data.tag,
    imgpath: data.data.imgpath
  }))
  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@tyamatyatya" />
        <meta property="og:url" content={`https://nosuke-blog.site/blog/${matteredData.slug}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} /> 
        <meta property="og:image" content={matteredData.imgpath} />
      </Head>

      <MyLayout>
        {/* <BlogContent blogStringData={props.blogStringData} title={props.title} description={props.description} /> */}
        <div className='container'>
          <div className={isPCScreen ? 'content' : 'content-mob'}>
            <DynamicBlogContent blogStringData={props.blogStringData} />
          </div>
          {isPCScreen && <div className='others'>
            <Paper elevation={10} style={{padding: '1rem'}}>
              <DynamicSerachBlog isTagDisplayed={false} blogMetaData={metaData} />
            </Paper>
            <br />
            <br />
            <br />
            <br />
            <ProfileCard />
            <br />
            <br />
            <br />
            <br />
            <BlogIndex blogStringData={props.blogStringData} /> 
          </div>}
        </div>
      </MyLayout>
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-around;
        }
        .content {
          width: 700px;
        }
        .content-mob {
          width: 100%;
        }
        .others {
          width: 300px;
        }
      `}</style>
    </Fragment>
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
  const allFiles = fs.readdirSync(process.cwd() + '/docs', 'utf8')
  const blogs = allFiles.filter((fn) => fn.endsWith(".md"))
  const blogStringDataArr = blogs.map((blog) => {
    const path = `${process.cwd()}/docs/${blog}`
    const data = fs.readFileSync(path, {
      encoding: "utf-8",
    })
    return data
  })

  return {
    props : {
      blogStringData: file,
      title: siteData.default.title,
      description: siteData.default.description,
      allStringData: blogStringDataArr
    }
  }

}
export default BlogPage