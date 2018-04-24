const fs = require('fs');
const path = require('path');
const updateOpenid = require('./updateOpenid');

async function getOpenid() {
  if (!fs.existsSync(path.resolve(__dirname, '../data'))) {
    fs.mkdirSync(path.resolve(__dirname, '../data'));
    return updateOpenid();
  }
  const file = fs.readFileSync(path.resolve(__dirname, '../data/openid.json'));
  return file ? JSON.parse(file).openid : updateOpenid();
}

module.exports = getOpenid;
