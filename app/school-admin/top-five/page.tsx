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

export default function SchoolAdminTopFive() {
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Top 5"}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
				leftSidebarLinks={schoolAdminLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
					<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
						Top 5 Students
					</h3>

					<div className="flex flex-col w-full">
						<table>
							<thead>
								<tr>
									<th className="text-center pb-4 px-2 text-[#bbb]">
										{""}
									</th>
									<th className="text-center pb-4 px-2 text-[#bbb]">
										{""}
									</th>
									<th className="text-center pb-4 px-2 text-[#bbb]">
										Class
									</th>
									<th className="text-center pb-4 px-2 text-[#bbb]">
										Points
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className="bg-white shadow-lg shadow-gray-500/.5 mt-[20px]">
									<td>
										<div className="bg-white p-[20px]">
											1st
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex items-center">
											<Image
												alt=""
												className="object-cover items-center w-[40px] h-auto mr-[10px]"
												src={"/assets/male.png"}
												width={600}
												height={600}
											/>
											Waqqam Usman
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											5
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											<span className="py-1 px-2 rounded-full text-[#333] bg-[#8640cd27]">
												⭐ 400+ Points
											</span>
										</div>
									</td>
								</tr>
								<tr className="bg-white shadow-lg shadow-gray-500/.5 mt-[20px]">
									<td>
										<div className="bg-white p-[20px]">
											2nd
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex items-center">
											<Image
												alt=""
												className="object-cover items-center w-[40px] h-auto mr-[10px]"
												src={"/assets/male.png"}
												width={600}
												height={600}
											/>
											Waqqam Usman
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											5
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											<span className="py-1 px-2 rounded-full text-[#333] bg-[#8640cd27]">
												⭐ 400+ Points
											</span>
										</div>
									</td>
								</tr>
								<tr className="bg-white shadow-lg shadow-gray-500/.5 mt-[20px]">
									<td>
										<div className="bg-white p-[20px]">
											3rd
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex items-center">
											<Image
												alt=""
												className="object-cover items-center w-[40px] h-auto mr-[10px]"
												src={"/assets/male.png"}
												width={600}
												height={600}
											/>
											Waqqam Usman
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											5
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											<span className="py-1 px-2 rounded-full text-[#333] bg-[#8640cd27]">
												⭐ 400+ Points
											</span>
										</div>
									</td>
								</tr>
								<tr className="bg-white shadow-lg shadow-gray-500/.5 mt-[20px]">
									<td>
										<div className="bg-white p-[20px]">
											4th
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex items-center">
											<Image
												alt=""
												className="object-cover items-center w-[40px] h-auto mr-[10px]"
												src={"/assets/male.png"}
												width={600}
												height={600}
											/>
											Waqqam Usman
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											5
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											<span className="py-1 px-2 rounded-full text-[#333] bg-[#8640cd27]">
												⭐ 400+ Points
											</span>
										</div>
									</td>
								</tr>
								<tr className="bg-white shadow-lg shadow-gray-500/.5 mt-[20px]">
									<td>
										<div className="bg-white p-[20px]">
											5th
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex items-center">
											<Image
												alt=""
												className="object-cover items-center w-[40px] h-auto mr-[10px]"
												src={"/assets/male.png"}
												width={600}
												height={600}
											/>
											Waqqam Usman
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											5
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											<span className="py-1 px-2 rounded-full text-[#333] bg-[#8640cd27]">
												⭐ 400+ Points
											</span>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<hr className="my-[1em]" />

					<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
						Top 5 Faculty
					</h3>

					<div className="flex flex-col w-full">
						<table>
							<thead>
								<tr>
									<th className="text-center pb-4 px-2 text-[#bbb]">
										{""}
									</th>
									<th className="text-center pb-4 px-2 text-[#bbb]">
										{""}
									</th>
									<th className="text-center pb-4 px-2 text-[#bbb]">
										Class
									</th>
									<th className="text-center pb-4 px-2 text-[#bbb]">
										Points
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className="bg-white shadow-lg shadow-gray-500/.5 mt-[20px]">
									<td>
										<div className="bg-white p-[20px]">
											1st
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex items-center">
											<Image
												alt=""
												className="object-cover items-center w-[40px] h-auto mr-[10px]"
												src={"/assets/male.png"}
												width={600}
												height={600}
											/>
											Waqqam Usman
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											5
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											<span className="py-1 px-2 rounded-full text-[#333] bg-[#8640cd27]">
												⭐ 400+ Points
											</span>
										</div>
									</td>
								</tr>
								<tr className="bg-white shadow-lg shadow-gray-500/.5 mt-[20px]">
									<td>
										<div className="bg-white p-[20px]">
											2nd
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex items-center">
											<Image
												alt=""
												className="object-cover items-center w-[40px] h-auto mr-[10px]"
												src={"/assets/male.png"}
												width={600}
												height={600}
											/>
											Waqqam Usman
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											5
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											<span className="py-1 px-2 rounded-full text-[#333] bg-[#8640cd27]">
												⭐ 400+ Points
											</span>
										</div>
									</td>
								</tr>
								<tr className="bg-white shadow-lg shadow-gray-500/.5 mt-[20px]">
									<td>
										<div className="bg-white p-[20px]">
											3rd
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex items-center">
											<Image
												alt=""
												className="object-cover items-center w-[40px] h-auto mr-[10px]"
												src={"/assets/male.png"}
												width={600}
												height={600}
											/>
											Waqqam Usman
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											5
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											<span className="py-1 px-2 rounded-full text-[#333] bg-[#8640cd27]">
												⭐ 400+ Points
											</span>
										</div>
									</td>
								</tr>
								<tr className="bg-white shadow-lg shadow-gray-500/.5 mt-[20px]">
									<td>
										<div className="bg-white p-[20px]">
											4th
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex items-center">
											<Image
												alt=""
												className="object-cover items-center w-[40px] h-auto mr-[10px]"
												src={"/assets/male.png"}
												width={600}
												height={600}
											/>
											Waqqam Usman
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											5
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											<span className="py-1 px-2 rounded-full text-[#333] bg-[#8640cd27]">
												⭐ 400+ Points
											</span>
										</div>
									</td>
								</tr>
								<tr className="bg-white shadow-lg shadow-gray-500/.5 mt-[20px]">
									<td>
										<div className="bg-white p-[20px]">
											5th
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex items-center">
											<Image
												alt=""
												className="object-cover items-center w-[40px] h-auto mr-[10px]"
												src={"/assets/male.png"}
												width={600}
												height={600}
											/>
											Waqqam Usman
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											5
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											<span className="py-1 px-2 rounded-full text-[#333] bg-[#8640cd27]">
												⭐ 400+ Points
											</span>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
