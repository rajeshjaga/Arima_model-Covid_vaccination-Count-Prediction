// Load packages
import ARIMA from "arima";
import fs from "fs";
import something from "./data_import.js";

const [writeFile, data] = something;

// parsing the saved data from the file
const rawData = fs.readFileSync("./data.json");
let dataSol = JSON.parse(rawData);
dataSol = dataSol[0].data;
dataSol = dataSol.map((item) => item.total_vaccinations);
let dataclean = [];

// arima prediction of undefined count in the entries
const arimaFly = new ARIMA({
  method: 1,
  optimizer: 1,
  p: 2,
  d: 1,
  q: 1,
  verbose: false,
});

//data cleaning and prediction of undefined values
dataSol.forEach((item, index) => {
  if (item === undefined) {
    const [dataFly, err] = arimaFly.fit(dataclean).predict(1);
    dataclean.push(...dataFly);
  } else {
    dataclean.push(item);
  }
});

// training data
const arima = new ARIMA({
  method: 1,
  optimizer: 1,
  p: 2,
  d: 1,
  q: 1,
  verbose: true,
}).train(dataclean);

// result of prediction for 6 days
const [pred, errors] = arima.predict(6);
let predResults = [];
pred.forEach((item, index) => {
  predResults.push({
    pred: `${index + 1} day prediction is ${Math.floor(item)}`,
  });
});

writeFile(predResults, "prediction.json");
