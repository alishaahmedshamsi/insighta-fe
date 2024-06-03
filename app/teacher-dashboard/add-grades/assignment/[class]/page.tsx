"use client";
import Link from "next/link";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";


export default function Component({ params }: { params: { class: string } }) {
	const { class: classes } = params;
	const quizList = [
		{
			name: "Assignment #1",
			classLink: `/teacher-dashboard/add-grades/assignment/${classes}/1`,
		},
		{
			name: "Assignment #2",
			classLink: `/teacher-dashboard/add-grades/assignment/${classes}/2`,
		},
	];
	const mainSectionHeading = `Add Class: ${classes} Assignment Grades`;
	return (
		<>
			<DashboardLayout
				mainSectionHeading={mainSectionHeading}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] grid grid-cols-2 gap-[2em]">
					{quizList.map((classes) => {
						return (
							<Link href={classes.classLink}>
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
											{classes.name}
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
