import React from "react";
import { useStateValue } from "./Store.jsx";

const Players = () => {
  const [{players}, dispatch] = useStateValue();
  console.log({players});

  return Object.keys(players).map( id => {
    const player = players[id];

    const playerStyle = {
      gridColumn: `${player.location.c+1}`,
      gridRow: `${player.location.r+1}`,
    };
  

    return <div id={player.id} className={`sprite ${player.sprite}`} key={id.slice(0,7)} style={playerStyle}></div>
  });
}

export default Players;
