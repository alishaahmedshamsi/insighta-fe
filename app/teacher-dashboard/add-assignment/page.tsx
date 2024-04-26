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


export default function TeacherDashboard() {
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Add Assignment"}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em]">
					<div className="grid grid-cols-2 gap-[1em]">
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
				</div>
			</DashboardLayout>
		</>
	);
}
