"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { STUDENT_QUICK_START_LIST } from "@/utils/constant/constant";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";

import StudentAssignment from "@/components/StudentAssignment/StudentAssignment";
import ChatBoxComponent from "@/components/ChatBox/ChatBoxComponent";

const allAssignments = [
	{
		title: "Assignment #1",
		deadline: "5 July 2024",
		totalMarks: "10",
		obtMarks: "--",
		status: "not completed",
		assignment: "#",
	},
];

export default function Component({
	params,
}: {
	params: { subject: string; number: string };
}) {
	const { subject, number } = params;

	const mainSectionHeading = `Subejct: ${subject} - Assignment #${number}`;

	// fetch specific assignment  based on assignmentId (subjectId is optional)

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
							<StudentAssignment
								index={index}
								assignment={[assignment]}
							/>
						))}

						<hr />

						<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
							Chat with Peers
						</h3>

						{/* Chat box */}

						<ChatBoxComponent
							assignmentId="assignmentId"
							subjectId="subjectId"
						/>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
