const checkin = require('./checkin');

const openid = '3256bdd1dc8d743e88c56f3d24cb9bcb';
const delayTime = 2000;  // 每次尝试签到的延迟时间

main();

async function main() {
  let body;
  do {
    body = JSON.parse(await checkin(openid, delayTime));
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
