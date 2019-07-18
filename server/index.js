// Include the cluster module
var cluster = require('cluster');

// Code to run if we're in the master process
if (cluster.isMaster) {

    // Count the machine's CPUs
    var cpuCount = require('os').cpus().length;

    // Create a worker for each CPU
    for (var i = 0; i < cpuCount; i += 1) {
        cluster.fork();
    }

    // Listen for terminating workers
    cluster.on('exit', function (worker) {

        // Replace the terminated workers
        console.log('Worker ' + worker.id + ' died :(');
        cluster.fork();

    });

    // Code to run if we're in a worker process
} else {
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