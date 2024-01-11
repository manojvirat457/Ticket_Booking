// src/ProductVariantSubscriber.ts
import EventBusService from '../utilities/eventServiceBus';

class TicketEvents {
    constructor({ eventBusService }: { eventBusService: EventBusService }) {
        eventBusService.subscribe('ticket.created', this.ticketCreated);
    }
    ticketCreated = async (data: { id: string }): Promise<void> => {
        console.log('Ticket: ' + data.id);
    };
}

export default TicketEvents;
