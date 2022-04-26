
console.log([] == 0) // -> ToPrimitive([]) == 0 -> '' == 0 -> ToNumber('') == 0 -> 0 == 0 -> true
console.log([0] == 0) // ToPrimitive([0]) == 0 -> '0' == 0 -> ToNumber('0') == 0 -> 0 == 0 -> true
console.log({} == '[object Object]') // ToPrimitive({}) == '[object Object]' -> '[object Object]' == '[object Object]' -> true

/**
 * ES5以前比较两个值是否相等, 只有两个运算符: 相等运算符 == 以及 严格相等运算符 ===
 * == 的缺点在于会隐式的类型转换
 * === 的缺点在于 NaN不等于NaN, +0 与 -0相等
 * 因此JS 缺少一种能够在任何环境中, 只要两个值一样就相等, Object.is()就在ES6出现了.
 * 
 * 关于 +0 和 -0 的比较
 * V8 源码使用了一个技巧: 比较他们的倒数;
 * 对于大部分语言来讲, 0是不能做除数, 很多语言会抛出 DivideByZeroException;
 * 但是大部分语言中 0.0 可以做除数, 因为 javascript 只有 number 类型, 所以我们可以认为这里的值是 +0.0 和 -0.0
 * +0.0的倒数是 Infinity, 而 -0.0的倒数是 -Infinity, 因此比较的是 Infinity === -Infinity
 * 但是, 0/0结果则是NaN
 * 
 * Object.is()和===的区别
 * 区别在于 +0, -0以及NaN与NaN比较
 * Object.is 使用ES6 "Same-value equality"(同值相等)算法, 内部严格比较SameValue(x, y)
 */
console.log(+0 === -0) // true
console.log(NaN === NaN) // false
console.log(Object.is(+0, -0)) // false
console.log(Object.is(NaN, NaN)) // true
console.log(Object.is(NaN, 0 / 0)) // true

// Polyfill中对Object.is()的实现:
if (!Object.is) {
  Object.is = function (x, y) {
    // ES6的SameValue算法
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  };
}

/**
 * 后语: 
 * 正零(+0)和负零(-0)对于表示非常规数值(无穷大、NaN)非常重要, 但是也带来了很多麻烦;
 * javascript 的位操作内部都使用了 ToInt32 算法
 * 因为 32 位整数类型只有一个 0(没有符号区别), -0 的符号在反操作后并不会保留下来;
 * 例如 Object.is(~~(-0), -0) 和 Object.is(-0 << 2 >> 2, -0) 都会得到 false [~取反码, << 位运算]
 */
