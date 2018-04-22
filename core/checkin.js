const querystring = require('querystring');
const { createRequest } = require('../utils/util');
const delay = require('../utils/delay');

const openid = '3256bdd1dc8d743e88c56f3d24cb9bcb';
const delayTime = 2000;  // 每次尝试签到的延迟时间

main(openid);

async function main(openid) {
  let body;
  do {
    body = JSON.parse(await checkin(openid));
  } while (!body);

  for (const i in body) {
    if (!body.hasOwnProperty(i))
      continue;

    switch (body[i]) {
      case 'repeat sign in':
        console.log('你已签过到了');
        break;
      default:
        console.log(`第${body[i][4]}次签到成功，你是第${body[i][1]}位`);
    }
  }
}

async function getCourseId(openid) {
  try {
    const { error, res } = await createRequest(
      'www.teachermate.com.cn',
      'wechat/wechat/guide/signin',
      'GET',
      { openid }
    );
    if (error) {
      console.log(error);
      return;
    }
    switch (res.statusCode) {
      case 200:
        console.log('签到未开启！');
        break;
      case 302:
        const redirectUrl  = res.headers.location;
        return querystring.parse(redirectUrl.split('?')[1])['course_id'];
      case 401:
        console.log('openid已失效！');
        break;
      default:
        console.log(res.statusCode, ' 获取课程id失败！');
    }
  } catch(e) {
      console.log(e.message);
  }
}

async function checkin(openid) {
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
