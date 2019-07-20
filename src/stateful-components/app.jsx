import React, { Component } from "react";
import Block from "../functional-components/Block.jsx";
import checkDirection from "../events/check-direction";

const port = process.env.PORT || 3000;
const client = new WebSocket(`ws://localhost:${port}`);

class App extends Component {
  constructor() {
    super();
    this.state = {};
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
      alert('disconnected from the server websocket');
    }
  }

  render() {
    if(!this.state.grid) {
      return <div className="loading">Loading...</div>
    }
    const heroStyle = {
      gridColumn: `${this.state.hero.c+1}`,
      gridRow: `${this.state.hero.r+1}`,
    };
    return (
      <div id="container" onKeyDown={this.keyPress} tabIndex="0">
        <div id="sprite" style={heroStyle}></div>
        {this.state.grid.map( (row, rIndex) => {
          return row.map( (cell, cIndex) => (
            <Block
              key={`tile_${rIndex}.${cIndex}`}
              tile={cell}
              rIndex={rIndex}
              cIndex={cIndex}
            />
          )
          );
        })}
      </div>
    );
  }
}

export default App;
