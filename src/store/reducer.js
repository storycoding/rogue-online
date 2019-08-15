const reducer = (state, action) => {
  switch(action.type) {
    // when new data comes from socket
    case 'UPDATE_GAME_STATE' :
      return { ...action.payload.gameState }
    default:
      return state;
    }
}

export default reducer;
