import React from "react";
import openSocket from 'socket.io-client';

// components
import Container from "./Container.jsx";
import Store from "./Store.jsx";

// store
import reducer from "../store/reducer";

// create a socket connection
const port = process.env.PORT || 3000;
const client = openSocket(`http://127.0.0.1:${port}`);

// adds clients to the store to allow dispatching of socket events
const initialState = { client };

const App = React.memo(() => 
  <Store initialState={initialState} reducer={reducer}>
    <Container/>
  </Store>
);

export default App;
