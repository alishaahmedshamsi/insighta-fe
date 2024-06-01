"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import AddAssignmentComponent from "@/components/AddAssignment/add-assignment";

const userDetails = {
  userName: "Annie Leonchart",
  role: "Teacher",
  qualification: "BA in English",
};

export default function TeacherDashboard() {

	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Add Assignment"}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em]">
					<AddAssignmentComponent />
				</div>
			</DashboardLayout>
		</>
	);

}
