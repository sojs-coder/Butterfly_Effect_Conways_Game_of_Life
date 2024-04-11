const { Template } = require("./game");
const { Worker } = require("worker_threads");
const { addRecords } = require("./ucsv.js");


var numWorkers = 10;
var records = new Array();
function runSim(numWorkers,w=100,h=100) {
  return new Promise((resolve, reject)=>{
    const template = new Template(w, h);
    for (var i = 0; i < numWorkers; i++) {
      const worker = new Worker("./worker.js", {
        workerData: {
          template,
          end: 100,
        },
      });
      worker.on("message", (data) => {
        records.push({
          template_id: data.game.template.id,
          rows: data.game.ROWS,
          cols: data.game.COLS,
          gens: data.gen,
          pop: data.pop,
        });
        console.log(records.length, numWorkers)
        if(records.length == numWorkers){
          resolve()
        }
      });
      worker.on("error",reject);
    }
  })
}
runSim(numWorkers).then(()=>{
  addRecords(records);
})