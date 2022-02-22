const fs = require('fs')

function createFolder(dir) {
  if (!fs.existsSync(__dirname + "/" + dir)) {
    fs.mkdirSync("./" + "/" + dir);
  }
}

module.exports= createFolder