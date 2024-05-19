"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";

const userDetails = {
	userName: "Annie Leonchart",
	role: "Teacher",
	qualification: "BA in English",
};

export default function Component() {
	const [formState, setFormState] = useState({
		class: "",
		subject: "",
		totalMarks: "",
		deadline: "",
		questions: [{ id: 1, text: "" }],
	});

	const addQuestion = () => {
		setFormState((prevState) => ({
			...prevState,
			questions: [
				...prevState.questions,
				{ id: prevState.questions.length + 1, text: "" },
			],
		}));
	};

	const removeQuestion = (id: number) => {
		setFormState((prevState) => ({
			...prevState,
			questions: prevState.questions.filter(
				(question) => question.id !== id
			),
		}));
	};

	const handleQuestionChange = (id: number, text: any) => {
		setFormState((prevState) => ({
			...prevState,
			questions: prevState.questions.map((question) =>
				question.id === id ? { ...question, text } : question
			),
		}));
	};

	const handleChange = (e: { target: { name: any; value: any } }) => {
		const { name, value } = e.target;
		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = () => {
		console.log(formState);
		// Handle quiz submission logic here
	};
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Add Quiz"}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em]">
					<div className="grid grid-cols-2 gap-[1em]">
						<div className="w-full flex flex-col">
							<label htmlFor="class">Class</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="class"
								name="class"
								type="text"
								value={formState.class}
								onChange={handleChange}
							/>
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="subject">Subject</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="subject"
								name="subject"
								type="text"
								value={formState.subject}
								onChange={handleChange}
							/>
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="totalMarks">Total Marks</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="totalMarks"
								name="totalMarks"
								type="text"
								value={formState.totalMarks}
								onChange={handleChange}
							/>
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="deadline">Deadline</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="deadline"
								name="deadline"
								type="text"
								value={formState.deadline}
								onChange={handleChange}
							/>
						</div>
						<div className="col-span-2">
							<label htmlFor="questions">Add Questions</label>
							<div className="grid grid-cols-2 gap-[1em] rounded-[1em] border border-[#DBDBDB] p-[1em]">
								{formState.questions.map((question) => (
									<div
										key={question.id}
										className="w-full flex flex-col col-span-2"
									>
										<label
											htmlFor={`question-${question.id}`}
										>
											Question #{question.id}
										</label>
										<div className="flex items-center">
											<input
												className="flex-1 rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
												id={`question-${question.id}`}
												type="text"
												value={question.text}
												onChange={(e) =>
													handleQuestionChange(
														question.id,
														e.target.value
													)
												}
											/>
											<button
												type="button"
												className="ml-2 text-red-500 font-bold text-xl"
												onClick={() =>
													removeQuestion(question.id)
												}
											>
												&times;
											</button>
										</div>
									</div>
								))}
								<div className="col-span-2">
									<button
										type="button"
										className="w-full rounded-[1em] bg-brand-sea-green px-[1em] py-[.5em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
										onClick={addQuestion}
									>
										Add Question
									</button>
								</div>
							</div>
						</div>
						<div className="col-span-2">
							<button
								type="button"
								className="w-full rounded-[1em] bg-brand-sea-green py-[.9em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
								onClick={handleSubmit}
							>
								Add Quiz
							</button>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
