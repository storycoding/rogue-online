const checkDirection = (keyCode) => {
  let direction;

  switch(keyCode) {
    case 38:
      direction = "up";
      break;
    case 40:
      direction = "down";
      break;
    case 37:
      direction = "left";
      break;
    case 39:
      direction = "right";
      break;
  }

  return direction;
}

export default checkDirection;
