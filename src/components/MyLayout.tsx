import React, { FC, ReactNode } from 'react';
import Footer from './layout/Footer';
import Header from './layout/Header';
import { useMediaQuery } from 'react-responsive';

const MyLayout: FC<ReactNode> = (props) => {
  const isPCScreen = useMediaQuery({ query: '(min-width: 1100px)' });
  const isTabletScreen = useMediaQuery({
    query: '(min-width: 701px) and (max-width: 1099px)',
  });
  const isMobileScreen = useMediaQuery({ query: '(max-width: 700px)' });
  return (
    <div className="container">
      <Header />
      <div className="main">
        {isPCScreen && <div className="box-pc">{props.children}</div>}
        {isTabletScreen && <div className="box-tab">{props.children}</div>}
        {isMobileScreen && <div className="box-mob">{props.children}</div>}
        {/* <div className={isMobileScreen ? "box-mob" : "box"}>
          {props.children}
        </div> */}
      </div>
      <Footer />

      <style jsx>{`
        .container {
          margin: 0 auto;
          width: 100vw;
        }
        .main {
          display: flex;
          flex-direction: column;
          width: 100vw;
          height: 100%;
          background-color: #d9e9f3;
        }
        .box {
          padding: 10px;
          margin: 20px auto;
          height: 100%;
          width: 700px;
        }
        .box-pc {
          padding: 10px;
          margin: 20px auto;
          height: 100%;
          width: 1100px;
        }
        .box-mob {
          padding: 10px;
          margin: 20px auto;
          height: 100%;
          width: 100%;
        }
        .box-tab {
          padding: 10px;
          margin: 20px auto;
          height: 100%;
          width: 700px;
        }
        .nav {
          position: relative;
          width: 100%;
          margin: 0 auto;
          text-align: left;
          line-height: 1.22;
          border-top: 1px solid black;
          border-bottom: 1px solid black;
          padding: 10px 0 10px 0;
        }
      `}</style>
    </div>
  );
};

export default MyLayout;
