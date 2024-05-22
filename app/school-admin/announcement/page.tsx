"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";

import { date } from "zod";

const userDetails = {
	userName: "School Admin",
	role: "Admin",
	schoolName: "Karachi Public School",
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
				quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
				leftSidebarLinks={schoolAdminLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] w-full">
					{" "}
					<div className="grid grid-cols-4 rounded-[1em] gap-[1.5em]">
						<textarea
							placeholder="Write your announcement here..."
							className="rounded-[1em] h-[6em] col-span-3 border border-[#ddd] bg-white p-[.8em]"
							id="announcement"
						/>
						<button className="col-span-1 rounded-[1em] bg-brand-sea-green py-[.9em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink">
							Post
						</button>
					</div>
					<div className="flex flex-col w-full rounded-[1em] gap-[1.5em] px-[1em] py-[1em]">
						<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
							Previous Announcements
						</h3>

						<div className="flex flex-col gap-[2em] w-full">
							{previousAnnouncements.map(
								(announcement, index) => (
									<div
										className="flex flex-col w-full"
										key={index}
									>
										<p className="text-[#555] text-[14px] font-semibold">
											{announcement.date}
										</p>
										<p className="text-[#111] text-[18px] font-normal">
											{announcement.announcement}
										</p>
									</div>
								)
							)}
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
