import GitHubIcon from '@material-ui/icons/GitHub'
import TwitterIcon from '@material-ui/icons/Twitter'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import React, { FC } from 'react'
import MyLayout from '../components/MyLayout'
import Head from 'next/head'

const ContactInfoes: FC<{}> = () => {

  return (
    <MyLayout>
      <Head>
        <title>Contact</title>
        <meta name="description" content="連絡先" />
      </Head>
      <h1 className={'title'}>Contact</h1>
      <div className={'contact'}>

        <div className={'mail'}>
          <MailOutlineIcon style={{color: "grey"}} fontSize='large' />
          <a className={`${'show_line_from_left'} ${'change_color_from_left'}`} href="mailto:8120505@ed.tus.ac.jp">8120505@ed.tus.ac.jp</a>
        </div>
        <hr/>
        <div>
          <a href="https://github.com/Shinnosuke7031"><GitHubIcon style={{color: "#000000"}} fontSize='large' /> </a>
          <a href="https://twitter.com/web7031boushi"><TwitterIcon fontSize='large' /> </a>
        </div>
      </div>
      <style jsx>{`
        .title {
          font-size: 40px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 50px 0;
        }
        .contact {
          width: 500px;
          margin: 0 auto;
          text-align: center;
          border: 1px solid black;
          padding: 20px 30px;
          border-radius: 5px;
        }

        .contact a {
          text-decoration: none;
          color: black;
          margin-left: 20px;
          cursor: pointer;
        }

        .mail {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .show_line_from_left {
          position: relative;
          transition: 0.5s;
        }
        .show_line_from_left::after {
          position: absolute;
          bottom: 0;
          left: 0;
          content: '';
          width: 0;
          height: 1px;
          background-color: #c22ecf;
          transition: 0.5s;
        }
        .show_line_from_left:hover::after {
          width: 100%;
        }

        .change_color_from_left {
          transition: 0.5s;
        }
        .change_color_from_left:hover {
          color: #c22ecf9f;
          transition: 0.5s;
        }

        .contact_icon {
          color: black;
          transform: scale(1.0, 1.0);
          transition: 0.4s;
        }

        .contact_icon:hover {
          color: #c22ecf9f;
          transform: scale(1.2, 1.2);
          transition: 0.4s;
        }
      `}</style>
    </MyLayout>
  );
}

export default ContactInfoes