// src/EventBusService.ts
type EventHandler<T> = (data: T) => void;

class EventBusService {
  private subscribers: { [key: string]: EventHandler<any>[] };

  constructor() {
    this.subscribers = {};
  }

  subscribe<T>(eventName: string, handler: EventHandler<T>): void {
    if (!this.subscribers[eventName]) {
      this.subscribers[eventName] = [];
    }

    this.subscribers[eventName].push(handler);
  }

  publish<T>(eventName: string, data: T): void {
    const handlers = this.subscribers[eventName];

    if (handlers) {
      handlers.forEach((handler) => {
        handler(data);
      });
    }
  }
}

export default EventBusService;
