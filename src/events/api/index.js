const postDirection = async (direction) => {
  if(!direction) {
    throw new Error("postDirection: invalid direction, verify checkDirection");
  }

  // implement /api prefix
  const endpoint = "/move";
  const queryString = `?direction=${direction}`;
  const url = endpoint + queryString;

  const res = await fetch(url, {
    method: 'POST',
    headers:{
      'Content-Type': 'application/json'
    }
  })
  const response = await res.json();
};

const getGameState = async () => {
  const url = "/game";
  const res = await fetch(url);
  const newState = await res.json();
  return newState;
}

module.exports = {
  postDirection,
  getGameState,
}