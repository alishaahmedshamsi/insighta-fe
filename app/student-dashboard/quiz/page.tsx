"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { STUDENT_QUICK_START_LIST } from "@/utils/constant/constant";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";
import TakeQuizOnline from "@/components/takeQuizOnline";

const subjectList = [
	{
		name: "English",
		subjectLink: "/student-dashboard/quiz/english",
	},
	{
		name: "Maths",
		subjectLink: "/student-dashboard/quiz/maths",
	},
	{
		name: "Computer",
		subjectLink: "/student-dashboard/quiz/computer",
	},
	{
		name: "Science",
		subjectLink: "/student-dashboard/quiz/science",
	},
];

export default function StudentQuiz() {
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"All Quiz"}
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
