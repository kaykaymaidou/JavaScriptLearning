// 输出什么
var test = (function (a) {
  this.a = a;
  return function (b) {
    return this.a + b;
  }
}(function (a, b) {
  return a;
}(1, 2)));

console.log(test(4));

// 答案输出5, 考的是闭包还有自执行还有return
