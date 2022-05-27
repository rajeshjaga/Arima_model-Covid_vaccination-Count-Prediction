import cheerio from "cheerio";
import axios from "axios";
import something from "./data_import.js";
const [writeFile] = something;
const url = "https://ourworldindata.org/covid-vaccinations";

let infodata = () => {
  axios.get(url).then((res) => {
    const html = res.data;
    const $ = cheerio.load(html);
    const wantedData = [];
    $(".annotating-data-value", html).each(function (i, elem) {
      let data = $(this).find(".data-value").text();
      wantedData.push(data);
    });
    writeFile(wantedData, "hero.json");
  });
};
export default infodata;
