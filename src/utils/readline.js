const readline = require('readline');

function question(text) {
  return new Promise((resolve, reject) => {
    if (typeof text !== 'string') {
      reject(new TypeError('Question text must be a string!'));
      return;
    }
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(text, (answer) => {
      rl.close();
      resolve(answer);
    });
  });
}

module.exports = {
  question
};
