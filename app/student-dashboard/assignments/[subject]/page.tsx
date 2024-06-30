"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { STUDENT_QUICK_START_LIST } from "@/utils/constant/constant";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";
import { useStudentSubject, useStudentAssignments } from "@/hooks/user.hook";
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, Key } from "react";


export default function Component({ params }: { params: { subject: string } }) {
	const { subject } = params;

	// fetch assignment list based on subjectId
	const allAssignments = [
		{
			title: "Assignment #1",
			deadline: "5 May 2024",
			viewLink: `/student-dashboard/assignments/${subject}/1`,
		},
		{
			title: "Assignment #2",
			deadline: "7 May 2024",
			viewLink: `/student-dashboard/assignments/${subject}/2`,
		},
	];


	const { assignmentsList } = useStudentAssignments(subject);

	console.log("assignmentsList: ", assignmentsList);

	const { subjectsList } = useStudentSubject();
	const subjectName = subjectsList?.find(
		(sub: { _id: string }) => sub._id === subject
	);

	const mainSectionHeading = subjectName
		? `${subjectName.name} Assignments`
		: `${subject} Assignments`;

	// const mainSectionHeading = `${subject} Assignments`;
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
						{assignmentsList?.map((assignment: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined; deadline: string | any[]; _id: any; }, index: Key | null | undefined) => (
							<div
								key={index}
								className="assignment flex flex-col rounded-[2em] border border-[#DBDBDB] bg-white p-[2em]"
							>
								<div className="assginment-details grid grid-cols-3 gap-5">
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
											{assignment.deadline.slice(0, 10)}
										</h4>
									</div>
									<div>
										<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
											View Details
										</h5>
										<Link
											href={`/student-dashboard/assignments/${subject}/${assignment._id}`}
										>
											<h4 className="text-[#111] capitalize text-[1.2em] underline">
												Open Assignment
											</h4>
										</Link>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
