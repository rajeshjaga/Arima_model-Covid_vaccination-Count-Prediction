// importing packages
import ARIMA from "arima";
import fs from "fs";
import something from "./data_import.js";

// getting few functions from otherfile for writing data
const [writeFile, data] = something;

// parsing the saved data from the file
const rawData = fs.readFileSync("./data.json");
let dataSol = JSON.parse(rawData);
dataSol = dataSol[0].data;
let totvacc = dataSol.map((item) => item.total_vaccinations);
let peovacc = dataSol.map((item) => item.people_vaccinated);
let totvacclean = [];
let peovacclean = [];

// arima prediction of undefined count in the entries
const arimaFly = new ARIMA({
  method: 1,
  optimizer: 1,
  p: 2,
  d: 1,
  q: 1,
  verbose: false,
});

// prediction of undefined values
function deNullify(items, arrayStore) {
  items.forEach((item, index) => {
    if (item === undefined) {
      const [dataFly, err] = arimaFly.fit(arrayStore).predict(1);
      arrayStore.push(Math.floor(...dataFly));
    } else {
      arrayStore.push(item);
    }
  });
  console.log(arrayStore);
}

// training data
const model = (cleanedData) => {
  // model training
  const arima = new ARIMA({
    method: 1,
    optimizer: 1,
    p: 2,
    d: 1,
    q: 1,
    verbose: true,
  }).train(cleanedData);
  // result of prediction for 6 days
  const [pred, errors] = arima.predict(6);
  return [pred, errors];
};

let predResults = [];
let rawResults = [];

const results = (cleaned) => {
  const [pred, err] = model(cleaned);
  pred.forEach((item, index) => {
    predResults.push({
      pred: `${index + 1} day prediction is ${Math.floor(item)}`,
    });

    rawResults.push({
      item: `${item}`,
      error: `${err[index]}`,
    });
  });
};

const main = () => {
  // data cleaning
  deNullify(totvacc, totvacclean);
  deNullify(peovacc, peovacclean);
  // result of prediction
  results(totvacclean);
  results(peovacclean);
  //writing data to the file
  writeFile(predResults, "prediction.json");
  writeFile(rawResults, "rawdata.json");
};

main();
