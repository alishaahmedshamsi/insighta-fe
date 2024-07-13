import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Link from "next/link";
import { UpdateUserLecturePoints } from "@/services/apis/lecture.api";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";

export default function WatchLectureDialog({
	lectureFile,
	isTeacherWatch=false
}: {
	lectureFile: string;
	isTeacherWatch?: boolean;
}) {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
	const updateLecturePoints = async () => {
		// console.log("Video has been ended");
		if (isTeacherWatch) {
			return;
		}
		await UpdateUserLecturePoints();
		toast.success("Lecture watched successfully");
		queryClient.invalidateQueries({
			queryKey: ["user-points"],
		})
	}
	const cancelButtonRef = useRef(null);

	return (
		<>
			<span className="cursor-pointer" onClick={() => setOpen(true)}>
				Watch Lecture
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
													className="text-base font-semibold leading-6 text-gray-900"
												>
													Watch Lecture
												</Dialog.Title>
												<div className="mt-2">
													{/* <video
														src={
															"https://res.cloudinary.com/dh0kktlun/image/upload/v1719785678/g2cfksnrit9ljuzkkpn5.webp"
														}
														controls
														className="w-full"
														></video> */}

													<video
														className="w-full"
														controls
														onEnded={updateLecturePoints}
													>
														<source
															src={lectureFile}
															type="video/mp4"
														/>
														
													</video>
													{/* 
													<video src="">
														<source />
													</video> */}
												</div>
											</div>
										</div>
									</div>
									<div className="bg-gray-50 px-10 py-4 flex justify-end">
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
