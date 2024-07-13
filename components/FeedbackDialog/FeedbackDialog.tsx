import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { submitReview } from "@/services/apis/user.api";
import { useStudentSubject } from "@/hooks/user.hook";

export default function FeedbackDialog({
	userName,
	subject,
	teacherId,
}: {
	userName: string;

	teacherId: string;
	subject?: string[];

}) {
	const [open, setOpen] = useState(false);
	const [text, setText] = useState("");
	const cancelButtonRef = useRef(null);
	const submit = async () => {
		console.log("Feedback submitted");
		const { response, success } = await submitReview(text, teacherId);
		if (!success) return toast.error(response);
		setOpen(false);
		toast.success("Feedback submitted successfully");

	};

	const { subjectsList, isLoading: subjectsLoading } = useStudentSubject();
	console.log("subject: ", subject);

	// let currentSubjectName = subjectsList?.find((item: { _id: string; }) => item._id === subject)?.name;
	// console.log("currentSubjectName: ",currentSubjectName);

	const getCurrentSubjectName = (subjectId: string) => {
		let currentSubjectName = subjectsList?.find(
			(item: { _id: string }) => item._id === subjectId
		)?.name;
		console.log("currentSubjectName: ", currentSubjectName);
		return currentSubjectName;
	};

	

	return (
		<>
			<Button onClick={() => setOpen(!open)} className="align-end ">
				Give Feedback
			</Button>
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
								<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
									<div className="bg-white p-10">
										<div className="sm:flex sm:items-start">
											<div className="text-center sm:text-left w-full">
												<Dialog.Title
													as="h3"
													className="text-base text-[20px] font-semibold leading-6 text-gray-900 mb-2"
												>
													Details
												</Dialog.Title>
												<p className="text-[16px] font-normal leading-6 text-gray-500 mb-2">
													Name: {userName}
												</p>
												<p className="text-[16px] font-normal leading-6 text-gray-500 mb-2">
													Subject: { subject?.map((sub: any) => sub.name).join(", ")}
												</p>

												<Dialog.Title
													as="h3"
													className="text-base text-[20px] font-semibold leading-6 text-gray-900 mb-6"
												>
													Give Feedback
												</Dialog.Title>
												<div className="mt-2 w-full flex flex-col gap-4">
													<textarea
														name="feedback"
														id="feedback"
														onChange={(e) =>
															setText(
																e.target.value
															)
														}
														className="w-full border border-gray-300 rounded-md p-2"
														placeholder="Enter your feedback here..."
													></textarea>
													<div className="flex justify-end">
														<button
															type="button"
															className="inline-flex justify-center rounded-md bg-blue-500 text-white px-3 py-2 text-sm font-semibold shadow-sm hover:bg-blue-600"
															onClick={submit}
														>
															Submit
														</button>
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="bg-gray-50 p-10 py-4 flex justify-end">
										<button
											type="button"
											className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
											onClick={() => setOpen(false)}
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
	);
}
