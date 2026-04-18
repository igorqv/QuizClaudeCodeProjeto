import { z } from "zod"

export const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha deve ter pelo menos 8 caracteres"),
})

export const answerSchema = z.object({
  sessionId: z.string().min(1),
  questionId: z.string().min(1),
  chosenAnswer: z.string(),
})

export const finishSchema = z.object({
  sessionId: z.string().min(1),
})
