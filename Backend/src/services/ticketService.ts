import { TICKET_CREATED } from "../constants/eventConsts";
import { eventBus } from "../utilities/serviceExporter";

export class TicketService {

    static CreateTicket = (id: string): void => eventBus.publish(TICKET_CREATED, {id: id}) 

}