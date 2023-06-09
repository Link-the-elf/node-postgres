const cluster = require('cluster')
const os = require('os')
const pid = process.pid

if (cluster.isMaster) {
  const cpusCount = os.cpus().length
  
  for (let i = 0; i < cpusCount - 1; i++) {
    cluster.fork()  
  }

  cluster.on('exit', () => cluster.fork())

  console.log(`Master started. Pid: ${pid}`)
}

if (cluster.isWorker) {
  require('./worker.js')
}