/**
 * 当我们使用CSS3新属性, 比如: box-shadow 或者 transition 时, 我们怎么检测浏览器是否支持这些属性?
 * 请设计一个JavaScript函数, 该函数接受一个CSS属性名作为参数, 并返回一个boolean值, 表明浏览器是否支持这个属性
 */
const supports = (function () {
  // 定义一个div元素; vendors各个浏览器引擎的数组; len为vendors数组长度
  let div = document.createElement('div'),
    vendors = 'Khtml Ms O Moz Webkit'.split(' '),
    len = vendors.length;

  return function (prop) {
    // 除了可以用 hasOwnProperty 还可以用 in 判断对象是否存在某个键值
    if (prop in div.style) return true;
    // 设置开头大写
    prop = prop.replace(/^[a-z]/, function (val) {
      return val.toUpperCase();
    });

    while (len--) {
      if ((vendors[len] + prop) in div.style) {
        return true;
      }
    }
    return false;
  };
})();

if (supports('textShadow')) {
  document.documentElement.className += ' textShadow';
}