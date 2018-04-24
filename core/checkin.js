const { createRequest } = require('../utils/util');
const { question } = require('../utils/readline');
const delay = require('../utils/delay');
const getCourseId = require('./getCourseId');
const getOpenid = require('./getOpenid');
const updateOpenid = require('./updateOpenid');
const logger = require('../utils/logger');

async function checkin() {
  let openid = '';
  let delayTime = 0;  // 每次尝试签到的延迟时间
  let lon = 0;  // 经度
  let lat = 0;  // 纬度
  try {
    openid = await getOpenid();
    const inputDelayTime = parseInt(await question('[可选]请输入每次尝试签到的延迟时间（ms)：'), 10);
    delayTime = inputDelayTime >= 0 ? inputDelayTime : 2000;
    const inputLocation = await question('[可选]请输入位置(经度 纬度)：');
    const inputLon = parseInt(inputLocation.split(' ')[0], 10);
    const inputLat = parseInt(inputLocation.split(' ')[1], 10);
    lon = inputLon >= 0 ? inputLon : 0;
    lat = inputLat >= 0 ? inputLat : 0;
  } catch (e) {
    console.log(e);
    return;
  }

  let courseId = {};
  do {
    console.log('签到中。。。');
    await delay(delayTime);
    courseId = await getCourseId(openid);
    if (courseId.statusCode === 401) {
      logger(`${new Date().toLocaleString()} openid: ${openid} 失效\n`);
      openid = await updateOpenid('请重新获取openid并输入：');
    }
  } while (!courseId.data);

  console.log('courseId', courseId.data);
  try {
    const { error, res, body } = await createRequest(
      'www.teachermate.com.cn',
      'wechat-api/v1/class-attendance/student-sign-in',
      'POST',
      {
        openid,
        course_id: courseId.data,
        lon,
        lat,
        wx_csrf_name: '688f1b52953ca0c458e9b8624356ac1b'
      }
    );
    if (!error && res.statusCode === 200) {
      return body;
    }
  } catch (e) {
    console.log(e);
  }
}

module.exports = checkin;
