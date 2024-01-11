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

  static getEventBusService = (): EventBusService => (
    this.eventBusServiceInstance = this.eventBusServiceInstance ??
    new EventBusService());


  static LoadTicketEvents = (): TicketEvents => (
    this.TicketEventsInstance = this.TicketEventsInstance ??
    new TicketEvents({ eventBusService: this.getEventBusService() }));

}

export default ServiceContainer;
