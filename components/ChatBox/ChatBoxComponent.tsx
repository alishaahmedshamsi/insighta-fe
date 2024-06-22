import { useState } from "react";
import Link from "next/link";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";

import defaultImage from "@/public/assets/default.webp";
import { capitalizeFirstLetter } from "@/lib/utils";

import { toast } from "sonner"; // Assuming you have toast notifications set up
import { useMutation } from "@tanstack/react-query";
import { onSendMessage } from "@/services/apis/user.api";
import { ISendMessage } from "@/types/type";

export default function ChatBoxComponent({
	assignmentId,
	subjectId,
}: {
	assignmentId: string;
	subjectId: string;
}) {
	const [message, setMessage] = useState("");

	const { mutateAsync, reset, isPending } = useMutation({
		mutationFn: onSendMessage,
		onError: (error) => {
			console.log(error.message);
			setTimeout(() => {
				reset();
			}, 3000);
		},
	});

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			// Prepare data for submission
			const studentSubmission: ISendMessage = {
				studentId: "studentId",
				subjectId: subjectId,
				assignmentId: assignmentId,
				message: message,
			};

			console.log("Student Submission: ", studentSubmission);

			const { success, response } = await mutateAsync(studentSubmission);

			if (!success) return toast.error(response);
			if (success) toast.success("Assignment Added Successfully");



			// Simulate API call or actual submission logic here
			// Replace this with your actual API call
			// const response = await submitQuiz(studentSubmission);

			// Example of handling success response
			// if (response.success) {
			//   toast.success("Quiz submitted successfully!");
			//   setOpen(false);
			//   // Optionally reset form or state
			//   setStudentAnswers([]);
			// } else {
			//   toast.error(response.message || "Failed to submit quiz.");
			// }

			// Simulate a delay for demo purposes
			// setTimeout(() => {
			// 	toast.success("Quiz submitted successfully!");
			// 	setMessage("");
			// }, 2000);
		} catch (error) {
			console.error("Error submitting quiz: ", error);
			toast.error("Failed to submit quiz. Please try again.");
		}
	};

	return (
		<>
			<div className="flex flex-col h-[600px] w-full bg-white dark:bg-gray-950 rounded-2xl shadow-lg overflow-hidden">
				<div className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-900">
					<div className="flex items-center gap-3">
						<Avatar className="w-8 h-8">
							<img
								src="https://github.com/shadcn.png"
								alt="Teacher"
							/>
							<AvatarFallback>TC</AvatarFallback>
						</Avatar>
						<div className="text-sm font-medium">Peers</div>
					</div>
					<div className="flex items-center gap-3">
						<div className="text-sm font-medium">You</div>
						<Avatar className="w-8 h-8">
							<img
								src="https://github.com/shadcn.png"
								alt="You"
							/>
							<AvatarFallback>ST</AvatarFallback>
						</Avatar>
					</div>
				</div>
				<div className="flex-1 overflow-y-auto p-6 space-y-4">
					<div className="flex items-start gap-4  justify-end">
						<div className="bg-blue-500 text-white dark:bg-gray-800 rounded-2xl p-4 max-w-[70%]">
							<div className="text-sm font-medium">You</div>
							<div className="text-sm text-white dark:text-gray-300 mt-1">
								Hi teacher, I'm having trouble understanding the
								concept of inheritance in JavaScript. Can you
								please explain it to me?
							</div>
						</div>
						<Avatar className="w-8 h-8">
							<img
								src="https://github.com/shadcn.png"
								alt="You"
							/>
							<AvatarFallback>ST</AvatarFallback>
						</Avatar>
					</div>
					<div className="flex items-start gap-4">
						<Avatar className="w-8 h-8">
							<img
								src="https://github.com/shadcn.png"
								alt="Peers"
							/>
							<AvatarFallback>TC</AvatarFallback>
						</Avatar>
						<div className="bg-gray-100 text-gray-700 rounded-2xl p-4 max-w-[70%]">
							<div className="text-sm font-medium">Peers</div>
							<div className="text-sm mt-1">
								Sure, inheritance in JavaScript is a way for one
								object to access the properties and methods of
								another object. It's a fundamental concept in
								object-oriented programming.
							</div>
						</div>
					</div>
					<div className="flex items-start gap-4  justify-end">
						<div className="bg-blue-500 text-white dark:bg-gray-800 rounded-2xl p-4 max-w-[70%]">
							<div className="text-sm font-medium">You</div>
							<div className="text-sm text-white dark:text-gray-300 mt-1">
								Okay, that makes sense. Can you give me an
								example of how inheritance works in JavaScript?
							</div>
						</div>
						<Avatar className="w-8 h-8">
							<img
								src="https://github.com/shadcn.png"
								alt="You"
							/>
							<AvatarFallback>ST</AvatarFallback>
						</Avatar>
					</div>
					<div className="flex items-start gap-4">
						<Avatar className="w-8 h-8">
							<img
								src="https://github.com/shadcn.png"
								alt="Peers"
							/>
							<AvatarFallback>TC</AvatarFallback>
						</Avatar>
						<div className="bg-gray-100 text-gray-700 rounded-2xl p-4 max-w-[70%]">
							<div className="text-sm font-medium">Peers</div>
							<div className="text-sm mt-1">
								Sure, let's say we have a `Vehicle` class that
								has properties like `make`, `model`, and `year`.
								We can then create a `Car` class that inherits
								from `Vehicle`. The `Car` class will have access
								to all the properties and methods of the
								`Vehicle` class, and can also add its own unique
								properties and methods.
							</div>
						</div>
					</div>
				</div>
				<form
					onSubmit={handleSubmit}
					className="bg-gray-100 dark:bg-gray-900 px-6 py-4 flex items-center gap-2"
				>
					<Input
						type="text"
						placeholder="Type your message..."
						className="flex-1 rounded-full bg-white dark:bg-gray-800 border-none focus:ring-0 focus:outline-none"
					/>
					<Button
						variant="ghost"
						size="icon"
						className="rounded-full"
					>
						<SendIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
					</Button>
				</form>
			</div>
		</>
	);
}

// export default ChatBoxComponent;

function SendIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
	return (
		<svg
			{...props}
			xmlns="http://www.w3.org/2000/svg"
			width="24"
			height="24"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		>
			<path d="m22 2-7 20-4-9-9-4Z" />
			<path d="M22 2 11 13" />
		</svg>
	);
}
