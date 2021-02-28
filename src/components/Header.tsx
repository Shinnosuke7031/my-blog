import { FC } from 'react'
import Link from 'next/link'

const Header: FC = () => {

  return (
    <div>
      <Link href="/">
        <h1>NOSUKE BLOG</h1>
      </Link>
      
      <style jsx>{`
        div {
          width: 100vw;
          height: 5rem;
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: #aaaaaa;
        }
        h1 {
          cursor: pointer;
          transform: scale(1.0, 1.0);
          transition: 0.3s;
        }
        h1:hover {
          transform: scale(1.1, 1.1);
          transition: 0.3s;
        }
      `}</style>
    </div>   
  );
}

export default Header