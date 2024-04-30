"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";

const userDetails = {
	userName: "School Admin",
	role: "Admin",
	schoolName: "Karachi Public School",
};

export default function SchoolAdminDashboard() {
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Manage Points"}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
				leftSidebarLinks={schoolAdminLeftSidebarLinks()}
			>
				<div className="rounded-[2em] grid grid-cols-2 gap-[2em]">
					{" "}
					<div className="flex justify-start items-center w-full bg-white rounded-[1em] gap-[1.5em] px-[1em] py-[1em]">
						<div className="w-[80px]">
							<div className="flex justify-center items-center p-[.5em] w-[100%] rounded-[.5em] ">
								<label className="inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										value=""
										className="sr-only peer"
									/>
									<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
								</label>
							</div>
						</div>
						<div className="w-[75%]">
							<h4 className="font-medium text-[#212121] align-middle text-[1.4em]">
								Allow Student Points
							</h4>
						</div>
					</div>
					<div className="flex justify-start items-center w-full bg-white rounded-[1em] gap-[1.5em] px-[1em] py-[1em]">
						<div className="w-[80px]">
							<div className="flex justify-center items-center p-[.5em] w-[100%] rounded-[.5em] ">
								<label className="inline-flex items-center cursor-pointer">
									<input
										type="checkbox"
										value=""
										className="sr-only peer"
									/>
									<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
								</label>
							</div>
						</div>
						<div className="w-[75%]">
							<h4 className="font-medium text-[#212121] align-middle text-[1.4em]">
								Allow Teacher Points
							</h4>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
