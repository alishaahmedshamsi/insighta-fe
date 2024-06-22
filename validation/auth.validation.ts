import { z } from "zod";

const registerSchema = z.object({
	fullname: z.string().min(3,"Name must be atleast 3 characters"),
	email: z.string().email(),
	password: z.string().min(6),
});

const registerStudentSchema = z.object({
	fullname: z.string().min(3,"Name must be atleast 3 characters"),
	email: z.string().email(),
	rollnumber: z.string(),
	password: z.string().min(6),
	classes: z.array(z.string()),
});

const registerTeacherSchema = z.object({
    fullname: z.string().min(3,"Name must be atleast 3 characters"),
	email: z.string().email(),
	password: z.string().min(6),
	classes: z.array(z.string()),
	subject: z.array(z.string()),
});

// const registerTeacherSchema = z.object({
// 	fullname: z.string().min(3,"Name must be atleast 3 characters"),
// 	email: z.string().email(),
// 	password: z.string().min(6),
// 	classes: z.array(z.string()),
// 	// section: z.array(z.string()),
// });

const resetPasswordSchema = z.object({
	newPassword: z.string().min(6),
	confirmPassword: z.string().min(6),
  }).superRefine((data, ctx) => {
	if (data.newPassword !== data.confirmPassword) {
	  ctx.addIssue({
		code: 'custom',
		path: ['confirmPassword'],
		message: "Passwords do not match",
	  });
	}
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
