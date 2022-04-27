// 输出: 3 3 3 因为当宏任务回来的时候, 全局的i以后被改变了
for (var i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i)
  })
}

// 输出: 0 1 2 因为let使得i拥有了块级作用域, 另外闭包还有setTimeout第三个参数也可以达到这种效果
for (let i = 0; i < 3; i++) {
  setTimeout(function () {
    console.log(i)
  })
}
