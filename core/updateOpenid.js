const { question } = require('../utils/readline');
const store = require('../utils/store');

async function updateOpenid(prompt = '如何获取openid请查看 https://github.com/taoweicn/teachermate-auto-check-in/blob/master/README.md#快速开始\n请输入openid：') {
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
