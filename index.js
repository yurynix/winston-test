const logger = require("./winston");
const cluster = require('cluster');
const numCPUs = require('os').cpus().length;

const test = () => {

    const done = () => {
        setTimeout(() => {
            test();
        }, 100);
    };
    
    process.send({ cmd: 'logThis', msg: "testing " + new Date() });
    done();
};

process.on('uncaughtException', (err) => {
  console.log('whoops! there was an error', err.stack);
  process.exit(2);
});

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  function messageHandler(msg) {
    if ( msg.cmd && msg.cmd === 'logThis' && msg.msg ) {
      logger.debug( "Worker " + this.workerId, msg.msg );
    }
  }

  for (const id in cluster.workers) {
    cluster.workers[id].on('message', messageHandler.bind( { workerId: id } ) );
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  console.log(`Worker ${process.pid} started`);
  test();
}


