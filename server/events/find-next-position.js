const findNextPosition = (direction, heroPosition) => {
  let newPosition = {...heroPosition};

  switch(direction) {
    case "up":
      newPosition.r --;
      break;
    case "down":
        newPosition.r ++;
      break;
    case "left":
        newPosition.c --;
      break;
    case "right":
        newPosition.c ++;
      break;
    }
    return newPosition;
}

module.exports = findNextPosition;
