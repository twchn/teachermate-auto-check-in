const checkin = require('./checkin');
const logger = require('../utils/logger');
const delay = require('../utils/delay');

main();

async function main() {
  let body;
  do {
    body = JSON.parse(await checkin());
  } while (!body);

  for (const i in body) {
    if (!body.hasOwnProperty(i))
      continue;

    switch (body[i]) {
      case 'repeat sign in':
        console.log('你已签过到了');
        await delay(5 * 60 * 1000);  // 一般课堂签到限时5分钟
        return main();
      default:
        console.log(`第${body[i][4]}次签到成功，你是第${body[i][1]}位`);
        logger(`${body[i][5]} 第${body[i][4]}次签到成功，名次第${body[i][1]}位\n`);
        return main();
    }
  }
}
