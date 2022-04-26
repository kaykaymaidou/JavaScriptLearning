class Subscribe {
  constructor () {
    this.queue = []
  }
  on(eventName, fn) {
    this.queue.push({
      eventName: eventName,
      callback: fn
    });
  }
  off(eventName, fn) {
    this.queue.forEach((item, index) => {
      if (item.eventName == eventName && item.callback === fn) {
        this.queue.splice(index, 1);
      }
    })
  }
  emit(eventName, ...args) {
    this.queue.forEach(item => {
      if (item.eventName = eventName) {
        item.callback(...args);
      }
    })
  }
}

const publisher = new Subscribe();

const fn1 = (...args) => console.log(...args);
const fn2 = () => console.log('Hello');

publisher.on('event1', fn1);
publisher.on('event1', fn2);
publisher.emit('event1', 1, 2, 3);
publisher.off('event1', fn2);
publisher.emit('event1', 4, 5, 6);
