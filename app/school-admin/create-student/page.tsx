"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import { registerStudentSchema } from "@/validation";
import { onRegister } from "@/services/apis";
import { IRegisterFields } from "@/types/type";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponse, IClasses } from "@/types/type";
import { fetchClasses } from "@/services/apis/school.api";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ArrowDownCircleIcon, Check, Loader2Icon } from "lucide-react";

export default function SchoolAdminCreateStudent() {
	const { mutateAsync, error, reset, isPending } = useMutation({
		mutationFn: onRegister,
		onError: (error) => {
			console.log(error.message);
			setTimeout(() => {
				reset();
			}, 3000);
		},
	});
	const [open, setOpen] = useState(false);
	const [selectedClass, setSelectedClass] = useState("");
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting }, // isSubmitting for loading state
		reset: resetForm,
	} = useForm<IRegisterFields>({
		resolver: zodResolver(registerStudentSchema),
	});
	console.log(errors);

	const onSubmit: SubmitHandler<IRegisterFields> = async (data, e) => {
		e?.preventDefault();

		console.log("DATAAAAA", data);
		data.role = "student";
		const { success, response } = await mutateAsync(data);

		if (!success) return toast.error(response);
		if (success) toast.success("Student created successful");
		resetForm();
		setSelectedClass("");
	};
	const {
		data,
	}: {
		data: ApiResponse<IClasses> | undefined;
		isLoading: boolean;
	} = useQuery({
		queryKey: ["fetch-classes"],
		queryFn: () => fetchClasses(),
	});

	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Create Student"}
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
							<Input
								{...register("fullname")}
								className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]"
								id="name"
								type="text"
							/>
							{errors.fullname && (
								<span>{errors.fullname.message}</span>
							)}
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="rollNo">Roll No</label>
							<Input
								// sent the value of as string
								{...register("rollnumber", {
									valueAsNumber: false,
								})}
								className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]"
								id="rollnumnber"
								type="number"
							/>
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="email">Email</label>
							<Input
								{...register("email")}
								className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]"
								id="email"
								type="email"
							/>
							{errors.password && (
								<span>{errors.password.message}</span>
							)}
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="password">Password</label>
							<Input
								{...register("password")}
								className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]"
								id="password"
								type="text"
							/>
						</div>
						<div className="w-full flex flex-col">
							<label htmlFor="classInput">Class</label>
							<Popover open={open} onOpenChange={setOpen}>
								<PopoverTrigger asChild>
									<Button
										variant="outline"
										role="combobox"
										aria-expanded={open}
										className="justify-between w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]"
									>
										{selectedClass
											? data?.data.find(
													(item) =>
														item._id ===
														selectedClass
											  )?.className
											: "Select Class"}
										<ArrowDownCircleIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
									</Button>
								</PopoverTrigger>
								<PopoverContent className="w-[400px] p-0">
									<Command>
										<CommandInput placeholder="Search classes..." />
										<CommandList>
											<CommandEmpty>
												No classes found.
											</CommandEmpty>
											<CommandGroup>
												{data?.data.map((item) => (
													<CommandItem
														key={item._id}
														onSelect={() => {
															setSelectedClass(
																item._id
															);
															setValue(
																"classes",
																[item._id]
															);
															setOpen(false);
														}}
													>
														<Check
															className={`mr-2 h-4 w-4 ${
																selectedClass ===
																item._id
																	? "opacity-100"
																	: "opacity-0"
															}`}
														/>
														{item.className}
													</CommandItem>
												))}
											</CommandGroup>
										</CommandList>
									</Command>
								</PopoverContent>
							</Popover>

							{errors.classes && (
								<span>{errors.classes.message}</span>
							)}
							{/* <Button type="submit" className="mt-3">
								Submit
							</Button> */}

							<Button
								className="rounded-[1em] mt-4 bg-brand-sea-green py-[.9em] px-[1.5em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
								type="submit"
							>
								{isPending ? (
									<>
										<div className="flex justify-center items-center">
											<Loader2Icon className="mr-2 animate-spin" />
											<span>Creating...</span>
										</div>
									</>
								) : (
									"Submit"
								)}
							</Button>
						</div>
					</form>
				</div>
			</DashboardLayout>
		</>
	);
}
