/**
 * 链式函数
 * 其原理是通过每次方法执行完后返回this对象, 这样后面的方法就可以继续在this环境下执行
 * 
 * 优点:
 * 使得异步编程的流程更加清晰, 不会像回调函数一样相互耦合, 难以分辨函数的执行顺序且维护困难
 * 
 * 缺点:
 * return只能在最后返回, 以至于返回值的时候不能返回this当前对象
 */

// 声明一个构造函数
function Person () {}

Person.prototype = {
  getAge: function () {
    return this.age
  },
  setAge: function (age) {
    this.age = age
    return this
  }
}

var person = new Person()

console.log(person.setAge(25).getAge())
