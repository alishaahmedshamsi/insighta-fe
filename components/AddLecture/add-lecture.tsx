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
import { ApiResponse, IAddLecture, IClasses } from "@/types/type";
import { createSubject, fetchClasses } from "@/services/apis/school.api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
import { onLogin } from "@/services/apis";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import subjectSchema, { Subject } from "@/validation/subject.validation";
import { addLectureSchema } from "@/validation/teacher.validation";
import { onAddLecture } from "@/services/apis/teacher.api";

export default function AddLectureComponent() {
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
		mutationFn: onAddLecture,
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
	} = useForm<IAddLecture>({
		resolver: zodResolver(addLectureSchema),
	});
	console.log(errors);

	const onSubmit: SubmitHandler<IAddLecture> = async (data, e) => {
		e?.preventDefault();

		console.log("DATAAAAA", data);
		// data.role = "student";
		const { success, response } = await mutateAsync(data);

		if (!success) return toast.error(response);
		if (success) toast.success("Quiz Added Successfully");
	};

	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="grid grid-cols-2 gap-[1em]"
			>
				<div className="w-full flex flex-col">
					<label htmlFor="title">Title</label>
					<input
						className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
						id="title"
						type="text"
						{...register("title")}
					/>
				</div>
				<div className="w-full flex flex-col">
					<label htmlFor="description">Description</label>
					<input
						className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
						id="description"
						type="text"
						{...register("description")}
					/>
				</div>
				<div className="w-full flex flex-col">
					<label htmlFor="class">Class</label>
					{/* <input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="class"
								type="text"
							/> */}
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
					{/* <input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="subject"
								type="text"
							/> */}
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
				<div className="w-full flex flex-col col-span-2">
					<label htmlFor="file">Upload file</label>
					<input
						type="file"
						id="file"
						className="col-span-3 w-full border-2 border-[#ddd] bg-white border-dashed rounded-[1em] p-[.8em]"
						{...register("file")}
					/>
				</div>
				<div className="col-span-1">
					<button className="rounded-[1em] bg-brand-sea-green py-[.9em] px-[1.5em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink">
						Add Lecture
					</button>
				</div>
			</form>
		</>
	);
}
