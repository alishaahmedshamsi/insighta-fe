import React from "react";
import { capitalizeFirstLetter } from "@/lib/utils";
import Link from "next/link";
import TakeQuizOnline from "../takeQuizOnline";

function isDeadlinePassed(deadline: string) {
	const currentDate = new Date();
	const deadlineDate = new Date(deadline);
	return currentDate > deadlineDate;
}

export default function StudentQuiz({
	index,
	quiz,
}: {
	index: number;
	quiz: {
		title: string;
		deadline: string;
		totalMarks: string;
		obtMarks: string;
		status: string;
		quizQuestions: {
			questionNo: string;
			question: string;
		}[];
	}[];
}) {
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
								{quiz.deadline}
							</h4>
						</div>
						<div>
							<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
								Total Marks
							</h5>
							<h4 className="text-[#111] capitalize text-[1.2em]">
								{quiz.totalMarks}
							</h4>
						</div>
						<div>
							<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
								Obt. Marks
							</h5>
							<h4 className="text-[#111] capitalize text-[1.2em]">
								{quiz.obtMarks}
							</h4>
						</div>
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
									quiz.status.toLowerCase() == "completed"
										? `text-[#5fc935]`
										: "text-[#cf2e23]"
								}`}
							>
								{quiz.status}
							</h4>{" "}
						</div>
						{isDeadlinePassed(quiz.deadline) ? (
							<div className="h-full flex items-end">
								<h4 className="text-[#cf2e23] font-medium capitalize text-[1.2em]">
									Deadline Passed
								</h4>
							</div>
						) : (
							<div>
								<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
									Quiz
								</h5>
								<h4 className="text-[#111] underline capitalize text-[1.2em]">
									<TakeQuizOnline
										displayText="Start Quiz"
										quizName={quiz.title}
										quizQuestions={quiz.quizQuestions}
										role="student"
									/>
								</h4>
							</div>
						)}
					</div>
				</div>
			))}
		</>
	);
}
