/**
 * 模拟实现一个 Promise API 深刻理解 Promise
 * 
 * 参考Promises/A+规范: https://promisesaplus.com/#notes
 * 
 * 手写Promise包括以下内容:
 * 1.Promise对象
 * 2.Class类
 * 3.改变this指向(call, apply以及bind)
 * 4.事件循环EventLoop
 */
class myPromise {
  // promise有三个状态: pending(处理中状态), fulfilled(已完成状态), rejected(被拒绝状态)
  static PENDING = 'pending'
  static FULFILLED = 'fulfilled'
  static REJECTED = 'rejected'
  // 定义一个构造函数
  constructor(fn) {
    // 定义一个状态属性, promise默认状态是PENDING
    this.promiseStatus = myPromise.PENDING
    // resolve和reject方法接受一个参数, 定义为promiseResult
    this.promiseResult = null
    // 定义fulfilled和rejected的回调函数队列(先进先出), 用于缓存回调函数
    this.onFulfilledCallBack = []
    this.onRejectedCallBack = []
    // try/catch语法捕获抛出异常通过reject输出
    try {
      // promise会传入一个参数并调用, 调用时应该把this指向当前上下文
      fn(this.resolve.bind(this), this.reject.bind(this))
    } catch (error) {
      /*
      在抛出异常throw new Error()时, 其实会触发then的第二个方法, 即reject状态的回调函数
      实际上promise.catch()方法内部调用的是promise.then(undefined, onRejected)或者promise.then(null, onRejected)
      一般不建议使用then的第二个参数作为异常抛出(即使内部是调用then第二个参数输出异常的)
      因为, catch方法可以捕获前面then方法执行中的错误, 也更接近同步的写法(try/catch)
      */
      // 这里不用绑定this的原因是在内部调用的, this指向还是当前上下文;
      // 传进来的fn会改变this的指向, 因为this默认指向调用实例, 所以需要绑定当前上下文this
      this.reject(error)
    }
  }
  // 定义一个resolve方法
  resolve(resolveResult) {
    // resolve时更改promise状态fulfilled
    if (this.promiseStatus === myPromise.PENDING) {
      // 添加setTimeout是因为执行回调函数的时候可能后面的代码存在主线程宏任务, 例如:
      // resolve('123'); console.log(456); 此时应该先执行456再执行123因为resolve是异步任务
      setTimeout(() => {
        this.promiseStatus = myPromise.FULFILLED
        this.promiseResult = resolveResult
        // resolve时看看回调队列里是否存在未执行的回调函数, 执行一遍
        this.onFulfilledCallBack.forEach(cb => {
          cb(resolveResult)
        })
      })
    }
  }
  // 定义一个reject方法
  reject(rejectResult) {
    // reject时更改promise状态为rejected
    if (this.promiseStatus === myPromise.PENDING) {
      // 添加setTimeout是因为执行回调函数的时候可能后面的代码存在主线程宏任务, 例如:
      // resolve('123'); console.log(456); 此时应该先执行456再执行123因为resolve是异步任务
      setTimeout(() => {
        this.promiseStatus = myPromise.REJECTED
        this.promiseResult = rejectResult
        // reject时看看回调队列里是否存在未执行的回调函数, 执行一遍
        this.onRejectedCallBack.forEach(cb => {
          cb(rejectResult)
        })
      })
    }
  }
  // then方法可以传入两个参数, 两个参数都是函数: fulfilled成功方法以及rejected失败方法
  then(onFulfilled, onRejected) {
    // then方法里面的resolve和reject参数不仅仅是函数也可以是非函数, 例如: resolve('123')
    // 因此需要判断非函数时, onFulfilled和onRejected的调用: onFulfilled则通过回调输出; onRejected则抛出异常到catch 
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : resolveResult => resolveResult
    onRejected = typeof onRejected === 'function' ? onRejected : rejectResult => { throw rejectResult }
    // 定义一个promise对象用于回调链式调用
    const promiseObj = new myPromise((resolve, reject) => {
      // 状态不可改变, 即状态是fulfill时/reject时下一个方法不会执行
      // 例如: resolve(); reject(); 执行了resolve后面的reject或者其他方法将不会执行
      if (this.promiseStatus === myPromise.PENDING) {
        // 当执行then的时候, 状态还是pending时, 应该把回调方法缓存起来, 因为promise.then微任务先执行了, 例如:
        /*
        console.log(1);
        let promise1 = new myPromise((resolve, reject) => {
          console.log(2);
          setTimeout(() => {
            resolve('这次一定');
            console.log(4);
          });
        })
        promise1.then(
          result => {
            console.log('fulfilled:', result);
          },
          reason => {
            console.log('rejected:', reason)
          }
        )
        console.log(3);

        正确结果应该是: 1 2 3 4 这次一定
        结果确实: 1 2 3 4

        原因就是因为当执行then的是否发现状态是pending所以未执行resolve输出这次一定, 当执行到4的时候才变更状态为fulfill
        */
        this.onFulfilledCallBack.push(onFulfilled)
        this.onRejectedCallBack.push(onRejected)
      } if (this.promiseStatus === myPromise.FULFILLED) {
        // fulfilled已完成状态调用onFulfilled完成方法
        /*
        这里根据Promises/A+规范:
        onFulfilled和onRejected只有在执行环境堆栈仅包含平台代码时才可被调用
        这里的平台代码指的是引擎、环境以及 promise 的实施代码.
        实践中要确保onFulfilled和onRejected方法异步执行, 且应该在then方法被调用的那一轮事件循环之后的新执行栈中执行.
        这个事件队列可以采用 宏任务(macro-task) 机制, 比如setTimeout或者setImmediate;
        也可以采用 微任务(micro-task) 机制来实现, 比如MutationObserver或者process.nextTick.
        由于promise的实施代码本身就是平台代码(即都是JavaScript), 故代码自身在处理在处理程序时可能已经包含一个任务调度队列或跳板)
        
        因此这里使用setTimeout作为异步调用
        */
        setTimeout(() => {
          try {
            let x = onFulfilled(this.promiseResult)
            resolveProcedure(promiseObj, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      } else if (this.promiseStatus === myPromise.REJECTED) {
        // rejected已完成状态调用onRejected完成方法
        setTimeout(() => {
          try {
            let x = onRejected(this.promiseResult)
            resolveProcedure(promiseObj, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
    })

    return promiseObj
  }
}

/**
 * promise解决过程
 * 对resolve(), reject()进行改造增强, 针对resolve()和reject()中不同值情况进行处理, 分别有:
 * 1.普通值
 * 2.Promise对象
 * 3.thenable对象/函数 (即含有then方法的对象)
 * 
 * @param {*} promiseObj promise.then方法返回的新的promise对象
 * @param {*} x promise中onFulfilled或onRejected的返回值
 * @param {*} resolve promiseObj的resolve方法
 * @param {*} reject promiseObj的reject方法
 */
function resolveProcedure(promiseObj, x, resolve, reject) {
  // 增加判断, 如果从onFulfilled或onRejected中返回的 x 就是promiseObj, 会导致循环引用报错
  if (x === promiseObj) {
    return reject(new TypeError('Chaining cycle detected for promise'));
  }

  // 如果 x 为 Promise, 则使 promiseObj 接受 x 的状态
  if (x instanceof myPromise) {
    if (x.promiseStatus === myPromise.PENDING) {
      // 如果 x 处于等待态, promise 需保持为等待态直至 x 被执行或拒绝
      x.then(y => {
        resolvePromise(promiseObj, y, resolve, reject)
      }, reject)
    } else if (x.promiseStatus === myPromise.FULFILLED) {
      // 如果 x 处于执行态, 用相同的值执行 promise
      resolve(x.promiseResult)
    } else if (x.promiseStatus === myPromise.REJECTED) {
      // 如果 x 处于拒绝态, 用相同的据因拒绝 promise
      reject(x.promiseResult)
    }
  } else if (x !== null && ((typeof x === 'object' || (typeof x === 'function')))) {
    // 如果 x 为对象或函数
    // 声明一个then函数
    let then = null
    try {
      // 把 x.then 赋值给 then
      then = x.then
    } catch (e) {
      // 如果取 x.then 的值时抛出错误 e, 则以 e 为据因拒绝promise
      return reject(e)
    }

    // 如果 then 是函数, 将 x 作为函数的作用域 this 调用之. 传递两个回调函数作为参数[resolvePromise, rejectPromise]
    if (typeof then === 'function') {
      // 如果 resolvePromise 和 rejectPromise 均被调用, 或者被同一参数调用了多次, 则优先采用首次调用并忽略剩下的调用
      // 声明一个标识判断是否已经 resolvePromise 或 rejectPromise 被调用
      let called = false
      try {
        // call调用绑定 this 指向 x 函数
        then.call(x, y => {
          // 如果 resolvePromise 以值 y 为参数被调用, 则运行 [[Resolve]](promise, y)
          if (called) {
            return
          }
          called = true
          resolvePromise(promiseObj, y, resolve, reject)
        }, r => {
          // 如果 rejectPromise 以据因 r 为参数被调用, 则以据因 r 拒绝 promise
          if (called) {
            return
          }
          called = true
          reject(r)
        })
      } catch (error) {
        // 如果调用 then 方法抛出了异常 e; 如果 resolvePromise 或 rejectPromise 已经被调用, 则忽略
        if (called) {
          return
        }
        called = true
        // 否则以 e 为据因拒绝 promise
        reject(e)
      }
    } else {
      // 如果 then 不是函数, 以 x 为参数执行 promise
      resolve(x)
    }
  } else {
    // 如果 x 不为对象或者函数, 以 x 为参数执行 promise
    return resolve(x)
  }
}

