const fs = require('fs');

function logger(data) {
  if (!fs.existsSync('../log')) {
    fs.mkdirSync('../log');
  }
  fs.appendFile('../log/log.txt', data, err => {
    if (err) {
      throw err;
    }
  });
}

module.exports = logger;
