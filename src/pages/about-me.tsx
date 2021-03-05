import { FC, useState } from "react"
import MyLayout from '../components/MyLayout'
import Head from 'next/head'
import Paper from "@material-ui/core/Paper"

const About: FC<{}> = () => {
  
  const items = [
    {title: 'WEB開発技術との出会い', text: '所属する研究室のホームページを編集する機会があり、そこで初めてHTMLを触りました。また、緊急事態宣言で外出できない期間は時間がたくさんあったので、HTML，CSSを勉強し始めました。2020年6月にReactを勉強し始めたので、技術力はまだまだですが、楽しくインプット・アウトプットしています。'},
    {title: '名前', text: '飯野 信之介(Shinnosuke Iino)：某国民的アニメ「クレヨン◯◯ちゃん」のように元気に過ごしてほしいというのが、名前の由来です'},
    {title: '出身', text: '栃木県生まれ、栃木県育ち、小中学校の周りは田んぼだらけでした'},
    {title: '年齢', text: '23歳：大学院、修士1年生'},
    {title: '言語・技術', text: 'React.js,  TypeScript,  Next.js, PHP(Laravel, Lumen), 勉強し始め -> Scala, Kotlin, Go'},
  ];

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
      </Paper>

      <style jsx>{`
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
      `}</style>
    </MyLayout>   
  )
}
export default About