import React, { FC } from 'react';
import { Paper } from '@material-ui/core';
import NinjaAd from '../ad/NinjaAd';

type Props = {
  blogStringData: string;
};

const BlogIndex: FC<Props> = (props) => {
  const heading = props.blogStringData.match(/#+? .+/g);
  const headingData = heading.map((el) => {
    if (el.slice(0, 2) === '# ') {
      return { level: 1, value: el.slice(2) };
    } else if (el.slice(0, 2) === '##') {
      return { level: 2, value: el.slice(3) };
    }
  });
  return (
    <div style={{ position: 'sticky', top: '100px' }}>
      <Paper
        elevation={10}
        style={{
          overflow: 'scroll',
          maxHeight: 'calc(100vh - 5rem - 350px)',
          margin: '0 0 2rem 0',
        }}
      >
        <p className="index-title">Index</p>
        <ul>
          {headingData.map((data, index) =>
            data.level === 1 ? (
              <li key={index} className="level-h1">
                <a href={`#${data.value}`}>{data.value}</a>
              </li>
            ) : (
              <li key={index}>
                <a href={`#${data.value}`}>{data.value}</a>
              </li>
            ),
          )}
        </ul>
        <style jsx>{`
          .index-title {
            font-size: 1.5rem;
            width: fit-content;
            font-weight: bold;
            margin: 0 0 0 1rem;
          }
          li {
            font-size: 1rem;
            list-style-type: none;
            margin: 0 0 1rem 0;
            padding: 0;
          }
          li::before {
            position: relative;
            top: -2px;
            left: -16.05px;
            display: inline-block;
            width: 3px;
            height: 3px;
            content: '';
            border-radius: 100%;
            background: rgb(0, 0, 0);
          }
          .level-h1 {
            font-weight: bold;
          }
          .level-h1::before {
            width: 10px;
            height: 10px;
            left: -20px;
            background: rgb(0, 137, 228);
          }
          .level-h1 a {
            margin: -6px;
          }
        `}</style>
      </Paper>
      <NinjaAd
        id="1645c66c199fbcf4e6baf1fa953865be"
        type="banner"
        classAdName="admax-ads"
      />
    </div>
  );
};

export default BlogIndex;
