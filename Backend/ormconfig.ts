export const ormconfig = {
  "type": "sqlite",
  "database": "database.sqlite",
  "entities": [
    "src/models/*.ts"
  ],
  "synchronize": true,
  "logging": true
}