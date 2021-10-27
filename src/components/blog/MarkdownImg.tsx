import React, { Fragment, FC } from 'react';

type Props = {
  src: string;
  alt: string;
  title: string;
};

const MarkdownImg: FC<Props> = (props) => (
  <Fragment>
    <br />
    <img src={props.src} alt={props.alt} title={props.title} width="70%" />
    <br />
  </Fragment>
);

export default MarkdownImg;
