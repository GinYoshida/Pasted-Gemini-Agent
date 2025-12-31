import { db } from "./db";
import {
  learningLogs,
  type InsertLearningLog,
  type LearningLog,
} from "@shared/schema";

export interface IStorage {
  getLogs(): Promise<LearningLog[]>;
  createLog(log: InsertLearningLog): Promise<LearningLog>;
}

export class DatabaseStorage implements IStorage {
  async getLogs(): Promise<LearningLog[]> {
    return await db.select().from(learningLogs).orderBy(learningLogs.completedAt);
  }

  async createLog(insertLog: InsertLearningLog): Promise<LearningLog> {
    const [log] = await db.insert(learningLogs).values(insertLog).returning();
    return log;
  }
}

export const storage = new DatabaseStorage();
