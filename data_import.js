//importing libraries
import Axios from "axios";
import fs from "fs";

// URL for dataset
const url =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json";
let data_info = [];

//recieveing and packing data
const data = () => {
  return Axios.get(url)
    .then((data) => {
      if (data !== undefined || data !== null) {
        data.data.forEach((data) => {
          if (data.country === "India") {
            data_info = [data];
            writeFile(data_info, "data.json");
          }
        });
      } else {
        return "loading";
      }
    })
    .catch((error) => {
      console.log(error);
    });
};

// writing data to file
function writeFile(data, fileName) {
  const jsonify = JSON.stringify(data);
  try {
    fs.writeFile(fileName, jsonify, (data) => {
      console.log("The file has been created successfully");
    });
  } catch (err) {
    console.error(err);
  }
}

export default [writeFile, data];

// // Load packages
// const CsvReadableStream = require("csv-reader");
// const fs = require("fs");

// // Reading csv file
// const csv_file = fs.createReadStream("Cleaned_Data_India.csv", "utf8");
// let data_acc = csv_file
//   .pipe(
//     new CsvReadableStream({
//       parseNumbers: true,
//       parseBooleans: true,
//       trim: true,
//     })
//   )
//   .on("data", (row) => {
//     console.log(row);
//   })
//   .on("end", () => {
//     console.log("end");
//   });
// export default data_acc;
