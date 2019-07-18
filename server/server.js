const startServer = () => {
  var express = require('express');
    var bodyParser = require('body-parser');

    const gameRouter = require('./routes/game');
    const indexRouter = require('./routes/index');
    const moveRouter = require('./routes/move');

    const app = express();

    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(express.static('dist'));

    // api routes
    app.use('/game', gameRouter);
    app.use('/move', moveRouter);
    app.use('/', indexRouter);

    const port = process.env.PORT || 3000;

    app.listen(port, () => console.log(`Server running at http://127.0.0.1:${port}/`));
}

module.exports = startServer;
