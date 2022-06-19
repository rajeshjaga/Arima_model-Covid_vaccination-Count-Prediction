import Axios from "axios";
import writeFile from "./file.js";
import { uri } from "./config.js";

const mainData = () => {
  Axios.get(uri).then((res) => {
    writeFile(res.data, "data.json");
    res.data.map((item) => {
      if (item.country === "India") {
        writeFile(res.data, "data_india.json");
      }
    });
  });
};
mainData();
