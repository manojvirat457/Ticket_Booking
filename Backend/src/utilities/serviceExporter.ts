import EventBusService from "../core/events/eventServiceBus";
import ServiceContainer from "../core/containers/serviceContainer";

export const eventBus: EventBusService = ServiceContainer.getEventBusService();