import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toast } from "sonner"; // Assuming you have toast notifications set up
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchStatus, onTakeQuiz } from "@/services/apis/user.api";
import { ITakeQuiz } from "@/types/type";
import { isDeadlinePassed } from "./StudentAssignment/StudentAssignment";
import { Loader2Icon } from "lucide-react";

export default function TakeQuizOnline({
	quizName,
	quizQuestions,
	displayText,
	role,
	createdBy,
	quizId,
	quizDeadline,
	gradingQA,
	subject,
}: {
	quizName: string;
	quizQuestions: string[];
	displayText: string;
	role: string;
	createdBy?: string;
	quizId?: string;
	quizDeadline?: string;
	subject?: string;
	gradingQA?:
		| {
				question: string;
				answer: string;
		  }[]
		| undefined;
}) {
	console.log("quizQuestions: ", quizQuestions);
	const [open, setOpen] = useState(false);
	const [openCount, setOpenCount] = useState(0);
	const [studentAnswers, setStudentAnswers] = useState<
		Array<{
			questionNo: string;
			question: string;
			answer: string;
		}>
	>([]);
	const [submitting, setSubmitting] = useState(false);
	const queryClient = useQueryClient();
	const cancelButtonRef = useRef(null);

	const { mutateAsync, reset, isPending } = useMutation({
		mutationFn: onTakeQuiz,
		onError: (error) => {
			console.log(error.message);
			setTimeout(() => {
				reset();
			}, 3000);
		},
	});
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitting(true);

		try {
			// Here you can perform validation if needed before submission
			if (studentAnswers.length !== quizQuestions.length) {
				toast.error("Please answer all questions before submitting.");
				return;
			}

			// Prepare data for submission
			const studentSubmission: ITakeQuiz = {
				quizId: quizId!,
				teacher: createdBy!,
				isLate: isDeadlinePassed(quizDeadline!),
				isQuiz: true,
				question: studentAnswers.map((question) => question.question),
				answers: studentAnswers.map((answer) => answer.answer),
				subject: subject
			};

			console.log("studentAnswers: ", studentAnswers);
			console.log("Student Submission: ", studentSubmission);

			const { success, response } = await mutateAsync(studentSubmission);

			if (!success) return toast.error(response);
			if (success) toast.success("Quiz Submitted Successfully");
			queryClient.invalidateQueries({
				queryKey: ["student-quiz-status"],
			});
			queryClient.invalidateQueries({ queryKey: ["user-points"] });

			// Simulate a delay for demo purposes
			setTimeout(() => {
				// toast.success("Quiz submitted successfully!");
				setOpen(false);
				setStudentAnswers([]);
				setSubmitting(false);
				setOpenCount(openCount + 1);
			}, 2000);
		} catch (error) {
			console.error("Error submitting quiz: ", error);
			toast.error("Failed to submit quiz. Please try again.");
			setSubmitting(false);
		}
	};

	const handleAnswerChange = (
		// questionNo: string,
		question: string,
		answer: string,
		index: number
	) => {
		const updatedAnswers = [...studentAnswers];
		let questionNo = `Question #${index + 1}`;
		updatedAnswers[index] = { questionNo, question, answer };
		setStudentAnswers(updatedAnswers);
	};

	return (
		<>
			{role === "teacherGrading" ? (
				<>
					<span
						className="cursor-pointer underline text-center"
						onClick={() => {
							setOpen(true);
						}}
					>
						{displayText}
					</span>

					<Transition.Root show={open} as={Fragment}>
						<Dialog
							className="relative z-10"
							initialFocus={cancelButtonRef}
							onClose={setOpen}
						>
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
							</Transition.Child>

							<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
								<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
									<Transition.Child
										as={Fragment}
										enter="ease-out duration-300"
										enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
										enterTo="opacity-100 translate-y-0 sm:scale-100"
										leave="ease-in duration-200"
										leaveFrom="opacity-100 translate-y-0 sm:scale-100"
										leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
									>
										<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[min(100%_-_20px,1000px)]">
											<div className="bg-white px-10 py-8">
												<div className="sm:flex sm:items-start">
													<div className="w-full">
														<Dialog.Title
															as="h3"
															className="text-base font-semibold leading-6 text-gray-900 uppercase tracking-[3px]"
														>
															{quizName}
															<hr className="my-4" />
														</Dialog.Title>
														<div className="mt-2 overflow-y-scroll max-h-[350px] pr-4">
															{gradingQA?.map(
																(
																	currentQuestion,
																	i
																) => (
																	<div
																		key={
																			i +
																			1
																		}
																		className="flex flex-col mb-12"
																	>
																		<h3 className="font-medium uppercase text-[#494949] align-middle text-[1em] tracking-[2px]">
																			Question
																			#
																			{i +
																				1}
																		</h3>
																		<h3 className="font-medium text-[#212121] align-middle text-[1.4em]">
																			{
																				currentQuestion.question
																			}
																		</h3>
																		<h3 className="font-normal text-[#666] align-middle text-[1em]">
																			{
																				currentQuestion.answer
																			}
																		</h3>
																	</div>
																)
															)}
														</div>
													</div>
												</div>
											</div>
											<div className="bg-gray-50 px-10 py-4 flex justify-end sticky">
												<button
													type="button"
													className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
													onClick={() =>
														setOpen(false)
													}
													ref={cancelButtonRef}
												>
													Close
												</button>
											</div>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</div>
						</Dialog>
					</Transition.Root>
				</>
			) : role === "teacher" ? (
				<>
					<span
						className="cursor-pointer underline text-center"
						onClick={() => {
							setOpen(true);
						}}
					>
						{displayText}
					</span>

					<Transition.Root show={open} as={Fragment}>
						<Dialog
							className="relative z-10"
							initialFocus={cancelButtonRef}
							onClose={setOpen}
						>
							<Transition.Child
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
							</Transition.Child>

							<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
								<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
									<Transition.Child
										as={Fragment}
										enter="ease-out duration-300"
										enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
										enterTo="opacity-100 translate-y-0 sm:scale-100"
										leave="ease-in duration-200"
										leaveFrom="opacity-100 translate-y-0 sm:scale-100"
										leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
									>
										<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[min(100%_-_20px,1000px)]">
											<div className="bg-white px-10 py-8">
												<div className="sm:flex sm:items-start">
													<div className="w-full">
														<Dialog.Title
															as="h3"
															className="text-base font-semibold leading-6 text-gray-900 uppercase tracking-[3px]"
														>
															{quizName}
															<hr className="my-4" />
														</Dialog.Title>
														<div className="mt-2 overflow-y-scroll pr-4">
															{quizQuestions?.map(
																(
																	question,
																	i
																) => (
																	<div
																		key={i}
																		className="flex flex-col mb-4"
																	>
																		<h3 className="font-medium uppercase text-[#494949] align-middle text-[1em] tracking-[2px]">
																			Question
																			#
																			{i +
																				1}
																		</h3>
																		<h3 className="font-medium text-[#212121] align-middle text-[1.4em]">
																			{
																				question
																			}
																		</h3>
																	</div>
																)
															)}
														</div>
													</div>
												</div>
											</div>
											<div className="bg-gray-50 px-10 py-4 flex justify-end sticky">
												<button
													type="button"
													className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
													onClick={() =>
														setOpen(false)
													}
													ref={cancelButtonRef}
												>
													Close
												</button>
											</div>
										</Dialog.Panel>
									</Transition.Child>
								</div>
							</div>
						</Dialog>
					</Transition.Root>
				</>
			) : role === "student" ? (
				<>
					<span
						className="cursor-pointer"
						onClick={() => {
							setOpen(true);
						}}
					>
						{displayText}
					</span>

					{openCount < 1 && (
						<Transition.Root show={open} as={Fragment}>
							<Dialog
								className="relative z-10"
								initialFocus={cancelButtonRef}
								onClose={setOpen}
							>
								<Transition.Child
									as={Fragment}
									enter="ease-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in duration-200"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
								</Transition.Child>

								<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
									<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
										<Transition.Child
											as={Fragment}
											enter="ease-out duration-300"
											enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
											enterTo="opacity-100 translate-y-0 sm:scale-100"
											leave="ease-in duration-200"
											leaveFrom="opacity-100 translate-y-0 sm:scale-100"
											leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
										>
											<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[min(100%_-_20px,1000px)]">
												<form onSubmit={handleSubmit}>
													<div className="bg-white px-10 py-8">
														<div className="sm:flex sm:items-start">
															<div className="w-full">
																<Dialog.Title
																	as="h3"
																	className="text-base font-semibold leading-6 text-gray-900 uppercase tracking-[3px]"
																>
																	{quizName}
																	<hr className="my-4" />
																</Dialog.Title>
																<div className="mt-2 overflow-y-scroll h-[450px] pr-4">
																	{quizQuestions?.map(
																		(
																			question,
																			index
																		) => (
																			<div
																				key={
																					index
																				}
																				className="flex flex-col mb-4"
																			>
																				<label
																					// htmlFor={
																					// 	question.questionNo
																					// }
																					className="font-medium text-[#212121] align-middle text-[1.2em]"
																				>
																					{
																						question
																					}
																				</label>
																				<textarea
																					// id={
																					// 	question.questionNo
																					// }
																					value={
																						studentAnswers[
																							index
																						]
																							?.answer ||
																						""
																					}
																					onChange={(
																						e
																					) =>
																						handleAnswerChange(
																							// question.questionNo,
																							question,
																							e
																								.target
																								.value,
																							index
																						)
																					}
																					required
																					className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
																				/>
																			</div>
																		)
																	)}
																</div>
															</div>
														</div>
													</div>
													<div className="bg-gray-50 px-10 py-4 flex justify-end sticky gap-4">
														<button
															type="button"
															className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
															onClick={() =>
																setOpen(false)
															}
															ref={
																cancelButtonRef
															}
														>
															Close
														</button>
														<button
															type="submit"
															className="mt-3 inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm border-none outline-none font-semibold text-white shadow-sm hover:bg-brand-pink sm:mt-0 sm:w-auto"
															// onClick={() =>

															// }
															ref={
																cancelButtonRef
															}
														>
															{isPending ? (
																<>
																	<div className="flex justify-center items-center">
																		<Loader2Icon className="mr-2 animate-spin" />
																		<span>
																			Submitting...
																		</span>
																	</div>
																</>
															) : (
																"Submit"
															)}
														</button>
													</div>
												</form>
											</Dialog.Panel>
										</Transition.Child>
									</div>
								</div>
							</Dialog>
						</Transition.Root>
					)}
				</>
			) : (
				<div>
					<h1>Nothing here.</h1>
					<p>Your role is not recognized.</p>
				</div>
			)}
		</>
	);
}
