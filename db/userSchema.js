"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InsertUser = exports.SelectUser = exports.user = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const drizzle_zod_1 = require("drizzle-zod");
exports.user = (0, pg_core_1.pgTable)('user', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    first_name: (0, pg_core_1.varchar)('first_name').notNull(),
    last_name: (0, pg_core_1.varchar)('last_name').notNull(),
    phNumber: (0, pg_core_1.varchar)('ph_number').notNull(),
    created_at: (0, pg_core_1.timestamp)('created_at', { withTimezone: true }).defaultNow(),
});
exports.SelectUser = (0, drizzle_zod_1.createSelectSchema)(exports.user);
exports.InsertUser = (0, drizzle_zod_1.createInsertSchema)(exports.user);
