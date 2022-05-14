import Express from "express";
import cors from "cors";
import something from "./data_import.js";
import fs from "fs";

const app = Express();
const port = process.env.PORT || 5000;
const [writeFile, data] = something;

app.use(cors());

// 24hrs in milliseconds
const timeInt = 20;
const min = 60 * 1000;
const hour = 60 * min;

// timed json dataset collection
const timedData = setInterval(() => {
  const newDate = new Date().getHours();
  if (newDate === timeInt) {
    data();
  } else {
    console.log("wait for the cycle");
  }
}, hour);

//default endpoint give the predicted data

app.get("/", (req, res) => {
  const rawData = fs.readFileSync("./prediction.json");
  let predData = JSON.parse(rawData);
  res.send(predData);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// check the time at maybe 5pm or 6pm
// if it is 5pm or 6pm, fetch the api to the generate dataset
// because the data has to  predicted and take a while to generate
// we store the predicted value in another json and make an api endpoint
// to serve just the predicte values
