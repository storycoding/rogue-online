import React from "react";
import { useStateValue } from "./Store.jsx";

const Players = React.memo( () => {
  const [ {players, player} ] = useStateValue();

  return Object.keys(players)
    .map( ( id, index ) => {
      const playerStyle = {
        gridColumn: `${players[id].location.c+1}`,
        gridRow: `${players[id].location.r+1}`,
      };

      const playerId = player.id;
      return <div
        id={playerId}
        className={`sprite ${players[id].sprite}`}
        key={index +1}
        style={playerStyle}
        ></div>
    }
  );
});

export default Players;
