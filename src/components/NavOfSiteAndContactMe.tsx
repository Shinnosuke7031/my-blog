import React, { FC, Fragment } from 'react';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import WebAssetIcon from '@material-ui/icons/WebAsset';
import Link from 'next/link';
import { useMediaQuery } from 'react-responsive';

const NavOfSiteAndContactMe: FC = () => {
  const isMobileScreen = useMediaQuery({ query: '(max-width: 700px)' });
  return (
    <Fragment>
      <div className={isMobileScreen ? 'navbar-mob' : 'navbar'}>
        <div>
          <Link href="/about-me">
            <a className="nav-el">
              <AccountBoxIcon style={{ color: 'grey' }} fontSize="large" />{' '}
              <p style={{ color: 'grey' }}>About Me</p>{' '}
            </a>
          </Link>
        </div>
        <div>
          <Link href="/about-site">
            <a className="nav-el">
              <WebAssetIcon style={{ color: 'grey' }} fontSize="large" />{' '}
              <p style={{ color: 'grey' }}>About Site</p>{' '}
            </a>
          </Link>
        </div>
        <div>
          <Link href="/contact">
            <a className="nav-el">
              <MailOutlineIcon style={{ color: 'grey' }} fontSize="large" />{' '}
              <p style={{ color: 'grey' }}>Contact</p>{' '}
            </a>
          </Link>
        </div>
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
  );
};

export default NavOfSiteAndContactMe;
