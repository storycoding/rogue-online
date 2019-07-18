import React, { Component } from "react";
import Block from "../functional-components/Block.jsx";
import checkDirection from "../events/check-direction";
import api from "../events/api";

class App extends Component {
  constructor() {
    super();
    this.state = {};

    this.keyPress = this.keyPress.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  async keyPress({keyCode}){
    let direction = checkDirection(keyCode);
    await api.postDirection(direction);
    this.refresh();
  }

  async refresh() {
    const newState = await api.getGameState();
    if(JSON.stringify(this.state) !== JSON.stringify(newState)) {
      this.setState(newState); // could be a problem if return type is invalid
    }
  }

  componentDidMount() {
    this.refresh();
    setInterval( () => {
      this.refresh();
    }, 1000);
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
