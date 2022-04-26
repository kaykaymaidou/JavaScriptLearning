// 存在一个数组需要将它的顺序打乱
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], sign = 1; 
arr.sort(function(a, b) {
  // 因为 Math.random 产生的数在 0~1 之间, 所以0.5两边的概率是相等的
  // 大于0.5时为升序, 小于0.5时为降序
  sign = (Math.random() > 0.5) ? 1 : -1;
  return (a - b) * sign;
});