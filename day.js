//importing libaries
import fs from "fs";
import something from "./data_import.js";
const [writeFile] = something;

// parsing the saved data from the file
const rawData = fs.readFileSync("./data.json");
let dataSol = JSON.parse(rawData);
dataSol = dataSol[0].data;

// array to store the data
let raw = [];

//recurvise function to add days
const weekData = (data) => {
  const days = [0, 1, 2, 3, 4, 5, 6];
  data.forEach((info) => {
    var dateFormat = new Date(info.date);
    const day = days[dateFormat.getDay()];
    raw.push({ ...info, day });
  });
};

// writes a file with the data moded
const dayAdder = () => {
  weekData(dataSol);
  writeFile(raw, "./data_mod.json");
};
dayAdder();
export default dayAdder;
