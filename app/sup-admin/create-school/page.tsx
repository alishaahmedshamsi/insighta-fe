"use client";
import Image from "next/image";
import React from "react";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { SUPER_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { superAdminLeftSidebarLinks } from "@/components/left-sidebar/supAdmin";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, registerSchema } from "@/validation";
import { useMutation } from "@tanstack/react-query";
import { onRegister } from "@/services/apis";
import { toast } from "sonner";
import { IRegisterFields } from "@/types/type";


export default function Component() {
	
	const { mutateAsync, error, reset } = useMutation({
		mutationFn: onRegister,
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
		console.log("data", data);
		data.role = "school";
		const { success, response } = await mutateAsync(data);

		console.log("data", data);
		if (!success) return toast.error(response);
		if (success) toast.success("School created successful");
		reset();
	

	
	};

	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Create School"}
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
								{...register("fullname")}
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
