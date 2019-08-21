const reducer = (state, action) => {
  switch(action.type) {
    case 'REQUEST_GAME_STATE' :
      state.client.emit("request-game-state");
      return state;

    case 'REQUEST_GAME_GRID' :
      state.client.emit("request-game-grid");
      return state;
    
    case 'REQUEST_GAME_PLAYERS' :
      state.client.emit("request-game-players");
      return state;
    
    case 'REQUEST_GAME_CURRENT_PLAYER' :
      state.client.emit("request-game-current-player");
      return state;

    case 'REQUEST_MOVEMENT_TO_DIRECTION' :
      state.client.emit("request-movement-to-direction", action.payload);
      return state;

    case 'UPDATE_GAME_GRID' :
      return { ...state, grid: action.payload};

    case 'UPDATE_GAME_PLAYERS' :
      return { ...state, players: action.payload};
    
    case 'UPDATE_GAME_CURRENT_PLAYER' :
      return { ...state, player: action.payload};
    
    case 'UPDATE_GAME_STATE' :
      return { ...state, ...action.payload};

    default:
      return state;
    }
}

export default reducer;
