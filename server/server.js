const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const setSockets = require('./sockets/set-sockets');

const port = process.env.PORT || 3000;

const startServer = () => {
    const app = express();
    const server = http.createServer(app);

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static('dist'));
  
    // web socket server
    setSockets(server);

    server.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}/`));
}

module.exports = startServer;
