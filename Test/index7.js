// 输出啥
var a = 1;
var obj = {
  b: 2
};
var fn = function () {};
fn.c = 3;

function test(x, y, z) {
  x = 4;
  y.b = 5;
  z.c = 6;
  return z;
}

test(a, obj, fn);

alert(a + obj.b + fn.c);
// 弹出12, 原因 a为值传递, 只修改副本; obj.b和fn.c为引用传递会修改引用地址中的值;
// 所以最后是 a = 1; obj.b = 5; fn.c = 6;
