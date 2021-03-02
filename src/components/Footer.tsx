import { FC } from "react";
import GitHubIcon from '@material-ui/icons/GitHub'
import TwitterIcon from '@material-ui/icons/Twitter'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import AccountBoxIcon from '@material-ui/icons/AccountBox'
import WebAssetIcon from '@material-ui/icons/WebAsset'
import Link from 'next/link'

const Footer: FC = () => {

  return (
    <footer>
      <div><a className='nav-el' href="https://github.com/Shinnosuke7031"><GitHubIcon style={{color: "#000000"}} fontSize='large' /> <p style={{color: "#000000"}}>GitHub</p> </a></div>
      <div><a className='nav-el' href="https://twitter.com/web7031boushi"><TwitterIcon fontSize='large' /> <p>Twitter</p> </a></div>
      <div><Link href='/about-me'><a className='nav-el'><AccountBoxIcon style={{color: "grey"}} fontSize='large' /> <p style={{color: "grey"}}>About Me</p>  </a></Link></div>
      <div><Link href='/about-site'><a className='nav-el'><WebAssetIcon style={{color: "grey"}} fontSize='large' /> <p style={{color: "grey"}}>About Site</p>  </a></Link></div>
      <div><Link href='/contact'><a className='nav-el'><MailOutlineIcon style={{color: "grey"}} fontSize='large' /> <p style={{color: "grey"}}>Contact</p> </a></Link></div>
      <style jsx>{`
        footer {
          height: 5rem;
          display: flex;
          justify-content: space-around;
          align-items: center;
          width: 100vw;
          background-color: #EEEEEE;
        }
        div {
          display: block;
          box-shadow: 1px 1px 1px 0 #000000;
          background-color: #ffffff;
          border-radius: 0.4rem;
          width: 5rem;
        }
        div:hover {
          box-shadow: 0 0 0 1px #000000;
        }
        .nav-el {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .nav-el p {
          margin: 0;
        }
      `}</style>
    </footer>
  )
}

export default Footer