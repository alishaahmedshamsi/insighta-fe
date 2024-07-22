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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAddQuiz } from "@/types/type";
import { toast } from "sonner";
import { onAddQuiz } from "@/services/apis/teacher.api";
import { useCurrentUser } from "@/hooks/user.hook";
import { useSearchParams } from "next/navigation";

export default function AddQuizComponent() {
	const [title, setTitle] = useState("");
	const [date, setDate] = useState<Date | null>(new Date());
	const [className, setClassName] = useState("");
	const [classId, setClassId] = useState<string | undefined>(undefined);

	// const [subjectName, setSubjectName] = useState("");
	const [marks, setMarks] = useState<number>(0);
	const [question, setQuestion] = useState([{ id: 1, text: "" }]);

	const { user, isLoading, error } = useCurrentUser();

	console.log("user from teacher quiz module: ", user?.subject[0].class);

	const queryClient = useQueryClient();
	const { mutateAsync, reset } = useMutation({
		mutationFn: onAddQuiz,
		onError: (error) => {
			setTimeout(() => {
				reset();
			}, 3000);
		},
	});
	const searchParams = useSearchParams()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const subId = searchParams.get('subjectId')
		console.log("subId: ", subId);

		if (!title || !classId || !marks || !date)
			return toast.error("Please fill all the fields");

		if (question.some((q) => q.text === ""))
			return toast.error("Please fill the questions field");

		const data: IAddQuiz = {
			title,
			class: classId,
			subject: subId!,
			marks,
			deadline: date!,
			question: question.map((q) => q.text),
		};


		const { success, response } = await mutateAsync(data);

		if (!success) return toast.error(response);
		if (success) toast.success("Quiz Added Successfully");
		queryClient.invalidateQueries({ queryKey: ["user-points"] });
		queryClient.invalidateQueries({ queryKey: ["fetch-quiz"] });

		
		reset();
		setTitle("");
		setDate(new Date());
		setClassName("");
		setMarks(0);
		setQuestion([{ id: 1, text: "" }]);
	};

	const addQuestion = () => {
		setQuestion((prevState) => [
			...prevState,
			{ id: prevState.length + 1, text: "" },
		]);
	};

	const removeQuestion = (id: number) => {
		setQuestion((prevState) =>
			prevState.filter((question) => question.id !== id)
		);
	};

	const handleQuestionChange = (id: number, text: string) => {
		setQuestion((prevState) =>
			prevState.map((question) =>
				question.id === id ? { ...question, text } : question
			)
		);
	};

	const handleClassChange = (value: string) => {
		// console.log("class value: ", value);
		setClassName(value);

		const classData = user?.classes.find(
			(item) => String(item.className) === String(value)
		);
		setClassId(classData?._id);
	};

	if (isLoading) return <div>Loading...</div>;
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
						type="string"
						onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
							setTitle(e.target.value)
						}
						value={title}
					/>
				</div>
				<div className="w-full flex flex-col">
					<label htmlFor="class">Class</label>
					<Select onValueChange={handleClassChange} value={className}>
						{/* <Select onValueChange={(e) => setClassName(e.target.value)}> */}
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
									user?.classes.map((item) => (
										<SelectItem
											key={item._id}
											value={item.className.toString()}
										>
											{item.className}
										</SelectItem>
									))
								)}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
				{/* <div className="w-full flex flex-col">
					<label htmlFor="subject">Subject</label>
					<Select onValueChange={setSubjectName}>
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
									user?.subject.map((item) => (
										<SelectItem
											key={item._id}
											value={item.name}
										>
											{item.name}
										</SelectItem>
									))
								)}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div> */}
				<div className="w-full flex flex-col">
					<label htmlFor="totalMarks">Total Marks</label>
					<input
						className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
						id="totalMarks"
						type="number"
						onChange={(e) => setMarks(Number(e.target.value))}
						value={marks}
					/>
				</div>
				<div className="w-full flex flex-col justify-end">
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
						{question.map((question) => (
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
					>
						Add Quiz
					</button>
				</div>
			</form>
		</>
	);
}
