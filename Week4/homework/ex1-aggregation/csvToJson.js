const csv = require("csvtojson");
const fs = require("fs");
const csvFilePath = "population_pyramid_1950-2022.csv";
const jsonFilePath = "jsonData.json";

const converter = () => {
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      fs.writeFileSync(jsonFilePath, JSON.stringify(jsonObj, null, 1));
    });
};

module.exports = {
  converter,
};
