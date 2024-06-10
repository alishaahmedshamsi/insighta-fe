"use client";

import { useState, useEffect } from "react";
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
import { Calendar as CalendarIcon, Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useMutation } from "@tanstack/react-query";
import { IAddAssignment } from "@/types/type";
import { toast } from "sonner";
import { onAddAssignment } from "@/services/apis/teacher.api";
import { useCurrentUser } from "@/hooks/user.hook";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";

export default function AddAssignmentComponent() {
	const [className, setClassName] = useState("");
	const [subjectName, setSubjectName] = useState("");
	const [marks, setMarks] = useState<number | "">("");
	const [date, setDate] = useState<Date | null>(new Date());
	const [file, setFile] = useState<File | null>(null);
	const [description, setDescription] = useState("");
	const [title, setTitle] = useState("");
	// const [classIndex, setClassIndex] = useState("");

	const { user, isLoading, error } = useCurrentUser();
	console.log("user: ", user);

	const router = useRouter();
	const { mutateAsync, reset, isPending } = useMutation({
		mutationFn: onAddAssignment,
		onError: (error) => {
			console.log(error.message);
			setTimeout(() => {
				reset();
			}, 3000);
		},
	});

	// useEffect(() => {
	// 	setClassIndex(() => (
	// 		user?.classes.findIndex(
	// 			(item) => item.className.toString() === className
	// 		)
	// 	)
	// 	);
	// }, [className]);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!className || !subjectName || !marks || !date || !file) {
			return toast.error("Please fill in all fields");
		}

		const formData = new FormData();
		formData.append("className", className);
		formData.append("title", title);
		formData.append("description", description);
		formData.append("subjectName", subjectName);
		formData.append("marks", marks.toString());
		formData.append("deadline", date?.toISOString() || "");
		formData.append("assignmentFile", file);

		// console.log(formData.get("className"));
		// console.log(formData.get("subjectName"));
		// console.log(formData.get("marks"));
		// console.log(formData.get("deadline"));
		// console.log(formData.get("file"));

		const { success, response } = await mutateAsync(formData);

		if (!success) return toast.error(response);
		if (success) toast.success("Assignment Added Successfully");
		router.push("/teacher-dashboard");
		setClassName("");
		setSubjectName("");
		setMarks("");
		setDate(null);
		setFile(null);
		setTitle("");
		setDescription("");
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading classes or subjects</div>;

	// console.log("classIndex", checkClassIndex);

	// const filteredSubjects =
	// 	checkClassIndex !== -1 ? user?.subject[checkClassIndex!] || [] : [];

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-2 gap-[1em]"
			>
				<Input
					onChange={(e) => {
						setTitle(e.target.value);
					}}
					placeholder="Title"
					className="rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]"
				/>
				<Input
					onChange={(e) => {
						setDescription(e.target.value);
					}}
					placeholder="Description"
					className="rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]"
				/>

				<div className="w-full flex flex-col">
					<label htmlFor="class">Class</label>
					<Select onValueChange={setClassName}>
						<SelectTrigger className="rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]">
							<SelectValue placeholder="Select a Class" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Classes</SelectLabel>
								{user?.classes.map((item) => (
									<SelectItem
										key={item._id}
										value={item.className.toString()}
									>
										{item.className}
									</SelectItem>
								))}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				<div className="w-full flex flex-col">
					<label htmlFor="subject">Subject</label>
					<Select onValueChange={setSubjectName}>
						<SelectTrigger className="rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]">
							<SelectValue placeholder="Select a Subject" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>Subjects</SelectLabel>
								{user?.subject.map((item) => (
									<SelectItem
										key={item._id}
										value={item.name}
									>
										{item.name}
									</SelectItem>
								))}

								{/* {classIndex > -1 && (
									<SelectItem
										key={
											user?.subject[classIndex]._id
										}
										value={
											user?.subject[classIndex].name
										}
									>
										{user?.subject[classIndex].name}
									</SelectItem>
								)} */}
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
						value={marks}
						onChange={(e) =>
							setMarks(
								e.target.value ? Number(e.target.value) : ""
							)
						}
					/>
				</div>
				<div className="w-full flex flex-col">
					<label htmlFor="deadline">Deadline</label>
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
								selected={date as Date | undefined}
								onSelect={
									setDate as (value: Date | undefined) => void
								}
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
						onChange={handleFileChange}
					/>
				</div>
				<div>
					<button
						className="rounded-[1em] bg-brand-sea-green py-[.9em] px-[1.5em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
						type="submit"
					>
						{isPending ? (
							<>
								<div className="flex justify-center items-center">
									<Loader2Icon className="mr-2 animate-spin" />
									<span>Submitting...</span>
								</div>
							</>
						) : (
							"Add Assignment"
						)}
					</button>
				</div>
			</form>
		</>
	);
}
