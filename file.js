import fs from "fs";

const writeFile = (data, file) => {
  const info = JSON.stringify(data);
  fs.writeFile(file, info, (err) => {
    console.log("File created successfully : ", file);
  });
};

export default writeFile;
