import React from "react";

const Block = (props) => {
  const classNames = `item ${props.tile}`
  return <div className={classNames}></div>
}

export default Block;
