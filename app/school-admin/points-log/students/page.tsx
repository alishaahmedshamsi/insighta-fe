"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import PointsBreakdown from "@/components/points-breakdown";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse, ISchoolInfo, IUser } from "@/types/type";
import { fetchSingleSchoolInfo } from "@/services/apis/school.api";
import { useCurrentUser } from "@/hooks/user.hook";
import TopFive from "@/components/TopFive/TopFive";
import { fetchUsers } from "@/services/apis/school.api";
import { toast } from "sonner";
import { Pagination } from "@/components/Pagination/Pagination";

interface SearchParams {
	searchParams: {
		page: number;
		limit: number;
		search: string;
	};
}
function SchoolAdminDashboard({ searchParams }: SearchParams) {
	const { user } = useCurrentUser();
	const { page, search } = searchParams;

	const {
		isLoading,
		data,
		error,
	}: {
		data: ApiResponse<IUser> | undefined;
		error: any;
		isLoading: boolean;
	} = useQuery({
		queryKey: ["fetch-students", page, search],
		queryFn: () => fetchUsers({ page, search, role: "student" }),
	});

	console.log("students data: ", data);

	// if (isLoading) {
	// 	<div>loading...</div>;
	// }
	// if (error) {
	// 	toast.error(error);
	// }

	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Student Points Log"}
				quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
				leftSidebarLinks={schoolAdminLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
					{/* <h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
						
					</h3> */}
					<div className="rounded-[2em] grid grid-cols-2 gap-[2em]">
						{isLoading ? (
							<div className="text-center text-gray-500">
								Loading...
							</div>
						) : error ? (
							<div className="text-center text-gray-500">
								Error Loading data.
							</div>
						) : data?.data && data?.data.length === 0 ? (
							<div className="text-center text-gray-500">
								No points log available
							</div>
						) : (
							data?.data.map((item) => (
								<Link
									href={`/school-admin/points-log/students/${item._id}`}
								>
									<div className="flex justify-start items-center w-full bg-white rounded-[1em] gap-[1.5em] px-[1em] py-[1em]">
										<div className="w-[80px]">
											<div className="bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] p-[.5em] w-[100%] rounded-[.5em] ">
												<Image
													alt=""
													className="object-contain w-[5em] inline"
													src={"/assets/male.png"}
													width={600}
													height={600}
												/>
											</div>
										</div>
										<div className="w-[75%]">
											<h4 className="font-medium text-[#212121] align-middle text-[1.4em]">
												{item.fullname}
											</h4>
											<p className="text-[#959BA5] text-[1em] align-middle">
												{item.email}
											</p>
											<p className="text-[#959BA5] text-[1em] align-middle">
												Class:{" "}
												{item.classes[0].className}
											</p>
										</div>
									</div>
								</Link>
							))
						)}
					</div>
					<div className="sticky bottom-0  py-4">
						{data?.pagination && (
							<Pagination data={data.pagination} />
						)}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}

export default SchoolAdminDashboard;
