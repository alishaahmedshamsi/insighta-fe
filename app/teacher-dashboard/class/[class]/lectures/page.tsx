"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import WatchLectureDialog from "@/components/watchLectureDialog";
import AddLectureComponent from "@/components/AddLecture/add-lecture";
import { useCurrentUser } from "@/hooks/user.hook";
import { useQuery } from "@tanstack/react-query";
import { fetchLectures, fetchQuiz } from "@/services/apis/teacher.api";
import { fetchStudentLectures } from "@/services/apis/user.api";
import { format } from "date-fns";

export default function TeacherIndividualClass({
	params,
}: {
	params: { class: string; subject: string };
}) {
	const { class: teacherClass, subject } = params;

	const mainSectionHeading = `Class: ${teacherClass} Lectures`;
	const decodeMainSectionheading = decodeURI(mainSectionHeading);
	const extractClass = teacherClass.split("-")[0].trim();

	const { user } = useCurrentUser();

	const classId = user?.classes.find(
		(cls) => cls.className.toString() == extractClass
	)?._id;

	// console.log("user: ", user);
	// console.log("classId: ", classId);

	const extractSubject = teacherClass.split("-")[1].trim();
	// console.log("extractSubject: ", decodeURI(extractSubject));

	const subjectId = user?.subject.find(
		(subject) => subject.name == decodeURI(extractSubject)
	)?._id;

	const { data: allClassesLectures, isLoading } = useQuery({
		queryKey: ["fetch-lectures"],
		queryFn: () => fetchStudentLectures(subjectId),
	});

	console.log("Subject", subjectId);
	console.log("All lectures:=== ", allClassesLectures);
	if (isLoading) {
		return <div>Loading...</div>;
	}

	console.log("Teacher-Subject", subjectId);

	return (
		<>
			<DashboardLayout
				mainSectionHeading={decodeMainSectionheading}
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
							{allClassesLectures?.length == 0 ||
							allClassesLectures == null ? (
								<div>No lectures rightnow.</div>
							) : (
								allClassesLectures?.map((lecture: any) => (
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
															{format(
																lecture.createdAt,
																"yyyy-MM-dd HH:mm:ss"
															)}
														</h4>
													</div>

													<div>
														<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
															Lecture File
														</h5>
														<h4 className="text-[#111] underline capitalize text-[1.2em]">
															<WatchLectureDialog
																isTeacherWatch={
																	true
																}
																lectureFile={
																	lecture.lecture
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
													<div className="col-span-1">
														<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
															Class
														</h5>
														<h4 className="text-[#111] text-[1.2em]">
															{extractClass}
														</h4>
													</div>
													<div className="col-span-1">
														<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
															Subject
														</h5>
														<h4 className="text-[#111] text-[1.2em]">
															{decodeURI(extractSubject)}
														</h4>
													</div>
												</div>
											</div>
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
