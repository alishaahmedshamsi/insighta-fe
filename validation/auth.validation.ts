import { z } from "zod";

const registerSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const forgotPasswordSchema = z.object({
    email: z.string().email(),
});

export { registerSchema, loginSchema, forgotPasswordSchema };