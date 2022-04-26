/**
 * JavaScript的位运算
 * 由于javascript试图创建完全无类型(弱类型)的数据, 因此数字以64位浮点值存储, 即双精度的浮点数
 * javascript中没有你想使用的Integer(整型)类型
 * 当我们需要用到integer类型时, javascript会内部执行 Toint32 方法(浏览器内部函数, 外部不可调用)将值直接转化为32位的integer以供调用, 并将原值瞬间转换回双精度浮点型。
 */
var a = "10" | 0; // "10" -> ToNumber("10") -> 10 | 0 按位或, 只要有一个true则返回true的值, 如: 10
console.log("Bitwise Or a is : " + a); // 10

var b = "s1132" | 0; // "s1132" -> ToNumber("s1132") -> NaN | 0 按位或, 只要有一个true则返回true的值, 如: 0
console.log("Bitwise Or b is : " + b); // 0

var c = [1, 3, 2] & 1; // [1, 3, 2] -> ToPrimitive([1, 3, 2]) -> [1, 3, 2].toString() -> "1, 3, 2" -> ToNumber("1, 3, 2") -> NaN | 0 按位与, 要两个都为true才返回true的值, 如: 0
console.log("Bitwise And c is : " + c); // 0

var d = [1] | 0; // [1] -> ToPrimitive([1]) -> NaN -> [1].toString() -> "1" -> ToNumber("1") -> 1 | 0 按位或, 只要有一个true则返回true的值, 如: 1
console.log("Bitwise Or d is : " + d); // 1

var e = ~ (function () {})(); // (function () {})() -> undefinded -> ToNumber(undefinded) -> 0 按位非, 取该值原码的反码, 根据反码取得补码转换得到的值, 简单的计算是, 取相反符号然后减一
console.log("Bitwise Not e is : " + e); // -1

var f = ({}) | 0; // 同上面 c 得到 0, 0 | 0 得到 0
console.log("Bitwise Or f is : " + f); // 0

var g = ([1]) | 0; // 同上面 c 得到 1, 1 | 0 得到 1
console.log("Bitwise Or g is : " + g); // 1

var h = "1ss" ^ 0; // 同上面 b 得到 0, 0 ^ 0 按位异或, 两个数字一样, 结果为 0; 两个数字不一样, 结果就是 1
console.log("Bitwise Exclusive Or h is : " + h); // 0