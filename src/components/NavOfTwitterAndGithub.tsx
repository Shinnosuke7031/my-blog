import { FC, Fragment } from "react"
import GitHubIcon from '@material-ui/icons/GitHub'
import TwitterIcon from '@material-ui/icons/Twitter'
import { useMediaQuery } from "react-responsive"
import MenuBookIcon from '@material-ui/icons/MenuBook'
import Link from 'next/link'

const NavOfTwitterAndGithub: FC<{}> = () => {
  const isMobileScreen = useMediaQuery({ query: '(max-width: 700px)'})
  return (
    <Fragment>
      <div className={isMobileScreen ? 'navbar-mob' : 'navbar'}>
        <div><Link href='/articles'><a className='nav-el'><MenuBookIcon style={{color: "grey"}} fontSize='large' /> <p style={{color: "grey"}}>Articles</p></a></Link></div>
        <div><a className='nav-el' href="https://github.com/Shinnosuke7031" target="_blank" rel="noopener noreferrer"><GitHubIcon style={{color: "#000000"}} fontSize='large' /> <p style={{color: "#000000"}}>GitHub</p> </a></div>
        <div><a className='nav-el' href="https://twitter.com/web7031boushi" target="_blank" rel="noopener noreferrer"><TwitterIcon fontSize='large' /> <p>Twitter</p> </a></div>
      </div>
      <br />
      <style jsx>{`
        .navbar {
          display: flex;
          justify-content: space-around;
          font-size: 1rem;
          margin: 0 auto;
          width: 600px;
        }
        .navbar div {
          display: block;
          box-shadow: 1px 2px 0 0 #727272;
          background-color: #ffffff;
          border-radius: 0.4rem;
          width: 5rem;
        }
        .navbar-mob {
          display: flex;
          justify-content: space-around;
          font-size: 1rem;
          margin: 0 auto;
          width: 100%;
        }
        .navbar-mob div {
          display: block;
          box-shadow: 1px 2px 0 0 #727272;
          background-color: #ffffff;
          border-radius: 0.4rem;
          width: 5rem;
        }
        .navbar div:hover {
          background-color: #e6e6e6;
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
    </Fragment>
  )
}

export default NavOfTwitterAndGithub