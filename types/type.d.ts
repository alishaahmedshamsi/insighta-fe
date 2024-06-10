import { z } from "zod";

export interface ILoginFields {
	email: string;
	password: string;
}

export interface IRegisterFields {
	fullname: string;
	email: string;
	password: string;
	classes?: string[];
	rollnumber?: string;
	role:string
}

export interface IResetPassword {
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
	className:string[]
  }
  export interface IClass{
	_id:string
	className:number
  }

export  interface IUser  {
	_id:string
	fullname: string;
	email: string;
	qualification: string;
	address: string;
	password: string;
	role: ROLES;
	classes: IClass[];
	section: string[];
	subject: ISubject[];
	school: ObjectId;
	otp: number;
	otpExpiry: Date;
	profilePicture: string;
	location:string
	points: IPoints;
	createdAt?: Date;
	updatedAt?: Date;
  }

  export interface IPoints {
	assignment: number;
	quiz: number;
	lecture: number;
	review:number
	total: number;
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

export interface ISubject {
	_id:string
	name:string
}