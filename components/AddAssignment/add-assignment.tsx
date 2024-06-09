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

import { Calendar } from "@/components/ui/calendar";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

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

import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";


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
						type="date"
					/>
					
					{/* <FormField
						// control={form.control}
						name="dob"
						render={({ field }) => (
							<FormItem className="flex flex-col">
								<FormLabel>Deadline</FormLabel>
								<Popover>
									<PopoverTrigger asChild>
										<FormControl>
											<Button
												variant={"outline"}
												className={cn(
													"w-[240px] pl-3 text-left font-normal",
													!field.value &&
														"text-muted-foreground"
												)}
											>
												{field.value ? (
													format(field.value, "PPP")
												) : (
													<span>Pick a date</span>
												)}
												<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
											</Button>
										</FormControl>
									</PopoverTrigger>
									<PopoverContent
										className="w-auto p-0"
										align="start"
									>
										<Calendar
											mode="single"
											selected={field.value}
											onSelect={field.onChange}
											disabled={(date) =>
												date > new Date() ||
												date < new Date("1900-01-01")
											}
											initialFocus
										/>
									</PopoverContent>
								</Popover>
								<FormMessage />
							</FormItem>
						)}
					/> */}
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

// import { zodResolver } from "@hookform/resolvers/zod";
// import { format } from "date-fns";
// import { CalendarIcon } from "lucide-react";
// import { z } from "zod";
// import { cn } from "@/lib/utils";
// import { useForm } from "react-hook-form";

// import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
// import {
// 	Form,
// 	FormControl,
// 	FormDescription,
// 	FormField,
// 	FormItem,
// 	FormLabel,
// 	FormMessage,
// } from "@/components/ui/form";
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from "@/components/ui/popover";
// import { toast } from "@/components/ui/use-toast";

// const FormSchema = z.object({
// 	dob: z.date({
// 		required_error: "A date of birth is required.",
// 	}),
// });

// export function CalendarForm() {
// 	const form = useForm<z.infer<typeof FormSchema>>({
// 		resolver: zodResolver(FormSchema),
// 	});

// 	function onSubmit(data: z.infer<typeof FormSchema>) {
// 		toast({
// 			title: "You submitted the following values:",
// 			description: (
// 				<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
// 					<code className="text-white">
// 						{JSON.stringify(data, null, 2)}
// 					</code>
// 				</pre>
// 			),
// 		});
// 	}

// 	return (
// 		<Form {...form}>
// 			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
// 				<FormField
// 					control={form.control}
// 					name="dob"
// 					render={({ field }) => (
// 						<FormItem className="flex flex-col">
// 							<FormLabel>Date of birth</FormLabel>
// 							<Popover>
// 								<PopoverTrigger asChild>
// 									<FormControl>
// 										<Button
// 											variant={"outline"}
// 											className={cn(
// 												"w-[240px] pl-3 text-left font-normal",
// 												!field.value &&
// 													"text-muted-foreground"
// 											)}
// 										>
// 											{field.value ? (
// 												format(field.value, "PPP")
// 											) : (
// 												<span>Pick a date</span>
// 											)}
// 											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
// 										</Button>
// 									</FormControl>
// 								</PopoverTrigger>
// 								<PopoverContent
// 									className="w-auto p-0"
// 									align="start"
// 								>
// 									<Calendar
// 										mode="single"
// 										selected={field.value}
// 										onSelect={field.onChange}
// 										disabled={(date) =>
// 											date > new Date() ||
// 											date < new Date("1900-01-01")
// 										}
// 										initialFocus
// 									/>
// 								</PopoverContent>
// 							</Popover>
// 							<FormMessage />
// 						</FormItem>
// 					)}
// 				/>
// 				{/* <Button type="submit">Submit</Button> */}
// 			</form>
// 		</Form>
// 	);
// }
