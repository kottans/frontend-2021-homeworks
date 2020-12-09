export class Observer {
  constructor() {
    this.subscribers = [];
  }

  subscribe(callBack) {
    this.subscribers.push(callBack);
  }

  unsubscribe(callBack) {
    this.subscribers = this.subscribers.filter(
      (existingCallBack) => existingCallBack !== callBack
    );
  }

  next(data) {
    this.subscribers.forEach((callBack) => {
      callBack(data);
    });
  }
}
