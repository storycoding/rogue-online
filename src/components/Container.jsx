import React from "react";

import { useStateValue } from './Store.jsx';
console.log({useStateValue});
// Components
import Blocks from "./Blocks.jsx";
import Players from "./Players.jsx";

const Container = () => {
  const [{grid}, dispatch] = useStateValue();
  console.log({grid});

  React.useEffect( () => {
    document.addEventListener("keydown", keyPress);
    document.addEventListener("click", handleClick);

    // for unsubscribing
    return () => {
      document.removeEventListener("keydown", keyPress);
      document.removeEventListener("click", handleClick);
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
    <div id="container" style={containerStyle} tabIndex="0">
      <Players/>
      <Blocks grid={grid}/>
    </div>
  );
};

export default Container;

// EVENTS
import inputKeys from "../static/input-keys";

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
