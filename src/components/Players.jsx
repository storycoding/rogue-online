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

      // would be nice if players were pre-ordered, so we'd get player1 player2 etc just using index without sorting per render
      const playerId = player.id === id ? "player1" : `other${index+1}`;

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
