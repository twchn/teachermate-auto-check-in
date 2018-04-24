const fs = require('fs');
const path = require('path');

async function getData(name, updateData) {
  if (!fs.existsSync(path.resolve(__dirname, '../data'))) {
    fs.mkdirSync(path.resolve(__dirname, '../data'));
    return updateData();
  }
  let result;
  try {
    const file = fs.readFileSync(path.resolve(__dirname, '../data/data.json'), { encoding: 'utf8' });
    result = JSON.parse(file)[name];
  } catch (e) {
    console.log(e);
  }
  return result ? result : updateData();
}

module.exports = getData;
