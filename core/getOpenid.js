const { question } = require('./readline');

async function getOpenid(prompt = '请输入openid：') {
  let openid = '';
  do {
    openid = await question(prompt);
    if (!openid) {
      console.log('openid不能为空，请重新输入！');
    }
  } while (!openid);
  return openid;
}

module.exports = getOpenid;
