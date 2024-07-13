"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";


export default function TeacherIndividualClass({
	params,
}: {
	params: { class: string; subject: string };
}) {
	const { class: teacherClass, subject } = params;

	const mainSectionHeading = `Class: ${teacherClass} - ${subject}`;
	const decodeMainSectionHeading = decodeURI(mainSectionHeading);

	console.log("Teacher Subject",subject);
	
	return (
		<>
			<DashboardLayout
				mainSectionHeading={decodeMainSectionHeading}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em]">
					<div className="grid grid-cols-2 gap-[2em]">
						<Link
							href={`/teacher-dashboard/class/${teacherClass}/${subject}/assignments`}
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
							href={`/teacher-dashboard/class/${teacherClass}/${subject}/quiz`}
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
						<Link
							href={`/teacher-dashboard/class/${teacherClass}/${subject}/lectures`}
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
										All Lectures
									</h4>
								</div>
							</div>
						</Link>
					</div>

					{/* <hr className="my-[1em]" /> */}

					{/* <div className="flex flex-col gap-6">
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
					</div> */}
				</div>
			</DashboardLayout>
		</>
	);
}
