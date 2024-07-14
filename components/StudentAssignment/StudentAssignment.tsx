import { use, useState } from "react";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { fetchStatus, onUploadAssignment } from "@/services/apis/user.api";
import { IUploadAssignment } from "@/types/type";
import { Loader2Icon } from "lucide-react";
import { Input } from "../ui/input";

export function isDeadlinePassed(deadline: string) {
	const currentDate = new Date();
	const deadlineDate = new Date(deadline);
	return currentDate > deadlineDate;
}

export default function StudentAssignment({
	index,
	assignment,
}: {
	index: string;
	assignment: {
		subject: string;
		title: string;
		deadline: string;
		totalMarks: string;
		status: string;
		assignmentFile: string;
		createdBy: string;
	}[];
}) {
	const [file, setFile] = useState<File | null>(null);
	const queryClient = useQueryClient();

	const { mutateAsync, reset, isPending } = useMutation({
		mutationFn: onUploadAssignment,
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

		if (!file) {
			return toast.error("Please select a file.");
		}

		// const formData = new FormData();
		// formData.append("title", title);
		// formData.append("description", description);
		// formData.append("class", classId);
		// formData.append("subject", subjectId);
		// // formData.append("marks", marks.toString());
		// formData.append("deadline", date?.toISOString() || "");
		// formData.append("assignmentFile", file);

		const data: IUploadAssignment = {
			assignmentId: index,
			subject: assignment[0].subject,
			isLate: String(isDeadlinePassed(assignment[0].deadline)),
			teacher: assignment[0].createdBy,
			isQuiz: "false",
			pdf: file,
		};

		console.log("Assignment data: ", data);

		// console.log(formData.get("className"));
		// console.log(formData.get("subjectName"));
		// console.log(formData.get("marks"));
		// console.log(formData.get("deadline"));
		// console.log(formData.get("file"));

		const { success, response } = await mutateAsync(data);
		console.log(response);

		if (!success) return toast.error(response);
		if (success) toast.success("Assignment Uploaded Successfully");
		queryClient.invalidateQueries({ queryKey: ["assignment-status"] });
		queryClient.invalidateQueries({ queryKey: ["user-points"] });


		// router.push("/teacher-dashboard");

		setFile(null);

		// reset the file field form
		reset();
	};

	const { data: status } = useQuery({
		queryKey: ["assignment-status"],
		queryFn: () => fetchStatus(index),
	});

	return (
		<>
			{assignment.map((assignment) => (
				<div
					key={index}
					className="assignment flex flex-col rounded-[2em] border border-[#DBDBDB] bg-white p-[2em]"
				>
					<div className="assginment-details grid grid-cols-4 gap-5">
						<div>
							<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
								Title
							</h5>
							<h4 className="text-[#111] capitalize text-[1.2em]">
								{assignment.title}
							</h4>
						</div>
						<div>
							<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
								Deadline
							</h5>
							<h4 className="text-[#111] capitalize text-[1.2em]">
								{assignment.deadline.slice(0, 10)}
							</h4>
						</div>
						<div>
							<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
								Total Marks
							</h5>
							<h4 className="text-[#111] capitalize text-[1.2em]">
								{assignment.totalMarks}
							</h4>
						</div>
						<div>
							<h5
								className={
									"text-[#777] font-medium uppercase text-[.9em] tracking-wider"
								}
							>
								Status
							</h5>
							<h4
								className={`text-[#111] font-medium capitalize text-[1.2em] ${
									status == "Submitted"
										? `text-[#5fc935]`
										: "text-[#cf2e23]"
								}`}
							>
								{capitalizeFirstLetter(status)}
							</h4>{" "}
							{/* Completed/Checked/Not Completed */}
						</div>
						{!isDeadlinePassed(assignment.deadline) ? (
							<div>
								<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
									Assignment
								</h5>
								<h4 className="text-[#111] underline capitalize text-[1.2em]">
									<a
										target="_blank"
										href={assignment.assignmentFile}
										download="assignment.pdf"
									>
										Download File
									</a>
								</h4>
							</div>
						) : (
							<div className="h-full flex items-end">
								<h4 className="text-[#cf2e23] font-medium capitalize text-[1.2em]">
									Deadline Passed
								</h4>
							</div>
						)}
					</div>
					{/* assignment.status.toLowerCase() === "not completed" */}
					{!isDeadlinePassed(assignment.deadline) ? (
						<>
							{status !== "Submitted" && (
								<>
									<hr className="my-[1em]" />
									<div className="upload-file-container">
										<form onSubmit={handleSubmit}>
											<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
												Submit Assignment
											</h5>
											<h4 className="text-[#111] capitalize text-[1.2em] mb-[1em]">
												Upload File
											</h4>
											<div className="grid grid-cols-4">
												<Input
													onChange={handleFileChange}
													type="file"
													name="file"
													id="file"
													className="col-span-3 border-2 border-[#ddd] border-dashed w-full px-3 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-full bg-white p-[1em] h-[3.8em]"
												/>
												<button
													type="submit"
													className="col-span-1 w-full rounded-[2em] bg-brand-sea-green py-4 h-full text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
												>
													{isPending ? (
														<div className="flex justify-center items-center">
															<Loader2Icon className="mr-2 animate-spin" />
															<span>
																Uploading...
															</span>
														</div>
													) : (
														"Upload"
													)}
												</button>
											</div>
										</form>
									</div>
								</>
							)}
						</>
					) : (
						null
					)}
				</div>
			))}
		</>
	);
}
