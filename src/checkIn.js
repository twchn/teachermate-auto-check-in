const ora = require('ora');
const {
  createRequest, getData, logger, delay
} = require('./utils');
const updateOpenid = require('./updateOpenid');
const updateDelayTime = require('./updateDelayTime');
const updateLocation = require('./updateLocation');

async function checkin() {
  let openid = await getData('openid', updateOpenid);
  const delayTime = await getData('delayTime', updateDelayTime);
  const location = await getData('location', updateLocation);
  const { lon, lat } = location; // 经度和纬度

  let spinner = ora('开始签到中').start();
  logger(`${new Date().toLocaleString()} openid: ${openid} 开启签到\n`);

  while (true) {
    const { error, res, body } = await createRequest(
      'v18.teachermate.cn',
      'wechat-api/v1/class-attendance/student-sign-in',
      'POST',
      {
        openid,
        lon,
        lat
      }
    );
    if (error) {
      throw error;
    }
    switch (res.statusCode) {
      case 200:
        spinner.succeed();
        return body;
      case 401:
        spinner.fail(`openid${openid}已失效！`);
        logger(`${new Date().toLocaleString()} openid: ${openid} 失效\n`);
        openid = await updateOpenid('请重新获取openid并输入：');
        spinner = ora('开始签到中').start();
        break;
      default:
    }
    await delay(delayTime);
  }
}

module.exports = checkin;
