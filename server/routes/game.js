const express = require('express');
const router = express.Router();

let state = require('../static/new-game-state');

router.get('/', (req, res) => res.send(JSON.stringify(state)));
// state request can be split for optimization
  // grid
  // players
  // specific player

module.exports = router;
