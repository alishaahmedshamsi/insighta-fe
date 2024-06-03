"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";

export default function AddGrades() {
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Add Grades"}
				// pointsEarned={"400"}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] grid grid-cols-2 gap-[2em]">
					<Link href="/teacher-dashboard/add-grades/assignment">
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
									Assignments
								</h4>
							</div>
						</div>
					</Link>
					<Link href="/teacher-dashboard/add-grades/quiz">
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
									Quiz
								</h4>
							</div>
						</div>
					</Link>
				</div>
			</DashboardLayout>
		</>
	);
}
