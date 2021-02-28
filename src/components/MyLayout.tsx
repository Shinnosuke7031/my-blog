import {FC, ReactNode} from 'react'
import Footer from './Footer'
import Header from './Header'

const MyLayout: FC<ReactNode> = (props) => (
  <div className="container">
    <Header />
    <div className="main">
      <div className="box">
        {props.children}
      </div>
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
        background-color: #EEEEEE;
      }
      .box {
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
)

export default MyLayout