"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { SUPER_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { superAdminLeftSidebarLinks } from "@/components/left-sidebar/supAdmin";

const userDetails = {
	userName: "Admin",
	role: "Super Admin",
};

export default function SchoolAdminCreateStudent() {
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Create School"}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={SUPER_ADMIN_QUICK_START_LIST}
				leftSidebarLinks={superAdminLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
					<div className="grid grid-cols-2 gap-[1em]">
						<div className="w-full flex flex-col">
							<label htmlFor="name">Name</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="name"
								type="text"
							/>
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="schoolId">School ID</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="schoolId"
								type="text"
							/>
						</div>
						
						<div className="w-full flex flex-col col-span-2">
							<label htmlFor="password">Password</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="password"
								type="text"
							/>
						</div>
						
						<div>
							<button className="col-span-1 w-full rounded-[1em] bg-brand-sea-green py-[.9em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor">
								Create School
							</button>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
