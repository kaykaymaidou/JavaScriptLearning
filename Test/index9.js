/*
  (new Date()).getTime() 和 +new Date() 都可以取到当前时间戳, 它们的实现原理是什么, 哪个效率更高？

  +new Date()是一个一元表达式的隐式转换, 大概原理是:

  一元+运算符将其操作数转换为Number类型并反转其正负[注意负的+0产生-0, 负的-0产生+0]
    UnaryExpression 一元表达式按照下面的过程执行:
      1.令 expr 为解释执行 UnaryExpression 的结果
      2.令 oldValue 为 ToNumber(GetValue(expr))
      3.如果 oldValue is NaN, 返回 NaN
      4.返回 oldValue 取负(即算出一个数字相同但是符号相反的值)的结果
  因此, +new Date()相当于 ToNumber(new Date())
    ToNumber 的转换规则如下:
      undefined: NaN
      null: +0
      boolean: true -> 1; false -> +0
      number: 直接输出
      string: 将字符串转换为数字, 若存在字符串内存在非数字则返回NaN
      object: 设置原始值为 ToPrimitive(输入参数, 暗示数据类型) -> 下一步 返回 ToNumber(原始值)
  因为 new Date() 是一个对象, 因此会先执行 ToPromitive 然后再 返回ToNumber 值

    ToPrimitive 接收两个值, 一个是输入的参数, 一个是可选的期待输出的数据类型; 这就是JavaScript所谓的拆箱操作:
      undefined: 输出输入参数
      null: 输出输入参数
      boolean: 输出输入参数
      number: 输出输入参数
      string: 输出输入参数
      object: 返回对象的默认值; 对象的默认值是由期望类型作为暗示参数, 然后调用对象内部方法[[DefaultValue]]得到的默认值
    通俗的 ToPrimitive 执行过程:
      ToPrimitive(obj, preferredType), obj为被转换对象; preferredType为希望转换成的类型(默认为空, 接受的值为Number或String)
      若 preferredType 为 Number:
        如果obj为原始值, 直接返回
        否则调用 obj.valueOf(), 如果执行结果是原始值，返回该结果
        否则调用 obj.toString(), 如果执行结果是原始值, 返回该结果
        否则抛异常
      若 preferredType 为 String:
        如果obj为原始值, 直接返回
        否则调用 obj.toString(), 如果执行结果是原始值, 返回该结果
        否则调用 obj.valueOf(), 如果执行结果是原始值，返回该结果
        否则抛异常
      (注意: 当期望类型期望类型为默认时, 除对象为Date时以String解释, 其他情况以Number解)

      又因其中:
        toString用来返回对象的字符串表示, 如:
          var object = {} -> object.toString 输出 [object Object]
          var array = [] -> array.toString 输出 ''(空字符串)
          var date = new Date() -> date.toString 输出 Thu Apr 14 2022 16:31:01 GMT+0800 (中国标准时间)
        valueOf用来返回对象的原始值(String, Number, Boolean, Undefined, Null, Symbol)的, 如:
          var obj = { name: "obj" } -> obj.valueOf 输出 { name: "obj" }
          var arr = [1] -> arr.valueOf 输出 [1]
          var date = new Date() -> date.valueOf 输出 1649925189826 (时间戳)
 */
console.log((new Date()).getTime() === +new Date())
