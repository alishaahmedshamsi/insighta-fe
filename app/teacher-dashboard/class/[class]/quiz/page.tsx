"use client";
import { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import TakeQuizOnline from "@/components/takeQuizOnline";
import AddQuizComponent from "@/components/AddQuiz/add-quiz";
import { useCurrentUser } from "@/hooks/user.hook";
import { useQuery } from "@tanstack/react-query";
import { fetchQuiz } from "@/services/apis/teacher.api";
import { Key } from "react";

export default function TeacherIndividualClassAddAssignments({
	params,
}: {
	params: { class: string };
}) {
	const { class: teacherClass } = params;

	const mainSectionHeading = `Manage Quiz of Class: ${teacherClass}`;
	const decodeMainSectionheading = decodeURI(mainSectionHeading);


	const extractClass = teacherClass.split("-")[0].trim();
	const { user } = useCurrentUser();

	const classId = user?.classes.find(
		(cls) => cls.className.toString() == extractClass
	)?._id;

	const { data: allQuiz, isLoading } = useQuery({
		queryKey: ["fetch-quiz"],
		queryFn: () => fetchQuiz(classId!),
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<DashboardLayout
				mainSectionHeading={decodeMainSectionheading}
				// pointsEarned={"400"}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
					<AddQuizComponent />

					<hr className="my-[1em]" />

					<div className="rounded-[2em] flex flex-col gap-[2em]">
						{allQuiz?.length == 0 || allQuiz == null ? (
							<div>No quiz rightnow.</div>
						) : (
							allQuiz?.map(
								(quiz: any, index: Key | null | undefined) => (
									<div key={index}>
										<div className="subject-quizs-container flex flex-col gap-6">
											<div
												key={index}
												className="quiz flex flex-col rounded-[2em] border border-[#DBDBDB] bg-white p-[2em]"
											>
												<div className="assginment-details grid grid-cols-4 gap-5">
													<div>
														<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
															Title
														</h5>
														<h4 className="text-[#111] capitalize text-[1.2em]">
															{quiz.title}
														</h4>
													</div>
													<div>
														<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
															Deadline
														</h5>
														<h4 className="text-[#111] capitalize text-[1.2em]">
															{quiz.deadline.slice(
																0,
																10
															)}
														</h4>
													</div>
													<div>
														<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
															Total Marks
														</h5>
														<h4 className="text-[#111] capitalize text-[1.2em]">
															{quiz.marks}
														</h4>
													</div>

													<div>
														<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
															View Quiz
														</h5>
														<h4 className="text-[#111] underline capitalize text-[1.2em]">
															<TakeQuizOnline
																displayText="Quiz Questions"
																role="teacher"
																quizName={
																	quiz.title
																}
																quizQuestions={
																	quiz.question
																}
															/>
														</h4>
													</div>
												</div>
											</div>
										</div>
									</div>
								)
							)
						)}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
