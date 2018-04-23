const { createRequest } = require('../utils/util');
const { question } = require('./readline');
const delay = require('../utils/delay');
const getCourseId = require('./getCourseId');
const getOpenid = require('./getOpenid');

async function checkin() {
  let openid = '';
  let delayTime = 2000;  // 每次尝试签到的延迟时间
  let inputDelayTime;
  try {
    openid = await getOpenid('请输入openid：');
    inputDelayTime = await question('请输入每次尝试签到的延迟时间（ms）：');
    if (inputDelayTime) {
      delayTime = parseInt(inputDelayTime, 10);
    }
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
      openid = await getOpenid('请重新获取openid并输入：');
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
        lon: 0,
        lat: 0,
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
