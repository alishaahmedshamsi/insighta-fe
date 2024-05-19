"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { STUDENT_QUICK_START_LIST } from "@/utils/constant/constant";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";
import WatchLectureDialog from "@/components/watchLectureDialog";

const userDetails = {
	userName: "Annie Leonchart",
	role: "Student",
	class: "5",
	section: "B",
};

const allLectures = [
	{
		subject: "Science",
		lectures: [
			{
				title: "Lecture #2",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				dateUploaded: "4 May 2024",
				status: "Not Completed",
				lectureFile: "https://youtu.be/EFg3u_E6eHU?si=t0kV0D4ei0mSGT9w",
			},
			{
				title: "Lecture #1",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				dateUploaded: "1 May 2024",
				status: "Completed",
				lectureFile: "https://youtu.be/EFg3u_E6eHU?si=t0kV0D4ei0mSGT9w",
			},
		],
	},
	{
		subject: "English",
		lectures: [
			{
				title: "Lecture #1",
				description:
					"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
				dateUploaded: "3 May 2024",
				status: "Completed",
				lectureFile: "https://youtu.be/EFg3u_E6eHU?si=t0kV0D4ei0mSGT9w",
			},
		],
	},
];

export default function StudentLectures() {
	// const pointsEarned = 400;
	// const mainSectionHeading = "Assignments";
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Lectures"}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={STUDENT_QUICK_START_LIST}
				leftSidebarLinks={studentLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
					{allLectures.map((subject, index) => (
						<div key={index}>
							<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
								{subject.subject}
							</h3>
							<div className="subject-assignments-container flex flex-col gap-6">
								{subject.lectures.map((lecture, index) => (
									<div
										key={index}
										className="assignment flex flex-col rounded-[2em] border border-[#DBDBDB] bg-white p-[2em]"
									>
										<div className="assginment-details grid grid-cols-4 gap-5">
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
												<h5
													className={
														"text-[#777] font-medium uppercase text-[.9em] tracking-wider"
													}
												>
													Status
												</h5>
												<h4
													className={`text-[#111] font-medium capitalize text-[1.2em] ${
														lecture.status ==
														"Completed"
															? `text-[#5fc935]`
															: "text-[#cf2e23]"
													}`}
												>
													{lecture.status}
												</h4>{" "}
												{/* Completed/Checked/Not Completed */}
											</div>
											<div>
												<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
													Lecture File
												</h5>
												<h4 className="text-[#111] underline capitalize text-[1.2em]">
													{/* <Link
														href={
															lecture.lectureFile
														}
													>
														Watch Lecture
													</Link> */}
													<WatchLectureDialog
														lectureFile={
															lecture.lectureFile
														}
													/>
												</h4>
											</div>
											<div className="col-span-4">
												<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
													Description
												</h5>
												<h4 className="text-[#111] text-[1.2em]">
													{lecture.description}
												</h4>
											</div>
										</div>
									</div>
								))}
								<hr className="my-[1em]" />
							</div>
						</div>
					))}
				</div>
			</DashboardLayout>
		</>
	);
}
