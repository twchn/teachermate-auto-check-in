const fs = require('fs');
const path = require('path');

const folderPath = path.resolve(__dirname, '../../data');
const filePath = path.resolve(__dirname, '../../data/data.json');

function store(storeData) {
  if (typeof storeData !== 'object') {
    throw TypeError('Data must be a object!');
  }
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
  }
  fs.readFile(filePath, { encoding: 'utf8' }, (err, data) => {
    if (err) {
      throw err;
    }
    const result = Object.assign({}, JSON.parse(data), storeData);
    fs.writeFile(filePath, JSON.stringify(result), (error) => {
      if (error) {
        throw error;
      }
    });
  });
}

module.exports = store;
