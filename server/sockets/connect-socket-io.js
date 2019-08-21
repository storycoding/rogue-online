const socketIo = require('socket.io')
// initial game state, should come from dynamoDB
let gameState = require('../static/new-game-state');

const { checkCollision, findNextPosition, generateSpriteSequence } = require('../events');
const spriteSequence = generateSpriteSequence();

const setSockets = server => {
  const io = socketIo(server);
  
    io.on('connection', socket => {
      console.log(`user:${socket.id} connected to the server`);

      // starting location
      gameState.players[socket.id] = {
        location: {
          "r":5,
          "c":4,
        },
        sprite: spriteSequence.next().value,
        id: socket.id,
      }

      socket.on('request-game-state', () => {
        socket.emit('game-state', {
          ...gameState,
          player: gameState.players[socket.id],
        });
      });
      
      socket.on('request-movement-to-direction', inputKey => {
        let newPosition = findNextPosition(inputKey, gameState.players[socket.id].location);
        const collides = checkCollision(newPosition, gameState.grid);
        if(!collides) {
          gameState.players[socket.id].location = newPosition;
        }
        // send state to all users
        io.emit('game-state', gameState);
      });

      socket.on('disconnect', () => {
        console.log(`user:${socket.id} disconnected from the server`);
        delete gameState.players[socket.id];
        io.emit('game-state', gameState);
      });
    });
}

module.exports = setSockets;
