// src/index.ts
import express from 'express';
import { TicketService } from './services/ticketService';
import EventsContainer from './utilities/serviceContainer';
import { createConnection } from 'typeorm';

const app = express();
const port = 3000;

EventsContainer.init();

app.get('/', (req, res) => {
  new TicketService().CreateTicket("Manoj");
  res.send('Hello, TypeScript with Express!');
});

createConnection().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
