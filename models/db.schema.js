import { boolean, numeric, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull(),
  password: text("password").notNull(),
  isActive : boolean("is_active").notNull().default(true)
});

export const records = pgTable("records", {
  r_id: serial("r_id").primaryKey(),
  email : text("email").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  type_of_transaction: text("type").notNull(),
  category: text("category").notNull(),
  date: timestamp("date").notNull().defaultNow(),    
  description: text("description").notNull(),
});


