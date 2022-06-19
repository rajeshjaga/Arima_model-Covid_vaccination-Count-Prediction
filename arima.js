import ARIMA from "arima";
import fs from "fs";

let dataset;
const filedata = fs.readFile("data_mod.json", (err, data) => {
  let datainfo = JSON.parse(data);
  dataset = datainfo.data;
});

// arimaFly is used for defined undefined count of dataset
const arimaFly = new ARIMA({
  method: 1,
  optimizer: 1,
  p: 2,
  d: 1,
  q: 1,
  verbose: false,
});

// Arima Model for the main data to be predicted
const arima = (data) => {
  const arimaModel = new ARIMA({
    method: 1,
    optimizer: 1,
    p: 2,
    d: 1,
    q: 1,
    verbose: true,
  }).train(data);
  let [predicted, errors] = arimaModel;
  return [predicted, errors];
};
