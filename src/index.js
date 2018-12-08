const checkIn = require('./checkIn');
const { logger, delay } = require('./utils');

async function main() {
  let body;
  do {
    body = await checkIn();
  } while (!body);

  const values = Object.values(JSON.parse(body));
  for (let i = 0; i < values.length; i += 1) {
    switch (values[i]) {
      case 'repeat sign in':
        console.log('你已签过到了，五分钟后会再次开启签到');
        await delay(5 * 60 * 1000); // 一般课堂签到限时5分钟
        return main();
      default:
        console.log(`第${values[i][4]}次签到成功，你是第${values[i][1]}位`);
        logger(`${values[i][5]} 第${values[i][4]}次签到成功，名次第${values[i][1]}位\n`);
        return main();
    }
  }
}

main();
