// src/index.ts
import express from 'express';
import { TicketService } from './services/ticketService';
import EventsContainer from './utilities/serviceContainer';
import { dbConnection } from './core/dbconnection';

const app = express();
const port = 3000;

EventsContainer.init();

app.get('/', (req, res) => {
  TicketService.CreateTicket("Manoj");
  res.send('Hello, TypeScript with Express!');
});

dbConnection.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
