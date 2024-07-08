import React from "react";
import { capitalizeFirstLetter } from "@/lib/utils";
import Link from "next/link";
import TakeQuizOnline from "../takeQuizOnline";
import { useQuery } from "@tanstack/react-query";
import { fetchQuizStatus, fetchStatus } from "@/services/apis/user.api";
function isDeadlinePassed(deadline: string) {
	const currentDate = new Date();
	const deadlineDate = new Date(deadline);
	return currentDate > deadlineDate;
}

export default function StudentQuiz({
	index,
	quiz,
	subject
}: {
	index: number;
	quiz: {
		title: string;
		deadline: string;
		marks: string;
		obtMarks: string;
		status: string;
		question: string[];
		createdBy: string;
		_id: string;
	}[];
	subject: string;
}) {
	console.log("quiz in StudentQuiz: ", quiz);
	const {
		data: studentQuizStatus,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["student-quiz-status", quiz[0]._id],
		queryFn: () => fetchQuizStatus(quiz[0]._id),
		retry: false, // Avoid retrying on error
	});

	console.log("quiz[0]._id: ", quiz[0]._id);
	console.log("studentQuizStatus: ", studentQuizStatus);
	return (
		<>
			{quiz.map((quiz) => (
				<div
					key={index}
					className="assignment flex flex-col rounded-[2em] border border-[#DBDBDB] bg-white p-[2em]"
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
								{quiz.deadline.slice(0, 10)}
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
						{/* <div>
							<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
								Obt. Marks
							</h5>
							<h4 className="text-[#111] capitalize text-[1.2em]">
								{quiz.obtMarks}
							</h4>
						</div> */}
						<div>
							<h5
								className={
									"text-[#777] font-medium uppercase text-[.9em] tracking-wider"
								}
							>
								Status
							</h5>
							<h4
								className={`text-[#111] font-medium capitalize text-[1.2em] ${
									studentQuizStatus?.toLowerCase() ==
									"submitted"
										? `text-[#5fc935]`
										: "text-[#cf2e23]"
								}`}
							>
								{isLoading ? (
									<div>Loading...</div>
								) : isError ? (
									<div>Error</div>
								) : (
									capitalizeFirstLetter(studentQuizStatus)
								)}
							</h4>{" "}
						</div>
						{isDeadlinePassed(quiz.deadline) ? (
							<div className="h-full flex items-end">
								<h4 className="text-[#cf2e23] font-medium capitalize text-[1.2em]">
									Deadline Passed
								</h4>
							</div>
						) : (
							studentQuizStatus?.toLowerCase() !== "submitted" && (
								<div>
									<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
										Quiz
									</h5>
									<h4 className="text-[#111] underline capitalize text-[1.2em]">
										<TakeQuizOnline
											displayText="Start Quiz"
											quizName={quiz.title}
											quizQuestions={quiz.question}
											role="student"
											createdBy={quiz.createdBy}
											quizId={quiz._id}
											quizDeadline={quiz.deadline}
											subject={subject}
										/>
									</h4>
								</div>
							)
						)}
					</div>
				</div>
			))}
		</>
	);
}
