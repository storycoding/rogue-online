const express = require('express');
const router = express.Router();

const findNextPosition = require('../events/find-next-position');
const checkCollision = require('../events/check-collision');
const state = require('../static/new-game-state.json');

router.post('/', (req, res) => {
  if(!req.query || !req.query.direction) {
    res.send("no direction specified in the querystring");
    return;
  } 

  const direction = req.query.direction;
  let newPosition = findNextPosition(direction, state.hero);
  const collides = checkCollision(newPosition, state.grid);

  if(!collides) {
    state.hero = newPosition;
  }

  res.send(JSON.stringify(state.hero));
});

module.exports = router;
