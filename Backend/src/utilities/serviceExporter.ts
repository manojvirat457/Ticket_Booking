import EventBusService from "./eventServiceBus";
import ServiceContainer from "./serviceContainer";

export const eventBus: EventBusService = ServiceContainer.getEventBusService();