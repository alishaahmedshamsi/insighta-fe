import { z } from "zod";

export interface ILoginFields {
	email: string;
	password: string;
}

export interface IRegisterFields {
	fullname: string;
	email: string;
	password: string;
	role: string;
	classes?: number[];
	section?: string[];
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

export interface IPagination {
	currentPage: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
	nextPage: number | null;
	perPage: number;
	prevPage: number | null;
	totalItems: number;
	totalPages: number;
  }
  
  export interface ApiResponse<T> {
	data: T[];
	pagination: Pagination;
  }

  export interface IClasses{
	_id:string
	className:number[]
  }
  export interface IClass{
	_id:string
	className:number
  }

export  interface IUser  {
	fullname: string;
	email: string;
	qualification: string;
	address: string;
	password: string;
	role: ROLES;
	classes: IClass[];
	section: string[];
	school: ObjectId;
	otp: number;
	otpExpiry: Date;
	profilePicture: string;
	location:string
	points: ObjectId;
	createdAt?: Date;
	updatedAt?: Date;
  }

export interface ISchoolInfo {
	fullname:string,
	email:string
	studentCount:number
	teacherCount:number
	_id:string
}

export interface IUserUpdate {
	fullname: string;
	location:string
  }