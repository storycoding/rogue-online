const express = require('express');
const router = express.Router();
const slashHome = require("../static/home");

router.get('/', (req, res) => res.send(slashHome));
// try res.render

module.exports = router;
