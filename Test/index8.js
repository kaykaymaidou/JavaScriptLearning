console.log('script start');

async function async1 () {
  console.log('async1 start');
  await async2()
  console.log('async1 end');
}

async function async2 () {
  console.log('async2 start');
}

setTimeout(function () {
  console.log('setTimeout');
}, 0);

async1()

new Promise(function (resolve) {
  console.log('promise1');
  resolve()
}).then(function () {
  console.log('promise2');
})

console.log('script end');

// 执行顺序: script start -> async1 start -> async2 start -> promise1 -> script end -> async1 end -> promise2 -> setTimeout
// 考察的是: 主线程宏任务微任务, async/await之后的才会被放入微任务, Promise里的function不会被放入微任务, then/catch才会
