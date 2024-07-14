import { useState } from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { ApiResponse, IAddLecture, IClasses } from "@/types/type";
import { createSubject, fetchClasses } from "@/services/apis/school.api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2Icon, PlusCircleIcon } from "lucide-react";
import { onLogin } from "@/services/apis";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import subjectSchema, { Subject } from "@/validation/subject.validation";
import { addLectureSchema } from "@/validation/teacher.validation";
import { onAddLecture } from "@/services/apis/teacher.api";

import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/user.hook";

export default function AddLectureComponent() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [className, setClassName] = useState("");
	const [subjectName, setSubjectName] = useState("");
	const [file, setFile] = useState<File | null>(null);

	const [classId, setClassId] = useState<string | undefined>(undefined);
	const [subjectId, setSubjectId] = useState<string | undefined>(undefined);

	const { user, isLoading, error } = useCurrentUser();

	const router = useRouter();
	const { mutateAsync, reset, isPending } = useMutation({
		mutationFn: onAddLecture,
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
	const queryClient = useQueryClient();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!classId || !title || !description || !file) {
			return toast.error("Please fill in all fields");
		}
		let subId = user?.subject.find((item) => item.class == classId)?._id;


		// const formData = new FormData();
		// formData.append("title", title);
		// formData.append("description", description);
		// formData.append("className", className);
		// formData.append("subjectName", subjectName);
		// formData.append("file", file);

		// formData.append("marks", marks.toString());
		// formData.append("deadline", date?.toISOString() || "");

		// console.log(formData.get("title"));
		// console.log(formData.get("description"));
		// console.log(formData.get("className"));
		// console.log(formData.get("subjectName"));
		// console.log(formData.get("file"));

		// const lectureData: IAddLecture = {
		//   title: formData.get("title") as string,
		//   description: formData.get("description") as string,
		//   className: formData.get("className") as string,
		//   subjectName: formData.get("subjectName") as string,
		//   file: formData.get("file") as File,
		// };

		const data: IAddLecture = {
			title,
			description: description,
			className: classId,
			subject: subId,
			// marks: marks as number,
			lecture: file,
		};

		console.log("lecture data: ", data);
		const { success, response } = await mutateAsync(data);

		if (!success) return toast.error(response);
		if (success) toast.success("Lecture Added Successfully");
		// router.push("/teacher-dashboard");
		queryClient.invalidateQueries({ queryKey: ["fetch-lectures"] });
		queryClient.invalidateQueries({ queryKey: ["user-points"] });


		setTitle("");
		setDescription("");
		setClassName("");
		setSubjectName("");
		setFile(null);
		// setMarks("");
		// setDate(new Date());
	};

	if (isLoading) return <div>Loading...</div>;
	if (error) return <div>Error loading classes or subjects</div>;

	const handleClassChange = (value: string) => {
		console.log("class value: ", value);
		setClassName(value);

		const classData = user?.classes.find(
			(item) => String(item.className) === String(value)
		);
		setClassId(classData?._id);
	};

	const handleSubjectChange = (value: string) => {
		console.log("class value: ", value);

		const subjectData = user?.subject.find(
			(item) => String(item.name) === String(value)
		);
		setSubjectId(subjectData?._id);
	};

	// const {
	// 	data,
	// 	isLoading,
	// 	error,
	// }: {
	// 	data: ApiResponse<IClasses> | undefined;
	// 	isLoading: boolean;
	// 	error: any;
	// } = useQuery({
	// 	queryKey: ["fetch-classes"],
	// 	queryFn: () => fetchClasses(),
	// });

	// console.log("class data", data);

	// // -------------------

	// const { mutateAsync, reset } = useMutation({
	// 	mutationFn: onAddLecture,
	// 	onError: (error) => {
	// 		console.log(error.message);
	// 		setTimeout(() => {
	// 			reset();
	// 		}, 3000);
	// 	},
	// });
	// const {
	// 	register,
	// 	handleSubmit,
	// 	setValue,
	// 	formState: { errors, isSubmitting }, // isSubmitting for loading state
	// } = useForm<IAddLecture>({
	// 	resolver: zodResolver(addLectureSchema),
	// });
	// console.log(errors);

	// const onSubmit: SubmitHandler<IAddLecture> = async (data, e) => {
	// 	e?.preventDefault();

	// 	console.log("DATAAAAA", data);
	// 	// data.role = "student";
	// 	const { success, response } = await mutateAsync(data);

	// 	if (!success) return toast.error(response);
	// 	if (success) toast.success("Quiz Added Successfully");
	// };

	return (
		<>
			<form
				onSubmit={handleSubmit}
				className="grid grid-cols-2 gap-[1em]"
			>
				<div className="w-full flex flex-col">
					<label htmlFor="title">Title</label>
					<input
						className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
						id="title"
						type="text"
						onChange={(e) => {
							setTitle(e.target.value);
						}}
						value={title}
					/>
				</div>
				<div className="w-full flex flex-col">
					<label htmlFor="description">Description</label>
					<input
						className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
						id="description"
						type="text"
						onChange={(e) => {
							setDescription(e.target.value);
						}}
						value={description}
					/>
				</div>
				<div className="col-span-2 w-full flex flex-col">
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
				<div className="w-full flex flex-col col-span-2">
					<label htmlFor="file">Upload file</label>
					<Input
						type="file"
						id="file"
						className="col-span-3 border-2 border-[#ddd border-dashed w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[1em] bg-white p-[.8em] h-[3.5em]"
						onChange={handleFileChange}
						// value={file?.name || ""}
					/>
				</div>
				<div className="col-span-1">
					
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
							"Add Lecture"
						)}
					</button>
				</div>
			</form>
		</>
	);
}
