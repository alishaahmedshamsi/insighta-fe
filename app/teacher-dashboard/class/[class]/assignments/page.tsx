"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import AddAssignmentComponent from "@/components/AddAssignment/add-assignment";
import { useQuery } from "@tanstack/react-query";
import { fetchAssignments } from "@/services/apis/teacher.api";
import { IUser } from "@/types/type";
import { useCurrentUser } from "@/hooks/user.hook";
import { Key } from "react";

// const allAssignments = [
// 	{
// 		title: "Assignment #1",
// 		deadline: "5 May 2024",
// 		totalMarks: "10",
// 		assignment: "#",
// 	},
// 	{
// 		title: "Assignment #2",
// 		deadline: "1 May 2024",
// 		totalMarks: "10",
// 		assignment: "#",
// 	},
// ];

export default function TeacherIndividualClassAddAssignments({
	params,
}: {
	params: { class: string };
}) {
	const { class: teacherClass } = params;
	const mainSectionHeading = `Manage Assignments of Class: ${teacherClass}`;
	
	const extractSubject = teacherClass.split("-")[1];
	const { user } = useCurrentUser();

	const subjectId = user?.subject.find(
		(subject) => subject.name == extractSubject
	)?._id;

	// console.log("user: ", user?.subject);
	// console.log("subjectId: ", subjectId);

	const { data: allAssignments, isLoading } = useQuery({
		queryKey: ["fetch-assignments"],
		queryFn: () => fetchAssignments(subjectId!),
	});

	// console.log("All assignments: ", allAssignments)

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<DashboardLayout
				mainSectionHeading={mainSectionHeading}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
					<AddAssignmentComponent />

					<hr className="my-[1em]" />

					<div className="rounded-[2em] flex flex-col gap-[2em]">
						{allAssignments?.map(
							(
								assignment: any,
								index: Key | null | undefined
							) => (
								<div key={index}>
									<div className="subject-assignments-container flex flex-col gap-6">
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
														{/* just print the first 10 letters */}
														{assignment.deadline.slice(
															0,
															10
														)}
													</h4>
												</div>
												{/* <div>
												<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
													Total Marks
												</h5>
												<h4 className="text-[#111] capitalize text-[1.2em]">
													{assignment.totalMarks}
												</h4>
											</div> */}

												<div>
													<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
														Assignment
													</h5>
													<h4 className="text-[#111] underline capitalize text-[1.2em]">
														<Link
															href={
																assignment.assignmentFile
															}
														>
															Download File
														</Link>
													</h4>
												</div>
											</div>
										</div>
									</div>
								</div>
							)
						)}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
