"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { STUDENT_QUICK_START_LIST } from "@/utils/constant/constant";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";
import WatchLectureDialog from "@/components/watchLectureDialog";
import StudentLectures from "@/components/StudentLectures/StudentLectures";
import { useStudentSubject } from "@/hooks/user.hook";

export default function Component({ params }: { params: { subject: string } }) {
	const { subject } = params;

	const { subjectsList } = useStudentSubject();

	const subjectName = subjectsList?.find(
		(sub: { _id: string }) => sub._id === subject
	);

	const mainSectionHeading = subjectName
		? `${subjectName.name} Lectures`
		: `${subject} Lectures`;

	return (
		<>
			<DashboardLayout
				mainSectionHeading={mainSectionHeading}
				// pointsEarned={"400"}
				quickStartList={STUDENT_QUICK_START_LIST}
				leftSidebarLinks={studentLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
					<StudentLectures subjectId={subject} />

					{/* {allLectures.map((lecture, index) => (
						<div key={index}>
							<div className="subject-assignments-container flex flex-col gap-6">
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

								<hr className="my-[1em]" />
							</div>
						</div>
					))} */}
				</div>
			</DashboardLayout>
		</>
	);
}
