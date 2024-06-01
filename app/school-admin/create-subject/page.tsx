"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponse, IClasses } from "@/types/type";
import { createSubject, fetchClasses } from "@/services/apis/school.api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { onLogin } from "@/services/apis";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import subjectSchema, { Subject } from "@/validation/subject.validation";

export default function page() {
	const {
		isLoading,
		data,
		error,
	}: {
		data: ApiResponse<IClasses> | undefined;
		error: any;
		isLoading: boolean;
	} = useQuery({
		queryKey: ["fetch-classes"],
		queryFn: () => fetchClasses(),
	});

	if (isLoading) {
		<div>loading...</div>;
	}

	if (error) {
		toast.error(error);
	}

	const { mutateAsync, reset } = useMutation({
		mutationFn: createSubject,

		onError: (error) => {
			console.log(error.message);
			setTimeout(() => {
				reset();
			}, 3000);
		},
	});

	const {
		setValue,
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<Subject>({ resolver: zodResolver(subjectSchema) });

	const onSubmit: SubmitHandler<Subject> = async (data, e) => {
		console.log("Hello wolr");

		const { success, response } = await mutateAsync(data);

		if (!success) return toast.error(response);
		if (success) toast.success("Subject Created successfully");
	};
	return (
		<DashboardLayout
			mainSectionHeading="Create Subject"
			quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
			leftSidebarLinks={schoolAdminLeftSidebarLinks()}
		>
			<div className="bg-white p-5 rounded-lg">
				<form action="" onSubmit={handleSubmit(onSubmit)}>
					<div className="flex flex-col gap-4">
						<Select
							onValueChange={(value) => setValue("class", value)}
						>
							<SelectTrigger className="w-[180px]">
								<SelectValue placeholder="Select a Class" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									<SelectLabel>Classes</SelectLabel>
									{isLoading ? (
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
									)}
								</SelectGroup>
							</SelectContent>
						</Select>
						<Input
							type="text"
							placeholder="Subject"
							className="max-w-[180px]"
							{...register("name")}
						/>
						<Button className="w-[180px]">
							<PlusCircleIcon className="w-6 h-6 mr-2" />
							Create Subject
						</Button>
					</div>
				</form>
			</div>
		</DashboardLayout>
	);
}
