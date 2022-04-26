/**
 * 有一个数组, 其中保存的都是小写英文字符串,
 * 现在要把它按照除了第一个字母外的字符的字典顺序(字典顺序就是按首字母从a-z顺序排列,
 * 如果首字母相同则按第二个字母……)排序, 请编写代码:
 */
// 例:
["abd", "cba", "ba"]
// 排序后
["ba", "cba", "abd"]

// 解:
function arraySort(arr) {
  return arr.sort(function (a, b) {
    if (a.substring(1) > b.substring(1)) {
      return 1;
    } else {
      return -1;
    }
  });
}
console.log(arraySort(["abd", "cba", "ba"]));