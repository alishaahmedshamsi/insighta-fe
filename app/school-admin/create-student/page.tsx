"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerStudentSchema } from "@/validation";
import { useMutation } from "@tanstack/react-query";
import { onRegister } from "@/services/apis";
import { toast } from "sonner";
import { ROLES } from "@/utils";
import { IRegisterFields } from "@/types/type";

const userDetails = {
	userName: "School Admin",
	role: "Admin",
	schoolName: "Karachi Public School",
};

export default function SchoolAdminCreateStudent() {
	const { mutateAsync, error, reset } = useMutation({
		mutationFn: onRegister,

		// onSuccess: Handle success if needed,
		// onError: Handle error if needed,

		onError: (error) => {
			console.log(error.message);
			setTimeout(() => {
				reset();
			}, 3000);
		},
	});
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting }, // isSubmitting for loading state
	} = useForm<IRegisterFields>({
		resolver: zodResolver(registerStudentSchema),
	});

	const onSubmit: SubmitHandler<IRegisterFields> = async (data, e) => {
		if (e) {
			e?.preventDefault();
		}
		// console.log(data);
		data.role = "student";
		const { success, response } = await mutateAsync(data);

		if (!success) return toast.error(response);
		// if (success) toast.success("Student created successful");
		toast.success("Student created successful");

		// console.log(response.data.data.user.role);
		// if (response.data.data.user.role == ROLES.ADMIN) {
		// 	localStorage.setItem("accessToken", response.data.accessToken);
		// 	console.log(response.data.accessToken);
		// }
		// const role = response
		// switch()
	};

	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Create Student"}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
				leftSidebarLinks={schoolAdminLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
					<form
						action=""
						onSubmit={handleSubmit(onSubmit)}
						className="grid grid-cols-2 gap-[1em]"
					>
						<div className="w-full flex flex-col">
							<label htmlFor="name">Name</label>
							<input
								{...register("fullName")}
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="name"
								type="text"
							/>
							{errors.fullName && (
								<span>{errors.fullName.message}</span>
							)}
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="rollNo">Roll No</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="rollNo"
								type="text"
							/>
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="email">Email</label>
							<input
								{...register("email")}
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="email"
								type="text"
							/>
							{errors.password && (
								<span>{errors.password.message}</span>
							)}
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="password">Password</label>
							<input
								{...register("password")}
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="password"
								type="text"
							/>
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="classInput">Class</label>
							<input
								// {...register("classes")}
								{...register("classes", {
									valueAsNumber: true,
								})}
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="classInput"
								type="number"
							/>
							{errors.classes && (
								<span>{errors.classes.message}</span>
							)}
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="section">Section</label>
							<input
								{...register("section")}
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="section"
								type="text"
							/>
							{errors.section && (
								<span>{errors.section.message}</span>
							)}
						</div>

						<div className="w-full flex flex-col col-span-2">
							<label htmlFor="subjects">Subjects</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="subjects"
								type="text"
								placeholder="Maths, Physics, Chemistry"
							/>
						</div>
						<div>
							<input
								type="submit"
								value="Create Student"
								className="col-span-1 w-full rounded-[1em] bg-brand-sea-green py-[.9em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
							/>
							{/* <button
								// type="submit"
								// value="Create Student"
								className="col-span-1 w-full rounded-[1em] bg-brand-sea-green py-[.9em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
							>
								Create Student
							</button> */}
						</div>
					</form>
				</div>
			</DashboardLayout>
		</>
	);
}
