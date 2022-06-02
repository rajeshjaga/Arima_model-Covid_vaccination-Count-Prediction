// importing libraries
import fs from "fs";
import path from "path";
import cors from "cors";
import Express from "express";
import main from "./main.js";
import dayAdder from "./day.js";
import infodata from "./hero.js";
import something from "./data_import.js";

// default stuff
const app = Express();
const port = process.env.PORT || 5000;
const [writeFile, data] = something;
const __dirname = path.dirname("./");

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
    dayAdder();
    infodata();
    main();
  } else {
    console.log("wait for the cycle");
  }
}, hour);

// by default use pug engine to view an default page
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(Express.static(path.join(__dirname, "public")));

//default endpoint give the predicted data
app.get("/", (req, res) => {
  res.render("index", { title: "Home" });
});

app.get("/rawdata", (req, res) => {
  const rawData = fs.readFileSync("./rawdata.json");
  let predData = JSON.parse(rawData);
  res.send(predData);
});

// endpoint to get the ml's raw data
app.get("/vaccination_prediction", (req, res) => {
  const rawData = fs.readFileSync("./vaccPrediction.json");
  let predData = JSON.parse(rawData);
  res.send(predData);
});

// endpoint to get the ml's raw data
app.get("/people_prediction", (req, res) => {
  const rawData = fs.readFileSync("./peopleperdiction.json");
  let predData = JSON.parse(rawData);
  res.send(predData);
});

// endpoint to get the actual default from the file
app.get("/default_mod", (req, res) => {
  const rawData = fs.readFileSync("./data_mod.json");
  let predData = JSON.parse(rawData);
  res.send(predData);
});
// endpoint to get the actual default from the file (unmoded)
app.get("/default", (req, res) => {
  const rawData = fs.readFileSync("./data.json");
  let predData = JSON.parse(rawData);
  res.send(predData);
});

//default port listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// endpoint to get the actual default from the file (unmoded)
app.get("/cantgetNow", (req, res) => {
  const rawData = fs.readFileSync("./hero.json");
  let predData = JSON.parse(rawData);
  res.send(predData);
});
