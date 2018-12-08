const fs = require('fs');
const path = require('path');

const folderPath = path.resolve(__dirname, '../../data');
const filePath = path.resolve(__dirname, '../../data/data.json');

async function getData(name, updateData) {
  if (!fs.existsSync(path.resolve(__dirname, folderPath))) {
    fs.mkdirSync(folderPath);
    return updateData();
  }
  let result;
  try {
    const file = fs.readFileSync(filePath, { encoding: 'utf8' });
    result = JSON.parse(file)[name];
  } catch (e) {
    console.error(e);
  }
  return result || updateData();
}

module.exports = getData;
