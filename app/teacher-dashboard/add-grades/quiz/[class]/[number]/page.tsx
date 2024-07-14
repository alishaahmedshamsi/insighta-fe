"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import TakeQuizOnline from "@/components/takeQuizOnline";
import { Button } from "@/components/ui/button";
import TeacherGrading from "@/components/TeacherGrading/teacher-grading";
import { useState } from "react";
import { useCurrentUser, useStudentQuizSubmission } from "@/hooks/user.hook";
import { useQuery } from "@tanstack/react-query";
import { fetchQuiz } from "@/services/apis/teacher.api";

export default function Component({
	params,
}: {
	params: { class: string; number: string };
}) {
	const { class: classes, number } = params;

	const extractClass = classes.split("-")[0].trim();
	const { user } = useCurrentUser();

	const classId = user?.classes.find(
		(cls) => cls.className.toString() == extractClass
	)?._id;

	const { data: allQuiz, isLoading } = useQuery({
		queryKey: ["fetch-quiz"],
		queryFn: () => fetchQuiz(classId!),
	});

	let currentQuiz = allQuiz?.find(
		(quiz: { _id: string }) => quiz._id == number
	);

	const { quizSubmissionList, isLoading: submissionLoading } =
		useStudentQuizSubmission(number);
	if (submissionLoading) return <div>Loading...</div>;

	console.log("quizSubmissionList: ", quizSubmissionList);

	const mainSectionHeading = currentQuiz
		? `Add Quiz Grades: ${currentQuiz.title}`
		: `Add Quiz Grades: ${number}`;
	// const mainSectionHeading = `Add Quiz Grades: ${classes} Quiz #${number} Grades`;
	return (
		<>
			<DashboardLayout
				mainSectionHeading={mainSectionHeading}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col">
					<div className="results-container flex flex-col gap-8 pb-[2em]">
						{/* results */}
						{quizSubmissionList.length == 0 ? (
							<div>No submissions.</div>
						) : (

							quizSubmissionList?.map(
							(submission: any, index: number) => {
								// Combine questions and answers into an array of objects
								const quizQA = submission.question.map(
									(question: string, idx: number) => ({
										question,
										answer: submission.answers[idx] || "",
									})
								);


								return (
									<div key={index} className="submission">
										<div className="submissions flex flex-col gap-3">
											<div
												key={index}
												className="grid grid-cols-5 items-center text-[1em] capitalize text-[#333] bg-white border border-[#DBDBDB] p-[1em] rounded-[1em]"
											>
												<h4>
													{
														submission.student
															.fullname
													}
												</h4>
												<h4>
													{submission.rollNumber
														? submission.rollNumber
														: " "}
												</h4>
												<h4>
													Late Submitted :{" "}
													{submission.isLate == "true"
														? "Yes"
														: "No"}
													{/* Total Marks: {submission.totalMarks} */}
												</h4>

												<div className="flex">
													<TeacherGrading
														submissionId={
															submission._id
														}
														userName={
															submission.student
																.fullname
														}
														userClass={classes}
														number={
															currentQuiz.title
														}
														materialType={"Quiz"}
														totalMarks={
															submission.totalMarks
														}
														// open={open}
														// setOpen={setOpen}
													/>

													{/* </TeacherGrading> */}
												</div>

												<TakeQuizOnline
													subject=""
													role="teacherGrading"
													quizName={"Quiz"}
													gradingQA={
														quizQA
													}
													displayText="View Questions"
													quizQuestions={["", ""]}
												/>
											</div>
										</div>
									</div>
								);
							}
						)
						)}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
