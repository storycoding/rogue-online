const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const connectSocketIo = require('./sockets/connect-socket-io');

const port = process.env.PORT || 3000;


const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('dist'));

connectSocketIo(server); // socket.io setup

server.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}/`));
