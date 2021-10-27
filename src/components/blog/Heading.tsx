import React, { FC, Fragment } from 'react';
type typeNode = {
  children: {
    type: string;
    value: string;
    position: any;
  }[];
  depth: number;
  position: any;
  type: string;
};
type Props = {
  level: number;
  node: typeNode;
  children: any;
};

const Heading: FC<Props> = (props) => {
  const level = props.level;
  const textValue = props.node.children[0].value;

  return (
    <Fragment>
      {level === 1 && <h1 id={textValue}>&nbsp;{textValue}</h1>}
      {level === 2 && <h2 id={textValue}>{textValue}</h2>}
      <style jsx>{`
        h1 {
          border-left: 5px solid #008ada;
        }
        h2 {
          border-bottom: 1px solid #008ada;
        }
      `}</style>
    </Fragment>
  );
};

export default Heading;
