"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { STUDENT_QUICK_START_LIST } from "@/utils/constant/constant";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";

import StudentAssignment from "@/components/StudentAssignment/StudentAssignment";
import ChatBoxComponent from "@/components/ChatBox/ChatBoxComponent";
import { useStudentAssignments, useStudentSubject } from "@/hooks/user.hook";


export default function Component({
	params,
}: {
	params: { subject: string; number: string };
}) {
	const { subject, number } = params;

	const { subjectsList } = useStudentSubject();
	const subjectName = subjectsList?.find(
		(sub: { _id: string }) => sub._id === subject
	);

	const { assignmentsList } = useStudentAssignments(subject);
	const currentAssignment = assignmentsList?.find(
		(ass: { _id: string }) => ass._id === number
	);

	// console.log("currentAssignment: ", currentAssignment);

	const mainSectionHeading = subjectName
		? `Details: ${subjectName.name} - Assignment: ${currentAssignment.title}`
		: `Details: ${subject} Assignment #${number}`;

	// console.log("assignment ID: ", number);
	
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
						{/* {allAssignments.map((assignment, index) => ( */}
						<StudentAssignment
							index={number}
							assignment={[currentAssignment]}
						/>

						<hr />

						<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
							Chat with Peers
						</h3>

						{/* Chat box */}

						<ChatBoxComponent
							assignmentId={number}
							// subjectId="subjectId"
						/>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
