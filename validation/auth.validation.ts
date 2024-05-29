import { z } from "zod";

const registerSchema = z.object({
	fullname: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
});

const registerStudentSchema = z.object({
	fullname: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
	classes: z.array(z.number()),
	section: z.array(z.string()),
});

const registerTeacherSchema = z.object({
	fullname: z.string(),
	qualification: z.string(),
	email: z.string().email(),
	password: z.string().min(6),
	classes: z.array(z.number()),
	section: z.array(z.string()),
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
	registerTeacherSchema,
	loginSchema,
	forgotPasswordSchema,
	otpSchema,
	resetPasswordSchema,
};
