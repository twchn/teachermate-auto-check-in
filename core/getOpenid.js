const fs = require('fs');
const updateOpenid = require('./updateOpenid');

async function getOpenid() {
  if (!fs.existsSync('../data')) {
    fs.mkdirSync('../data');
    return updateOpenid();
  }
  const file = fs.readFileSync('../data/openid.json');
  return file ? JSON.parse(file).openid : updateOpenid();
}

module.exports = getOpenid;
