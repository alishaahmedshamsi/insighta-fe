import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

export default function PointsBreakdown({
	points,
	assignmentPoints,
	quizPoints,
	lecturePoints,
}: {
	points: number;
	assignmentPoints: number;
	quizPoints: number;
	lecturePoints: number;
}) {
	const [open, setOpen] = useState(false);

	const cancelButtonRef = useRef(null);

	return (
		<>
			<span className="cursor-pointer" onClick={() => setOpen(true)}>
				⭐ {points} Points
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
								<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
									<div className="bg-white p-10">
										<div className="sm:flex sm:items-start">
											{/* <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
												<ExclamationTriangleIcon
													className="h-6 w-6 text-red-600"
													aria-hidden="true"
												/>
											</div> */}
											<div className="text-center sm:text-left w-full">
												<Dialog.Title
													as="h3"
													className="text-base text-[20px] font-semibold leading-6 text-gray-900 mb-6"
												>
													Points Breakdown
												</Dialog.Title>
												<div className="mt-2 w-full flex flex-col gap-4">
													<div className="flex justify-between items-center w-full bg-[#eee] p-2 px-4 rounded-md">
														<span>Assignment</span>
														<span>
															⭐{" "}
															{assignmentPoints}
														</span>
													</div>
													<div className="flex justify-between items-center w-full bg-[#eee] p-2 px-4 rounded-md">
														<span>Quiz</span>
														<span>
															⭐ {quizPoints}
														</span>
													</div>
													<div className="flex justify-between items-center w-full bg-[#eee] p-2 px-4 rounded-md">
														<span>Lectures</span>
														<span>
															⭐ {lecturePoints}
														</span>
													</div>
                                                    <hr />
													<div className="flex justify-between items-center w-full bg-[#fff] border border-[#eee] p-2 px-4 rounded-md">
														<span className="font-semibold">Total Points</span>
														<span className="font-semibold">
															⭐ {points}
														</span>
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
