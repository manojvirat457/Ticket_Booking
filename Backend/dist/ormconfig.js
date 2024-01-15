"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ormconfig = void 0;
exports.ormconfig = {
    "type": "sqlite",
    "database": "database.sqlite",
    "entities": [
        "src/models/*.ts"
    ],
    "synchronize": true,
    "logging": true
};
