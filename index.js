const { Template } = require("./game");
const { Worker } = require("worker_threads");

const template = new Template(50, 50);


for(var i = 0; i < 10; i++){
  const worker = new Worker("./worker.js", {
    workerData: {
      template,
      end: 100
    }
  });
}

