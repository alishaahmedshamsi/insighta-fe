import { useState, useEffect, useRef } from "react";
import Link from "next/link";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";

import defaultImage from "@/public/assets/default.webp";
import { capitalizeFirstLetter } from "@/lib/utils";

import { toast } from "sonner"; // Assuming you have toast notifications set up
import { useMutation, useQuery } from "@tanstack/react-query";
import { getMessages, onSendMessage } from "@/services/apis/user.api";
import { ISendMessage } from "@/types/type";
import { useCurrentUser } from "@/hooks/user.hook";

const userCode = (message: string | undefined) => {
	return (
		<div className="flex items-start gap-4 justify-end">
			<div className="bg-blue-500 text-white dark:bg-gray-800 rounded-2xl p-4 max-w-[70%]">
				<div className="text-sm font-medium">You</div>
				<div className="text-sm text-white dark:text-gray-300 mt-1">
					{message ? message : ""}
				</div>
			</div>
			<Avatar className="w-8 h-8">
				<img
					src="https://imgs.search.brave.com/RymhOwh6hRxjCmprEklsylSDQfxnBL0obmTn_CS9IDg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni82OTk0LzY5OTQ2/MTgucG5nP3NlbXQ9/YWlzX2h5YnJpZA"
					alt="You"
				/>
				<AvatarFallback>ST</AvatarFallback>
			</Avatar>
		</div>
	);
};
const peersCode = (name: string | undefined, message: string | undefined) => {
	return (
		<div className="flex items-start gap-4">
			<Avatar className="w-8 h-8">
				<img
					src="https://imgs.search.brave.com/RymhOwh6hRxjCmprEklsylSDQfxnBL0obmTn_CS9IDg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni82OTk0LzY5OTQ2/MTgucG5nP3NlbXQ9/YWlzX2h5YnJpZA"
					alt="Peers"
				/>
				<AvatarFallback>PR</AvatarFallback>
			</Avatar>
			<div className="bg-gray-100 text-gray-700 rounded-2xl p-4 max-w-[70%]">
				<div className="text-sm font-medium">{name}</div>
				<div className="text-sm mt-1">{message}</div>
			</div>
		</div>
	);
};

export default function ChatBoxComponent({
	assignmentId,
}: // subjectId,
{
	assignmentId: string;
	// subjectId: string;
}) {
	const [message, setMessage] = useState("");
	const chatContainerRef = useRef<HTMLDivElement>(null);

	const { user } = useCurrentUser();

	const { isLoading, data, error, refetch } = useQuery({
		queryKey: ["getMessages", assignmentId],
		queryFn: () => getMessages(assignmentId),
		refetchInterval: 3000, // Poll every 3 seconds
	});

	const { mutateAsync, reset, isPending } = useMutation({
		mutationFn: onSendMessage,
		onError: (error) => {
			console.log(error.message);
			setTimeout(() => {
				reset();
			}, 3000);
		},
		onSuccess: () => {
			refetch(); // Refetch messages after sending a new one
		},
	});

	useEffect(() => {
		if (chatContainerRef.current) {
			chatContainerRef.current.scrollTop =
				chatContainerRef.current.scrollHeight;
		}
	}, [data]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			// Prepare data for submission
			const studentSubmission: ISendMessage = {
				// studentId: "studentId",
				// subjectId: subjectId,
				chat: assignmentId,
				message: message,
			};

			console.log("Student Submission: ", studentSubmission);

			const { success, response } = await mutateAsync(studentSubmission);

			if (!success) return toast.error(response);
			if (success) toast.success("Sent");

			// Reset form state
			setMessage("");
		} catch (error) {
			console.error("Error submitting message: ", error);
			toast.error("Failed to submit message. Please try again.");
		}
	};

	return (
		<>
			<div className="flex flex-col h-[600px] w-full bg-white dark:bg-gray-950 rounded-2xl shadow-lg overflow-hidden">
				<div className="flex items-center justify-between px-6 py-4 bg-gray-100 dark:bg-gray-900">
					<div className="flex items-center gap-3">
						<Avatar className="w-8 h-8">
							<img
								src="https://imgs.search.brave.com/RymhOwh6hRxjCmprEklsylSDQfxnBL0obmTn_CS9IDg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni82OTk0LzY5OTQ2/MTgucG5nP3NlbXQ9/YWlzX2h5YnJpZA"
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
								src="https://imgs.search.brave.com/RymhOwh6hRxjCmprEklsylSDQfxnBL0obmTn_CS9IDg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZy/ZWVwaWsuY29tLzI1/Ni82OTk0LzY5OTQ2/MTgucG5nP3NlbXQ9/YWlzX2h5YnJpZA"
								alt="You"
							/>
							<AvatarFallback>ST</AvatarFallback>
						</Avatar>
					</div>
				</div>
				<div
					className="flex-1 overflow-y-auto p-6 space-y-4"
					ref={chatContainerRef}
				>
					{data?.map(
						(message: {
							user?: {
								_id: string;
								fullname: string | undefined;
							};
							message: string;
						}) => {
							if (message?.user?._id === user?._id) {
								return userCode(message.message);
							} else {
								return peersCode(
									message?.user?.fullname,
									message.message
								);
							}
						}
					)}
				</div>
				<form
					onSubmit={handleSubmit}
					className="bg-gray-100 dark:bg-gray-900 px-6 py-4 flex items-center gap-2"
				>
					<Input
						value={message}
						onChange={(e) => setMessage(e.target.value)}
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
