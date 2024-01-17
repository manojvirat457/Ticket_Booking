"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const typeorm_1 = require("typeorm");
exports.dbConnection = new typeorm_1.DataSource({
    "type": "sqlite",
    "database": "database.sqlite",
    "entities": [
        "src/models/*.ts"
    ],
    "synchronize": true,
    "logging": true
});
