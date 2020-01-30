import React from "react";

// Components
import { useStateValue } from './Store.jsx';
import Blocks from "./Blocks.jsx";
import Players from "./Players.jsx";
import LoadingScreen from "./LoadingScreen.jsx";

// events
import inputKeys from "../static/input-keys";
import { styleContainer, mapTouchToKey } from "../events";

// socket connection
import subscribeToSocketIo from "../api/subscribe-to-socket-io.js";

const Container = React.memo( () => {
  const [state, dispatch] = useStateValue();
  const { grid } = state;
  
  const keyPress = ({key}) => {
    if (inputKeys.includes(key)) {
      dispatch({type: "REQUEST_MOVEMENT_TO_DIRECTION", payload: key});
    }
  }

  const handleClick = (clickEvent) => {
    const playerId = dispatch(
      {
        type: "REQUEST_TOUCH_MOVEMENT_TO_DIRECTION",
        payload: clickEvent,
      }
    );
  }

  React.useEffect( () => {
    subscribeToSocketIo(state.client, dispatch);
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("keydown", keyPress);
      document.removeEventListener("click", handleClick);
    }
  }, []);
  
  if(!grid) {
    setTimeout(() =>  {
      dispatch({type: "REQUEST_GAME_STATE"});
    }, 1000);
    return <LoadingScreen/>
  }

  return (
    <div id="container" style={styleContainer(grid)} tabIndex="0">
      <Players/>
      <Blocks grid={grid}/>
    </div>
  );
});

export default Container;
