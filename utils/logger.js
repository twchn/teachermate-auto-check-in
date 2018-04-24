const fs = require('fs');
const path = require('path');

function logger(data) {
  if (!fs.existsSync(path.resolve(__dirname, '../log'))) {
    fs.mkdirSync(path.resolve(__dirname, '../log'));
  }
  fs.appendFile(path.resolve(__dirname, '../log/log.txt'), data, err => {
    if (err) {
      throw err;
    }
  });
}

module.exports = logger;
