const testData = [{
    name: 'foo',
    age: 12,
    class: '一年级',
    habbit: 'sleep, eat, drink'
  },
  {
    name: 'bar',
    age: 17,
    class: '二年级',
    habbit: 'run, basketball, baseball'
  },
  {
    name: 'baz',
    age: 22,
    class: '二年级',
    habbit: 'lie, sit, squat'
  },
  {
    name: 'diz',
    age: 32,
    class: '三年级',
    habbit: 'developing, typing, programming'
  },
  {
    name: 'rat',
    age: 15,
    class: '二年级',
    habbit: 'play, football, game'
  },
  {
    name: 'rum',
    age: 18,
    class: '二年级',
    habbit: 'tennis, table tennis, ps4'
  },
];

function query(data) {
  this.data = data;
  return this;
}
// 查询方法
where = function (Fn) {
  // filter回调[currentValue: 当前元素的值, index: 当前元素的索引值, arr: 当前元素属于的数组对象]
  // filter第二个参数为对象作为该执行回调时使用，传递给函数
  this.data = this.data.filter(Fn);
  return this;
}
// 排序方法
orderby = function (key, desc) {
  this.data.sort((a, b) => {
    const aValue = a[key];
    const bValue = b[key];
    return desc ? bValue - aValue : aValue - bValue;
  })
  return this;
}
// 分组方法
groupby = function (key) {
  // reduce回调[total: 初始值或者计算结束后的返回值, currentValue: 当前元素, currentIndex: 当前元素的索引, arr: 当前元素所属的数组对象]
  // reduce第二个参数为传递给函数的初始值
  this.data = Object.values(this.data.reduce((result, currentValue) => {
    if (result[currentValue[key]]) {
      result[currentValue[key]].push(currentValue);
    } else {
      result[currentValue[key]] = [currentValue];
    }
    return result;
  }, {}));
  return this;
}
// 执行方法
execute = function () {
  console.log(this.data);
}

// test
query(testData)
  .where(item => item.age > 17)
  .orderby('age', true)
  .groupby('class')
  .execute();

// map() 方法返回一个新数组, 数组中的元素为原始数组元素调用函数处理后的值[map() 不会对空数组进行检测且不会改变原始数组]
// filter() 方法创建一个新的数组, 新数组中的元素是通过检查指定数组中符合条件的所有元素[filter() 不会对空数组进行检测且不会改变原始数组]
// sort() 方法用于对数组的元素进行排序[sort() 方法会改变原始数组]
// reduce() 方法接收一个函数作为累加器, 数组中的每个值(从左到右)开始缩减, 最终计算为一个值[reduce() 对于空数组是不会执行回调函数的且不会修改原数组]
