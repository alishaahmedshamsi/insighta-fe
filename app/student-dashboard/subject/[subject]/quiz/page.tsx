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

export default function StudentSubjectQuiz({
	params,
}: {
	params: { subject: string };
}) {
	const { subject } = params;

	const mainSectionHeading = `${subject} Quiz`;
	return (
		<>
			<DashboardLayout
				mainSectionHeading={mainSectionHeading}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={STUDENT_QUICK_START_LIST}
				leftSidebarLinks={studentLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]"></div>
			</DashboardLayout>
		</>
	);
}
