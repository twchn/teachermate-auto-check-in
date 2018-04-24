const querystring = require('querystring');
const createRequest = require('../utils/createRequest');

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
        return { statusCode: res.statusCode };
      case 302:
        const redirectUrl  = res.headers.location;
        return { statusCode: res.statusCode, data:querystring.parse(redirectUrl.split('?')[1])['course_id'] };
      case 401:
        console.log(`openid${openid}已失效！`);
        return { statusCode: res.statusCode};
      default:
        console.log(res.statusCode, ' 获取课程id失败！');
        return { statusCode: res.statusCode };
    }
  } catch(e) {
    console.log(e);
  }
}

module.exports = getCourseId;
