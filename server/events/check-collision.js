const checkCollision = (unit, grid) => {
  if( !grid[unit.r] || !grid[unit.r][unit.c] ) {
    return true;
  } else if(grid[unit.r][unit.c] !== "f" ) {
    return true;
  }
  return false;
}

module.exports = checkCollision;
