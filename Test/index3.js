// 不使用loop循环, 创建一个长度为100的数组并且每个元素的值等于它的下标
/**
 * 解: 创建一个长度为100的数组, 因为是空数组, 没有真实元素
 *     需要 join 添加 , 分割成字符串
 *     然后 split 分割 , 成一个个空元素的数组
 *     最后 map 遍历用下标替换掉空元素即可
 * 
 * 注: 如果不 join 还有 split 的话, map 一次都不会遍历数组, 因为虽然数组长度为100但是内容确实空的
 */
const arr = Array(100).join(",").split(",").map(function(item, index) {
  return index;
});