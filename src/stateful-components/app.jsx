import React, { Component } from "react";
import openSocket from 'socket.io-client';

import Blocks from "../functional-components/Blocks.jsx";
import Players from "../functional-components/Players.jsx";

import inputKeys from "../static/input-keys";
import subscribeToSocketIo from "../api/subscribe-to-socket-io";

const port = process.env.PORT || 3000;
const client = openSocket();

class App extends Component {
  constructor() {
    super();
    this.state = {
      players: {},
    };

    subscribeToSocketIo(client, this);

    this.keyPress = this.keyPress.bind(this);
  }

  keyPress({key}) {
    if (inputKeys.includes(key)) {
      client.emit("key-input", key);
    }
  }

  componentDidMount() {
    document.addEventListener("keydown", this.keyPress);
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

export default App;
