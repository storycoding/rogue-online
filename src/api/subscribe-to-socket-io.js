const subscribeToSocketIo = (client, initialState, dispatch) => {  // dispatch must come from store
  client.on('connect', () => {
    console.log(`connected to the server websocket as ${client.id}`);

    const newState = {
      initialState,
      player : {
        ...initialState.player,
        id: client.id,
      }
    };

    dispatch(newState);
    client.emit("request-game-state");
  });

  client.on("game-state", (data) => {
    const newState = {
      ...initialState,
      data,
    };

    dispatch(newState);
  });

  client.on('disconnect', () => {
  console.log("disconnected from the server websocket");
  });
}

export default subscribeToSocketIo;
