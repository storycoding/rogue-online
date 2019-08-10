import React, { Component } from "react";
import openSocket from 'socket.io-client';

import Blocks from "../functional-components/Blocks.jsx";
import Players from "../functional-components/Players.jsx";

import inputKeys from "../static/input-keys";
import mapTouchToKey from "../events/mapTouchToKey";

import subscribeToSocketIo from "../api/subscribe-to-socket-io";

const port = process.env.PORT || 3000;
const client = openSocket(`http://127.0.0.1:${port}`);

class AppClass extends Component {
  constructor() {
    super();
    this.state = {
      players: {},
      player: {
        id: null,
        div: null,
      }
    };

    subscribeToSocketIo(client, this);

    this.keyPress = this.keyPress.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  keyPress({key}) {
    if (inputKeys.includes(key)) {
      client.emit("key-input", key);
    }
  }

  handleClick(clickEvent) {
    const key = mapTouchToKey(clickEvent, this);
    return key ? this.keyPress({key}) : null;
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyPress);
    document.addEventListener("click", this.handleClick);
  }

  componentDidUpdate() {
    if ( 
      this.state.player.id &&
      this.state.players[this.state.player.id] &&
      !this.state.player.div 
      ) {

      const playerDiv = document.getElementById(this.state.player.id);
      
      const newState = {
        player: { 
          ...this.state.player,
          div: playerDiv,
        }
      };

      this.setState(newState);
    }
  }

  render() {
    if(!this.state.grid) {
      return <div className="loading">Loading...</div>
    }

    const height = this.state.grid.length;
    const width = this.state.grid[0].length;

    const containerStyle = {     
      height: `${height}00px`,
      width: `${width}00px`,
      gridTemplateRows: `repeat(${height}, ${100/height}%)`,
      gridTemplateColumns: `repeat(${width}, ${100/width}%)`,
    };

    return (
      <div id="container" style={containerStyle} tabIndex="0">
        <Players players={this.state.players}/>
        <Blocks grid={this.state.grid}/>
      </div>
    );
  }
}

export default AppClass;
