const fs = require('fs');
const path = require('path');

function store(storeData) {
  if (typeof storeData !== 'object') {
    throw TypeError('Data must be a object!');
  }
  if (!fs.existsSync(path.resolve(__dirname, '../data'))) {
    fs.mkdirSync(path.resolve(__dirname, '../data'));
  }
  fs.readFile(path.resolve(__dirname, '../data/data.json'), { encoding: 'utf8' }, (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    if (data) {
      Object.assign(storeData, JSON.parse(data));
    }
    fs.writeFile(path.resolve(__dirname, '../data/data.json'), JSON.stringify(storeData), err => {
      if (err) {
        throw err;
      }
    });
  });
}

module.exports = store;
