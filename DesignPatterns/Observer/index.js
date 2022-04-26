class Subject {
  constructor() {
    this.observers = []
  }
  add(observer) {
    this.observers.push(observer)
  }
  notify(...args) {
    this.observers.forEach(observer => observer.update(...args))
  }
}

class Observer {
  update(...args) {
    console.log(...args)
  }
}

const observer1 = new Observer();
const observer2 = new Observer();
const subject = new Subject();
sub.add(observer1);
sub.add(observer2);
subject.notify('I fired `SMS` event')

/*
  观察者模式是观察者订阅到目标, 当目标发布消息的时候会逐一通知每个订阅者, 类似于微信群发消息给朋友, 亲自挨个通知一遍
  观察者模式有两个重要的角色, 即目标和观察者, 在目标和观察者之间是没有事件通道的.
  一方面, 观察者要想订阅目标事件, 由于没有事件通道, 因此必须将自己添加到目标(Subject)中进行管理
  另一方面, 目标在触发事件的时候, 也无法将通知操作(notify)委托给事件通道, 因此只能亲自去通知所有的观察者

  发布-订阅模式是订阅者通过发布订阅器订阅相关的消息, 比如关注了某个明星, 然后发布者通过该发布订阅器发布消息, 如果此时发布的消息
  符合订阅者的则会通知, 类似于微博, 关注了某位明星, 该明星发了一条动态, 手机就会收到该明星的发布动态的通知, 微博就是这个发布订阅器
  发布订阅模式相比观察者模式多了个事件通道, 事件通道作为调度中心, 管理事件的订阅和发布工作, 彻底隔绝了订阅者和发布者的依赖关系
  即订阅者在订阅事件的时候, 只关注事件本身, 而不关心谁会发布这个事件
  发布者在发布事件的时候, 只关注事件本身, 而不关心谁订阅了这个事件

  观察者模式和发布订阅模式的区别:
    观察者模式是面向目标和观察者编程的, 而发布-订阅模式则是面向调度中心编程的
    观察者模式用于耦合目标和观察者, 发布-订阅模式用于解耦发布者和订阅者
    发布订阅模式中, 双方不知道对方的存在, 发布者不需要关注那些人订阅了自己; 而观察者模式中, 目标和观察者是直接联系起来的, 目标需要管理自己想要发送的观察者
 */
