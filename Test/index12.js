// 数组去重方法
const arr = [false, true, undefined, null, NaN, 0, 1, {}, {}, 'a', 'a', NaN]
const arr1 = [{
    name: "小红",
    id: 1
  },
  {
    name: "小橙",
    id: 1
  },
  {
    name: "小黄",
    id: 4
  },
  {
    name: "小绿",
    id: 3
  },
  {
    name: "小青",
    id: 1
  },
  {
    name: "小蓝",
    id: 4
  }
]

// 法一: 利用Set和扩展运算符
const unique = [...new Set(arr)]

// 法二: 利用JS中Object的key不能同名
function uniqueArrayUseObject(arr) {
  const obj = {}
  const resultArray = []
  for (const item of arr) {
    if (!obj[item]) {
      obj[item] = 1
      resultArray.push(item)
    }
  }
  return resultArray
}

function uniqueObjectArrayUseObject(arr1) {
  let template = [];
  let obj = {};
  for (let i = 0; i < arr1.length; i++) {
    if (!obj[arr1[i].id]) {
      template.push(arr1[i]);
      obj[arr1[i].id] = true;
    };
  };
  return template;
}

// 法三: 用新数组indexOf判断是否存在相同的
function uniqueArrayIndexOf(arr) {
  const resultList = [arr[0]]
  for (let i = 1; i < arr.length; i++) {
    if (resultList.indexOf(arr[i]) === -1) {
      resultList.push(arr[i])
    }
  }
  return resultList
}

function uniqueObjectArrayIndexOf(arr1) {
  const template = []
  for (let i = 0; i < arr1.length; i++) {
    if (template.indexOf(arr1[i].id) == -1) {
      template.push(arr1[i].id)
    } else {
      arr1.splice(i, 1)
    }
  }
  return arr1
}