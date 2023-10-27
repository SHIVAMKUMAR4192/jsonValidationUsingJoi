"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const node_postgres_1 = require("drizzle-orm/node-postgres");
const pg_1 = require("pg");
const client = new pg_1.Client({
    host: "127.0.0.1",
    port: 5432,
    user: "postgres",
    password: "13Sharma@",
    database: "testDb",
});
client.connect();
exports.dbConnection = (0, node_postgres_1.drizzle)(client);
