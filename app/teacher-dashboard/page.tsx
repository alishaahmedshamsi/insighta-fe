"use client";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import { useCurrentUser } from "@/hooks/user.hook";


export default function TeacherDashboard() {

	const { user, isLoading, } = useCurrentUser();

	if (isLoading) {
		return <div>Loading...</div>
	}

	
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Class Rooms"}
				// pointsEarned={"400"}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] grid grid-cols-2 gap-[2em]">
					{user?.classes.map((teacherClass, index) => {
						return (
							<Link href={`/teacher-dashboard/class/${teacherClass.className}-${user.subject[index]?.name}?subjectId=${user.subject[index]._id}`}>
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
											Class {teacherClass.className} - {user.subject[index]?.name}  
										</h4>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</DashboardLayout>
		</>
	);
}
