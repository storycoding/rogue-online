import React from "react";

const Blocks = (props) => {
  return props.grid.map( (row, rIndex) => {
    return row.map( (cell, cIndex) => (
      <Block
        key={`tile_${rIndex}.${cIndex}`}
        tile={cell}
        rIndex={rIndex}
        cIndex={cIndex}
      />
    )
    );
  })
}

const Block = (props) => {
  const classNames = `item ${props.tile}`
  return <div className={classNames}></div>
}

export default Blocks;
