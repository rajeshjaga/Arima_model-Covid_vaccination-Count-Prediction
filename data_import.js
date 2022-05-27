//importing libraries
import Axios from "axios";
import fs from "fs";

// URL for dataset
const url =
  "https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/vaccinations/vaccinations.json";

//array to store the data
let data_info = [];

//receiving and packing data
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
