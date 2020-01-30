const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const connectSocketIo = require('./sockets/connect-socket-io');
const sticky = require('sticky-session');
const cluster = require('cluster');

const port = process.env.PORT || 3000;


const app = express();

app.get('/whoami', (req, res) => {
  const workerInfo = JSON.stringify(
    {
      'id' : cluster.worker.id,
      'state' : cluster.worker.state,
      'connected' : cluster.worker.isConnected()
    },
    null,
    2
  )

  console.log(`user has requested his info:`);
  console.log(workerInfo);
  res.send(workerInfo);
})

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

if (!sticky.listen(server, port)) {
  server.once('listening', () => {
    console.log(serverStartupMessage);
  });
}
