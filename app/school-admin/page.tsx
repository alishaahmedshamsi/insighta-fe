"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import PointsBreakdown from "@/components/points-breakdown";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, ISchoolInfo } from "@/types/type";
import { fetchSchoolsInfo } from "@/services/apis/school.api";
import { useCurrentUser } from "@/hooks/user.hook";


function SchoolAdminDashboard() {

	const { user } = useCurrentUser();

	const {
		isLoading,
		data,
		error
	}: { data: ApiResponse<ISchoolInfo> | undefined; error: any; isLoading: boolean } =
		useQuery({
			queryKey: ["fetch-classes"],
			queryFn: () => fetchSchoolsInfo(user?._id),
		});

	if (isLoading) {
		return <div>Loading...</div>
	}

	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Dashboard"}
				quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
				leftSidebarLinks={schoolAdminLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
					<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
						Stats
					</h3>
					<div className="rounded-[2em] grid grid-cols-2 gap-[2em]">
						{" "}
						<Link href={"/school-admin/students"}>
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
										Total Students
									</h4>
									<p className="text-[#959BA5] text-[1em] align-middle">
										{data?.data[0].studentCount}
									</p>
								</div>
							</div>
						</Link>
						<Link href={"/school-admin/teachers"}>
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
										Total Teachers
									</h4>
									<p className="text-[#959BA5] text-[1em] align-middle">
										{data?.data[0].teacherCount}
									</p>
								</div>
							</div>
						</Link>
					</div>
					<hr className="my-[1em]" />

					<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
						Create User
					</h3>
					<div className="rounded-[2em] grid grid-cols-2 gap-[2em]">
						{" "}
						<Link href="/school-admin/create-student">
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
										Create Student
									</h4>
								</div>
							</div>
						</Link>
						<Link href="/school-admin/create-teacher">
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
										Create Teachers
									</h4>
								</div>
							</div>
						</Link>
					</div>

					<hr className="my-[1em]" />
					<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
						Create Subjects & Classes
					</h3>
					<div className="rounded-[2em] grid grid-cols-2 gap-[2em]">
						{" "}
						<Link href="/school-admin/create-class">
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
										Create Class
									</h4>
								</div>
							</div>
						</Link>
						<Link href="/school-admin/create-subject">
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
										Create Subject
									</h4>
								</div>
							</div>
						</Link>
					</div>
					<hr className="my-[1em]" />
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
												<PointsBreakdown
													userName="Waqqam Usman"
													schoolName="Karachi Public School"
													userRank={"1st"}
													userClass={"5th Grade"}
													role={"student"}
													points={500}
													assignmentPoints={100}
													quizPoints={150}
													lecturePoints={200}
												/>
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
												<PointsBreakdown
													userName="Waqqam Usman"
													schoolName="Karachi Public School"
													userRank={"2nd"}
													userClass={"5th Grade"}
													role={"student"}
													points={500}
													assignmentPoints={100}
													quizPoints={150}
													lecturePoints={200}
												/>
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
												<PointsBreakdown
													userName="Waqqam Usman"
													schoolName="Karachi Public School"
													userRank={"3rd"}
													userClass={"5th Grade"}
													role={"student"}
													points={500}
													assignmentPoints={100}
													quizPoints={150}
													lecturePoints={200}
												/>
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
												<PointsBreakdown
													userName="Waqqam Usman"
													schoolName="Karachi Public School"
													userRank={"4th"}
													userClass={"5th Grade"}
													role={"student"}
													points={500}
													assignmentPoints={100}
													quizPoints={150}
													lecturePoints={200}
												/>
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
												<PointsBreakdown
													userName="Waqqam Usman"
													schoolName="Karachi Public School"
													userRank={"5th"}
													userClass={"5th Grade"}
													role={"student"}
													points={500}
													assignmentPoints={100}
													quizPoints={150}
													lecturePoints={200}
												/>
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
												<PointsBreakdown
													userName="Waqqam Usman"
													schoolName="Karachi Public School"
													userRank={"1st"}
													qualification="BA in English Literature"
													role={"teacher"}
													points={500}
													assignmentPoints={100}
													quizPoints={150}
													lecturePoints={200}
												/>
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
												<PointsBreakdown
													userName="Waqqam Usman"
													schoolName="Karachi Public School"
													userRank={"2nd"}
													qualification="BA in English Literature"
													role={"teacher"}
													points={500}
													assignmentPoints={100}
													quizPoints={150}
													lecturePoints={200}
												/>
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
												<PointsBreakdown
													userName="Waqqam Usman"
													schoolName="Karachi Public School"
													userRank={"3rd"}
													qualification="BA in English Literature"
													role={"teacher"}
													points={500}
													assignmentPoints={100}
													quizPoints={150}
													lecturePoints={200}
												/>
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
												<PointsBreakdown
													userName="Waqqam Usman"
													schoolName="Karachi Public School"
													userRank={"4th"}
													qualification="BA in English Literature"
													role={"teacher"}
													points={500}
													assignmentPoints={100}
													quizPoints={150}
													lecturePoints={200}
												/>
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
												<PointsBreakdown
													userName="Waqqam Usman"
													schoolName="Karachi Public School"
													userRank={"5th"}
													qualification="BA in English Literature"
													role={"teacher"}
													points={500}
													assignmentPoints={100}
													quizPoints={150}
													lecturePoints={200}
												/>
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

export default SchoolAdminDashboard;
