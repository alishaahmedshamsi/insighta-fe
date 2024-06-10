import { z } from "zod";

// create validation for add assignment

export const addAssignmentSchema = z.object({
	className: z.string(),
	subjectName: z.string(),
	totalMarks: z.number(),
	deadline: z.string(),
	file: z.string(),
});

export const addQuizSchema = z.object({
	className: z.string(),
	subjectName: z.string(),
	totalMarks: z.number(),
	deadline: z.string(),
	questions: z.array(
		z.object({
			question: z.string(),
		})
	),
});

export const addLectureSchema = z.object({
	title: z.string(),
	description: z.string(),
	className: z.string(),
	subjectName: z.string(),
	file: z.string(),
});
