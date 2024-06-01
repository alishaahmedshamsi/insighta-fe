"use client";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { STUDENT_QUICK_START_LIST } from "@/utils/constant/constant";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";

const userDetails = {
  userName: "Annie Leonchart",
  role: "Student",
  class: "5",
  section: "B",
};

const subjectList = [
	{
		name: "English",
		subjectLink: "/student-dashboard/assignments/english",
	},
	{
		name: "Maths",
		subjectLink: "/student-dashboard/assignments/maths",
	},
	{
		name: "Computer",
		subjectLink: "/student-dashboard/assignments/computer",
	},
	{
		name: "Science",
		subjectLink: "/student-dashboard/assignments/science",
	},
];

export default function StudentAssignments() {
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"All Assignments"}
				userDetails={userDetails}
				quickStartList={STUDENT_QUICK_START_LIST}
				leftSidebarLinks={studentLeftSidebarLinks()}
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
