// 将以下结构转换成树形结构
const response = [{
  id: 1,
  name: '手机',
  parentId: 0
}, {
  id: 2,
  name: '电视',
  parentId: 0
}, {
  id: 3,
  name: '电脑',
  parentId: 0
}, {
  id: 4,
  name: '苹果手机',
  parentId: 1
}, {
  id: 5,
  name: '苹果十三',
  parentId: 4
}, {
  id: 6,
  name: '游戏本',
  parentId: 3
}, {
  id: 7,
  name: '台式电脑',
  parentId: 3
}, {
  id: 8,
  name: '256G',
  parentId: 5
}]

// 法一 缺点: 这个方法必须父节点排在前面
function generateTree(treeNodes) {
  // 如果节点为空则立即返回
  if (!treeNodes || !treeNodes.length) return
  // 结果树
  const resultList = []
  // 存放每个节点, 用于查询某个父节点
  const obj = {}
  // 父节点
  let parent = ''
  for (let index = 0; index < treeNodes.length; index++) {
    // 当前节点
    const node = treeNodes[index]
    // 把每个节点存起来, 浅拷贝只拷贝了指针, 修改的时候会把原来的内容也改了
    obj[node.id] = node
    // 如果parentId为0, 则表示是父节点
    if (node.parentId === 0) {
      resultList.push(node)
    } else {
      // 查询出该节点的父节点
      parent = obj[node.parentId]
      // 生成树
      if (parent.children) {
        parent.children.push(node)
      } else {
        parent.children = [node]
      }
    }
  }
  return resultList
}

// 法二
function transformTree(array, parentId) {
  // 通过每次递归过滤出相同parentId的节点, 然后通过map修改原数组
  return array
    .filter((item) =>
      // 第一次递归的时候将所有父级查询出来
      parentId === undefined ? item.parentId === 0 : item.parentId === parentId
    )
    .map((item) => {
      // 通过父节点ID查询所有子节点
      item.children = transferTree(array, item.id);
      return item;
    });
}

// 法三
function convertTree(list, parentId = 0) {
  // 通过parentId递归寻找父节点下的子节点, 默认设置第一个节点id为0
  const resultList = []
  for (let index = 0; index < list.length; index++) {
    const element = list[index];
    if (element.parentId === parentId) {
      element.children = convertTree(list, element.id);
      resultList.push(element);
    };
  }
  return resultList
}
