"use client";
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
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponse, IAddQuiz, IClasses } from "@/types/type";
import { createSubject, fetchClasses } from "@/services/apis/school.api";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import subjectSchema, { Subject } from "@/validation/subject.validation";
import { onAddQuiz } from "@/services/apis/teacher.api";
import { addQuizSchema } from "@/validation/teacher.validation";

export default function AddQuizComponent() {
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
		mutationFn: onAddQuiz,
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
	} = useForm<IAddQuiz>({
		resolver: zodResolver(addQuizSchema),
	});
	console.log(errors);

	const onSubmit: SubmitHandler<IAddQuiz> = async (data, e) => {
		e?.preventDefault();

		console.log("DATAAAAA", data);
		// data.role = "student";
		const { success, response } = await mutateAsync(data);

		if (!success) return toast.error(response);
		if (success) toast.success("Quiz Added Successfully");
	};

	const [formState, setFormState] = useState({
		questions: [{ id: 1, text: "" }],
	});

	const addQuestion = () => {
		setFormState((prevState) => ({
			
			questions: [
				...prevState.questions,
				{ id: prevState.questions.length + 1, text: "" },
			],
		}));
	};

	const removeQuestion = (id: number) => {
		setFormState((prevState) => ({
			
			questions: prevState.questions.filter(
				(question) => question.id !== id
			),
		}));
	};

	const handleQuestionChange = (id: number, text: any) => {
		setFormState((prevState) => ({
			questions: prevState.questions.map((question) =>
				question.id === id ? { ...question, text } : question
			),
		}));
	};

	// const handleChange = (e: { target: { name: any; value: any } }) => {
	// 	const { name, value } = e.target;
	// 	setFormState((prevState) => ({
	// 		...prevState,
	// 		[name]: value,
	// 	}));
	// };
	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="grid grid-cols-2 gap-[1em]"
			>
				<div className="w-full flex flex-col">
					<label htmlFor="class">Class</label>

					<Select onValueChange={(value) => setValue("className", value)}>
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
					<Select onValueChange={(value) => setValue("subjectName", value)}>
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
						// name="totalMarks"
						type="text"
						// value={formState.totalMarks}
						// onChange={handleChange}
						{...register("totalMarks")}
					/>
				</div>
				<div className="w-full flex flex-col justify-end">
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
				<div className="col-span-2">
					<label htmlFor="questions">Add Questions</label>
					<div className="grid grid-cols-2 gap-[1em] rounded-[1em] border border-[#DBDBDB] p-[1em]">
						<div className="w-full flex justify-end col-span-2">
							<button
								type="button"
								className="rounded-[1em] bg-[#030303] px-[1em] py-[.5em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
								onClick={addQuestion}
							>
								+ Add Question
							</button>
						</div>
						{formState.questions.map((question) => (
							<div
								key={question.id}
								className="w-full flex flex-col col-span-2"
							>
								<label htmlFor={`question-${question.id}`}>
									Question #{question.id}
								</label>
								<div className="flex items-center">
									<input
										className="flex-1 rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
										id={`question-${question.id}`}
										type="text"
										value={question.text}
										onChange={(e) =>
											handleQuestionChange(
												question.id,
												e.target.value
											)
										}
									/>
									<button
										type="button"
										className="ml-2 text-red-500 font-bold text-xl"
										onClick={() =>
											removeQuestion(question.id)
										}
									>
										&times;
									</button>
								</div>
							</div>
						))}
					</div>
				</div>
				<div className="col-span-2">
					<button
						type="submit"
						className="rounded-[1em] bg-brand-sea-green py-[.9em] px-[1.5em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
						// onClick={handleSubmit}
					>
						Add Quiz
					</button>
				</div>
			</form>
		</>
	);
}
