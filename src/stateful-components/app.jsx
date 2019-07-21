import React, { Component } from "react";
import Blocks from "../functional-components/Blocks.jsx";
import Players from "../functional-components/Players.jsx";

import checkDirection from "../events/check-direction";

const port = process.env.PORT || 3000;
const client = new WebSocket(`ws://localhost:${port}`);

class App extends Component {
  constructor() {
    super();
    this.state = {
      players: {}
    };
    this.keyPress = this.keyPress.bind(this);
  }

  keyPress({keyCode}) {
    let direction = checkDirection(keyCode);
    if (direction) {
      client.send(direction);
    }
  }

  componentWillMount() {
    client.onopen = () => {
        console.log('connected to the server websocket');
        client.send('request-game-state');
    }
    
    client.onmessage = (res) => {
        if(res.data[0] === "{") {
          const newState = JSON.parse(res.data);
          this.setState(newState);
        }
    }

    client.onclose = () => {
      console.log('disconnected from the server websocket');
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
      <div id="container" style={containerStyle} onKeyDown={this.keyPress} tabIndex="0">
        <Players players={this.state.players}/>
        <Blocks grid={this.state.grid}/>
      </div>
    );
  }
}

export default App;
