const express = require('express');
const bodyParser = require('body-parser');
const uuid = require('uuid');

const gameRouter = require('./routes/game');
const indexRouter = require('./routes/index');
const moveRouter = require('./routes/move');

const startServer = () => {
    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static('dist'));

    // api routes
    app.use('/game', gameRouter);
    app.use('/move', moveRouter);
    app.use('/', indexRouter);

    // web-sockets
    const expressWs = require('express-ws');
    expressWs(app);

    app.ws('/', (ws, req) => {
      ws.id = uuid.v4();
      // create a new player here
      console.log(`user:${ws.id} connected to the server`);

      // use message events to control character from that specific player
      ws.on('message', (msg) => {
        console.log(`user:${ws.id} says:${msg}`);
        ws.send(`server says: hello, user ${ws.id}`);
      });

      ws.on('close', () => {
        console.log(`user:${ws.id} disconnected from the server`);
      });
    });

    const port = process.env.PORT || 3000;

    app.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}/`));
}

module.exports = startServer;
