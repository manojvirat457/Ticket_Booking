// src/ServiceContainer.ts
import EventBusService from './eventServiceBus';
import TicketEvents from '../subscribers/ticketEvents';

class ServiceContainer {
  private static eventBusServiceInstance: EventBusService;
  private static TicketEventsInstance: TicketEvents;

  static init(): void {
    this.getEventBusService();
    this.LoadTicketEvents();
  }

  static getEventBusService(): EventBusService {
    if (!this.eventBusServiceInstance) {
      this.eventBusServiceInstance = new EventBusService();
    }

    return this.eventBusServiceInstance;
  }

  static LoadTicketEvents(): TicketEvents {
    if (!this.TicketEventsInstance) {
      const eventBusService = this.getEventBusService();
      this.TicketEventsInstance = new TicketEvents({eventBusService});
    }

    return this.TicketEventsInstance;
  }
}

export default ServiceContainer;
