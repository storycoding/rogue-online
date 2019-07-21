const uuid = require('uuid');
const WebSocket = require('ws');

// initial game state, should come from dynamoDB
let gameState = require('../static/new-game-state');

const findNextPosition = require('../events/find-next-position');
const checkCollision = require('../events/check-collision');
const clients = {};

const setSockets = server => {
  const wss = new WebSocket.Server({ server });
    wss.on('connection', (ws) => {
      const id = uuid.v4()
      ws.id = id;
      clients[id] = ws;

      console.log(`user:${id} connected to the server`);
      console.log(`n. of unique users:${Object.keys(clients).length}`);

      // starting location
      gameState.players[id] = {
        location: {
          "r":1,
          "c":1,
        }
      }

      ws.on('message', (msg) => {
        if(msg === "request-game-state") {
          ws.send(JSON.stringify(gameState));
          return;
        }

        else if(msg === "up" || msg === "down" || msg === "left" || msg === "right") {
          let newPosition = findNextPosition(msg, gameState.players[id].location);
          const collides = checkCollision(newPosition, gameState.grid);
          if(!collides) {
            gameState.players[id].location = newPosition;
          }

          Object.keys(clients).forEach( key => {
            const client = clients[key];
            client.send(JSON.stringify(gameState));
          });
        }
      });

      ws.on('close', () => {
        delete gameState.players[id];
        delete clients[id];
        console.log(`user:${id} disconnected from the server`);
        console.log(`n. of unique users:${Object.keys(clients).length}`);
        ws.send(JSON.stringify(gameState));
      });
    });
}

module.exports = setSockets;
