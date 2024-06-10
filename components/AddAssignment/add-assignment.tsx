"use client";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

import { format } from "date-fns";

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
import { ArrowDownCircleIcon, Check } from "lucide-react";

import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponse, IAddAssignment, IClasses } from "@/types/type";
import { createSubject, fetchClasses } from "@/services/apis/school.api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { PlusCircleIcon } from "lucide-react";
import { onLogin, onRegister } from "@/services/apis";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import subjectSchema, { Subject } from "@/validation/subject.validation";
import { useState } from "react";
import { addAssignmentSchema } from "@/validation/teacher.validation";
import { onAddAssignment } from "@/services/apis/teacher.api";

export default function AddAssignmentComponent() {
	const [date, setDate] = useState<Date>();

	// const [selectedClass, setSelectedClass] = useState("");
	// const [open, setOpen] = useState(false);

	const {
		data,
		isLoading,
		error,
	}: {
		data: ApiResponse<IClasses> | undefined;
		isLoading: boolean;
		error: any;
	} = useQuery({
		queryKey: ["fetch-classes"],
		queryFn: () => fetchClasses(),
	});

	console.log("class data", data);

	// -------------------

	const { mutateAsync, reset } = useMutation({
		mutationFn: onAddAssignment,
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
		setValue,
		formState: { errors, isSubmitting }, // isSubmitting for loading state
	} = useForm<IAddAssignment>({
		resolver: zodResolver(addAssignmentSchema),
	});
	console.log(errors);

	const onSubmit: SubmitHandler<IAddAssignment> = async (data, e) => {
		e?.preventDefault();

		console.log("DATAAAAA", data);
		// data.role = "student";
		const { success, response } = await mutateAsync(data);

		if (!success) return toast.error(response);
		if (success) toast.success("Assignment Added Successfully");
	};

	return (
		<>
			<form
				action=""
				onSubmit={handleSubmit(onSubmit)}
				className="grid grid-cols-2 gap-[1em]"
			>
				<div className="w-full flex flex-col">
					<label htmlFor="class">Class</label>
					<Select
						onValueChange={(value) => setValue("className", value)}
					>
						<SelectTrigger className="rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]">
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
				</div>
				<div className="w-full flex flex-col">
					<label htmlFor="subject">Subject</label>
					<Select
						onValueChange={(value) =>
							setValue("subjectName", value)
						}
					>
						<SelectTrigger className="rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]">
							<SelectValue placeholder="Select a Subject" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Subjects</SelectLabel>
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
				</div>
				<div className="w-full flex flex-col">
					<label htmlFor="totalMarks">Total Marks</label>
					<input
						className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
						id="totalMarks"
						type="number"
						{...register("totalMarks")}
					/>
				</div>
				<div className="w-full flex flex-col">
					<label htmlFor="totalMarks">Deadline</label>
					<Popover>
						<PopoverTrigger asChild>
							<Button
								variant={"outline"}
								className={cn(
									"rounded-[1em] p-[.8em] h-[3.7em] justify-start text-left font-normal",
									!date && "text-muted-foreground"
								)}
							>
								<CalendarIcon className="mr-2 h-4 w-4" />
								{date ? (
									format(date, "PPP")
								) : (
									<span>Pick a date</span>
								)}
							</Button>
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={date}
								onSelect={setDate}
								disabled={(date) => date < new Date()}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</div>
				<div className="w-full flex flex-col col-span-2">
					<label htmlFor="file">Upload file</label>
					<input
						type="file"
						id="file"
						className="col-span-3 w-full border-2 border-[#ddd] bg-white border-dashed rounded-[1em] p-[.8em]"
						{...register("file")}
					/>
				</div>
				<div>
					<button className="rounded-[1em] bg-brand-sea-green py-[.9em] px-[1.5em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor">
						Add Assignment
					</button>
				</div>
			</form>
		</>
	);
}
