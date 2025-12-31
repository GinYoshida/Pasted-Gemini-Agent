import { db } from "./db";
import { eq } from "drizzle-orm";
import {
  learningLogs,
  quizQuestions,
  type InsertLearningLog,
  type LearningLog,
  type InsertQuizQuestion,
  type QuizQuestion,
} from "@shared/schema";

export interface IStorage {
  getLogs(): Promise<LearningLog[]>;
  createLog(log: InsertLearningLog): Promise<LearningLog>;
  getQuizzes(): Promise<QuizQuestion[]>;
  getActiveQuizzes(): Promise<QuizQuestion[]>;
  getQuizById(id: number): Promise<QuizQuestion | null>;
  createQuiz(quiz: InsertQuizQuestion): Promise<QuizQuestion>;
  updateQuiz(id: number, quiz: Partial<InsertQuizQuestion>): Promise<QuizQuestion | null>;
  deleteQuiz(id: number): Promise<boolean>;
}

export class DatabaseStorage implements IStorage {
  async getLogs(): Promise<LearningLog[]> {
    return await db.select().from(learningLogs).orderBy(learningLogs.completedAt);
  }

  async createLog(insertLog: InsertLearningLog): Promise<LearningLog> {
    const [log] = await db.insert(learningLogs).values(insertLog).returning();
    return log;
  }

  async getQuizzes(): Promise<QuizQuestion[]> {
    return await db.select().from(quizQuestions);
  }

  async getActiveQuizzes(): Promise<QuizQuestion[]> {
    return await db.select().from(quizQuestions).where(eq(quizQuestions.isActive, true));
  }

  async getQuizById(id: number): Promise<QuizQuestion | null> {
    const [quiz] = await db.select().from(quizQuestions).where(eq(quizQuestions.id, id));
    return quiz || null;
  }

  async createQuiz(insertQuiz: InsertQuizQuestion): Promise<QuizQuestion> {
    const [quiz] = await db.insert(quizQuestions).values(insertQuiz).returning();
    return quiz;
  }

  async updateQuiz(id: number, updates: Partial<InsertQuizQuestion>): Promise<QuizQuestion | null> {
    const [quiz] = await db.update(quizQuestions).set(updates).where(eq(quizQuestions.id, id)).returning();
    return quiz || null;
  }

  async deleteQuiz(id: number): Promise<boolean> {
    const result = await db.delete(quizQuestions).where(eq(quizQuestions.id, id)).returning();
    return result.length > 0;
  }
}

export const storage = new DatabaseStorage();
