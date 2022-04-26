/**
 * 6大继承
 * 1.原型链继承
 * 2.构造函数继承
 * 3.组合继承(1+2)
 * 4.原型式继承
 * 5.寄生式继承
 * 6.寄生组合式继承()
 */

// 定义一个父类
function Animal(name) {
  this.name = name;
  this.sleep = function () {
    console.log(this.name + '正在睡觉！');
  }
}
// 父类原型上添加属性
Animal.prototype.eat = function (food) {
  console.log(this.name + '正在吃：' + food);
};

/**
 * 原型链继承
 * 原理: 让子类的实例 Dog 的原型等于父类的实例
 * 优点:
 *  实例可继承子类构造函数属性, 父类构造函数属性，父类原型的属性(子类不会继承父类实例的属性)
 *  父类新增原型方法/原型属性, 子类都能访问到
 *  实例是子类的实例, 也是父类的实例
 * 缺点: 
 *  子类无法向父类构造函数传参;
 *  继承单一;
 *  所有子类都会共享父类实例的属性(原型上的属性是共享的, 一个子类修改了原型属性, 另一个子类的原型属性也会被修改)
 *  无法实现多继承;
 */
function Dog() {
  this.name = 'Lucky';
}
Dog.prototype = new Animal();
var dog = new Dog();
// 继承了子类属性
console.log(dog.name);
// 继承了父类构造函数方法
dog.sleep();
// 继承了父类原型的方法
dog.eat('bone');
console.log(dog instanceof Dog);
console.log(dog instanceof Animal);

// 分割线
console.info('---------------------------------');

/**
 * 构造函数继承
 * 原理: 用 call()或 apply()将父类构造函数引入子类函数(在子类函数中做了父类函数的自执行)
 * 优点:
 *  只继承了父类构造函数的属性, 没有继承父类原型的属性
 *  子类可向父类构造函数传参
 *  可以实现多继承
 * 缺点:
 *  只能继承父类构造函数的属性/方法，不能继承原型属性/方法
 *  无法实现函数复用, 每个子类都有父类实例函数的副本影响性能
 *  实例并不是父类的实例, 只是子类的实例
 */
function Cat(name) {
  Animal.call(this, 'Nana');
  this.name = name;
}
var cat = new Cat('Nance');
console.log(cat.name);
cat.sleep();
console.log(cat instanceof Cat);
console.log(cat instanceof Animal);

// 分割线
console.info('---------------------------------');

/**
 * 组合继承
 * 原理: 通过调用父类构造, 继承父类的属性并保留传参的优点, 然后通过将父类实例作为子类原型, 实现函数复用
 * 优点:
 *  可以继承父类原型/构造函数上的属性/方法, 可以传参, 可复用
 *  每个子类引入的构造函数属性是私有的
 * 缺点:
 *  调用了两次父类构造函数(耗内存), 生成了两份实例(子类的构造函数会代替原型上的那个父类构造函数)
 */
function Pig(name) {
  Animal.call(this, name);
}
Pig.prototype = new Animal();
var pig = new Pig('Peppa');
// 继承了构造函数属性
console.log(pig.name);
pig.sleep();
// 继承了原型方法
pig.eat('meat');

// 分割线
console.info('---------------------------------');

/**
 * 原型式继承
 * 原理: 实际上是对原型链继承的一个封装, 也是ES5 Object.create 的模拟实现, 将传入的对象作为创建的对象的原型
 * 优点:
 *  类似于复制一个对象, 用函数来包装, 父类新增原型方法/原型属性, 子类都能访问到
 * 缺点:
 *  所有实例都会继承原型上的属性, 跟原型链继承一样
 *  无法实现复用(新实例属性都是后面添加的)
 */
function createObj(obj) {
  function Fn() {};
  Fn.prototype = obj;
  return new Fn();
}
var animal = new Animal('Lulu');
var cow = createObj(animal);
// 继承了父类属性
console.log(cow.name);
// 继承了父类原型属性
cow.eat('grass');

// 分割线
console.info('---------------------------------');

/**
 * 寄生式继承
 * 原理: 其实是对原型式继承的第二次封装, 过程中对继承的对象进行了拓展
 * 优点:
 *  跟借用构造函数模式一样, 每次创建对象都会创建一遍方法
 *  没有创建自定义类型, 因为只是套了个壳子返回对象, 顺理成章就成了创建的新对象
 * 缺点:
 * 
 */
function createFn(obj) {
  var animal = Object.create(obj);
  animal.name = 'Gaga';
  return animal;
}
var horse = createFn(new Animal);
console.log(horse.name);
horse.eat('grass');

// 分割线
console.info('---------------------------------');

/**
 * 寄生组合式继承
 * 原理: 在函数内返回对象然后调用, 函数的原型等于另一个实例, 在函数中用apply或者call引入另一个构造函数(可传参)
 * 优点:
 *  只调用了一次 Parent 构造函数, 并且因此避免了在 Parent.prototype 上面创建不必要的多余的属性
 *  原型链还能保持不变
 *  还能够正常使用 instanceof 和 isPrototypeOf
 * 缺点:
 * 
 */
 function newObject(obj) {
  function Fn() {};
  Fn.prototype = obj;
  return new Fn();
}
// 继承了父类原型
var newPrototype = newObject(Animal.prototype);
function Goose() {
  // 继承了父类构造函数
  Animal.call(this);
}
// 继承了newPrototype
Goose.prototype = newPrototype;
// 修复实例
newPrototype.constructor = Goose;
// goose继承了本身构造函数的属性, 父类实例, newPrototype的属性
var goose = new Goose();
console.log(goose.name);
