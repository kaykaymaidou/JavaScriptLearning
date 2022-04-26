// 定时器
let timer = null;
// 是否锁住当前方法不执行
let lock = false;
/**
 * 节流原理: 在一定时间内, 只能触发一次
 *
 * @param {Function} fn 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function throttle(fn, wait = 500, immediate = true) {
  if (immediate) {
    if (!lock) {
      // 锁住方法再规定时间内不执行
      lock = true
      // 立即执行函数
      typeof fn === 'function' && fn()
      // 定时器在延时后解锁
      timer = setTimeout(() => {
        // 规定时间到了, 解锁方法
        lock = false
        timer = null
        clearTimeout(timer)
      }, wait)
    }
  } else if (!lock) {
    // 锁住方法再规定时间内不执行
    lock = true
    // 如果是非立即执行，则在wait毫秒内的结束处执行
    timer = setTimeout(() => {
      // 规定时间到了, 解锁方法下次也可执行
      lock = false
      // 执行方法
      typeof fn === 'function' && fn()
      timer = null
      clearTimeout(timer)
    }, wait)
  }
}

/**
 * 节流方式2
 * @param {Function} fn 要执行的回调函数
 * @param {Number} delay 延时的时间
 * @returns Function
 */
const throttleFn = (fn, delay) => {
  // 初始化上次调用时间
  let last = 0
  // 以闭包的方式来实现
  return function () {
    // 保存参数
    let args = arguments
    // 记录当前时间
    let now = +new Date()
    // 如果当前时间减去上一次执行的时间大于传入的执行时间 [实现了定时触发也就是节流]
    if ((now - last) > delay) {
      last = now
      // 修正this指向, 并执行
      fn.apply(this, args)
    }
  }
}