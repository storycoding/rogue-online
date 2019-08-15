import React from "react";

import reducer from "../store/reducer";
console.log({reducer});
import initialState from "../static/initial-state.json";
console.log({initialState});

import Container from "./Container.jsx";
import Store from "./Store.jsx";

const App = () => (
  <Store initialState={initialState} reducer={reducer}>
    <Container/>
  </Store>
);

export default App;
