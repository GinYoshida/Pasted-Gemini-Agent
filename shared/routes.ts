import { z } from 'zod';
import { insertLearningLogSchema, learningLogs, insertQuizQuestionSchema, updateQuizQuestionSchema, quizQuestions } from './schema';

export const api = {
  logs: {
    list: {
      method: 'GET' as const,
      path: '/api/logs',
      responses: {
        200: z.array(z.custom<typeof learningLogs.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/logs',
      input: insertLearningLogSchema,
      responses: {
        201: z.custom<typeof learningLogs.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
  },
  quizzes: {
    list: {
      method: 'GET' as const,
      path: '/api/quizzes',
      responses: {
        200: z.array(z.custom<typeof quizQuestions.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/quizzes',
      input: insertQuizQuestionSchema,
      responses: {
        201: z.custom<typeof quizQuestions.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
    update: {
      method: 'PATCH' as const,
      path: '/api/quizzes/:id',
      input: updateQuizQuestionSchema,
      responses: {
        200: z.custom<typeof quizQuestions.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
    delete: {
      method: 'DELETE' as const,
      path: '/api/quizzes/:id',
      responses: {
        200: z.object({ success: z.boolean() }),
        404: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
