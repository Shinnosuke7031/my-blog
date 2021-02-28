import { Fragment, FC, useEffect } from 'react'
import Head from 'next/head'
import MyLayout from '../components/MyLayout'
import fs from 'fs'
import { GetStaticProps } from 'next'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import WebAssetIcon from '@material-ui/icons/WebAsset'
import NewArrivalsList from '../components/NewArrivalsList'
import GitHubIcon from '@material-ui/icons/GitHub';
import TwitterIcon from '@material-ui/icons/Twitter';
import matter from 'gray-matter'
import Link from 'next/link'

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
        <title>{title}</title>
      </Head>
      <MyLayout>
        <div className='navbar'>
          <div><Link href='about'><a className='nav-el'><AccountBoxIcon style={{color: "grey"}} fontSize='large' /> <p style={{color: "grey"}}>About Me</p>  </a></Link></div>
          <div><Link href='about'><a className='nav-el'><WebAssetIcon style={{color: "grey"}} fontSize='large' /> <p style={{color: "grey"}}>About Site</p>  </a></Link></div>
          <div><Link href='about'><a className='nav-el'><MailOutlineIcon style={{color: "grey"}} fontSize='large' /> <p style={{color: "grey"}}>Contact</p> </a></Link></div>
        </div>
        <br />
        <div className='navbar navbar2'>
          <div><a className='nav-el' href="https://github.com/Shinnosuke7031"><GitHubIcon style={{color: "#000000"}} fontSize='large' /> <p style={{color: "#000000"}}>GitHub</p> </a></div>
          <div><a className='nav-el' href="https://twitter.com/web7031boushi"><TwitterIcon fontSize='large' /> <p>Twitter</p> </a></div>
        </div>
        <br />
        <div className="welcome">
          <p>当ブログは、WEBやプログラミングについて学んだことの備忘録です。</p>
          <p>また、それ以外にも日常的なことや趣味についても書いてます。</p>
        </div>
        <h1>Lineup</h1>
        <NewArrivalsList blogData={blogData} />
        {/* {blogData.map((blog, index) => <BlogContent key={index} blogData={blog} title={title} description={description} />)} */}
      </MyLayout>
      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-around;
          font-size: 1rem;
          margin: 0 auto;
          width: 600px;
        }
        .navbar2 {
          margin: 0 auto;
          width: 400px;
        }
        .navbar div {
          display: block;
          box-shadow: 1px 2px 0 0 #727272;
          background-color: #ffffff;
          border-radius: 0.4rem;
          width: 5rem;
        }
        .navbar div:hover {
          background-color: #e6e6e6;
        }
        h1 {
          margin-bottom: -0.2rem;
        }
        .nav-el {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .nav-el p {
          margin: 0;
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
    for (let index2 = index; index2 < blogDateArray.length; index2++) {

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