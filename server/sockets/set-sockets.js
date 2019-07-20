const uuid = require('uuid');
const WebSocket = require('ws');

// initial game state, should come from dynamoDB
let gameState = require('../static/new-game-state');

const findNextPosition = require('../events/find-next-position');
const checkCollision = require('../events/check-collision');

const setSockets = server => {
  const wss = new WebSocket.Server({ server });
    wss.on('connection', (ws) => {
      ws.id = uuid.v4();
      // create a new playable character here
      console.log(`user:${ws.id} connected to the server`);

      ws.on('message', (msg) => {
        if(msg === "request-game-state") {
          ws.send(JSON.stringify(gameState));
          return;
        }

        else if(msg === "up" || msg === "down" || msg === "left" || msg === "right") {
          let newPosition = findNextPosition(msg, gameState.hero);
          const collides = checkCollision(newPosition, gameState.grid);
          if(!collides) {
            gameState.hero = newPosition;
          }

          ws.send(JSON.stringify(gameState));
        }
      });

      ws.on('close', () => {
        console.log(`user:${ws.id} disconnected from the server`);
      });
    });
}

module.exports = setSockets;
