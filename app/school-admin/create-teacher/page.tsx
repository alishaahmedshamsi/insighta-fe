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

export default function SchoolAdminCreateTeacher() {
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Create Teacher"}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
				leftSidebarLinks={schoolAdminLeftSidebarLinks()}
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
							<label htmlFor="qualification">Qualification</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="qualification"
								type="text"
							/>
						</div>
						<div className="col-span-2 grid grid-cols-2 gap-[1em] rounded-[2em] border border-[#DBDBDB] p-[2em]">
							<div className="w-full flex flex-col">
								<label htmlFor="class">Class</label>
								<input
									className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
									id="class"
									type="text"
								/>
							</div>
							<div className="w-full flex flex-col">
								<label htmlFor="subjects">Subjects</label>
								<input
									className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
									id="subjects"
									type="text"
									placeholder="Maths, Physics, Chemistry"
								/>
							</div>
						</div>

						<div className="w-full flex flex-col">
							<label htmlFor="email">Email</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="email"
								type="text"
							/>
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="password">Password</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="password"
								type="text"
							/>
						</div>

						<div>
							<button className="col-span-1 w-full rounded-[1em] bg-brand-sea-green py-[.9em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor">
								Create Teacher
							</button>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
