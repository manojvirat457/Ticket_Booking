import { DataSource } from "typeorm";

export const dbConnection = new DataSource({
    "type": "sqlite",
    "database": "database.sqlite",
    "entities": [
      "src/models/*.ts"
    ],
    "synchronize": true,
    "logging": true
  });