import { InferModel,  } from 'drizzle-orm';
import { serial,pgTable, timestamp, varchar, text } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';

export const user = pgTable('user', {
  id: serial('id').primaryKey(),
  first_name: varchar('first_name').notNull(),
  last_name: varchar('last_name').notNull(),
  phNumber: varchar('ph_number').notNull(),
  created_at: timestamp('created_at',{ withTimezone: true }).defaultNow(),
});


export type SelectUser = InferModel<typeof user>;
export type InsertUser = InferModel<typeof user, 'insert'>;

export const SelectUser = createSelectSchema(user);
export const InsertUser = createInsertSchema(user);


