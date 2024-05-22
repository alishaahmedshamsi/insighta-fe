"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { SUPER_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";

import { superAdminLeftSidebarLinks } from "@/components/left-sidebar/supAdmin";
import PointsBreakdown from "@/components/points-breakdown";

const userDetails = {
	userName: "Admin",
	role: "Super Admin",
};

const schoolList = [
	{
		name: "Karachi Public School",
		address: "Karachi, Pakistan",
	},
	{
		name: "Karachi Public School",
		address: "Karachi, Pakistan",
	},
	{
		name: "Karachi Public School",
		address: "Karachi, Pakistan",
	},
	{
		name: "Karachi Public School",
		address: "Karachi, Pakistan",
	},
	{
		name: "Karachi Public School",
		address: "Karachi, Pakistan",
	},
	{
		name: "Karachi Public School",
		address: "Karachi, Pakistan",
	},
];

export default function SchoolAdminDashboard() {
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Dashboard"}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={SUPER_ADMIN_QUICK_START_LIST}
				leftSidebarLinks={superAdminLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
					<div className="rounded-[2em] grid grid-cols-2 gap-[2em]">
						{" "}
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
									Total Schools
								</h4>
								<p className="text-[#959BA5] text-[1em] align-middle">
									250
								</p>
							</div>
						</div>
						<Link href="/sup-admin/create-school">
							<div className="flex justify-start items-center w-full bg-white rounded-[1em] gap-[1.5em] px-[1em] py-[1em]">
								<div className="w-[80px]">
									<div className="bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] p-[.5em] w-[100%] rounded-[.5em] ">
										<Image
											alt=""
											className="object-contain w-[5em] inline"
											src={"/assets/degree-cap.png"}
											width={600}
											height={600}
										/>
									</div>
								</div>
								<div className="w-[75%]">
									<h4 className="font-medium text-[#212121] align-middle text-[1.4em]">
										Create School
									</h4>
								</div>
							</div>
						</Link>
					</div>
					<hr className="my-[1em]" />

					<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
						All Schools
					</h3>

					<div className="rounded-[2em] grid grid-cols-2 gap-[2em]">
						{schoolList.map((school, index) => (
							<div
								key={index}
								className="flex justify-start items-center w-full bg-white rounded-[1em] gap-[1.5em] px-[1em] py-[1em]"
							>
								<div className="w-[80px]">
									<div className="bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] p-[.5em] w-[100%] rounded-[.5em] ">
										<Image
											alt=""
											className="object-contain w-[5em] inline"
											src={"/assets/building.png"}
											width={600}
											height={600}
										/>
									</div>
								</div>
								<div className="w-[75%]">
									<h4 className="font-medium text-[#212121] align-middle text-[1.4em]">
										{school.name}
									</h4>
									<p className="text-[#959BA5] text-[1em] align-middle">
										{school.address}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
