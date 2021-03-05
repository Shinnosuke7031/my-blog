import { FC } from "react"
import { Paper } from "@material-ui/core"
import GitHubIcon from '@material-ui/icons/GitHub'
import TwitterIcon from '@material-ui/icons/Twitter'

const ProfileCard: FC<{}> = () => {

  return (
    <Paper elevation={10}>
      <div className='container'>
        <div className='flex'>
          <img src='https://firebasestorage.googleapis.com/v0/b/test-f825e.appspot.com/o/images%2Fblog%2Fcats.jpg?alt=media&token=670f6b9f-1de2-41e3-9cd6-aebbc3cf238a' width='50px' />
          <p className='name'>&nbsp;Shinnosuke Iino</p>
        </div>
        <div>
          <p>理系大学院生がWEBについて学んだことをゆるーく書いていきます。</p>
          <div className='flex icons'>
            <div><a className='nav-el' href="https://github.com/Shinnosuke7031"><GitHubIcon style={{color: "#000000"}} fontSize='large' /></a></div>
            <div><a className='nav-el' href="https://twitter.com/web7031boushi"><TwitterIcon fontSize='large' /></a></div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .container {
          padding: 0.5rem;
        }
        img {
          display: block;
        }
        .flex {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        .name {
          font-size: 1.8rem;
          font-weight: bold;
          color: #585858;
        }
        .icons {
          justify-content: center;
        }
        .icons div {
          margin: 0 1rem;
        }
      `}</style>
    </Paper>
  )
}

export default ProfileCard