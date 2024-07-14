import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Button } from "../ui/button";
import { gradeSubmission } from "@/services/apis/user.api";
import { toast } from "sonner";

export default function TeacherGrading({
	userName,
	userClass,
	number,
	materialType,
	submissionId,
	totalMarks,
}: {
	submissionId: string;
	userName: string;
	userClass: string;
	number: string | undefined;
	materialType: string;
	totalMarks: string;
}) {
	const [open, setOpen] = useState(false);
	const cancelButtonRef = useRef(null);
	const [marks, setMarks] = useState<number | undefined>(undefined);
	const Submit = () => {
		gradeSubmission(marks, submissionId);
		setOpen(false);
		toast.success("Graded Successfully");
	};
	return (
		<>
			<Button onClick={() => setOpen(!open)}>Grading</Button>
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
													as="h2"
													className="text-[24px] font-semibold leading-6 text-gray-900 mb-2"
												>
													Grade Student
												</Dialog.Title>
												<Dialog.Title
													as="h3"
													className="text-base text-[20px] font-semibold leading-6 text-gray-900 mb-2"
												>
													Student Details
												</Dialog.Title>
												<p className="text-[16px] font-normal leading-6 text-gray-500 mb-2">
													Name: {userName}
												</p>
												<p className="text-[16px] font-normal leading-6 text-gray-500 mb-2">
													Class: {userClass}
												</p>

												<Dialog.Title
													as="h3"
													className="text-base text-[20px] font-semibold leading-6 text-gray-900 mt-4 mb-2"
												>
													{materialType}: {number}
												</Dialog.Title>
												{/* <p className="text-[16px] font-normal leading-6 text-gray-500 mb-2">
													Total Marks: {totalMarks}
												</p> */}
												{/* <p className="text-[16px] font-normal leading-6 text-gray-500 mb-2">
													Obtained Marks:
												</p> */}
												<input
													onChange={(els) =>
														setMarks(
															Number(
																els.target.value
															)
														)
													}
													className="w-full p-[.5em] rounded-[1em] border border-[#DBDBDB] bg-[#f4f8fb]"
													type="number"
													placeholder="Enter Obtained Marks"
												/>
											</div>
										</div>
									</div>
									<div className="bg-gray-50 p-10 py-4 flex justify-end gap-4">
										<button
											type="button"
											className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
											onClick={() => setOpen(false)}
											ref={cancelButtonRef}
										>
											Close
										</button>
										<button
											type="button"
											className="mt-3 inline-flex w-full justify-center rounded-md bg-green-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-black sm:mt-0 sm:w-auto"
											onClick={Submit}
											ref={cancelButtonRef}
										>
											Submit
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
