const styleContainer = (grid) => {
  const height = grid.length;
  const width = grid[0].length;

  const containerStyle = {     
    height: `${height}00px`,
    width: `${width}00px`,
    gridTemplateRows: `repeat(${height}, ${100/height}%)`,
    gridTemplateColumns: `repeat(${width}, ${100/width}%)`,
  };

  return containerStyle;
}

export default styleContainer;
