const subscribeToSocketIo = (client, app) => {
  client.on('connect', () => {
    console.log(`connected to the server websocket as ${client.id}`);

    const newState = {
      player : {
        ...app.state.player,
        id: client.id,
      }
    };

    app.setState(newState);
    client.emit("request-game-state");
  });

  client.on("game-state", (data) => {
  app.setState(data);
  });

  client.on('disconnect', () => {
  console.log("disconnected from the server websocket");
  });
}

export default subscribeToSocketIo;
