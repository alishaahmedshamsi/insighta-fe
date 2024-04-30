"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";

const subjectList = [
	{
		name: "Class 5A",
		duration: "17 min",
	},
	{
		name: "Class 5B",
		duration: "17 min",
	},
	{
		name: "Class 6B",
		duration: "17 min",
	},
	{
		name: "Class 7A",
		duration: "17 min",
	},
	{
		name: "Class 8B",
		duration: "17 min",
	},
];

const userDetails = {
	userName: "Annie Leonchart",
	role: "Teacher",
	qualification: "BA in English",
};

export default function TeacherAddLecture() {
	// const pointsEarned = 400;
	// const mainSectionHeading = "Subjects";
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Add Lecture"}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em]">
					<div className="grid grid-cols-2 gap-[1em]">
						<div className="w-full flex flex-col">
							<label htmlFor="title">Title</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="title"
								type="text"
							/>
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="description">Description</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="description"
								type="text"
							/>
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="class">Class</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="class"
								type="text"
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
						<div className="w-full flex flex-col col-span-2">
							<label htmlFor="file">Upload file</label>
							<input
								type="file"
								name="file"
								id="file"
								className="col-span-3 w-full border-2 border-[#ddd] bg-white border-dashed rounded-[1em] p-[.8em]"
							/>
						</div>
						<div className="col-span-1">
							<button className="rounded-[1em] bg-brand-sea-green py-[.9em] px-[1.5em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink">
								Add Lecture
							</button>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
