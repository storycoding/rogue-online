const socketIo = require('socket.io')
// initial game state, should come from dynamoDB
let gameState = require('../static/new-game-state');
const cluster = require('cluster');

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
      
      // only accessible when the connection is established
      const playerId = cluster.worker.id;

      console.log(`player${playerId} connected to the server`);

      gameState.players[playerId] = {
        location: findPlayerLocation(gameState.players, playerId),
        sprite: spriteSequence.next().value,
        id: playerId,
      }

      const player = { ...gameState.players[playerId] }
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
        
        let nextLocation = findNextLocation(direction, gameState.players[playerId].location);
        const collides = checkCollision(nextLocation, gameState.grid);
        if(!collides) {
          gameState.players[playerId].location = nextLocation;
          io.emit('game-players', gameState.players);
        }
      });

      socket.on('disconnect', () => {
        console.log(`player${playerId} disconnected from the server`);
        delete gameState.players[playerId];
        io.emit('game-state', gameState);
      });
    });
}

module.exports = setSockets;
