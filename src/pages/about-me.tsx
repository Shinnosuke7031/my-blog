import { FC, useState } from "react"
import MyLayout from '../components/MyLayout'
import Head from 'next/head'
import Paper from "@material-ui/core/Paper"

import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

const About: FC<{}> = () => {
  
  const items = [
    {title: 'WEB開発技術との出会い', text: '所属する研究室のホームページを編集する機会があり、そこで初めてHTMLを触りました。また、緊急事態宣言で外出できない期間は時間がたくさんあったので、HTML，CSSを勉強し始めました。2020年6月にReactを勉強し始めたので、技術力はまだまだですが、楽しくインプット・アウトプットしています。'},
    {title: '名前', text: '飯野 信之介(Shinnosuke Iino)：某国民的アニメ「クレヨン◯◯ちゃん」のように元気に過ごしてほしいというのが、名前の由来です'},
    {title: '出身', text: '栃木県生まれ、栃木県育ち、小中学校の周りは田んぼだらけでした'},
    {title: '年齢', text: '23歳：大学院、修士1年生'},
    {title: '言語・技術', text: 'JavaScript(React.js,  TypeScript,  Next.js), PHP(Laravel, Lumen, Smarty), MySQL, Docker'},
  ];

  const imgs = [
    {
      src: "https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Freact-2.svg?alt=media&token=deb078bd-642f-4f12-b2b1-12bc29572368",
      title: "React.js"
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Ftypescript.svg?alt=media&token=104cbf13-b1e3-413b-a557-e74e94620d2e",
      title: "TypeScript"
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Fnextjs-3.svg?alt=media&token=2caf9210-05c4-46e3-87c3-c369ab5c0db0",
      title: "Next.js"
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Flaravel-1.svg?alt=media&token=6bb4ee20-dfac-4ae7-8cf9-baacd9f6ea16",
      title: "Laravel"
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Flumen-1.svg?alt=media&token=56de4179-7bea-4945-8520-e59ca11bde72",
      title: "Lumen"
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Fmysql-5.svg?alt=media&token=8b135731-8b9e-4dbf-ad22-5d687638d0d9",
      title: "MySQL"
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fblog-icon%2Fdocker.svg?alt=media&token=889bea17-f03b-40a8-9565-b30981949c7d",
      title: "Docker"
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
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const [detail, setDetail] = useState({ title: items[0].title, text: items[0].text });

  const handleOnMouseEnter = (title: string, text: string): void => {
    setDetail({ title: title, text: text });
  }

  const detail_info = (
    <div>
      <h1 style={{textAlign: 'center'}}> {detail.title} </h1>
      <p style={{padding: '10px'}}> {detail.text} </p>
    </div>
  )
  
  return(
    <MyLayout>
      <Head>
        <title>About Me</title>
        <meta name="description" content="NOSUKE BLOGを運営してる私について" />
      </Head>
      <Paper elevation={10}>
        <h1 className='title'>私について</h1>
        <br />
        <div className="slick_container">
          {/* <ImgSlider settings={settings} imgs={imgs} /> */}
          <Slider {...settings} className="slick">
            {imgs.map((img, index) =>
              <div key={index} className='slickimg'>
                <img src={img.src} height="150px" />
                {/* <p>{img.title}</p> */}
              </div>
            )}
          </Slider>
        </div>
        <br />
        <br />
        
        <ul className='profiles'>
          {items.map((temp, index) => (
            index!==0 ?
            <li key={index} className='profiles_content' onMouseEnter={()=>handleOnMouseEnter(temp.title, temp.text)}>
              <p>{temp.title}</p>
            </li> : 
            <li key={index} className='profiles_content_last' onMouseEnter={()=>handleOnMouseEnter(temp.title, temp.text)}>
              <p>{temp.title}</p>
            </li>
          ))
        }
        </ul>

        <hr></hr>
        {detail_info}
        <br />
        <br />
        <br />

      </Paper>

      <style jsx>{`
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
        .title {
          width: fit-content;
          margin: 0 auto;
        }
        .profiles {
          list-style: none;
          margin: 0 auto;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          width: 500px;
        }
        .profiles_content {
          font-weight: bold;
          margin: 5px;
          width: 200px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid black;
          border-radius: 5px;
          transition: 0.5s;
        }
        .profiles_content_last {
          font-weight: bold;
          margin: 5px;
          width: 410px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1px solid black;
          border-radius: 5px;
          transition: 0.5s;
        }
        .profiles li:hover {
          transition: 0.5s;
          background-color: #82c4d8;
        }
        @media screen and (max-width: 520px) {
          .profiles {
            width: 200px;
          }
        }
      `}</style>
    </MyLayout>   
  )
}
export default About