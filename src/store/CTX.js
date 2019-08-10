import React from 'React';
import initialState from "../static/initial-state.json";

// Socket.io
import openSocket from 'socket.io-client';
import subscribeToSocketIo from "../api/subscribe-to-socket-io";

const port = process.env.PORT || 3000;
const client = openSocket(`http://127.0.0.1:${port}`);

const dispatch = (dispatchEvent) => { console.log({dispatchEvent})}; // temporary
subscribeToSocketIo(client, initialState, dispatch);

const CTX = React.createContext(initialState, dispatch);

export default CTX;
