import { FC } from "react"
import MyLayout from '../components/MyLayout'
import Head from 'next/head'

const SiteDetailInfoes: FC<{}> = () => {

  const skills = ['Next.js', 'React.js', 'TypeScript', 'Material UI', 'gray-matter', 'react-markdown', 'react-syntax-highlighter'];

  const SiteDetail =  <ul className={'skills'}>
                        <li style={{fontWeight: 'bold'}}>使用言語・ライブラリ：</li>
                        {skills.map((skill, index) => <li key={index} className={`${'skill'} ${'fade'}`}>
                          {skill}
                          <p className={'line'}></p>
                        </li>
                        )}
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
                          }

                          .skill {
                            padding: 0;
                            margin: 0 10px;
                            opacity: 1;
                          }

                          .fade {
                            position: relative;
                            animation: fadeIn 1s ease 0s 1 normal; 
                          }

                          @keyframes fadeIn {
                            0% {
                              opacity: 0; transform: translate(0, 30px);
                            }
                            100% {
                              opacity: 1; transform: translate(0, 0);
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

  return (
    <MyLayout>
      <Head>
        <title>About Site</title>
        <meta name="description" content="NOSUKE BLOGについて" />
      </Head>
      <h1 className={'title'}>About Site</h1>
      <p>SSG（静的サイト生成）をNext.jsで実現してます。</p>
      {SiteDetail}
      <style jsx>{`
        .title {
          font-size: 40px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 50px 0;
        }
      `}</style>
    </MyLayout>
  )
}

export default SiteDetailInfoes