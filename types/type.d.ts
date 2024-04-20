import { z } from "zod";

export interface ILoginFields {
	email: string;
	password: string;
}

export interface IRegisterFields {
	email: string;
	password: string;
	fullName: string;
}

export interface IResetPassword {
	currentPassword: string;
	newPassword: string;
	confirmPassword: string;
}

export interface IOTPField {
	otpCode: string;
}

// export type SigninFields = z.infer<typeof SignInSchema>

export interface IForgetFields {
	email: string;
}

// export type ForgetFields = z.infer<typeof ForgetSchema>

export interface IResetFields {
	password: string;
	confirmPassword: string;
}

// export type ResetPassword = z.infer<typeof ResetPasswordSchema>

export interface IApiResponse<T> {
	message: string;
	data: T;
	paginationData?: IPaginationData;
}

export interface IPaginationData {
	total: number;
	limit: number;
	page: number;
	pages: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
}
