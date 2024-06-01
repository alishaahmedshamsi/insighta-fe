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

export default function AddAssignmentComponent() {
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
		if (success) toast.success("Quiz Created successfully");
	};
	return (
		<>
			<div className="grid grid-cols-2 gap-[1em]">
				<div className="w-full flex flex-col">
					<label htmlFor="class">Class</label>
					{/* <input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="class"
								type="text"
							/> */}
					<Select onValueChange={(value) => setValue("class", value)}>
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
					{/* <input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="subject"
								type="text"
							/> */}
					<Select onValueChange={(value) => setValue("class", value)}>
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
						type="text"
					/>
				</div>
				<div className="w-full flex flex-col">
					<label htmlFor="deadline">Deadline</label>
					<input
						className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
						id="deadline"
						type="text"
					/>
				</div>
				<div className="w-full flex flex-col col-span-2">
					<label htmlFor="file">Upload file</label>
					<input
						type="file"
						name="file"
						id="file"
						className="col-span-3 w-full border-2 border-[#ddd] bg-white border-dashed rounded-[1em] p-[.8em]"
					/>
				</div>
				<div>
					<button className="rounded-[1em] bg-brand-sea-green py-[.9em] px-[1.5em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor">
						Add Assignment
					</button>
				</div>
			</div>
		</>
	);
}
