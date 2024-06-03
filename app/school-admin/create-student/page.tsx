"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";

import { registerStudentSchema } from "@/validation";
import { onRegister } from "@/services/apis";
import { IRegisterFields } from "@/types/type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponse, IClasses } from "@/types/type";
import { createSubject, fetchClasses } from "@/services/apis/school.api";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import subjectSchema, { Subject } from "@/validation/subject.validation";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

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
		data.classes = data.classes?.map(Number) ?? []; // Ensure classes are numbers
		data.section = data.section?.map(String) ?? []; // Ensure classes are numbers
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

	// -----------------------

	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Create Student"}
				// pointsEarned={"400"}
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
								{...register("fullname")}
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="name"
								type="text"
							/>
							{errors.fullname && (
								<span>{errors.fullname.message}</span>
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
								type="email"
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
							{/* <input
								// {...register("classes")}
								{...register("classes", {
									setValueAs: (v) => v.split(",").map(Number),
								})}
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="classInput"
								type="number"
							/> */}

							<Select
							// onValueChange={(value) =>
							// 	setValue("class", value)
							// }
							>
								<SelectTrigger className="rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]">
									<SelectValue placeholder="Select a Class" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										<SelectLabel>Classes</SelectLabel>
										{/* {isLoading ? (
											<div>Loading...</div>
										) : error ? (
											<div>Error loading classes</div>
										) : (
											data?.data.map((item) => (
												<SelectItem
													key={item._id}
													value={String(item._id)}
												>
													{item.className}
												</SelectItem>
											))
										)} */}
									</SelectGroup>
								</SelectContent>
							</Select>

							{errors.classes && (
								<span>{errors.classes.message}</span>
							)}
						</div>
						
						<div className="w-full flex flex-col">
							<label htmlFor="section">Section</label>
							<input
								{...register("section", {
									validate: (value) =>
										(value ?? "").length === 1 ||
										"Section must be one character",
								})}
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="section"
								type="text"
								maxLength={1}
							/>
							{errors.section && (
								<span>{errors.section.message}</span>
							)}
						</div>
						<div>
							<input
								type="submit"
								value="Create Student"
								className="col-span-1 w-full rounded-[1em] bg-brand-sea-green py-[.9em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
							/>
						</div>
					</form>
				</div>
			</DashboardLayout>
		</>
	);
}
