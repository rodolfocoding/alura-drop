const request = require("request");

function httpRequest(options) {
  return new Promise((resolve) =>
    request(options, (error, response, body) =>
      resolve({ error, response, body })
    )
  );
}


module.exports = httpRequest