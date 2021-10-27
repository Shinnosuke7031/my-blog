import React, { FC, Fragment } from 'react';
import { GetStaticProps } from 'next';
import Head from 'next/head';
import MyLayout from '../../components/MyLayout';
import ProfileCard from '../../components/ProfileCard';
import BlogIndex from '../../components/blog/BlogIndex';
import fs from 'fs';
import matter from 'gray-matter';
import { useMediaQuery } from 'react-responsive';
import Paper from '@material-ui/core/Paper';
import NinjaAd from '../../components/ad/NinjaAd';
import BlogContent from '../../components/BlogContent';
import SearchBlog from '../../components/blog/SearchBlog';

type typeBlogDataArray = {
  slug: string;
  title: string;
  description: string;
  date: string;
  imgpath: string;
  tag: string[];
};

type BlogPageProps = {
  blogStringData: string;
  title: string;
  description: string;
  allStringData: string[];
};

const BlogPage: FC<BlogPageProps> = (props) => {
  const matteredData = matter(props.blogStringData).data;
  const title = matteredData.title;
  const description = matteredData.description;
  const isPCScreen = useMediaQuery({ query: '(min-width: 1100px)' });
  const metaData = props.allStringData
    .map((el) => matter(el))
    .map((data) => ({
      slug: data.data.slug,
      title: data.data.title,
      description: data.data.description,
      date: data.data.date,
      type: data.data.type,
      tag: data.data.tag,
      imgpath: data.data.imgpath,
    }));

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content="@tyamatyatya" />
        <meta
          property="og:url"
          content={`https://nosuke-blog.site/blog/${matteredData.slug}`}
        />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={matteredData.imgpath} />
      </Head>

      <MyLayout>
        <div className="container">
          <div className={isPCScreen ? 'content' : 'content-mob'}>
            <div className="ninja">
              <NinjaAd
                width={700}
                height={90}
                id="5e823f019e8a4622326ff899607b271f"
                type="switch"
                classAdName="admax-switch"
              />
            </div>
            <br />
            <BlogContent blogStringData={props.blogStringData} />
            <br />
            <br />
            <div className="banner-ad">
              <a
                href="https://px.a8.net/svt/ejp?a8mat=3HA5YE+12P73M+50+2I3IZ5"
                rel="nofollow"
              >
                <img
                  width="90%"
                  alt=""
                  src="https://www21.a8.net/svt/bgt?aid=210426278065&wid=001&eno=01&mid=s00000000018015133000&mc=1"
                />
              </a>
              <img
                width="1"
                height="1"
                src="https://www13.a8.net/0.gif?a8mat=3HA5YE+12P73M+50+2I3IZ5"
                alt=""
              />
            </div>
          </div>
          {isPCScreen && (
            <div className="others">
              <Paper elevation={10} style={{ padding: '1rem' }}>
                <SearchBlog isTagDisplayed={false} blogMetaData={metaData} />
              </Paper>
              <br />
              <br />
              <ProfileCard />
              <br />
              <br />
              <BlogIndex blogStringData={props.blogStringData} />
              <br />
              <br />
            </div>
          )}
        </div>
        <NinjaAd
          id="6f5bc9be8374105339be181245668f6f"
          type="overlay"
          classAdName="admax-ads"
        />
      </MyLayout>
      <style jsx>{`
        .ninja {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .top_ad {
          width: 100%;
          background-color: #ffffff;
          border-top: rgb(153, 153, 153) 1px solid;
          border-bottom: rgb(153, 153, 153) 1.5px solid;
          border-radius: 2px;
          box-shadow: 0px 3px 3px -2px rgb(0 0 0 / 20%),
            0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%);
        }
        .top_ad div a {
          display: inline-block;
          width: 100%;
        }
        .banner-ad {
          width: 700px;
          margin: 0 auto;
        }
        .banner-ad a {
          width: 100%;
        }
        .banner-ad a img {
          width: 97%;
        }
        @media screen and (max-width: 700px) {
          .banner-ad {
            width: 100%;
          }
          .banner-ad a img {
            width: 100%;
          }
        }
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
  );
};

export async function getStaticPaths() {
  const files = fs.readdirSync(process.cwd() + '/docs', 'utf8');
  const blogs = files.filter((fn) => fn.endsWith('.md'));
  const blogStringDataArr = blogs.map((blog) => {
    const path = `${process.cwd()}/docs/${blog}`;
    const data = fs.readFileSync(path, {
      encoding: 'utf-8',
    });
    return data;
  });
  const matteredData = blogStringDataArr.map((blog) => matter(blog));
  const blogDataArray = matteredData.map((el) => el.data);
  const paths = blogDataArray.map((path: typeBlogDataArray) => ({
    params: { slug: path.slug },
  }));

  return { paths, fallback: false };
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const file = fs.readFileSync(
    `${process.cwd()}/docs/${params.slug}.md`,
    'utf8',
  );
  const siteData = await import(`../../../config.json`);
  const allFiles = fs.readdirSync(process.cwd() + '/docs', 'utf8');
  const blogs = allFiles.filter((fn) => fn.endsWith('.md'));
  const blogStringDataArr = blogs.map((blog) => {
    const path = `${process.cwd()}/docs/${blog}`;
    const data = fs.readFileSync(path, {
      encoding: 'utf-8',
    });
    return data;
  });

  return {
    props: {
      blogStringData: file,
      title: siteData.default.title,
      description: siteData.default.description,
      allStringData: blogStringDataArr,
    },
  };
};
export default BlogPage;
