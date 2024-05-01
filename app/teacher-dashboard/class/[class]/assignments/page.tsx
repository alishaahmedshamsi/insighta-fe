"use client";
import Link from "next/link";
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

const allAssignments = [
	{
		subject: "English",
		assignments: [
			{
				title: "Assignment #1",
				deadline: "5 May 2024",
				totalMarks: "10",
				assignment: "#",
			},
			{
				title: "Assignment #2",
				deadline: "1 May 2024",
				totalMarks: "10",
				assignment: "#",
			},
		],
	},
	{
		subject: "Science",
		assignments: [
			{
				title: "Assignment #1",
				deadline: "3 May 2024",
				totalMarks: "10",
				assignment: "#",
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

	const mainSectionHeading = `Manage Assignments of Class: ${teacherClass}`;
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
					<div className="grid grid-cols-2 gap-[1em]">
						<div className="w-full flex flex-col">
							<label htmlFor="class">Class</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="class"
								type="text"
								value={teacherClass}
							/>
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="subject">Subject</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="subject"
								type="text"
							/>
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="totalMarks">Total Marks</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="totalMarks"
								type="text"
							/>
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="deadline">Deadline</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="deadline"
								type="text"
							/>
						</div>
						<div className="w-full flex flex-col col-span-2">
							<label htmlFor="file">Upload file</label>
							<input
								type="file"
								name="file"
								id="file"
								className="col-span-3 w-full border-2 border-[#ddd] bg-white border-dashed rounded-[1em] p-[.8em]"
							/>
						</div>
						<div>
							<button className="col-span-1 w-full rounded-[1em] bg-brand-sea-green py-[.9em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor">
								Add Assignment
							</button>
						</div>
					</div>

					<hr className="my-[1em]" />

					<div className="rounded-[2em] flex flex-col gap-[2em]">
						{allAssignments.map((subject, index) => (
							<div key={index}>
								<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
									{subject.subject}
								</h3>
								<div className="subject-assignments-container flex flex-col gap-6">
									{subject.assignments.map(
										(assignment, index) => (
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
															{
																assignment.deadline
															}
														</h4>
													</div>
													<div>
														<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
															Total Marks
														</h5>
														<h4 className="text-[#111] capitalize text-[1.2em]">
															{
																assignment.totalMarks
															}
														</h4>
													</div>

													<div>
														<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
															Assignment
														</h5>
														<h4 className="text-[#111] underline capitalize text-[1.2em]">
															<Link
																href={
																	assignment.assignment
																}
															>
																Download File
															</Link>
														</h4>
													</div>
												</div>
											</div>
										)
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
