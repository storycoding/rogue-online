const reducer = (state, action) => {
  switch(action.type) {
    case 'REQUEST_GAME_STATE' :
      state.client.emit("request-game-state");
      return state;

    case 'REQUEST_MOVEMENT_TO_DIRECTION' :
      state.client.emit("request-movement-to-direction", action.payload);
      return state;

    case 'UPDATE_GAME_STATE' :
      return { ...state, ...action.payload};

    default:
      return state;
    }
}

export default reducer;
