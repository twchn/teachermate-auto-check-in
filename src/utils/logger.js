const fs = require('fs');
const path = require('path');

const folderPath = path.resolve(__dirname, '../../log');
const filePath = path.resolve(__dirname, '../../log/log.txt');

function logger(data) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  fs.appendFile(filePath, data, (err) => {
    if (err) {
      throw err;
    }
  });
}

module.exports = logger;
