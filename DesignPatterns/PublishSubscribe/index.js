function EventHub() {}

EventHub.prototype.queue = []

EventHub.prototype.on = function (eventName, fn) {
  this.queue.push({
    eventName: eventName,
    callback: fn
  });
}

EventHub.prototype.off = function (eventName, fn) {
  this.queue.forEach((item, index) => {
    if (item.eventName == eventName && item.callback === fn) {
      this.queue.splice(index, 1);
    }
  })
}

EventHub.prototype.emit = function (eventName, ...args) {
  this.queue.forEach(item => {
    if (item.eventName = eventName) {
      item.callback(...args);
    }
  })
}

const eventHub = new EventHub();

const fn1 = (...args) => console.log(...args);
const fn2 = () => console.log('Hello');

eventHub.on('event1', fn1);
eventHub.on('event1', fn2);
eventHub.emit('event1', 1, 2, 3);
eventHub.off('event1', fn2);
eventHub.emit('event1', 1, 2);
