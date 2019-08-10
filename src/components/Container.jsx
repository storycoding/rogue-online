import React from "react";

// Events
import inputKeys from "../static/input-keys";
import mapTouchToKey from "../events/mapTouchToKey";

// Components
import Blocks from "./Blocks.jsx";
import Players from "./Players.jsx";

// Store
import CTX from "../store/CTX";

const Container = (props) => {
  console.log("rendered container");
  console.log("container.props = ", props);

  const { player, players, grid } = props;
  React.useEffect( () => {
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", handleClick);
   
    /* NEEDS STORE DISPATCH TO WORK
    if ( player && player.id && players[player.id] && !player.div ) {
      const div = document.getElementById(player.id);
      console.log({div});
      // dispatch div:div to Store state
      // for now just update the whole gameState, then split actions
    }
    */

    // for unsubscribing
    return () => {
      console.log("component is about to unmount");
    }
  });
  
  if(!grid) {
    console.log("no grid");
    return <div className="loading">Loading...</div>
  }
  const height = grid.length;
  const width = grid[0].length;

  const containerStyle = {     
    height: `${height}00px`,
    width: `${width}00px`,
    gridTemplateRows: `repeat(${height}, ${100/height}%)`,
    gridTemplateColumns: `repeat(${width}, ${100/width}%)`,
  };

  return (
    <CTX.Consumer>
      {
        value => (
          <div id="container" style={containerStyle} tabIndex="0">
            <Players players={value.players}/>
            <Blocks grid={value.grid}/>
          </div>
        )
      }
    </CTX.Consumer>
  );
};

export default Container;



// events
const keyPress = ({key}) => {
  console.log({key});
  if (inputKeys.includes(key)) {
    // dispatch action to make websocket request
      // client.emit("key-input", key);
  }
}


const handleClick = (clickEvent) => {
  console.log({clickEvent});
  /* needs playerDiv ( from store ) to work
  const key = mapTouchToKey(clickEvent, playerDiv);
  return key ? keyPress({key}) : null;
  */
}
