"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";

import { date } from "zod";

const userDetails = {
	userName: "Annie Leonchart",
	role: "Teacher",
	qualification: "BA in English",
};

const previousAnnouncements = [
	{
		date: "2022-10-10",
		announcement: "This is the first announcement",
	},
	{
		date: "2022-10-10",
		announcement: "This is the first announcement",
	},
	{
		date: "2022-10-10",
		announcement: "This is the first announcement",
	},
	{
		date: "2022-10-10",
		announcement: "This is the first announcement",
	},
	{
		date: "2022-10-10",
		announcement: "This is the first announcement",
	},
	{
		date: "2022-10-10",
		announcement: "This is the first announcement",
	},
	{
		date: "2022-10-10",
		announcement: "This is the first announcement",
	},
];

export default function Component() {
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"All announcements"}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] w-full">
					<div className="flex flex-col gap-[2em] w-full">
						{previousAnnouncements.map((announcement, index) => (
							<div className="flex flex-col w-full" key={index}>
								<p className="text-[#555] text-[14px] font-semibold">
									{announcement.date}
								</p>
								<p className="text-[#111] text-[18px] font-normal">
									{announcement.announcement}
								</p>
							</div>
						))}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
