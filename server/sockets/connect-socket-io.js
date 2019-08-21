const socketIo = require('socket.io')
// initial game state, should come from dynamoDB
let gameState = require('../static/new-game-state');

const {
  checkCollision,
  generateSpriteSequence,
  findPlayerLocation,
  findNextLocation,
} = require('../events');

const spriteSequence = generateSpriteSequence();

const setSockets = server => {
  const io = socketIo(server);
  
    io.on('connection', socket => {
      console.log(`user:${socket.id} connected to the server`);

      gameState.players[socket.id] = {
        location: findPlayerLocation(gameState.players, socket.id),
        sprite: spriteSequence.next().value,
        id: socket.id,
      }

      const player = { ...gameState.players[socket.id] }
      delete player.location; // client doesn't need this

      socket.on('request-game-grid', () => {
        socket.emit('game-grid', () => { gameState.grid });
      });

      socket.on('request-game-players', () => {
        socket.emit('game-players', () => { gameState.players });
      });

      socket.on('request-game-current-player', () => {
        socket.emit('game-current-player', () => (
          {
          player,
          })
        );
      });

      socket.on('request-game-state', () => {
        socket.emit('game-state', {
          ...gameState,
          player,
        });
      });
      
      socket.on('request-movement-to-direction', direction => {
        let nextLocation = findNextLocation(direction, gameState.players[socket.id].location);
        const collides = checkCollision(nextLocation, gameState.grid);
        if(!collides) {
          gameState.players[socket.id].location = nextLocation;
          io.emit('game-players', gameState.players);
        }
      });

      socket.on('disconnect', () => {
        console.log(`user:${socket.id} disconnected from the server`);
        delete gameState.players[socket.id];
        io.emit('game-state', gameState);
      });
    });
}

module.exports = setSockets;
