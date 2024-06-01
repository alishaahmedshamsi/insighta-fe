"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import WatchLectureDialog from "@/components/watchLectureDialog";
import AddLectureComponent from "@/components/AddLecture/add-lecture";

const userDetails = {
	userName: "Annie Leonchart",
	role: "Teacher",
	qualification: "BA in English",
};

const allClassesLectures = [
	{
		title: "Lecture #1",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		dateUploaded: "1 May 2024",
		lectureFile: "https://youtu.be/EFg3u_E6eHU?si=t0kV0D4ei0mSGT9w",
	},
	{
		title: "Lecture #2",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		dateUploaded: "4 May 2024",
		lectureFile: "https://youtu.be/EFg3u_E6eHU?si=t0kV0D4ei0mSGT9w",
	},
	{
		title: "Lecture #3",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		dateUploaded: "7 May 2024",
		lectureFile: "https://youtu.be/EFg3u_E6eHU?si=t0kV0D4ei0mSGT9w",
	},
	{
		title: "Lecture #4",
		description:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
		dateUploaded: "7 May 2024",
		lectureFile: "https://youtu.be/EFg3u_E6eHU?si=t0kV0D4ei0mSGT9w",
	},
];

export default function TeacherIndividualClass({
	params,
}: {
	params: { class: string; subject: string };
}) {
	const { class: teacherClass, subject } = params;

	const mainSectionHeading = `Class: ${teacherClass} - ${subject} Lectures`;
	return (
		<>
			<DashboardLayout
				mainSectionHeading={mainSectionHeading}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em]">
					<div className="flex flex-col gap-6">
						<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
							All lectures
						</h3>

						<AddLectureComponent />
						<hr className="my-[1em]" />

						<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
							{allClassesLectures.map((lecture) => (
								<div>
									<div className="subject-assignments-container flex flex-col gap-6">
										<div
											key={lecture.title}
											className="assignment flex flex-col rounded-[2em] border border-[#DBDBDB] bg-white p-[2em]"
										>
											<div className="assginment-details grid grid-cols-3 gap-5">
												<div>
													<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
														Title
													</h5>
													<h4 className="text-[#111] capitalize text-[1.2em]">
														{lecture.title}
													</h4>
												</div>
												<div>
													<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
														Date uploaded
													</h5>
													<h4 className="text-[#111] capitalize text-[1.2em]">
														{lecture.dateUploaded}
													</h4>
												</div>

												<div>
													<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
														Lecture File
													</h5>
													<h4 className="text-[#111] underline capitalize text-[1.2em]">
														<WatchLectureDialog
															lectureFile={
																lecture.lectureFile
															}
														/>
													</h4>
												</div>
												<div className="col-span-3">
													<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
														Description
													</h5>
													<h4 className="text-[#111] text-[1.2em]">
														{lecture.description}
													</h4>
												</div>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
