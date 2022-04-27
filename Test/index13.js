// 找出字符串中出现次数最多的字符
let word = 'asdasddsfdsfadsfdghdadsdfdgdasd'
function findMostChar (word) {
  let obj = {};
  let max = 0;
  let maxChar = '';
  // 第一个循环, 循环字符填充到对象里计数
  for (let i = 0; i < word.length; i++) {
    let char = word.charAt(i);
    if (obj[char]) {
      // 次数加一
      obj[char]++;
    } else {
      // 若第一次出现, 次数记为1
      obj[char] = 1;
    }
  }
  // 第二个循环, 循环对象找出里面数量最大的字符
  for (let key in obj) {
    if (max < obj[key]) {
      // max始终储存次数最大的那个
      max = obj[key];
      // 那么对应的字符就是当前的key
      maxChar = key;
    }
  }
  return maxChar
}
