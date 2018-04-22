const querystring = require('querystring');
const { createRequest } = require('../utils/util');

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

module.exports = getCourseId;
