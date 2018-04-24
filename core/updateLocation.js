const { question } = require('../utils/readline');
const store = require('../utils/store');

async function updateLocation(prompt = '[可选]请输入位置(经度 纬度)：') {
  let lon = 0;  // 经度
  let lat = 0;  // 纬度
  try {
    const inputLocation = await question(prompt);
    const inputLon = parseInt(inputLocation.split(' ')[0], 10);
    const inputLat = parseInt(inputLocation.split(' ')[1], 10);
    lon = inputLon >= 0 ? inputLon : 0;
    lat = inputLat >= 0 ? inputLat : 0;
  } catch (e) {
    console.log(e);
  }
  store({ location: { lon, lat } });
  return { lon, lat };
}

module.exports = updateLocation;
