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
	const router = useRouter();
	const queryClient = useQueryClient();
	const { user, isError, isLoading } = useCurrentUser();
	console.log("user: ", user);

	// const [coverFile, setCoverFile] = useState();
	// const [cover, setCover] = useState("");

	// const { mutateAsync, error, reset, isPending } = useMutation({
	// 	mutationFn: updateUser,

	// 	onError: (error) => {
	// 		console.log(error.message);
	// 		setTimeout(() => {
	// 			reset();
	// 		}, 3000);
	// 	},

	// 	onSuccess: () => {
	// 		// reset();
	// 		queryClient.invalidateQueries({ queryKey: ["current-user"] });
	// 	},
	// });

	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors, isSubmitting }, // isSubmitting for loading state
	// 	reset: resetForm,
	// } = useForm<IUserUpdate>({ resolver: zodResolver(userUpdateSchema) });

	// const onSubmit: SubmitHandler<IUserUpdate> = async (data, e) => {
	// 	const formData = new FormData();
	// 	formData.append("fullname", data.fullname);
	// 	formData.append("location", data.location);
	// 	formData.append("image", coverFile ?? "");

	// 	const { success, response } = await mutateAsync(formData);
	// 	if (!success) return toast.error(response);
	// 	if (success) {
	// 		toast.success("Profile updated successfully");
	// 		// setCoverFile();
	// 		setCover("");
	// 		resetForm(); // Reset the form fields
	//   if(user?.role == "admin")
	//     router.push("/sup-admin");
	//   else if(user?.role == "school")
	//     router.push("/school-admin");
	//   else if(user?.role == "teacher")
	//     router.push("/teacher-dashboard");
	//   else if(user?.role == "student")
	//     router.push("/student-dashboard");
	// 	}
	// 	// setTimeout(() => {
	// 	// 	reset();
	// 	// }, 1000);
	// };

	if (isLoading) return <div>Loading...</div>;
	if (isError || !user) return <div>{isError || "User does not exist"}</div>;

	return (
		<DashboardLayout
			mainSectionHeading={"Points Log"}
			// pointsEarned={"400"}
			quickStartList={
				user.role === "teacher"
					? TEACHER_QUICK_START_LIST
					: STUDENT_QUICK_START_LIST
			}
			leftSidebarLinks={
				user.role === "teacher"
					? teacherLeftSidebarLinks()
					: studentLeftSidebarLinks()
			}
		>
			<div className="p-6 bg-white rounded-lg shadow-md">
				{pointsLog.map((item) => (
					<div
						className="flex justify-between items-center border-b border-gray-200 py-2"
						key={item.reason}
					>
						<div>
							<p className="text-gray-800 font-semibold">
								{item.reason}
							</p>
							<p className="text-gray-500 text-sm">{item.time}</p>
						</div>
						<p className="text-gray-800 font-semibold">
							{item.points} Points
						</p>
					</div>
				))}
			</div>
		</DashboardLayout>
	);
}
