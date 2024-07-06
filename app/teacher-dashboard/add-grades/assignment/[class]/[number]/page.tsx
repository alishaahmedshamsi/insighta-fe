"use client";
import Link from "next/link";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import TeacherGrading from "@/components/TeacherGrading/teacher-grading";
import { useCurrentUser } from "@/hooks/user.hook";

import { fetchAssignments } from "@/services/apis/teacher.api";
import { useQuery } from "@tanstack/react-query";
const submissions = [
	{
		studentName: "Muhammad Usman",
		rollNumber: "123456",
		totalMarks: "10",
		obtainedMarks: "",
		downloadFile: "#",
	},
	{
		studentName: "Muhammad Usman",
		rollNumber: "123456",
		totalMarks: "10",
		obtainedMarks: "",
		downloadFile: "#",
	},
	{
		studentName: "Muhammad Usman",
		rollNumber: "123456",
		totalMarks: "10",
		obtainedMarks: "",
		downloadFile: "#",
	},
	{
		studentName: "Muhammad Usman",
		rollNumber: "123456",
		totalMarks: "10",
		obtainedMarks: "",
		downloadFile: "#",
	},
	{
		studentName: "Muhammad Usman",
		rollNumber: "123456",
		totalMarks: "10",
		obtainedMarks: "",
		downloadFile: "#",
	},
];

export default function Component({
	params,
}: {
	params: { class: string; number: string };
}) {
	const { class: classes, number } = params;
	const extractSubject = classes.split("-")[1].trim();
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

	let currentAssignment = allAssignments?.find(
		(assignment: { _id: string }) => assignment._id == number
	);

	console.log("currentAssignment: ", currentAssignment);
	// const mainSectionHeading = `Add Grades: ${currentAssignment?.title}`;
	const mainSectionHeading = currentAssignment
		? `Add Grades: ${currentAssignment.title}`
		: `Add Grades: ${number}`;

	return (
		<>
			<DashboardLayout
				mainSectionHeading={mainSectionHeading}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col">
					<div className="results-container flex flex-col gap-8 pb-[2em]">
						{/* results */}
						{submissions.map((submission, index) => (
							<div key={index} className="submission">
								<div className="submissions flex flex-col gap-3">
									<div
										key={index}
										className="grid grid-cols-5 items-center text-[1em] capitalize text-[#333] bg-white border border-[#DBDBDB] p-[1em] rounded-[1em]"
									>
										<h4>{submission.studentName}</h4>
										<h4>{submission.rollNumber}</h4>
										<h4>
											Total Marks: {submission.totalMarks}
										</h4>
										<div className="flex">
											<TeacherGrading
												userName={
													submission.studentName
												}
												userClass={classes}
												number={number}
												materialType={"Quiz"}
												totalMarks={
													submission.totalMarks
												}
												// open={open}
												// setOpen={setOpen}
											/>
										</div>
										<Link
											className="text-center underline text-[1em] text-[#15B5D5] font-medium"
											href={submission.downloadFile}
										>
											Download File
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
