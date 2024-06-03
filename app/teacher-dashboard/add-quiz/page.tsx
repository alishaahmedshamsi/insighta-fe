"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import AddQuizComponent from "@/components/AddQuiz/add-quiz";


export default function Component() {
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Add Quiz"}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em]">
					<AddQuizComponent />
				</div>
			</DashboardLayout>
		</>
	);
}
