import { Paper } from "@material-ui/core"
import { FC } from "react"
import MyLayout from "../components/MyLayout"
import Link from 'next/link'

const links = [
  {name: 'トップページ', path: '/'},
  {name: '記事一覧', path: '/articles'},
  {name: 'プロフィール', path: '/about-me'},
  {name: 'このサイトについて', path: '/about-site'},
  {name: 'お問い合わせ', path: '/contact'},
  {name: 'プライバシーポリシー', path: '/policy'},
]

const SiteMap: FC<{}> = () => {
  return (
    <MyLayout>
      <Paper elevation={10}>
        <br/>
        <br/>
        <ul>
          {links.map(link => 
            <li key={link.path}>
              <Link href={link.path}>
                <a>{link.name}</a>
              </Link>
              <br/>
              <br/>
            </li>  
          )}
        </ul>
      </Paper>
      <style jsx>{`
        ul {
          width: fit-content;
          margin: 0 auto;
        }
        li {
          font-size: 1.5rem;
        }
      `}</style>
    </MyLayout>
  )
}

export default SiteMap