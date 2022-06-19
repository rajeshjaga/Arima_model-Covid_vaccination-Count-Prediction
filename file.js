import fs from "fs";
import { coutryfile } from "./config.js";
export const writeFile = (data, file) => {
  const info = JSON.stringify(data);
  fs.writeFile(file, info, (err) => {
    console.log("File created successfully : ", file);
  });
};

export const readfile = (file) => {
  const data = fs.readFileSync(file, "utf8");
  return JSON.parse(data);
};
