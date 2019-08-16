const subscribeToSocketIo = (client, dispatch) => {
  client.on('connect', () => {
    console.log(`connected to the server websocket as ${client.id}`);
    
    client.emit("request-game-state");
  });

  client.on("game-state", (gameState) => {
    dispatch({
      type: "UPDATE_GAME_STATE",
      payload: gameState,
    });
  });

  client.on('disconnect', () => {
  console.log("disconnected from the server websocket");
  });

  return client;
}

export default subscribeToSocketIo;
