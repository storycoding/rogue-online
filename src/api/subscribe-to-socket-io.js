const subscribeToSocketIo = (client, dispatch) => {
  client.on('connect', () => {
    console.log(`connected to the server websocket as ${client.id}`);
    
    client.emit("request-game-state");
  });

  client.on("game-grid", payload => {
    dispatch({
      type: "UPDATE_GAME_GRID",
      payload,
    });
  });

  client.on("game-players", payload => {
    dispatch({
      type: "UPDATE_GAME_PLAYERS",
      payload,
    });
  });

  client.on("game-current-player", payload => {
    dispatch({
      type: "UPDATE_GAME_CURRENT_PLAYER",
      payload,
    });
  });

  client.on("game-state", payload => {
    dispatch({
      type: "UPDATE_GAME_STATE",
      payload,
    });
  });

  client.on('disconnect', () => {
  console.log("disconnected from the server websocket");
  });

  return client;
}

export default subscribeToSocketIo;
