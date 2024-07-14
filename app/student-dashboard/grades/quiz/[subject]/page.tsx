"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { STUDENT_QUICK_START_LIST } from "@/utils/constant/constant";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";
import StudentQuiz from "@/components/StudentQuiz/StudentQuiz";
import { useStudentQuizSubmission, useStudentSubject } from "@/hooks/user.hook";
import { useQuery } from "@tanstack/react-query";
import {
	fetchStudentQuiz,
	fetchStudentQuizSubmission,
} from "@/services/apis/user.api";
import TeacherGrading from "@/components/TeacherGrading/teacher-grading";
import TakeQuizOnline from "@/components/takeQuizOnline";

export default function StudentSubjectQuiz({
	params,
}: {
	params: { subject: string };
}) {
	const { subject } = params;

	const {
		quizSubmissionList,
		isLoading: submissionLoading,
		error,
	} = useStudentQuizSubmission(undefined, subject);

	console.log("quizSubmissionList: ", quizSubmissionList);

	const { subjectsList } = useStudentSubject();
	const subjectName = subjectsList?.find(
		(sub: { _id: string }) => sub._id === subject
	);

	const { data: myAllQuiz, isLoading } = useQuery({
		queryKey: ["fetch-student-quiz"],
		queryFn: () => fetchStudentQuiz(subject),
	});

	console.log("myAllQuiz: ", myAllQuiz);
	// let quizTitle = [];
	// if (
	// 	quizSubmissionList &&
	// 	quizSubmissionList.length > 0 &&
	// 	quizSubmissionList[0]?.quizId
	// ) {
	// 	quizTitle = myAllQuiz?.filter(
	// 		(quiz: any) => quiz._id == quizSubmissionList[0].quizId
	// 	);
	// }
	// const { data: myAllQuiz, isLoading } = useQuery({
	// 	queryKey: ["fetch-student-quiz"],
	// 	queryFn: () => fetchStudentQuizSubmission(subject),
	// });

	// console.log("myAllQuiz: ", myAllQuiz);

	const mainSectionHeading = subjectName
		? `${subjectName.name} Quiz`
		: `${subject} Quiz`;

	// const mainSectionHeading = `${subject} Quiz`;

	const getQuizTitle = (quizId: string) => {
		const quiz = myAllQuiz?.find((quiz: any) => quiz._id === quizId);
		return quiz ? quiz.title : quizId;
	};
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
						{submissionLoading ? (
							<div>loading...</div>
						) : error ? (
							<div>Error loading data.</div>
						) : (
							quizSubmissionList?.map(
								(submission: any, index: number) => (
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
														{getQuizTitle(
															submission.quizId
														)}
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
												{/* <div>
													<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
														Deadline
													</h5>
													<h4 className="text-[#111] capitalize text-[1.2em]">
														{
															submission.assignmentId
																.deadline
														}
													</h4>
												</div> */}
												<div>
													<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
														Obt. Marks
													</h5>
													<h4 className="text-[#111] capitalize text-[1.2em]">
														{/* {submission.obtainMarks} */}
														{submission.obtainMarks ||
														"-"}
													</h4>
												</div>
												{/* <div>
													<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
														Total Marks
													</h5>
													<h4 className="text-[#111] capitalize text-[1.2em]">
														{
															submission.assignmentId
																.totalMarks
														}
													</h4>
												</div> */}
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
								)
							)
						)}
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
