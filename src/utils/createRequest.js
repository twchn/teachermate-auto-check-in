const request = require('request').defaults({ jar: true });
const querystring = require('querystring');

function randomUserAgent() {
  const userAgentList = [
    'Mozilla/5.0 (iPhone; CPU iPhone OS 9_3 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Mobile/13E233 MicroMessenger/6.3.15 NetType/WIFI Language/zh_CN',
    'Mozilla/5.0 (Linux; Android 5.0.1; GT-I9502 Build/LRX22C; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/43.0.2357.121 Mobile Safari/537.36 MicroMessenger/6.1.0.78_r1129455.543 NetType/WIFI'
  ];
  const index = Math.floor(Math.random() * userAgentList.length);
  return userAgentList[index];
}

function createRequest(
  host,
  path,
  method,
  data
) {
  const options = {
    baseUrl: `https://${host}`,
    url: path,
    method,
    headers: {
      Accept: '*/*',
      'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      Connection: 'keep-alive',
      // Cookie: 'wx_csrf_cookie=8f98ba6edb8bcf4739ad9979199f2dc9',
      Host: host,
      Origin: `https://${host}`,
      'User-Agent': randomUserAgent()
    },
    followRedirect: false
  };

  if (method.toUpperCase() === 'POST') {
    options.form = data;
  } else if (method.toUpperCase() === 'GET') {
    options.url += `?${querystring.stringify(data)}`;
  }

  return new Promise((resolve, reject) => {
    request(options, (error, res, body) => {
      if (error) {
        reject(error);
      } else {
        resolve({ error, res, body });
      }
    });
  });
}

module.exports = createRequest;
