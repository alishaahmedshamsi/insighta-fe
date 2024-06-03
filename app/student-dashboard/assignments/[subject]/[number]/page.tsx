"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { STUDENT_QUICK_START_LIST } from "@/utils/constant/constant";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";

import defaultImage from "@/public/assets/default.webp";

const allAssignments = [
	{
		title: "Assignment #1",
		deadline: "5 May 2024",
		totalMarks: "10",
		obtMarks: "--",
		status: "Not completed",
		assignment: "#",
	},
];

export default function Component({
	params,
}: {
	params: { subject: string; number: string };
}) {
	const { subject, number } = params;

	const mainSectionHeading = `Details: ${subject} Assignment #${number}`;
	return (
		<>
			<DashboardLayout
				mainSectionHeading={mainSectionHeading}
				quickStartList={STUDENT_QUICK_START_LIST}
				leftSidebarLinks={studentLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
					<div className="flex flex-col gap-6">
						<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
							Assignments
						</h3>
						{allAssignments.map((assignment, index) => (
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
											{assignment.title}
										</h4>
									</div>
									<div>
										<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
											Deadline
										</h5>
										<h4 className="text-[#111] capitalize text-[1.2em]">
											{assignment.deadline}
										</h4>
									</div>
									<div>
										<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
											Total Marks
										</h5>
										<h4 className="text-[#111] capitalize text-[1.2em]">
											{assignment.totalMarks}
										</h4>
									</div>
									<div>
										<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
											Obt. Marks
										</h5>
										<h4 className="text-[#111] capitalize text-[1.2em]">
											{assignment.obtMarks}
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
												assignment.status == "Completed"
													? `text-[#5fc935]`
													: "text-[#cf2e23]"
											}`}
										>
											{assignment.status}
										</h4>{" "}
										{/* Completed/Checked/Not Completed */}
									</div>
									<div>
										<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
											Assignment
										</h5>
										<h4 className="text-[#111] underline capitalize text-[1.2em]">
											<Link href={assignment.assignment}>
												Download File
											</Link>
										</h4>
									</div>
								</div>
								{assignment.status === "Not completed" && (
									<>
										<hr className="my-[1em]" />
										<div className="upload-file-container">
											<div>
												<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
													Submit Assignment
												</h5>
												<h4 className="text-[#111] capitalize text-[1.2em] mb-[1em]">
													Upload File
												</h4>
												<div className="grid grid-cols-4">
													<input
														type="file"
														name="file"
														id="file"
														className="col-span-3 w-full border-2 border-[#777] border-dashed rounded-[2em] p-[.9em]"
													/>
													<button className="col-span-1 w-full rounded-[2em] bg-brand-sea-green py-3 text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor">
														Upload
													</button>
												</div>
											</div>
										</div>
									</>
								)}
							</div>
						))}

						<img src={defaultImage.toString()} alt="" />
						<hr />

						<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
							Chat with Peers
						</h3>

						{/* Chat box */}

						<div className="flex flex-col h-[600px] w-full bg-white dark:bg-gray-950 rounded-2xl shadow-lg overflow-hidden">
							<div className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-900">
								<div className="flex items-center gap-3">
									<Avatar className="w-8 h-8">
										<img
											src="https://github.com/shadcn.png"
											alt="Teacher"
										/>
										<AvatarFallback>TC</AvatarFallback>
									</Avatar>
									<div className="text-sm font-medium">
										Peers
									</div>
								</div>
								<div className="flex items-center gap-3">
									<div className="text-sm font-medium">
										You
									</div>
									<Avatar className="w-8 h-8">
										<img
											src="https://github.com/shadcn.png"
											alt="You"
										/>
										<AvatarFallback>ST</AvatarFallback>
									</Avatar>
								</div>
							</div>
							<div className="flex-1 overflow-y-auto p-6 space-y-4">
								<div className="flex items-start gap-4  justify-end">
									<div className="bg-blue-500 text-white dark:bg-gray-800 rounded-2xl p-4 max-w-[70%]">
										<div className="text-sm font-medium">
											You
										</div>
										<div className="text-sm text-white dark:text-gray-300 mt-1">
											Hi teacher, I'm having trouble
											understanding the concept of
											inheritance in JavaScript. Can you
											please explain it to me?
										</div>
									</div>
									<Avatar className="w-8 h-8">
										<img
											src="https://github.com/shadcn.png"
											alt="You"
										/>
										<AvatarFallback>ST</AvatarFallback>
									</Avatar>
								</div>
								<div className="flex items-start gap-4">
									<Avatar className="w-8 h-8">
										<img
											src="https://github.com/shadcn.png"
											alt="Peers"
										/>
										<AvatarFallback>TC</AvatarFallback>
									</Avatar>
									<div className="bg-gray-100 text-gray-700 rounded-2xl p-4 max-w-[70%]">
										<div className="text-sm font-medium">
											Peers
										</div>
										<div className="text-sm mt-1">
											Sure, inheritance in JavaScript is a
											way for one object to access the
											properties and methods of another
											object. It's a fundamental concept
											in object-oriented programming.
										</div>
									</div>
								</div>
								<div className="flex items-start gap-4  justify-end">
									<div className="bg-blue-500 text-white dark:bg-gray-800 rounded-2xl p-4 max-w-[70%]">
										<div className="text-sm font-medium">
											You
										</div>
										<div className="text-sm text-white dark:text-gray-300 mt-1">
											Okay, that makes sense. Can you give
											me an example of how inheritance
											works in JavaScript?
										</div>
									</div>
									<Avatar className="w-8 h-8">
										<img
											src="https://github.com/shadcn.png"
											alt="You"
										/>
										<AvatarFallback>ST</AvatarFallback>
									</Avatar>
								</div>
								<div className="flex items-start gap-4">
									<Avatar className="w-8 h-8">
										<img
											src="https://github.com/shadcn.png"
											alt="Peers"
										/>
										<AvatarFallback>TC</AvatarFallback>
									</Avatar>
									<div className="bg-gray-100 text-gray-700 rounded-2xl p-4 max-w-[70%]">
										<div className="text-sm font-medium">
											Peers
										</div>
										<div className="text-sm mt-1">
											Sure, let's say we have a `Vehicle`
											class that has properties like
											`make`, `model`, and `year`. We can
											then create a `Car` class that
											inherits from `Vehicle`. The `Car`
											class will have access to all the
											properties and methods of the
											`Vehicle` class, and can also add
											its own unique properties and
											methods.
										</div>
									</div>
								</div>
							</div>
							<div className="bg-gray-100 dark:bg-gray-900 px-6 py-4 flex items-center gap-2">
								<Input
									type="text"
									placeholder="Type your message..."
									className="flex-1 rounded-full bg-white dark:bg-gray-800 border-none focus:ring-0 focus:outline-none"
								/>
								<Button
									variant="ghost"
									size="icon"
									className="rounded-full"
								>
									<SendIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
								</Button>
							</div>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}

function SendIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m22 2-7 20-4-9-9-4Z" />
			<path d="M22 2 11 13" />
		</svg>
	);
}
