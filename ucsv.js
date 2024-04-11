const csv = require("csv");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const csvWriter = createCsvWriter({
  path: "results.csv",
  header: [
    { id: "template_id", title: "TEMPLATE_ID" },
    { id: "rows", title: "ROWS" },
    { id: "cols", title: "COLS" },
    { id: "gens", title: "GENERATIONS" },
    { id: "pop", title: "POPULATION" },
  ],
  append: true
});
function addRecords(records) {
  csvWriter.writeRecords(records);
}
module.exports = {
  addRecords
};
