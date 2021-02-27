import React from "react";
import { FC } from "react";

type Props = {
  src: string
  alt: string
  title: string
}

const MarkdownImg: FC<Props> = (props) => (
  <React.Fragment>
    <br/>
    <img src={props.src} alt={props.alt} title={props.title} width='70%' />
    <br />
  </React.Fragment>
)

export default MarkdownImg