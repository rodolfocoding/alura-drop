const fs = require("fs");
const logger = require("../utils/logger");
const axios = require("axios");

async function videoDownload(path, url, title) {
  const response = await axios({
    method: "GET",
    url: url,
    responseType: "stream",
  });

  response.data.pipe(fs.createWriteStream(path));

  return new Promise((resolve, reject) => {
    response.data.on("end", () => {
      logger.log(9, { title });
      resolve();
    });

    response.data.on("error", () => {
      reject();
    });
  });
}  
module.exports = videoDownload;
