import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const learningLogs = pgTable("learning_logs", {
  id: serial("id").primaryKey(),
  score: integer("score").notNull(),
  totalQuestions: integer("total_questions").notNull(),
  completedAt: timestamp("completed_at").defaultNow(),
});

export const insertLearningLogSchema = createInsertSchema(learningLogs).omit({ id: true, completedAt: true });

export type LearningLog = typeof learningLogs.$inferSelect;
export type InsertLearningLog = z.infer<typeof insertLearningLogSchema>;
