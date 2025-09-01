import { integer, pgTable } from "drizzle-orm/pg-core";

export const testTable = pgTable("test", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
});
