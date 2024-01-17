// src/index.ts
import express from 'express';
import EventsContainer from './core/containers/serviceContainer';
import { dbConnection } from './core/database/dbconnection';
import usersRouter from './routes/users';
import ticketsRouter from './routes/tickets';
import busRouter from './routes/bus';
import dotenv from 'dotenv';

const app = express();
dotenv.config();

const port = process.env.PORT || 3000;

EventsContainer.init();
app.use(express.json());

app.use("/users", usersRouter);
app.use("/tickets", ticketsRouter);
app.use("/bus", busRouter);


dbConnection.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
});
