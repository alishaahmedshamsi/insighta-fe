"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import TakeQuizOnline from "@/components/takeQuizOnline";

const userDetails = {
	userName: "Annie Leonchart",
	role: "Teacher",
	qualification: "BA in English",
};

export default function Component({
	params,
}: {
	params: { class: string; subject: string };
}) {
	const { class: teacherClass, subject } = params;

	const subjectList = [
		{
			name: "English",
			subjectLink: `/teacher-dashboard/class/${teacherClass}/lectures/english`,
		},
		{
			name: "Maths",
			subjectLink: `/teacher-dashboard/class/${teacherClass}/lectures/maths`,
		},
		{
			name: "Computer",
			subjectLink: `/teacher-dashboard/class/${teacherClass}/lectures/computer`,
		},
		{
			name: "Science",
			subjectLink: `/teacher-dashboard/class/${teacherClass}/lectures/science`,
		},
	];
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"All lectures"}
				userDetails={userDetails}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] grid grid-cols-2 gap-[2em]">
					{subjectList.map((subject) => {
						return (
							<Link href={subject.subjectLink}>
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
											{subject.name}
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
