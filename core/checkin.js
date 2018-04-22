const { createRequest } = require('../utils/util');
const delay = require('../utils/delay');
const getCourseId = require('./getCourseId');

async function checkin(openid, delayTime = 2000) {
  let courseId = '';
  do {
    await delay(delayTime);
    courseId = await getCourseId(openid);
  } while (!courseId);

  console.log('courseId', courseId);
  try {
    const { error, res, body } = await createRequest(
      'www.teachermate.com.cn',
      'wechat-api/v1/class-attendance/student-sign-in',
      'POST',
      {
        openid,
        course_id: courseId,
        lon: 0,
        lat: 0,
        wx_csrf_name: '688f1b52953ca0c458e9b8624356ac1b'
      }
    );
    if (!error && res.statusCode === 200) {
      return body;
    }
  } catch (e) {
    console.log(e.message);
  }
}

module.exports = checkin;
