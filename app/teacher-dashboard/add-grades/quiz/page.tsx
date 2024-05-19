"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import TakeQuizOnline from "@/components/takeQuizOnline";

const userDetails = {
	userName: "Annie Leonchart",
	role: "Teacher",
	qualification: "BA in English",
};

const submissions = [
	{
		quizNumber: "1",
		submissions: [
			{
				studentName: "Muhammad Usman",
				rollNumber: "123456",
				totalMarks: "10",
				obtainedMarks: "",
				quizQA: [
					{
						questionNo: "Question #1",
						question: "List parts of speech",
						answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						questionNo: "Question #2",
						question: "List parts of speech",
						answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						questionNo: "Question #3",
						question: "List parts of speech",
						answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
				],
			},
			{
				studentName: "Muhammad Usman",
				rollNumber: "123456",
				totalMarks: "10",
				obtainedMarks: "",
				quizQA: [
					{
						questionNo: "Question #1",
						question: "List parts of speech",
						answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						questionNo: "Question #2",
						question: "List parts of speech",
						answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						questionNo: "Question #3",
						question: "List parts of speech",
						answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
				],
			},
			{
				studentName: "Muhammad Usman",
				rollNumber: "123456",
				totalMarks: "10",
				obtainedMarks: "",
				quizQA: [
					{
						questionNo: "Question #1",
						question: "List parts of speech",
						answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						questionNo: "Question #2",
						question: "List parts of speech",
						answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						questionNo: "Question #3",
						question: "List parts of speech",
						answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
				],
			},
		],
	},
	{
		quizNumber: "2",
		submissions: [
			{
				studentName: "Muhammad Usman",
				rollNumber: "123456",
				totalMarks: "10",
				obtainedMarks: "",
				quizQA: [
					{
						questionNo: "Question #1",
						question: "List parts of speech",
						answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						questionNo: "Question #2",
						question: "List parts of speech",
						answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						questionNo: "Question #3",
						question: "List parts of speech",
						answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
				],
			},
			{
				studentName: "Muhammad Usman",
				rollNumber: "123456",
				totalMarks: "10",
				obtainedMarks: "",
				quizQA: [
					{
						questionNo: "Question #1",
						question: "List parts of speech",
						answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						questionNo: "Question #2",
						question: "List parts of speech",
						answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
					{
						questionNo: "Question #3",
						question: "List parts of speech",
						answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
					},
				],
			},
		],
	},
];

export default function AddAssignmentGrades() {
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Add Assginment Grades"}
				userDetails={userDetails}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col">
					<div className="filter-container grid grid-cols-3 gap-4">
						<div>
							<label htmlFor="class">Class</label>
							<select
								name="class"
								id="class"
								className="w-full p-[.8em] rounded-[1em] border border-[#DBDBDB] bg-[#f4f8fb]"
							>
								<option value="">-- select class --</option>
								<option value="5">5</option>
								<option value="6">6</option>
							</select>
						</div>
						<div>
							<label htmlFor="subject">Subject</label>
							<select
								name="subject"
								id="subject"
								className="w-full p-[.8em] rounded-[1em] border border-[#DBDBDB] bg-[#f4f8fb]"
							>
								<option value="">-- select subject --</option>
								<option value="English">English</option>
								<option value="Science">Science</option>
							</select>
						</div>
						<div className="flex justify-end flex-col">
							<button className="col-span-1 w-full rounded-[1em] bg-brand-sea-green py-[.9em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor">
								Filter
							</button>
						</div>
					</div>
					<hr className="my-[2em]" />
					<div className="results-container flex flex-col gap-8 pb-[2em]">
						{/* results */}
						{submissions.map((submission, index) => (
							<div key={index} className="submission">
								<h3 className="uppercase text-[1.2em] font-semibold text-[#222] mb-4">
									Assginment #{submission.quizNumber}{" "}
									Submissions
								</h3>
								<div className="submissions flex flex-col gap-3">
									{submission.submissions.map(
										(submission, index) => (
											<div
												key={index}
												className="grid grid-cols-5 items-center text-[1em] capitalize text-[#333] bg-white border border-[#DBDBDB] p-[1em] rounded-[1em]"
											>
												<h4>
													{submission.studentName}
												</h4>
												<h4>{submission.rollNumber}</h4>
												<h4>
													Total Marks:{" "}
													{submission.totalMarks}
												</h4>
												<div className="flex">
													<label>Obt. Marks</label>
													<input
														className="w-full p-[.5em] rounded-[1em] border border-[#DBDBDB] bg-[#f4f8fb]"
														type="text"
													/>
												</div>
												{/* <Link
													className="text-center underline text-[1em] text-[#15B5D5] font-medium"
													href={
														submission.quizQA
													}
												>
													Download File
												</Link> */}
												<TakeQuizOnline
													role="teacherGrading"
													quizName={"Quiz"}
													quizQuestions={
														submission.quizQA
													}
													displayText="View Questions"
												/>
											</div>
										)
									)}
								</div>
							</div>
						))}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
