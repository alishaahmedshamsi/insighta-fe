import { z } from "zod";

const registerSchema = z.object({
	fullName: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
});

const registerStudentSchema = z.object({
	fullName: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
	classes: z.number(),
	section: z.string(),
});

const resetPasswordSchema = z.object({
	password: z.string().min(6),
	confirmPassword: z.string().min(6),
});

const otpSchema = z.object({
	otpCode: z.string().length(6),
});

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6),
});

const forgotPasswordSchema = z.object({
	email: z.string().email(),
});

export {
	registerSchema,
	registerStudentSchema,
	loginSchema,
	forgotPasswordSchema,
	otpSchema,
	resetPasswordSchema,
};
