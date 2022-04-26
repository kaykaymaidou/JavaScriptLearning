var foo = 1;

function main() {
  alert(foo);
  var foo = 2;
  alert(this.foo)
  this.foo = 3;
}

// 变量提升后
function mainUpdate() {
  var foo;
  alert(foo);
  foo = 2;
  alert(this.foo)
  this.foo = 3;
}

/**
 * 执行以下代码会输入什么
 */
var m1 = main();
// m1输出结果为 undefined 和 1;
// 原因就是实际是 var m1 = window.main(), 再之由于变量提升(mainUpdate)第一个foo是undefined, 第二个foo因为this此时指向调用的实例即window, 即window.foo所以是 1
var m2 = new main();
// m2输出结果为 undefined 和 undefined
// 原因是不仅变量提升了二七还因为 new 操作符改变了上下文指向 m2, 即 this.foo 等同于 m2.foo 

/**
 * 如果想要 var m1 = main() 产生的 m1 和前面的 m2 完全一致, 又该如何改造main函数?
 */
// 只需要把 foo 赋值为 undefined 就行
function main2() {
  var foo;
  alert(foo);
  foo = undefined;
  alert(this.foo)
  this.foo = 3;
}
