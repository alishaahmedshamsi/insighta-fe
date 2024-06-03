"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import TakeQuizOnline from "@/components/takeQuizOnline";
import { Button } from "@/components/ui/button";
import TeacherGrading from "@/components/TeacherGrading/teacher-grading";
import { useState } from "react";

const submissions = [
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
];

export default function AddAssignmentGrades({
	params,
}: {
	params: { class: string; number: string };
}) {
	const { class: classes, number } = params;

	

	const mainSectionHeading = `Add Class: ${classes} Quiz #${number} Grades`;
	return (
		<>
			<DashboardLayout
				mainSectionHeading={mainSectionHeading}
				quickStartList={TEACHER_QUICK_START_LIST}
				leftSidebarLinks={teacherLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col">
					<div className="results-container flex flex-col gap-8 pb-[2em]">
						{/* results */}
						{submissions.map((submission, index) => (
							<div key={index} className="submission">
								<div className="submissions flex flex-col gap-3">
									<div
										key={index}
										className="grid grid-cols-5 items-center text-[1em] capitalize text-[#333] bg-white border border-[#DBDBDB] p-[1em] rounded-[1em]"
									>
										<h4>{submission.studentName}</h4>
										<h4>{submission.rollNumber}</h4>
										<h4>
											Total Marks: {submission.totalMarks}
										</h4>
										
										<div className="flex">
											<TeacherGrading
												userName={
													submission.studentName
												}
												userClass={classes}
												number={number}
												materialType={"Quiz"}
												totalMarks={submission.totalMarks}
												// open={open}
												// setOpen={setOpen}
											/>
												
											{/* </TeacherGrading> */}
										</div>

										<TakeQuizOnline
											role="teacherGrading"
											quizName={"Quiz"}
											quizQuestions={submission.quizQA}
											displayText="View Questions"
										/>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</DashboardLayout>
		</>
	);
}
