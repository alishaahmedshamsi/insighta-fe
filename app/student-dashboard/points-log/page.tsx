"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import { studentLeftSidebarLinks } from "@/components/left-sidebar/student";
import { superAdminLeftSidebarLinks } from "@/components/left-sidebar/supAdmin";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GalleryUpload } from "@/components/upload/GalleryUpload";
import { useCurrentUser } from "@/hooks/user.hook";
import { fetchPointsLog } from "@/services/apis/school.api";
import { updateUser } from "@/services/apis/user.api";
import { IUserUpdate } from "@/types/type";
import {
	SCHOOL_ADMIN_QUICK_START_LIST,
	STUDENT_QUICK_START_LIST,
	SUPER_ADMIN_QUICK_START_LIST,
	TEACHER_QUICK_START_LIST,
} from "@/utils";
import { userUpdateSchema } from "@/validation/user.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	QueryClient,
	useMutation,
	useQuery,
	useQueryClient,
} from "@tanstack/react-query";
import { time } from "console";
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

const pointsLog = [
	{
		reason: "Assignment 1",
		time: "2022-01-01 12:00:00",
		points: 20,
	},
	{
		reason: "Quiz 1",
		time: "2022-01-01 12:00:00",
		points: 15,
	},
	{
		reason: "Quiz 2",
		time: "2022-01-01 12:00:00",
		points: 15,
	},
	{
		reason: "Assignment 2",
		time: "2022-01-01 12:00:00",
		points: 20,
	},
	{
		reason: "Assignment 3",
		time: "2022-01-01 12:00:00",
		points: 20,
	},
	{
		reason: "Assignment 4",
		time: "2022-01-01 12:00:00",
		points: 20,
	},
];

export default function Page() {
	// const { users: userId } = params;

	const { user, isLoading: userLoading } = useCurrentUser();
	console.log("user: ", user);

	// if (isLoading) return <div>Loading...</div>;
	// if (isError || !user) return <div>{isError || "User does not exist"}</div>;

	const {
		data: logData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["fetch-students"],
		queryFn: () => fetchPointsLog(user?._id),
	});

	console.log("logData: ", logData);

	return (
		<DashboardLayout
			mainSectionHeading={"Points Log"}
			quickStartList={STUDENT_QUICK_START_LIST}
			leftSidebarLinks={studentLeftSidebarLinks()}
		>
			<div className="p-6 bg-white rounded-lg shadow-md">
				{isLoading ? (
					<div className="text-center text-gray-500">Loading...</div>
				) : error ? (
					<div className="text-center text-gray-500">
						Error Loading data.
					</div>
				) : logData && logData.length === 0 ? (
					<div className="text-center text-gray-500">
						No points log available
					</div>
				) : (
					logData?.map((item: any) => (
						<div
							className="flex justify-between items-center border-b border-gray-200 py-2"
							key={item._id}
						>
							<div>
								<p className="text-gray-800 font-semibold">
									{item.title}
								</p>
								<p className="text-gray-500 text-sm">
									{item.createdAt}
								</p>
							</div>
							<p className="text-gray-800 font-semibold">
								{item.points} Points
							</p>
						</div>
					))
				)}
				{/* { } */}
			</div>
		</DashboardLayout>
	);
}
