const checkin = require('./checkin');

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
        break;
      default:
        console.log(`第${body[i][4]}次签到成功，你是第${body[i][1]}位`);
    }
  }
}
