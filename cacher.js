import Axios from "axios";
import writeFile from "./file.js";
import { uri, basefile, coutryfile } from "./config.js";

const mainData = () => {
  Axios.get(uri).then((res) => {
    writeFile(res.data, basefile);
    res.data.map((item) => {
      if (item.country === "India") {
        writeFile(item, coutryfile);
      }
    });
  });
};
export default mainData;
