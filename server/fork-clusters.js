// Include the cluster module
const cluster = require('cluster');

// Count the machine's CPUs
const cpuCount = require('os').cpus().length;

const forkClusters = () => {
  // Create a worker for each CPU
  for (let i = 0; i < cpuCount; i += 1) {
      cluster.fork();
  }

  // Listen for terminating workers
  cluster.on('exit', function (worker) {

      // Replace the terminated workers
      console.log('Worker ' + worker.id + ' died :(');
      cluster.fork();

  });
}

module.exports = forkClusters;
