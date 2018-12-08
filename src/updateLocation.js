const { store, readline: { question } } = require('./utils');

async function updateLocation(prompt = '[可选]请输入位置(经度 纬度)：') {
  let lon = 0; // 经度
  let lat = 0; // 纬度
  try {
    const inputLocation = await question(prompt);
    const inputLon = parseFloat(inputLocation.split(' ')[0]);
    const inputLat = parseFloat(inputLocation.split(' ')[1]);
    lon = inputLon >= 0 ? inputLon : 0;
    lat = inputLat >= 0 ? inputLat : 0;
  } catch (e) {
    console.error(e);
  }
  store({ location: { lon, lat } });
  return { lon, lat };
}

module.exports = updateLocation;
