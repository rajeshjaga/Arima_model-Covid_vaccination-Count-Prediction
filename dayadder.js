import { writeFile, readfile } from "./file.js";
import { coutryfile, days, cleaneddata } from "./config.js";

const filedata = readfile(coutryfile);

const dayadder = () => {
  const { data } = filedata;
  data.map((item) => {
    let date = new Date(item.date);
    let day = date.getDay();
    item.day = days[day];
    return item;
  });
  writeFile(data, cleaneddata);
};
export default dayadder;
