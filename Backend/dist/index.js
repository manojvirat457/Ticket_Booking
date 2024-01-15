"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const serviceContainer_1 = __importDefault(require("./core/containers/serviceContainer"));
const dbconnection_1 = require("./core/database/dbconnection");
const users_1 = __importDefault(require("./routes/users"));
const tickets_1 = __importDefault(require("./routes/tickets"));
const bus_1 = __importDefault(require("./routes/bus"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 3000;
serviceContainer_1.default.init();
app.use(express_1.default.json());
app.use("/users", users_1.default);
app.use("/tickets", tickets_1.default);
app.use("/bus", bus_1.default);
dbconnection_1.dbConnection.initialize().then(() => {
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});
