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

export const quizQuestions = pgTable("quiz_questions", {
  id: serial("id").primaryKey(),
  kanji: text("kanji").notNull(),
  options: text("options").array().notNull(),
  imagePath: text("image_path").notNull(),
  questionJa: text("question_ja").notNull(),
  questionEn: text("question_en").notNull(),
  hintJa: text("hint_ja"),
  hintEn: text("hint_en"),
  isActive: boolean("is_active").default(true),
});

export const insertQuizQuestionSchema = createInsertSchema(quizQuestions)
  .omit({ id: true })
  .refine(
    (data) => data.options && data.options.length === 3,
    { message: "Exactly 3 options are required", path: ["options"] }
  )
  .refine(
    (data) => data.options && data.kanji && data.options.includes(data.kanji),
    { message: "The correct kanji must be included in the options", path: ["options"] }
  );

export const updateQuizQuestionSchema = createInsertSchema(quizQuestions)
  .omit({ id: true })
  .partial()
  .refine(
    (data) => !data.options || data.options.length === 3,
    { message: "Exactly 3 options are required", path: ["options"] }
  )
  .refine(
    (data) => !data.options || (data.kanji && data.options.includes(data.kanji)),
    { message: "When updating options, kanji must be provided and included in options", path: ["options"] }
  );

export type QuizQuestion = typeof quizQuestions.$inferSelect;
export type InsertQuizQuestion = z.infer<typeof insertQuizQuestionSchema>;
