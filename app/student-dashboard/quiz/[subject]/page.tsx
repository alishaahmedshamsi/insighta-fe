"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { STUDENT_QUICK_START_LIST } from "@/utils/constant/constant";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";
import StudentQuiz from "@/components/StudentQuiz/StudentQuiz";
import { useStudentSubject } from "@/hooks/user.hook";
import { useQuery } from "@tanstack/react-query";
import { fetchStudentQuiz } from "@/services/apis/user.api";

const allQuiz = [
	{
		title: "Quiz #1",
		deadline: "5 June 2024",
		totalMarks: "10",
		obtMarks: "--",
		status: "Not completed",
		quizQuestions: [
			{
				questionNo: "Question #1",
				question: "List all parts of speech?",
			},
			{
				questionNo: "Question #1",
				question: "List all parts of speech?",
			},
			{
				questionNo: "Question #1",
				question: "List all parts of speech?",
			},
			{
				questionNo: "Question #1",
				question: "List all parts of speech?",
			},
		],
	},
	{
		title: "Quiz #2",
		deadline: "1 August 2024",
		totalMarks: "10",
		obtMarks: "8",
		status: "Completed",
		quizQuestions: [
			{
				questionNo: "Question #1",
				question: "List all parts of speech?",
			},
			{
				questionNo: "Question #1",
				question: "List all parts of speech?",
			},
			{
				questionNo: "Question #1",
				question: "List all parts of speech?",
			},
			{
				questionNo: "Question #1",
				question: "List all parts of speech?",
			},
		],
	},
];

export default function StudentSubjectQuiz({
	params,
}: {
	params: { subject: string };
}) {
	const { subject } = params;

	const { subjectsList } = useStudentSubject();
	const subjectName = subjectsList?.find(
		(sub: { _id: string }) => sub._id === subject
	);

	const { data: myAllQuiz, isLoading } = useQuery({
		queryKey: ["fetch-student-quiz"],
		queryFn: () => fetchStudentQuiz(subject),
	});

	const mainSectionHeading = subjectName
	? `${subjectName.name} Quiz`
	: `${subject} Quiz`;

	console.log("myAllQuiz: ", myAllQuiz)


	// const mainSectionHeading = `${subject} Quiz`;
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
						{myAllQuiz?.map((quiz: any, index: any) => (
							<StudentQuiz index={index} quiz={[quiz]} />
						))}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
