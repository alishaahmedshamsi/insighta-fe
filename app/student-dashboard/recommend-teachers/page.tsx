"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { STUDENT_QUICK_START_LIST } from "@/utils/constant/constant";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";
import { useState } from "react";
import { RecommendTable } from "@/components/RecommendTable/RecommendTable";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/middleware/middleware";
import { useCurrentUser, useStudentSubject } from "@/hooks/user.hook";
import { redirect } from "next/navigation";

const teachersList = [
	{
		fullname: "Uzma Khan",
		subject: "English",
		submitted: true,
	},
	{
		fullname: "Ali Khan",
		subject: "Maths",
		submitted: false,
	},
	{
		fullname: "Sara Khan",
		subject: "Computer",
		submitted: false,
	},
	{
		fullname: "Ayesha Khan",
		subject: "Science",
		submitted: false,
	},
];

export default function StudentDashboard() {
	const [allowReview, setAllowReview] = useState(true);

	const { user, isLoading } = useCurrentUser();

	console.log("user-current-class", user?.classes[0]);

	const { data } = useQuery({
		queryKey: ["class-teachers"],
		queryFn: async () => {
			const { data } = await api.get(
				`/teacher/get/all/class/teachers?class=${user!.classes[0]._id}`
			);
			return data.data.data;
		},
	});




	if (isLoading) if (!user) return redirect("/login");

	console.log("Teacher DATA", data);

	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Recommend Teachers"}
				quickStartList={STUDENT_QUICK_START_LIST}
				leftSidebarLinks={studentLeftSidebarLinks()}
			>
				{allowReview ? (
					<div className="flex flex-col gap-[2em]">
						{data && (
							<RecommendTable
								caption="A list of your Teachers"
								data={data}
							/>
						)}
					</div>
				) : (
					<div className="flex flex-col gap-[2em]">
						<h3 className="text-[#2c2c2c] text-[18px]">
							Check back later to give feedback to your teachers.
						</h3>
					</div>
				)}
			</DashboardLayout>
		</>
	);
}
