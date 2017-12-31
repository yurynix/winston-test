const logger = require("./winston");
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const test = () => {

    const done = () => {
        setTimeout(() => {
            test();
        }, 100);
    };
    
    logger.debug("testing log")
    done()
};


if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  // Workers can share any TCP connection
  // In this case it is an HTTP server
  test();
  console.log(`Worker ${process.pid} started`);
}


