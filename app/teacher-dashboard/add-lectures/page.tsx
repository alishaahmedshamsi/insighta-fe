"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import AddLectureComponent from "@/components/AddLecture/add-lecture";



export default function TeacherAddLecture() {
	
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Add Lecture"}
				// pointsEarned={"400"}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em]">
					<AddLectureComponent />
				</div>
			</DashboardLayout>
		</>
	);
}
