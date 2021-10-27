import React, { FC } from 'react';
import Head from 'next/head';
import MyLayout from '../components/MyLayout';
import Paper from '@material-ui/core/Paper';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SiteDetailInfoes: FC = () => {
  const skills = [
    'Next.js',
    'React.js',
    'TypeScript',
    'Material UI',
    'gray-matter',
    'react-markdown',
    'react-syntax-highlighter',
    'Vercel',
  ];

  const SiteDetail = (
    <ul className={'skills'}>
      <li style={{ fontWeight: 'bold' }}>使用技術・ライブラリ：</li>
      {skills.map((skill, index) => (
        <li key={index} className={`${'skill'} ${'fade'}`}>
          {skill}
          <p className={'line'}></p>
        </li>
      ))}
      <style jsx>{`
        li {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .skills {
          list-style: none;
          display: flex;
          flex-direction: row;
          padding: 0;
          margin: 0 auto;
          width: fit-content;
        }
        .skill {
          padding: 0;
          margin: 0 10px;
          opacity: 1;
          width: fit-content;
        }
        @media screen and (max-width: 1100px) {
          .skills {
            flex-direction: column;
          }
          .skill {
            margin: 0 auto;
          }
        }

        .fade {
          position: relative;
          animation: fadeIn 1s ease 0s 1 normal;
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translate(0, 30px);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0);
          }
        }

        .line {
          position: absolute;
          margin: 0;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background-color: #000000;
          animation: setLine 1s ease 1s 1 normal forwards;
        }

        @keyframes setLine {
          0% {
            width: 0;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </ul>
  );

  const imgs = [
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Fnextjs-3.svg?alt=media&token=2caf9210-05c4-46e3-87c3-c369ab5c0db0',
      title: 'Next.js',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Freact-2.svg?alt=media&token=deb078bd-642f-4f12-b2b1-12bc29572368',
      title: 'React.js',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Ftypescript.svg?alt=media&token=104cbf13-b1e3-413b-a557-e74e94620d2e',
      title: 'TypeScript',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Fmaterial-ui-1.svg?alt=media&token=f7f97eee-5c83-4744-aa6f-06ad1c7c948e',
      title: 'Material-UI',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Ficonfinder_markdown_298823.png?alt=media&token=14cc8363-dd94-4dc4-885a-a90595e24f9a',
      title: 'Markdown',
    },
    {
      src: 'https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Fvercel.svg?alt=media&token=2f7f105f-14c5-45ce-a38c-c57b9e7f25a8',
      title: 'Vercel',
    },
  ];
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <MyLayout>
      <Head>
        <title>About This Site</title>
        <meta name="description" content="NOSUKE BLOGについて" />
      </Head>
      <Paper elevation={10}>
        <h1 className={'title'}>About This Site</h1>
        <div className="text">
          <p>SSG（静的サイト生成）をNext.jsで実現してます。</p>
          <p>当ブログは、WEBやプログラミングについて学んだことの備忘録です。</p>
          <p>また、それ以外にも日常的なことや趣味についても書いてます。</p>
        </div>
        {SiteDetail}
        <br />
        <br />
        <Slider {...settings} className="slick">
          {imgs.map((img, index) => (
            <div key={index} className="slickimg">
              <img src={img.src} height="150px" />
              <p>{img.title}</p>
            </div>
          ))}
        </Slider>
        {/* <ImgSlider settings={settings} imgs={imgs} /> */}
        <br />
        <br />
      </Paper>
      <style jsx>{`
        .title {
          font-size: 40px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 50px 0;
        }
        .text {
          margin: 0 auto;
          width: fit-content;
        }
        .slick {
          width: fit-content;
          margin: 0 auto;
        }
        .slickimg {
          margin: 0 auto;
          width: fit-content;
          display: flex;
        }
        .slickimg img {
          display: block;
          margin: 0 auto;
        }
        .slickimg p {
          width: fit-content;
          margin: 0 auto;
        }
      `}</style>
    </MyLayout>
  );
};

export default SiteDetailInfoes;
