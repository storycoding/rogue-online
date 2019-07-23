import React from "react";

const Players = (props) => {
  return Object.keys(props.players).map( id => {
    const player = props.players[id];

    player.sprite = "frog"; // will be sourced from player data

    const playerStyle = {
      gridColumn: `${player.location.c+1}`,
      gridRow: `${player.location.r+1}`,
    };
  

    return <div className={`sprite ${player.sprite}`} key={id.slice(0,7)} style={playerStyle}></div>
  });
}

export default Players;
