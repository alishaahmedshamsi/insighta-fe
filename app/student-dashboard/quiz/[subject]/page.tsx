"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { STUDENT_QUICK_START_LIST } from "@/utils/constant/constant";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";
import TakeQuizOnline from "@/components/takeQuizOnline";

import StudentQuiz from "@/components/StudentQuiz/StudentQuiz";

const allQuiz = [
	{
		title: "Quiz #1",
		deadline: "11 july 2024",
		totalMarks: "10",
		obtMarks: "--",
		status: "Not completed",
		quizQuestions: [
			{
				questionNo: "Question #1",
				question: "List all parts of speech?",
			},
			{
				questionNo: "Question #2",
				question: "List all parts of speech?",
			},
			{
				questionNo: "Question #3",
				question: "List all parts of speech?",
			},
			{
				questionNo: "Question #4",
				question: "List all parts of speech?",
			},
		],
	},
	{
		title: "Quiz #2",
		deadline: "1 May 2024",
		totalMarks: "10",
		obtMarks: "8",
		status: "Completed",
		quizQuestions: [
			{
				questionNo: "Question #1",
				question: "List all parts of speech?",
			},
			{
				questionNo: "Question #2",
				question: "List all parts of speech?",
			},
			{
				questionNo: "Question #3",
				question: "List all parts of speech?",
			},
			{
				questionNo: "Question #4",
				question: "List all parts of speech?",
			},
		],
	},
];

// function isDeadlinePassed(deadline: string) {
// 	const currentDate = new Date();
// 	const deadlineDate = new Date(deadline);
// 	return currentDate > deadlineDate;
// }

export default function Component({ params }: { params: { subject: string } }) {
	const { subject } = params;

	const mainSectionHeading = `${subject} Quiz`;

	// const currentDate = new Date();
	// const deadline = new Date(allQuiz[0].deadline);
	// const isDeadlinePassed = currentDate > deadline;
	return (
		<>
			<DashboardLayout
				mainSectionHeading={mainSectionHeading}
				// pointsEarned={"400"}
				quickStartList={STUDENT_QUICK_START_LIST}
				leftSidebarLinks={studentLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
					<div className="flex flex-col gap-6">
						<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
							Quiz
						</h3>
						{allQuiz.map((quiz, index) => (
							<StudentQuiz index={index} quiz={[quiz]} />
						))}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
