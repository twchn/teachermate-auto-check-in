const getCourseId = require('./getCourseId');
const createRequest = require('../utils/createRequest');
const delay = require('../utils/delay');
const getData = require('../utils/getData');
const updateOpenid = require('./updateOpenid');
const updateDelayTime = require('./updateDelayTime');
const updateLocation = require('./updateLocation');
const logger = require('../utils/logger');

async function checkin() {
  let openid = '';
  let delayTime = 0;  // 每次尝试签到的延迟时间
  let lon = 0;  // 经度
  let lat = 0;  // 纬度
  try {
    openid = await getData('openid', updateOpenid);
    delayTime = await getData('delayTime', updateDelayTime);
    const location = await getData('location', updateLocation);
    lon = location.lon;
    lat = location.lat;
  } catch (e) {
    console.error(e);
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
