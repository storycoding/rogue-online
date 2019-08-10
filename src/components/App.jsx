import React from "react";
import Container from "./Container.jsx";
import CTX from "../store/CTX";

const App = () => {
  console.log("rendered app");
  return (
    <CTX.Consumer>
      {
        (value) => {
          return (
            <div className="App">
              <Container grid={value.grid} players={value.players} player={value.player}/>
            </div>
          )
        }
      }
    </CTX.Consumer>
    
  );
}

export default App;
