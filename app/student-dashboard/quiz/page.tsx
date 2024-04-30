"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { STUDENT_QUICK_START_LIST } from "@/utils/constant/constant";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";

const userDetails = {
	userName: "Annie Leonchart",
	role: "Student",
	class: "5",
	section: "B",
};

const allAssignments = [
	{
		subject: "English",
		assignments: [
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
		],
	},
	{
		subject: "Science",
		assignments: [
			{
				title: "Assignment #1",
				deadline: "3 May 2024",
				totalMarks: "10",
				obtMarks: "8",
				status: "Not Completed",
				assignment: "#",
			},
		],
	},
];

export default function StudentQuiz() {
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"All Quiz"}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={STUDENT_QUICK_START_LIST}
				leftSidebarLinks={studentLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em]"></div>
			</DashboardLayout>
		</>
	);
}
