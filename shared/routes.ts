import { z } from 'zod';
import { insertLearningLogSchema, learningLogs } from './schema';

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
