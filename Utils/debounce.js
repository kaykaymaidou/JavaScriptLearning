// 计时器
let timeout = null;
/**
 * 防抖原理: 一定时间内, 只有最后一次操作, 再过wait毫秒后才执行函数
 *
 * @param {Function} fn 要执行的回调函数
 * @param {Number} wait 延时的时间
 * @param {Boolean} immediate 是否立即执行
 * @return null
 */
function debounce(fn, wait = 500, immediate = false) {
  // 清除定时器
  if (timeout !== null) clearTimeout(timeout)
  // 立即执行，此类情况一般用不到
  if (immediate) {
    const callNow = !timeout
    timeout = setTimeout(() => {
      timeout = null
    }, wait)
    if (callNow) typeof fn === 'function' && fn()
  } else {
    // 设置定时器，当最后一次操作后，timeout不会再被清除，所以在延时wait毫秒后执行func回调方法
    timeout = setTimeout(() => {
      typeof fn === 'function' && fn()
    }, wait)
  }
}

/**
 * 防抖方式2
 * 每次触发事件都会重新计算, 但是设定了有一个初始的执行时间类似节流效果避免一直操作没有任何响应
 * @param {Function} fn 要执行的回调函数
 * @param {Number} delay 延时的时间
 * @returns Function
 */
const debounceFn = (fn, delay) => {
  // 初始化上一次调用的时间
  let last = 0
  //  初始化定时器对象
  let timer = null
  return function () {
    // 保存参数
    let args = arguments
    // 当前时间
    let now = +new Date()
    // 如果当前时间减去上一次的时间小于当前时间说明设定的时间还没过, 但是进来了则重新开始倒计时, 只执行最后一次对的函数
    // 否则如果当前时间减去上一次的时间大于等于于当前时间说明时间还没开始倒计时/倒计时时间已过, 应当立即执行
    if ((now - last) < delay) {
      // 清除定时器
      clearTimeout(timer)
      // 重新开始倒计时
      timer = setTimeout(() => {
        // 修正this指向, 并执行
        fn.apply(this, args)
        // 记录本次执行的时间
        last = now
      }, delay);
    } else {
      // 直接开启
      last = now
      // 修正this指向, 并执行
      fn.apply(this, args)
    }
  }
}