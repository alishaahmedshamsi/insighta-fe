"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { STUDENT_QUICK_START_LIST } from "@/utils/constant/constant";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";
import StudentQuiz from "@/components/StudentQuiz/StudentQuiz";
import { useStudentSubject } from "@/hooks/user.hook";
import { useQuery } from "@tanstack/react-query";
import { fetchStudentQuiz, fetchStudentQuizSubmission } from "@/services/apis/user.api";
import TeacherGrading from "@/components/TeacherGrading/teacher-grading";
import TakeQuizOnline from "@/components/takeQuizOnline";

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
		queryFn: () => fetchStudentQuizSubmission(subject),
	});

	const mainSectionHeading = subjectName
		? `${subjectName.name} Quiz`
		: `${subject} Quiz`;


	// const mainSectionHeading = `${subject} Quiz`;
	return (
		<>
			<DashboardLayout
				mainSectionHeading={mainSectionHeading}
				// pointsEarned={"400"}
				quickStartList={STUDENT_QUICK_START_LIST}
				leftSidebarLinks={studentLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col">
					<div className="results-container flex flex-col gap-8 pb-[2em]">
						{/* results */}
						{myAllQuiz?.map((submission: any, index: number) => (
							<div key={index} className="submission">
								<div className="submissions flex flex-col gap-3">
									<div
										key={index}
										className="grid grid-cols-3 gap-5 items-center text-[1em] capitalize text-[#333] bg-white border border-[#DBDBDB] p-[2em] rounded-[1em]"
									>
										<div>
											<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
												Title
											</h5>
											<h4 className="text-[#111] capitalize text-[1.2em]">
												{submission.title}
											</h4>
										</div>
										<div>
											<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
												Status
											</h5>
											<h4 className="text-[#189918] capitalize text-[1.2em]">
												{submission.status}
											</h4>
										</div>
										<div>
											<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
												Deadline
											</h5>
											<h4 className="text-[#111] capitalize text-[1.2em]">
											
											</h4>
										</div>
										<div>
											<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
												Obt. Marks
											</h5>
											<h4 className="text-[#111] capitalize text-[1.2em]">
												{submission.obtainMarks}
											</h4>
										</div>
										<div>
											<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
												Total Marks
											</h5>
											<h4 className="text-[#111] capitalize text-[1.2em]">
												10
											</h4>
										</div>
										{/* <div>
												<TakeQuizOnline
													role="teacher"
													quizName={submission.title}
													// gradingQA={submission.quizQA}
													displayText="View Questions"
													quizQuestions={
														submission.question
													}
												/>
											</div> */}
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
				{/* <div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
					<div className="flex flex-col gap-6">
						<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
							Quiz
						</h3>
						{myAllQuiz?.map((quiz: any, index: any) => (
							<StudentQuiz index={index} quiz={[quiz]} />
						))}
					</div>
				</div> */}
			</DashboardLayout>
		</>
	);
}
