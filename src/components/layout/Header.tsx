import { FC, Fragment, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useMediaQuery } from "react-responsive"
import Drawer from '@material-ui/core/Drawer'
import MenuIcon from '@material-ui/icons/Menu'
import HeaderMenu from '../layout/HeaderMenu'

const Header: FC = () => {
  const router = useRouter()
  const pathname = router.pathname
  const isPCScreen = useMediaQuery({ query: '(min-width: 700px)'})
  const isMobileScreen = useMediaQuery({ query: '(max-width: 699px)'})
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent,
  ) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsOpen(open);
  };

  return (
    <div className='container'>
      <div className={isMobileScreen ? 'container2-mob' : 'container2'}>

      {pathname === '/' ? <h1 className='toppage' style={{cursor: 'default'}}>NOSUKE BLOG</h1> :
        <div className='container3'>
          <div className='header-title'> <Link href="/"><h1 className='hoverd-underline'>NOSUKE BLOG</h1></Link> </div>
          {isPCScreen && 
          <div className='links'>
            <Link href="/articles">{pathname === '/articles' || pathname === '/blog/[slug]' ? <p className='hoverd-underline'><span>Articles</span></p> : <p className='hoverd-underline'>Articles</p>}</Link>
            <Link href="/about-me">{pathname === '/about-me' ? <p className='hoverd-underline'><span>Profile</span></p> : <p className='hoverd-underline'>Profile</p>}</Link>
            <Link href="/about-site">{pathname === '/about-site' ? <p className='hoverd-underline'><span>About This Site</span></p> : <p className='hoverd-underline'>About This Site</p>}</Link>
            <Link href="/contact">{pathname === '/contact' ? <p className='hoverd-underline'><span>Contact</span></p> : <p className='hoverd-underline'>Contact</p>}</Link>
          </div>}
          {isMobileScreen && <div>
            <div className='menu-icon'>
              <MenuIcon onClick={toggleDrawer(true)} style={{cursor: 'pointer'}} fontSize='large' />
            </div>
            <Drawer anchor='right' open={isOpen} onClose={toggleDrawer(false)}>
              <HeaderMenu />
            </Drawer>
          </div>
          }
        </div>
      }
      </div>
      
      <style jsx>{`
        .container {
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100vw;
          height: 5rem;
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #ffffff;
          box-shadow: 0 0 8px gray;
        }
        .container2 {
          width: 700px;
        }
        .container2-mob {
          width: 100%;
        }
        h1 {
          cursor: pointer;
        }
        .toppage {
          text-align: center;
          width: 100%;
        }
        .container3 {
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .header-title {
          width: fit-content;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .container3 h1 {
          width: fit-content;
        }
        .links {
          width: fit-content;
          display: flex;
        }
        .links p {
          width: fit-content;
          margin: 0 1rem;
          font-size: 1.2rem;
          cursor: pointer;
        }
        span {
          color: #00aeff;
        }
        .hoverd-underline {
          position: relative;
          display: inline-block;
          text-decoration: none;
        }
        .hoverd-underline::after {
          position: absolute;
          bottom: 2px;
          left: 0;
          content: '';
          width: 100%;
          height: 2px;
          background: #00aeff;
          opacity: 0;
          visibility: hidden;
          transition: .3s;
        }
        .hoverd-underline:hover::after {
          bottom: -4px;
          opacity: 1;
          visibility: visible;
        }
        .menu-icon {
          width: 50%;
          text-align: right;
        }
      `}</style>
    </div>   
  );
}

export default Header