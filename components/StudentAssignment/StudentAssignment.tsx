import { useState, useEffect } from "react";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import Link from "next/link";
import { onUploadAssignment } from "@/services/apis/user.api";
import { IUploadAssignment } from "@/types/type";

function isDeadlinePassed(deadline: string) {
	const currentDate = new Date();
	const deadlineDate = new Date(deadline);
	return currentDate > deadlineDate;
}

export default function StudentAssignment({
	index,
	assignment,
}: {
	index: number;
	assignment: {
		title: string;
		deadline: string;
		totalMarks: string;
		obtMarks: string;
		status: string;
		assignment: string;
	}[];
}) {
	const [title, setTitle] = useState("");
	const [file, setFile] = useState<File | null>(null);

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
			studentId: "studentId", // fetch from the current user api
			// subject and assignment ids could be extracted from the param
			subjectId: "subjectId",
			assignmentId: "assignmentId",
			title: assignment[0].title,
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
		if (success) toast.success("Assignment Uploaded Successfully");
		// router.push("/teacher-dashboard");

		setFile(null);
	};

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
								{assignment.deadline}
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
							<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
								Obt. Marks
							</h5>
							<h4 className="text-[#111] capitalize text-[1.2em]">
								{assignment.obtMarks}
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
									assignment.status == "Completed"
										? `text-[#5fc935]`
										: "text-[#cf2e23]"
								}`}
							>
								{capitalizeFirstLetter(assignment.status)}
							</h4>{" "}
							{/* Completed/Checked/Not Completed */}
						</div>
						{!isDeadlinePassed(assignment.deadline) ? (
							<div>
								<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
									Assignment
								</h5>
								<h4 className="text-[#111] underline capitalize text-[1.2em]">
									<Link href={assignment.assignment}>
										Download File
									</Link>
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
					{!isDeadlinePassed(assignment.deadline) &&
					assignment.status.toLowerCase() === "not completed" ? (
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
										<input
											onChange={handleFileChange}
											type="file"
											name="file"
											id="file"
											className="col-span-3 w-full border-2 border-[#777] border-dashed rounded-[2em] p-[.9em]"
										/>
										<button
											type="submit"
											className="col-span-1 w-full rounded-[2em] bg-brand-sea-green py-3 text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
										>
											Upload
										</button>
									</div>
								</form>
							</div>
						</>
					) : null}
				</div>
			))}
		</>
	);
}
