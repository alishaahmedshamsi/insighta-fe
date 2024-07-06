"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { STUDENT_QUICK_START_LIST } from "@/utils/constant/constant";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";
import Image from "next/image";
import WatchLectureDialog from "@/components/watchLectureDialog";
import { useStudentSubject } from "@/hooks/user.hook";
import StudentLectures from "@/components/StudentLectures/StudentLectures";

export default function StudentSubjects({
	params,
}: {
	params: { subject: string };
}) {
	const { subject } = params;

	const { subjectsList } = useStudentSubject();
	const subjectName = subjectsList?.find(
		(sub: { _id: string }) => sub._id === subject
	);

	// console.log("subjectName: ", subjectName);

	const mainSectionHeading = subjectName
		? `Subject: ${subjectName.name}`
		: `Subject: ${subject}`;
	// const mainSectionHeading = `Subject: ${subjectName.name}`;
	return (
		<>
			<DashboardLayout
				mainSectionHeading={mainSectionHeading}
				// pointsEarned={"400"}
				quickStartList={STUDENT_QUICK_START_LIST}
				leftSidebarLinks={studentLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
					<div className="grid grid-cols-2 gap-[2em]">
						<Link
							href={`/student-dashboard/subject/${subject}/assignments`}
						>
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
						<Link
							href={`/student-dashboard/subject/${subject}/quiz`}
						>
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

					<hr className="my-[1em]" />

					<div className="flex flex-col gap-6">
						<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
							Lectures
						</h3>
						<StudentLectures subjectId={subject} />

						<hr className="my-[1em]" />
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
