/**
 * prototype 是函数Function才有的属性
 * 
 * __proto__是每个对象都有的属性
 *  但是该属性不是一个规范的属性, 只是部分浏览器实现了此属性, 对应的标准属性应该是[[Prototype]]
 * 注: 大多数情况下, __proto__可以理解为"构造器的原型", 即__proto__ === constructor.prototype (但是Object.create()创建的对象不符合此等式)
 */
// 默认构造函数(除Object外)的 prototype.__proto__ 全部指向 Object.prototype; Object.prototype.__proto__为原项链的顶端, 指向null
console.log(Object.prototype.__proto__ === null) // true, 原型链的尽头
console.log(Function.prototype.__proto__ === Object.prototype) // true
console.log(Number.prototype.__proto__ === Object.prototype) // true

var a = {};
console.log(a.prototype);  // undefined
console.log(a.__proto__);  // Object {}
var b = function(){}
console.log(b.prototype);  // b {}
console.log(b.__proto__);  // function() {}

 /**
  * __proto__根据创建的方法不一样, 指向也不同
  */
// 字面量方式
var a = {}
console.log(a.__proto__) // Object {}
console.log(a.__proto__ === Object.prototype) // true
console.log(a.__proto__ === a.constructor.prototype); // true
// 构造器方式
var A = function() {};
var a = new A();
console.log(A.__proto__ === Function.prototype) // 自定义构造函数A的构造函数原型是Function的原型属性
console.log(A.prototype.__proto__ === Object.prototype) // 自定义构造函数A的原型对象的构造函数原型是Object的原型属性
console.log(a.__proto__); // A {}
console.log(a.__proto__ === A.prototype) // true
console.log(a.__proto__ === a.constructor.prototype); // true
// Object.create()方式
var a1 = { a: 1 }
var a2 = Object.create(a1);
console.log(a2.__proto__); // Object { a: 1 }
console.log(a2.__proto__ === a1); // true
console.log(a2.__proto__ === a1.constructor.prototype); // false(此处即为上面 注意 中的例外情况)

/**
 * 什么是原型链?
 * 由于__proto__是任何对象都有的属性, 而js里面万物皆对象
 * 因此会形成一条__proto__连接起来的链条, 递归访问__proto__必须到最终的尽头, 尽头的值就是null
 * 
 * 当js引擎查找对象的属性时, 先查找对象本身是否存在该属性, 如果不存在, 则会在原型链上找, 但不会查找自身的prototype原型
 */
var A = function () {};
var a = new A();
console.log(a.__proto__ === A.prototype); // true
console.log(A.prototype.__proto__ === Object.prototype); // true
console.log(Object.prototype.__proto__ === null); // true
console.log(a.__proto__); // A {}（即构造器function A 的原型对象）
console.log(a.__proto__.__proto__); // Object {}（即构造器function Object 的原型对象）
console.log(a.__proto__.__proto__.__proto__); // null



// instanceOf
Function instanceof Object; // true
Object instanceof Function; // true
/**
 * instanceOf 通俗的讲, 原理是
 * 左边 instanceOf 右边, 会递归左边的__proto__一直找到顶端null,
 * 如果没出现左边递归的原型__proto__ === 右边的原型对象prototype, 则返回false, 相反则返回true
 * 总结: instanceof检测左侧的__proto__原型链上, 是否存在右侧的prototype原型
 */
// -- 因此Function和Object的关系是 --
// Function的构造函数指向自己
console.log(Function.constructor === Function); // true
// Function的原型对象prototype以及原型属性__proto__指向匿名函数function () {}, 因此他俩相等
console.log(Function.__proto__); // function() {}
console.log(Function.prototype); // function() {}
console.log(Function.__proto__ === Function.prototype); // true
// Function.__proto__根据上面即匿名函数, 匿名函数的原型属性__proto__指向Object的原型对象prototype
console.log(Function.__proto__.__proto__ === Object.prototype); // true
// Object的原型对象prototype指向Function
console.log(Object.prototype === Function); // true
// Object的原型属性__proto__指向Function的原型对象prototype
console.log(Object.__proto__ === Function.prototype); // true

/**
 * 因此得出结论为啥Function和Object instanceOf彼此会是True
 * 
 * 总结就是:
 * 所有的构造器的constructor都指向Function(但是原型对象的构造器指向该构造函数)
 * Function的prototype指向一个特殊匿名函数, 而这个特殊匿名函数的__proto__指向Object.prototype
 */
console.log(Object.constructor === Function); // true
console.log(Function.constructor === Function); // true
console.log(Number.constructor === Function); // true
console.log(Object.prototype.constructor === Object); // true
console.log(Function.prototype.constructor === Function); // true
console.log(Number.prototype.constructor === Number); // true
