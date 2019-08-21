const findNextPosition = (direction, heroPosition) => {
  let newPosition = {...heroPosition};

  switch(direction) {
    case "ArrowUp":
      newPosition.r --;
      break;
    case "ArrowDown":
        newPosition.r ++;
      break;
    case "ArrowLeft":
        newPosition.c --;
      break;
    case "ArrowRight":
        newPosition.c ++;
      break;
    }
    return newPosition;
}

module.exports = findNextPosition;
