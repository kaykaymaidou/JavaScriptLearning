// 模拟 new 操作符, 看看它都做了什么
function newOperator (Fn, ...rest) {
  // 先创建一个对象
  let obj = {};
  // 空对象的原型指针指向构造函数的原型对象
  obj.__proto__ = Fn.prototype;
  // 利用函数的apply方法改变this指向, 在空对象上挂载属性或方法
  Fn.apply(obj, ...rest);
  // 返回对象
  return obj
}

function Parent (name) {
  this.name = name;
}

const children = new Parent('Lulu');

console.log(children);

const child = newOperator(Parent, ['Lulu']);

console.log(child);
