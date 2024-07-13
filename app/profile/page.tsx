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
import { Loader2Icon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

export default function Page() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [coverFile, setCoverFile] = useState();


	const { user, isError, isLoading } = useCurrentUser();
  console.log("user: ", user)
  const [cover, setCover] = useState(user?.profilePicture || "");
	const { mutateAsync, error, reset, isPending } = useMutation({
		mutationFn: updateUser,

		onError: (error) => {
			console.log(error.message);
			setTimeout(() => {
				reset();
			}, 3000);
		},

		onSuccess: () => {
			// reset();
			queryClient.invalidateQueries({ queryKey: ["current-user"] });
		},
	});

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }, // isSubmitting for loading state
		reset: resetForm,
	} = useForm<IUserUpdate>({ resolver: zodResolver(userUpdateSchema) });

	const onSubmit: SubmitHandler<IUserUpdate> = async (data, e) => {
		const formData = new FormData();
		formData.append("fullname", data.fullname);
		formData.append("location", data.location);
		formData.append("image", coverFile ?? "");

		const { success, response } = await mutateAsync(formData);
		if (!success) return toast.error(response);
		if (success) {
			toast.success("Profile updated successfully");
			// setCoverFile();
			setCover("");
			resetForm(); // Reset the form fields
      if(user?.role == "admin")
        router.push("/sup-admin");
      else if(user?.role == "school")
        router.push("/school-admin");
      else if(user?.role == "teacher")
        router.push("/teacher-dashboard");
      else if(user?.role == "student")
        router.push("/student-dashboard");
		}
		// setTimeout(() => {
		// 	reset();
		// }, 1000);
	};

	if (isLoading) return <div>Loading...</div>;
	if (isError || !user) return <div>{isError || "user doesnt exst"}</div>;

	return (
		<DashboardLayout
			mainSectionHeading={"Profile"}
			// pointsEarned={"400"}
			quickStartList={
				user.role === "school"
					? SCHOOL_ADMIN_QUICK_START_LIST
					: user.role === "admin"
					? SUPER_ADMIN_QUICK_START_LIST
					: user.role === "teacher"
					? TEACHER_QUICK_START_LIST
					: STUDENT_QUICK_START_LIST
			}
			leftSidebarLinks={
				user.role === "school"
					? schoolAdminLeftSidebarLinks()
					: user.role === "admin"
					? superAdminLeftSidebarLinks()
					: user.role === "teacher"
					? teacherLeftSidebarLinks()
					: studentLeftSidebarLinks()
			}
		>
			<div className="p-6 bg-white rounded-lg shadow-md">
				<form action="" onSubmit={handleSubmit(onSubmit)}>
					<div className="mb-4">
						<GalleryUpload
							setFile={setCoverFile} // Ensure this prop is correctly set to update the file state
							cover={cover} // Ensure this prop is correctly set to display the image preview
							setImage={setCover} // Ensure this prop is correctly set to update the image state
							id="cover"
							placeholder="Update Profile Picture"
						/>
					</div>
					<div className="mb-4">
						<Input
							{...register("fullname")}
							className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]"
							type="text"
							value={user.fullname}
							placeholder="Enter your name"
						/>
					</div>
					<div className="mb-4">
						<Input
							value={user.location}
							{...register("location")}
							className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]"
							type="text"
							placeholder="Location"
						/>
					</div>

					{/* <Button>{isSubmitting ? "Updating" : "Submit"}</Button> */}
					{/* <Button>{isSubmitting ? "Updating" : "Submit"}</Button> */}

					<Button
						className="rounded-[1em] bg-brand-sea-green py-[.9em] px-[1.5em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
						type="submit"
					>
						{isPending ? (
							<>
								<div className="flex justify-center items-center">
									<Loader2Icon className="mr-2 animate-spin" />
									<span>Updating...</span>
								</div>
							</>
						) : (
							"Submit"
						)}
					</Button>
				</form>
			</div>
		</DashboardLayout>
	);
}
