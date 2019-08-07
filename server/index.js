const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const connectSocketIo = require('./sockets/connect-socket-io');

const port = process.env.PORT || 3000;


const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));

connectSocketIo(server); // socket.io setup

let serverStartupMessage;

if(process.env.DEV === "true") {
  serverStartupMessage = `
  webpack hot reloading the front-end at http://127.0.0.1:8080/
  express hot reloading the back-end at http://127.0.0.1:3000/
  `;
} else {
  app.use(express.static('dist'));
  serverStartupMessage = `
  express server running full-stack at http://127.0.0.1:${port}/
  `;
}

server.listen(port, () => console.log(serverStartupMessage));
