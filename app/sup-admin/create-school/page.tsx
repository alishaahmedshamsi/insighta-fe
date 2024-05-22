"use client";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { SUPER_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { superAdminLeftSidebarLinks } from "@/components/left-sidebar/supAdmin";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@/validation";
import { useMutation } from "@tanstack/react-query";
import { onRegister } from "@/services/apis";
import { toast } from "sonner";
import { ROLES } from "@/utils";
import { IRegisterFields } from "@/types/type";

const userDetails = {
	userName: "Admin",
	role: "Super Admin",
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
	} = useForm<IRegisterFields>({ resolver: zodResolver(registerSchema) });

	const onSubmit: SubmitHandler<IRegisterFields> = async (data, e) => {
		if (e) {
			e?.preventDefault();
		}
		// console.log(data);
		data.role = "school";
		const { success, response } = await mutateAsync(data);

		if (!success) return toast.error(response);
		if (success) toast.success("School created successful");

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
				mainSectionHeading={"Create School"}
				// pointsEarned={"400"}
				userDetails={userDetails}
				quickStartList={SUPER_ADMIN_QUICK_START_LIST}
				leftSidebarLinks={superAdminLeftSidebarLinks()}
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
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="schoolId">Email</label>
							<input
								{...register("email")}
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="schoolId"
								type="text"
							/>
						</div>

						<div className="w-full flex flex-col col-span-2">
							<label htmlFor="password">Password</label>
							<input
								{...register("password")}
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="password"
								type="text"
							/>
						</div>

						<div>
							<button className="col-span-1 w-full rounded-[1em] bg-brand-sea-green py-[.9em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor">
								Create School
							</button>
						</div>
					</form>
				</div>
			</DashboardLayout>
		</>
	);
}
