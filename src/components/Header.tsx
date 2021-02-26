import { FC } from 'react'
import Link from 'next/link'

const Header: FC = () => {

  return (
    <div>
      <Link href="/">
        <h1>Nosuke Blog</h1>
      </Link>
      
      <style jsx>{`
        div {
          width: 100vw;
          height: 80px;
          padding: 0;
          margin: 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
    </div>   
  );
}

export default Header