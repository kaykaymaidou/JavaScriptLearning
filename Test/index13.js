/**
 * 请写出对一个二维数组数据计算笛卡尔积的示例代码
 * 例子: [['A', 'B'], ['1', '2', '3'], ['X']] 转为笛卡尔积 [['A', '1', 'X'], ['A', '2', 'X'], ['A', '3', 'X'], ['B', '1', 'X'], ['B', '2', 'X'], ['B', '3', 'X']]
 * 
 * 笛卡尔积定义: 
 * 假设集合 A={a, b}, 集合B={0, 1, 2}, 则两个集合的笛卡尔积为{(a, 0), (a, 1), (a, 2), (b, 0), (b, 1), (b, 2)}
 * 笛卡尔积的使用场景: 
 * 计算出商品的SKU, SKU是英语中Stock Keeping Unit的缩写, 直译过来就是存货单元
 * 举个例子, 女孩子去买衣服, 找到喜欢的款式, 喜欢的颜色, 还得找到自己的尺码 -> 款式 + 颜色 + 尺码就是这里说的SKU, 是我们识别产品所必须的, 也是商场进出存的最小单元
 */
const array = [['2019', '2020', '2021', '2022'], ['白色', '灰色', '蓝色', '黑色', '绿色'], ['S', 'M', 'L']]
// 计算笛卡尔积
function calcDescartes(array) {
  // 如果数组的长度小于2即表示该数组只有一个元素或者为空, 返回该数组即可
  if (array.length < 2) return array;
  /*
    reduce方法: 第一个参数是回调function, 第二个参数是传递给函数的初始值(可选)
    回调function的是个参数: total[必须, 初始值或者计算结束后返回值]; currentValue[必须, 当前元素]; currentIndex(可选, 当前下标); arr(可选, 当前元素所属数组对象)
    reduce()可以作为一个高阶函数, 用于函数的compose组合
    注意: reduce()对于空数组是不会执行回调函数的, 并且不会改变原数组

    当没有传入初始值时, total是从数组中第一个元素开始的, currentValue是第二个元素,
      而后total会变成计算后的值, 例如: 计算数组里的和, [1, 2, 3], 第一次进来total为1, 第二次为1+2的计算结果3
    但是当传入初始值(initiaValue)后, 第一个total将是initivalValue, currentValue将是数组中的第一个元素
   */
  return array.reduce((total, currentValue) => {
    let result = [];
    total.forEach(t => {
      currentValue.forEach(cv => {
        if (t instanceof Array) {
          result.push([...t, cv]);
        } else {
          result.push([t, cv]);
        }
      })
    })
    return result;
  })
}

console.log(calcDescartes(array))

/**
 * 实现一个reduce函数
 */
Array.prototype.myReduce = function (fn, initialValue) {
  // 获取当前数组
  var currentArray = this
  // 若不存在初始值, 则total为原数组的第一个元素, 相反则赋值为初始值
  var total = typeof initialValue === 'undefined' ? currentArray[0] : initialValue
  // 切割位置, 若不存在初始值, 则初始位置设置为第二个元素开始, 相反从第一个元素开始切割
  var slicePosition = typeof initialValue === 'undefined' ? 1 : 0
  // 根据切割位置切割当前数组返回新的数组进行循环
  currentArray.slice(slicePosition).forEach(function (currentValue, index) {
    // 重新赋值total的值为回调函数处理结果 (index + slicePosition是因为slicePosition起始值可能为1)
    total = fn(total, currentValue, index + slicePosition, currentArray)
  })
  return total
}

const testArray = [1, 3, 5, 98, 13]
const result = testArray.myReduce((total, currentValue) => {
  return total + currentValue
}, 20)

console.log(result)

// ------------- reduce函数的应用 -------------
/**
 * pipe函数
 * pipe函数是函数柯里化的一种,
 * 当第一个函数执行完以后才执行第二个函数或者第二个函数需要第一个函数的结果作为参数传入第二个函数,
 * 此时就需要函数柯里化
 * 
 * 函数柯里化的好处:
 * 参数复用
 * 提前返回
 * 延迟计算/运行
 * 
 * @param  {...any} functionList 扩展运算符函数数组
 * @returns 
 */
function pipe (...functionList) {
  return function (input) {
    functionList.reduce((prev, fn) => {
      return fn(prev)
    }, input)
  }
}

/**
 * 高阶组件, 详情可以请看React的高阶组件
 * 高阶组件是一种重复利用组件逻辑的技术, 接受一个组件, 并且返回一个组件
 */

/**
 * 
 */
