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
	subject?: (string | undefined)[]; // added now for createTeacher
	role: string;
}
// export interface IRegisterFields {
// 	fullname: string;
// 	email: string;
// 	password: string;
// 	classes?: { classId: string; subject: string }[];
// 	rollnumber?: string;
// 	role: string;
// }

export interface IRegisterTeacherFields {
	fullname: string;
	email: string;
	password: string;
	classes: { classId: string; subject: string }[];
	rollnumber?: string;
	role: string;
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

export interface IClasses {
	_id: string;
	className: string[];
}
export interface ISubjects {
	_id: string;
	name: string[];
}
export interface IClass {
	_id: string;
	className: number;
}

export interface IUser {
	_id: string;
	fullname: string;
	email: string;
	qualification: string;
	address: string;
	isReviewOpen: boolean;
	displayPoints:boolean
	password: string;
	role: ROLES;
	classes: IClass[];
	section: string[];
	subject: ISubject[];
	school: ObjectId;
	otp: number;
	otpExpiry: Date;
	profilePicture: string;
	location: string;

	points: {
		assignment: number;
		quiz: number;
		totalNumber: number;
		lecture: number;
	};

	createdAt?: Date;
	updatedAt?: Date;
}

export interface IPoints {
	assignment: number;
	quiz: number;
	lecture: number;
	review: number;
	total: number;
}
export interface ISchoolInfo {
	fullname: string;
	email: string;
	studentCount: number;
	teacherCount: number;
	_id: string;
}

export interface IUserUpdate {
	fullname: string;
	location: string;
}

export interface ISubject {
	class: string | undefined;
	_id: string;
	name: string;
}

export interface IAddAssignment {
	title: string;
	descripition: string;
	class: string;
	subject: string | undefined;
	totalMarks: number;
	deadline: Date;
	assignmentFile: File;
}

export interface IAddQuiz {
	title: string;
	class: string | undefined;
	subject: string | undefined;
	deadline: Date;
	question: string[];
	marks: number;
}

export interface IAddLecture {
	title: string;
	description: string;
	className: string;
	subject: string | undefined;
	lecture: File;
}

export interface IUploadAssignment {
	assignmentId: string;
	isLate: string;
	subject:string
	teacher: string;
	isQuiz: string;
	pdf: File;
}

export interface ITakeQuiz {
	quizId: string;
	subject: string;
	teacher: string;
	isLate: boolean;
	isQuiz: boolean;
	question: string[];
	answers: string[];



	// answers: {
	// 	questionNo: string;
	// 	question: string;
	// 	answer: string;
	// }[];
}


export interface ISendMessage {
	// studentId: string;
	// subjectId: string;
	chat: string;
	message: string;
}
