import { FC } from "react"
import Link from 'next/link'
import { useMediaQuery } from "react-responsive"

const Footer: FC = () => {
  const isMobileVerticallyScreen = useMediaQuery({ query: '(max-width: 508px)'})
  return (
    <footer>
      {!isMobileVerticallyScreen ? <div className='links'>
        <p> <Link href='/'><a>ホーム</a></Link></p>
        <p className='separation'>|</p>
        <p> <Link href='/about-me'><a>運営者</a></Link></p>
        <p className='separation'>|</p>
        <p><Link href='/contact'><a>お問い合わせ</a></Link></p>
        <p className='separation'>|</p>
        <p><a href='https://nosuke-blog.site/sitemap.xml'>サイトマップ</a></p>
        <p className='separation'>|</p>
        <p><Link href='/policy'><a>プライバシーポリシー</a></Link></p>
      </div> :
      <div className='links mob'>
        <p> <Link href='/'><a>ホーム</a></Link></p>
        <p> <Link href='/'><a>運営者</a></Link></p>
        <p><Link href='/'><a>お問い合わせ</a></Link></p>
        <p>サイトマップ</p>
        <p>プライバシーポリシー</p>
      </div>
      }
      <div>
        <p className='c-mark'>©︎ NOSUKE BLOG</p>
      </div>
      <style jsx>{`
        footer {
          height: fit-content;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          width: 100vw;
          background-color: #ffffff;
        }
        .links {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
        .links p {
          text-align: center;
        }
        .separation {
          margin: 1rem 1rem;
        }
        .c-mark {
          height: fit-content;
          margin: 0;
        }
        a {
          text-decoration: none;
          color: #000000;
        }
        .mob {
          flex-direction: column;
          height: fit-content;
        }
      `}</style>
    </footer>
  )
}

export default Footer