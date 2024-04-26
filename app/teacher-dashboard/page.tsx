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

export default function TeacherDashboard() {
	// const pointsEarned = 400;
	// const mainSectionHeading = "Subjects";
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Subjects"}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] grid grid-cols-2 gap-[2em]">
					{subjectList.map((subject) => {
						return (
							<div className="flex justify-start items-center w-full bg-white rounded-[1em] gap-[1.5em] px-[1em] py-[1em]">
								<div className="w-[80px]">
									<div className="bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] p-[.5em] w-[100%] rounded-[.5em] ">
										<Image
											alt=""
											className="object-contain w-[5em] inline"
											src={"/assets/folder.png"}
											width={600}
											height={600}
										/>
									</div>
								</div>
								<div className="w-[75%]">
									<h4 className="font-medium text-[#212121] align-middle text-[1.4em]">
										{subject.name}
									</h4>
									<p className="text-[#959BA5] text-[1em] align-middle">
										{subject.duration}
									</p>
								</div>
							</div>
						);
					})}
				</div>
			</DashboardLayout>
		</>
	);
}
