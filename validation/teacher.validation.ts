import { z } from "zod";

// create validation for add assignment

export const addAssignmentSchema = z.object({
	title: z.string(),
	description: z.string(),
	className: z.string(),
	subjectName: z.string(),
	deadline: z.date(),
	marks: z.number(),
	file: z.string(),
});

export const addQuizSchema = z.object({
	className: z.string(),
	subjectName: z.string(),
	marks: z.number(),
	deadline: z.date(),
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
