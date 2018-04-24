const { question } = require('../utils/readline');
const store = require('../utils/store');

async function updateOpenid(prompt = '请输入openid：') {
  let openid = '';
  try {
    do {
      openid = await question(prompt);
      if (!openid) {
        console.log('openid不能为空，请重新输入！');
      }
    } while (!openid);
  } catch (e) {
    console.log(e);
  }
  store({ openid });
  return openid;
}

module.exports = updateOpenid;
