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

import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponse, IClasses } from "@/types/type";
import { createSubject, fetchClasses } from "@/services/apis/school.api";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import subjectSchema, { Subject } from "@/validation/subject.validation";

export default function AddQuizComponent() {
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

	const [formState, setFormState] = useState({
		class: "",
		subject: "",
		totalMarks: "",
		deadline: "",
		questions: [{ id: 1, text: "" }],
	});

	const addQuestion = () => {
		setFormState((prevState) => ({
			...prevState,
			questions: [
				...prevState.questions,
				{ id: prevState.questions.length + 1, text: "" },
			],
		}));
	};

	const removeQuestion = (id: number) => {
		setFormState((prevState) => ({
			...prevState,
			questions: prevState.questions.filter(
				(question) => question.id !== id
			),
		}));
	};

	const handleQuestionChange = (id: number, text: any) => {
		setFormState((prevState) => ({
			...prevState,
			questions: prevState.questions.map((question) =>
				question.id === id ? { ...question, text } : question
			),
		}));
	};

	const handleChange = (e: { target: { name: any; value: any } }) => {
		const { name, value } = e.target;
		setFormState((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};
	return (
		<>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className="grid grid-cols-2 gap-[1em]"
			>
				<div className="w-full flex flex-col">
					<label htmlFor="class">Class</label>
					{/* <input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id="class"
								name="class"
								type="text"
								value={formState.class}
								onChange={handleChange}
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
								name="subject"
								type="text"
								value={formState.subject}
								onChange={handleChange}
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
						name="totalMarks"
						type="text"
						value={formState.totalMarks}
						onChange={handleChange}
					/>
				</div>
				<div className="w-full flex flex-col">
					<label htmlFor="deadline">Deadline</label>
					<input
						className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
						id="deadline"
						name="deadline"
						type="text"
						value={formState.deadline}
						onChange={handleChange}
					/>
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
