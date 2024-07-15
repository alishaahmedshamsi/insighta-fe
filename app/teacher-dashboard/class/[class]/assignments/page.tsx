"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import AddAssignmentComponent from "@/components/AddAssignment/add-assignment";
import { useQuery } from "@tanstack/react-query";
import { fetchAssignments } from "@/services/apis/teacher.api";
import { useCurrentUser } from "@/hooks/user.hook";
import { Key } from "react";
import { useSearchParams } from "next/navigation";

export default function TeacherIndividualClassAddAssignments({
	params,
}: {
	params: { class: string };
}) {
	const { class: teacherClass } = params;
	const mainSectionHeading = `Manage Assignments of Class: ${teacherClass}`;
	const decodeMainSectionheading = decodeURI(mainSectionHeading);

	const searchParams = useSearchParams()
	const subjectId = searchParams.get('subjectId')

	const { data: allAssignments, isLoading } = useQuery({
		queryKey: ["fetch-assignments"],
		queryFn: () => fetchAssignments(subjectId!),
	});


	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<DashboardLayout
				mainSectionHeading={decodeMainSectionheading}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
					<AddAssignmentComponent />

					<hr className="my-[1em]" />

					<div className="rounded-[2em] flex flex-col gap-[2em]">
						{allAssignments?.length == 0 || allAssignments == null ? (
							<div>No assignments rightnow.</div>
						) : (
							allAssignments?.map(
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
															<a
																href={
																	assignment.assignmentFile
																}
																download={
																	assignment.title
																}
																target="_blank"
															>
																Download File
															</a>
														</h4>
														{/* <a
															href="https://www.ilovepdf.com/download/bdythcwqfw44fbsvg7ly9hy1A03pddtA6jdyppl4xq4xrAvAcctwp35t5xlyfc1dhkdxAAmd9p4sp57tb8hk9dlpdbd42Avtt24x7x89z28h444cxr5c4mcm062dm23xq1wk4dd0lq4g97b29m624cnhshkt6hb0tggmxn6z4fmddc3zwx2q/32"
															download="add.pdf"
															target="_blank"
														>
															Download
														</a> */}
													</div>
												</div>
											</div>
										</div>
									</div>
								)
							)
						)}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
