const { question } = require('../utils/readline');
const store = require('../utils/store');

async function updateOpenid(prompt = '[可选]请输入每次尝试签到的延迟时间（ms)：') {
  let delayTime = 0;  // 每次尝试签到的延迟时间
  try {
    const inputDelayTime = parseInt(await question(prompt), 10);
    delayTime = inputDelayTime >= 0 ? inputDelayTime : 2000;
  } catch (e) {
    console.log(e);
  }
  store({ delayTime });
  return delayTime;
}

module.exports = updateOpenid;
