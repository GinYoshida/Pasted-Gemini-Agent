import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { QuizQuestion, InsertQuizQuestion } from "@shared/schema";

export function useQuizzes() {
  return useQuery<QuizQuestion[]>({
    queryKey: ["/api/quizzes"],
  });
}

export function useActiveQuizzes() {
  return useQuery<QuizQuestion[]>({
    queryKey: ["/api/quizzes/active"],
  });
}

export function useCreateQuiz() {
  return useMutation({
    mutationFn: async (quiz: InsertQuizQuestion) => {
      const res = await apiRequest("POST", "/api/quizzes", quiz);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/quizzes/active"] });
    },
  });
}

export function useUpdateQuiz() {
  return useMutation({
    mutationFn: async ({ id, updates }: { id: number; updates: Partial<InsertQuizQuestion> }) => {
      const res = await apiRequest("PATCH", `/api/quizzes/${id}`, updates);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/quizzes/active"] });
    },
  });
}

export function useDeleteQuiz() {
  return useMutation({
    mutationFn: async (id: number) => {
      const res = await apiRequest("DELETE", `/api/quizzes/${id}`);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quizzes"] });
      queryClient.invalidateQueries({ queryKey: ["/api/quizzes/active"] });
    },
  });
}
