const a = 10;
const obj = {
  a: 13,
  b: () => {
    console.log(this.a);
  },
  c: function () {
    console.log(this.a)
  },
  d: function () {
    return () => {
      console.log(this);
    }
  },
  e: function () {
    return this.b
  }
}
obj.b(); // undefined 这里的this指向window
obj.c(); // 13 这里的this指向obj对象
obj.d()(); // obj对象 这里第一个function的this指向obj对象, return的this也是指向obj对象
obj.e()(); // undefined 这里的e: function的this指向obj对象, b: function的this指向window