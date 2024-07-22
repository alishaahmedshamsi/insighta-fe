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
import { IAddAssignment } from "@/types/type";
import { toast } from "sonner";
import { onAddAssignment } from "@/services/apis/teacher.api";
import { useCurrentUser } from "@/hooks/user.hook";
import { Input } from "../ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function AddAssignmentComponent() {
	const [description, setDescription] = useState("");
	const [title, setTitle] = useState("");
	const [className, setClassName] = useState("");
	const [subjectName, setSubjectName] = useState("");
	const [marks, setMarks] = useState<number | "">("");
	const [date, setDate] = useState<Date | null>(new Date());
	const [file, setFile] = useState<File | null>(null);
	const [classId, setClassId] = useState<string | undefined>(undefined);
	const [subjectId, setSubjectId] = useState<string | undefined>(undefined);
	// const [classIndex, setClassIndex] = useState("");

	const { user, isLoading, error } = useCurrentUser();
	console.log("user: ", user);

	const router = useRouter();
	const queryClient = useQueryClient();

	const { mutateAsync, reset, isPending } = useMutation({
		mutationFn: onAddAssignment,
		onError: (error) => {
			console.log(error.message);
			setTimeout(() => {
				reset();
			}, 3000);
		},
	});



	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		if (e.target.files && e.target.files[0]) {
			setFile(e.target.files[0]);
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!classId || !date || !file) {
			return toast.error("Please fill in all fields");
		}

		let subId = user?.subject.find((item) => item.class == classId)?._id;

	

		const data: IAddAssignment = {
			title,
			descripition: description,
			class: classId,
			subject: subId,
			// subject: subjectId,
			totalMarks: marks as number,
			deadline: date!,
			assignmentFile: file,
		};

		console.log("Assignment data: ", data);

		// console.log(formData.get("className"));
		// console.log(formData.get("subjectName"));
		// console.log(formData.get("marks"));
		// console.log(formData.get("deadline"));
		// console.log(formData.get("file"));

		const { success, response } = await mutateAsync(data);

		if (!success) return toast.error(response);
		
			toast.success("Assignment Added Successfully");
			setClassName("");
			setClassId(undefined);
			setDate(null);
			setFile(null);
			setTitle("");
			setDescription("");
			queryClient.invalidateQueries({ queryKey: ["user-points"] });
			queryClient.invalidateQueries({ queryKey: ["fetch-assignments"] });
		
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading classes or subjects</div>;

	// console.log("classIndex", checkClassIndex);

	// const filteredSubjects =
	// 	checkClassIndex !== -1 ? user?.subject[checkClassIndex!] || [] : [];

	const handleClassChange = (value: string) => {
		console.log("class value: ", value);
		setClassName(value)

		const classData = user?.classes.find(
			(item) => String(item.className) === String(value)
		);
		setClassId(classData?._id);
	};

	// const handleSubjectChange = (value: string) => {
	// 	console.log("class value: ", value);

	// 	const subjectData = user?.subject.find(
	// 		(item) => String(item.name) === String(value)
	// 	);
	// 	setSubjectId(subjectData?._id);
	// };

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
					value={title}
					placeholder="Title"
					className="rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]"
				/>
				<Input
					onChange={(e) => {
						setDescription(e.target.value);
					}}
					value={description}
					placeholder="Description"
					className="rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]"
				/>
			
				<div className="w-full flex flex-col">
					<label htmlFor="class">Class</label>
					<Select onValueChange={handleClassChange} value={className}>
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
				
				{/* <div className="w-full flex flex-col">
					<label htmlFor="subject">Subject</label>
					<Select onValueChange={handleSubjectChange}>
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
							</SelectGroup>
						</SelectContent>
					</Select>
				</div> */}
				{/* <div className="w-full flex flex-col">
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
				</div> */}
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
				<Input
					onChange={(e) => {
						setMarks(Number(e.target.value));
					}}
					type="number"
					value={marks}
					placeholder="Total Marks"
					className="rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]"
				/>
				<div className="w-full flex flex-col col-span-2">
					<label htmlFor="file">Upload file</label>
					<Input
						type="file"
						id="file"
						className="col-span-3 border-2 border-[#ddd] border-dashed w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[1em] bg-white p-[.8em] h-[3.5em]"
						onChange={handleFileChange}
					/>
				</div>
				<div>
					<Button
						className="rounded-[1em] bg-brand-sea-green py-[1.4em] px-[1.5em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
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
					</Button>
				</div>
			</form>
		</>
	);
}
