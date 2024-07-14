"use client";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { SUPER_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";

import { superAdminLeftSidebarLinks } from "@/components/left-sidebar/supAdmin";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, ISchoolInfo } from "@/types/type";
import { fetchSchoolsInfo } from "@/services/apis/school.api";
import { GraduationCapIcon, User } from "lucide-react";

export default function SchoolAdminDashboard() {
	const {
		isLoading,
		data,
	}: {
		data: ApiResponse<ISchoolInfo> | undefined;
		error: any;
		isLoading: boolean;
	} = useQuery({
		queryKey: ["fetch-classes"],
		queryFn: () => fetchSchoolsInfo(),
	});

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Dashboard"}
				// pointsEarned={"400"}
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
									{data?.data.length}
								</p>
							</div>
						</div>
						<Link href="/sup-admin/create-school/">
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
						{data && data.data.length == 0 ? (
							<div>No schools.</div>
						) : (
							data?.data.map((school, index) => (
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
											{school.fullname}
										</h4>
										<p className="text-[#959BA5] text-[1em] align-middle">
											{school.email}
										</p>
										<div className="flex gap-5 mt-2">
											<div className="flex align-middle gap-2">
												<User size={18} />
												{school.studentCount}
											</div>
											<div className="flex gap-2">
												<GraduationCapIcon size={18} />
												{school.teacherCount}
											</div>
										</div>
									</div>
								</div>
							))
						)}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
