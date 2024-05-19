"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import WatchLectureDialog from "@/components/watchLectureDialog";

const userDetails = {
	userName: "Annie Leonchart",
	role: "Teacher",
	qualification: "BA in English",
};

const allClassesLectures = [
	{
		class: "5",
		subjects: [
			{
				subject: "English Literature",
				lectures: [
					{
						title: "Lecture #2",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
						dateUploaded: "4 May 2024",
						lectureFile:
							"https://youtu.be/EFg3u_E6eHU?si=t0kV0D4ei0mSGT9w",
					},
					{
						title: "Lecture #1",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
						dateUploaded: "1 May 2024",
						lectureFile:
							"https://youtu.be/EFg3u_E6eHU?si=t0kV0D4ei0mSGT9w",
					},
				],
			},
			{
				subject: "English Language",
				lectures: [
					{
						title: "Lecture #1",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
						dateUploaded: "1 May 2024",
						lectureFile:
							"https://youtu.be/EFg3u_E6eHU?si=t0kV0D4ei0mSGT9w",
					},
				],
			},
		],
	},
	{
		class: "6",
		subjects: [
			{
				subject: "English literature",
				lectures: [
					{
						title: "Lecture #1",
						description:
							"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
						dateUploaded: "1 May 2024",
						status: "Not Completed",
						lectureFile:
							"https://youtu.be/EFg3u_E6eHU?si=t0kV0D4ei0mSGT9w",
					},
				],
			},
		],
	},
];

export default function TeacherIndividualClass({
	params,
}: {
	params: { class: string };
}) {
	const { class: teacherClass } = params;

	const mainSectionHeading = `Class: ${teacherClass}`;
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
					<div className="grid grid-cols-2 gap-[2em]">
						<Link
							href={`/teacher-dashboard/class/${teacherClass}/assignments`}
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
										Manage Assignments
									</h4>
								</div>
							</div>
						</Link>
						<Link
							href={`/teacher-dashboard/class/${teacherClass}/quiz`}
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
										Manage Quiz
									</h4>
								</div>
							</div>
						</Link>
					</div>

					<hr className="my-[1em]" />

					<div className="flex flex-col gap-6">
						<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
							Add lecture
						</h3>

						<div className="grid grid-cols-2 gap-[1em]">
							<div className="w-full flex flex-col">
								<label htmlFor="title">Title</label>
								<input
									className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
									id="title"
									type="text"
								/>
							</div>
							<div className="w-full flex flex-col">
								<label htmlFor="description">Description</label>
								<input
									className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
									id="description"
									type="text"
								/>
							</div>
							<div className="w-full flex flex-col">
								<label htmlFor="class">Class</label>
								<input
									className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
									id="class"
									type="text"
								/>
							</div>
							<div className="w-full flex flex-col">
								<label htmlFor="subject">Subject</label>
								<input
									className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
									id="subject"
									type="text"
								/>
							</div>
							<div className="w-full flex flex-col col-span-2">
								<label htmlFor="file">Upload file</label>
								<input
									type="file"
									name="file"
									id="file"
									className="col-span-3 w-full border-2 border-[#ddd] bg-white border-dashed rounded-[1em] p-[.8em]"
								/>
							</div>
							<div className="col-span-1">
								<button className="rounded-[1em] bg-brand-sea-green py-[.9em] px-[1.5em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink">
									Add Lecture
								</button>
							</div>
						</div>
					</div>

					<hr className="my-[1em]" />

					<div className="flex flex-col gap-6">
						<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
							All lectures
						</h3>

						<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
							{allClassesLectures.map((teacherClass) =>
								teacherClass.subjects.map((subject) => (
									<div>
										<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
											Class: {teacherClass.class} -{" "}
											{subject.subject}
										</h3>
										<div className="subject-assignments-container flex flex-col gap-6">
											{subject.lectures.map(
												(lecture, index) => (
													<div
														key={index}
														className="assignment flex flex-col rounded-[2em] border border-[#DBDBDB] bg-white p-[2em]"
													>
														<div className="assginment-details grid grid-cols-3 gap-5">
															<div>
																<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
																	Title
																</h5>
																<h4 className="text-[#111] capitalize text-[1.2em]">
																	{
																		lecture.title
																	}
																</h4>
															</div>
															<div>
																<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
																	Date
																	uploaded
																</h5>
																<h4 className="text-[#111] capitalize text-[1.2em]">
																	{
																		lecture.dateUploaded
																	}
																</h4>
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
																		Download
																		File
																	</Link> */}
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
																	{
																		lecture.description
																	}
																</h4>
															</div>
														</div>
													</div>
												)
											)}
											<hr className="my-[1em]" />
										</div>
									</div>
								))
							)}
						</div>
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
