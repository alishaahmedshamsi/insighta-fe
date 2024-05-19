"use client";
import { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import TakeQuizOnline from "@/components/takeQuizOnline";

const userDetails = {
	userName: "Annie Leonchart",
	role: "Teacher",
	qualification: "BA in English",
};

const allQuiz = [
	{
		subject: "English",
		quiz: [
			{
				title: "Quiz #1",
				deadline: "5 May 2024",
				totalMarks: "10",
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
				],
			},
		],
	},
	{
		subject: "Science",
		quiz: [
			{
				title: "Quiz #1",
				deadline: "3 May 2024",
				totalMarks: "10",
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
				],
			},
		],
	},
];

export default function TeacherIndividualClassAddAssignments({
	params,
}: {
	params: { class: string };
}) {
	const { class: teacherClass } = params;

	const mainSectionHeading = `Manage Quiz of Class: ${teacherClass}`;

	const [formState, setFormState] = useState({
		class: teacherClass,
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
				mainSectionHeading={mainSectionHeading}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
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
														removeQuestion(
															question.id
														)
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

					<hr className="my-[1em]" />

					<div className="rounded-[2em] flex flex-col gap-[2em]">
						{allQuiz.map((subject, index) => (
							<div key={index}>
								<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
									{subject.subject}
								</h3>
								<div className="subject-quizs-container flex flex-col gap-6">
									{subject.quiz.map((quiz, index) => (
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
														View Quiz
													</h5>
													<h4 className="text-[#111] underline capitalize text-[1.2em]">
														{/* <Link
															href={
																quiz.quizQuestions
															}
														>
															Start
														</Link> */}
														<TakeQuizOnline
															displayText="Quiz Questions"
															role="teacher"
															quizName={
																quiz.title
															}
															quizQuestions={
																quiz.quizQuestions
															}
														/>
													</h4>
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
