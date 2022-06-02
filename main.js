// importing packages
import ARIMA from "arima";
import fs from "fs";
import { setTimeout } from "timers/promises";
import something from "./data_import.js";
import recuFunc from "./example.js";
// getting few functions from otherfile for writing data
const [writeFile] = something;

// parsing the saved data from the file
const rawData = fs.readFileSync("./data_mod.json");
let dataSol = JSON.parse(rawData);
let totvacc = dataSol.map((item) => item.total_vaccinations);
let peovacc = dataSol.map((item) => item.people_vaccinated);
let day = dataSol.map((item) => item.day);
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
  // result of prediction for 10 weeks
  const [pred, errors] = arima.predict(70);
  return [pred, errors];
};

let vaccResults = [];
let peoResults = [];

const results = (cleaned, result) => {
  const [pred, err] = model(cleaned);
  pred.forEach((item, index) => {
    result.push({
      item: `${Math.floor(item)}`,
      error: `${Math.floor(err[index])}`,
    });
  });
};

const main = () => {
  // data cleaning
  deNullify(totvacc, totvacclean);
  deNullify(peovacc, peovacclean);
  // writing ony vaccintaion count predictions
  results(totvacclean, vaccResults);
  vaccResults = recuFunc(day[day.length - 1], vaccResults);
  writeFile(vaccResults, "vaccinationPrediction.json");
  writeFile(peoResults, "peoplePrediction.json");
};
export default main;
