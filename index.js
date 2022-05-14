// importing libraries
import Express from "express";
import cors from "cors";
import fs from "fs";
import something from "./data_import.js";
import main from "./main.js";

// default stuff
const app = Express();
const port = process.env.PORT || 5000;
const [writeFile, data] = something;

// for cross site scripting errors
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
    main();
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

// endpoint to get the ml's raw data
app.get("/rawdata", (req, res) => {
  const rawData = fs.readFileSync("./rawdata.json");
  let predData = JSON.parse(rawData);
  res.send(predData);
});

// endpoint to get the actual default from the file
app.get("/default", (req, res) => {
  const rawData = fs.readFileSync("./data.json");
  let predData = JSON.parse(rawData);
  res.send(predData);
});

//default port listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
