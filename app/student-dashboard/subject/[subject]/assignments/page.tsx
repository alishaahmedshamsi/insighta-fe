"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { STUDENT_QUICK_START_LIST } from "@/utils/constant/constant";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";
import Image from "next/image";

const userDetails = {
	userName: "Annie Leonchart",
	role: "Student",
	class: "5",
	section: "B",
};

const allAssignments = [
	{
		title: "Assignment #1",
		deadline: "5 May 2024",
		totalMarks: "10",
		obtMarks: "--",
		status: "Not completed",
		assignment: "#",
	},
	{
		title: "Assignment #2",
		deadline: "1 May 2024",
		totalMarks: "10",
		obtMarks: "8",
		status: "Completed",
		assignment: "#",
	},
];

export default function StudentSubjectAssignment({
	params,
}: {
	params: { subject: string };
}) {
	const { subject } = params;

	const mainSectionHeading = `${subject} Assignments`;
	return (
		<>
			<DashboardLayout
				mainSectionHeading={mainSectionHeading}
				// pointsEarned={"400"}
				userDetails={userDetails}
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
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
