"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { STUDENT_QUICK_START_LIST } from "@/utils/constant/constant";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";
import {
	useStudentAssignments,
	useStudentSubject,
	useStudentSubmission,
} from "@/hooks/user.hook";

export default function Component({ params }: { params: { subject: string } }) {
	const { subject } = params;

	const { submissionList, isLoading: submissionLoading } =
		useStudentSubmission(undefined, subject);

	console.log("submissionList: ", submissionList);

	const { assignmentsList } = useStudentAssignments(subject);

	console.log("assignmentsList: ", assignmentsList);
	// let assignmentTitle = [];
	// if (
	// 	submissionList &&
	// 	submissionList.length > 0 &&
	// 	submissionList[0]?.assignmentId
	// ) {
	// 	assignmentTitle = assignmentsList?.filter(
	// 		(quiz: any) => quiz._id == submissionList[0].assignmentId
	// 	);
	// }
	const { subjectsList, isLoading } = useStudentSubject();

	const subjectName = subjectsList?.find(
		(sub: { _id: string }) => sub._id === subject
	);

	const mainSectionHeading = subjectName
		? `${subjectName.name} Assignments`
		: `${subject} Assignments`;

	if (submissionLoading && isLoading) {
		return <div>loading</div>;
	}

	const getAssignmentTitle = (assignmentId: string) => {
		const assignment = assignmentsList?.find(
			(assignment: any) => assignment._id === assignmentId
		);
		return assignment ? assignment.title : assignmentId;
	};

	return (
		<>
			<DashboardLayout
				mainSectionHeading={mainSectionHeading}
				quickStartList={STUDENT_QUICK_START_LIST}
				leftSidebarLinks={studentLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
					<div className="flex flex-col gap-6">
						<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
							Assignments Submission Results
						</h3>
						{submissionList &&
							submissionList.map(
								(assignment: any, index: number) => (
									<div
										key={`${index + assignment._id}`}
										className="assignment flex flex-col rounded-[2em] border border-[#DBDBDB] bg-white p-[2em]"
									>
										<div className="assginment-details grid grid-cols-3 gap-5">
											<div>
												<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
													Title
												</h5>
												<h4 className="text-[#111] capitalize text-[1.2em]">
													{getAssignmentTitle(
														assignment.assignmentId
													)}
												</h4>
											</div>
											<div>
												<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
													Status
												</h5>
												<h4 className="text-[#189918] capitalize text-[1.2em]">
													{assignment.status}
												</h4>
											</div>
											{/* <div>
										<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
											Deadline
										</h5>
										<h4 className="text-[#111] capitalize text-[1.2em]">
											{assignment.assignmentId.deadline.slice(0,10)}
										</h4>
									</div> */}
											<div>
												<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
													Obt. Marks
												</h5>
												<h4 className="text-[#111] capitalize text-[1.2em]">
													{assignment.obtainMarks ||
														"-"}
												</h4>
											</div>
											{/* <div>
										<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
											Total Marks
										</h5>
										<h4 className="text-[#111] capitalize text-[1.2em]">
										{assignment.assignmentId.totalMarks}
										</h4>
									</div> */}
										</div>
									</div>
								)
							)}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
