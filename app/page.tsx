"use client";
import AuthLayout from "@/components/layouts/auth.layout";
import { ILoginFields } from "@/types/type";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/validation";
import { useMutation } from "@tanstack/react-query";
import { onLogin } from "@/services/apis";
import { toast } from "sonner";
import Image from "next/image";

import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
	ArrowPathIcon,
	Bars3Icon,
	ChartPieIcon,
	CursorArrowRaysIcon,
	FingerPrintIcon,
	SquaresPlusIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import {
	ChevronDownIcon,
	PhoneIcon,
	PlayCircleIcon,
} from "@heroicons/react/20/solid";
import PointsBreakdown from "@/components/points-breakdown";
import HeaderComponent from "@/components/header.component";
import RankTableComponent from "@/components/rank-table.component";

function classNames(...classes: string[]) {
	return classes.filter(Boolean).join(" ");
}

export default function FrontPage() {
	// const router = useRouter();

	// const { mutateAsync, error, reset } = useMutation({
	// 	mutationFn: onLogin,

	// 	// onSuccess: Handle success if needed,
	// 	// onError: Handle error if needed,

	// 	onError: (error) => {
	// 		console.log(error.message);
	// 		setTimeout(() => {
	// 			reset();
	// 		}, 3000);
	// 	},

	// 	onSuccess: (data: any) => {
	// 		// localStorage.setItem("token", data.data.accessToken);
	// 		// router.push("/dashboard");
	// 	},
	// });

	// const {
	// 	register,
	// 	handleSubmit,
	// 	formState: { errors, isSubmitting }, // isSubmitting for loading state
	// } = useForm<ILoginFields>({ resolver: zodResolver(loginSchema) });

	// const onSubmit: SubmitHandler<ILoginFields> = async (data) => {
	// 	console.log(data);
	// 	const { success, response } = await mutateAsync(data);

	// 	if (!success) return toast.error(response);
	// 	if (response.user.role !== "admin")
	// 		return toast.error("Unauthorized Access!!!");

	// 	toast.success("Login success");
	// };

	const topRankTeachers = [
		{
			userName: "Waqqam Usman",
			schoolName: "Karachi Public School",
			gender: "male",
			userRank: "1st",
			qualification: "B",
			role: "teacher",
			points: "400",
			assignmentPoints: "100",
			quizPoints: "150",
			lecturePoints: "150",
		},
		{
			userName: "Waqqam Usman",
			schoolName: "Karachi Public School",
			gender: "male",
			userRank: "2nd",
			qualification: "B",
			role: "teacher",
			points: "400",
			assignmentPoints: "100",
			quizPoints: "150",
			lecturePoints: "150",
		},
		{
			userName: "Waqqam Usman",
			schoolName: "Karachi Public School",
			gender: "male",
			userRank: "3rd",
			qualification: "B",
			role: "teacher",
			points: "400",
			assignmentPoints: "100",
			quizPoints: "150",
			lecturePoints: "150",
		},
		{
			userName: "Waqqam Usman",
			schoolName: "Karachi Public School",
			gender: "male",
			userRank: "4th",
			qualification: "B",
			role: "teacher",
			points: "400",
			assignmentPoints: "100",
			quizPoints: "150",
			lecturePoints: "150",
		},
		{
			userName: "Waqqam Usman",
			schoolName: "Karachi Public School",
			gender: "male",
			userRank: "5th",
			qualification: "B",
			role: "teacher",
			points: "400",
			assignmentPoints: "100",
			quizPoints: "150",
			lecturePoints: "150",
		},
	];

	return (
		<>
			<HeaderComponent />

			<section
				className={`my-0 mx-auto flex flex-col justify-center items-center w-[100%] h-[100vh] relative z-0 bg-brand-dark-blue overflow-hidden`}
			>
				<span id="bg-circle-gradient-1"></span>
				<span id="bg-circle-gradient-2"></span>
				<div className="flex flex-col items-center p-[10px] relative my-0 mx-auto w-[min(100%_-_20px,1250px)]">
					<div className="text-wrapper sm:w-[650px] flex flex-col justify-center items-center">
						<h3 className="subheading text-white relative font-bold sm:text-[20px] leading-[2em] text-center tracking-[0.3em] uppercase text-off_white">
							Insighta
						</h3>
						<h1 className="font-bold my-2 text-[35px] sm:text-[60px] leading-tight text-center text-white">
							The Apex of Learning
						</h1>
						<p className="text-md sm:text-[18px] leading-[1.6em] text-center text-white">
							Elevate your learning experience with our
							cutting-edge platform - where knowledge meets
							innovation.
						</p>
						<a
							href="#"
							className="mt-10 transition ml-2 text-md font-semibold leading-6 text-gray-900 px-4 py-2 border border-transparent rounded-md shadow-sm bg-brand-sea-green hover:text-[#fff] hover:bg-brand-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-sea-green"
						>
							Explore Now
						</a>
					</div>
				</div>
			</section>

			<section
				className={`bg-[#F4F8FB] my-0 mx-auto flex flex-col justify-center items-center w-[100%] py-[100px] px-[10px] relative overflow-hidden`}
			>
				<div className="flex flex-col items-center p-[10px] relative my-0 mx-auto w-[min(100%_-_20px,1250px)]">
					<h2 className="font-bold my-2 text-[35px] sm:text-[50px] leading-tight text-center text-brand-dark-blue">
						Ranking Board
					</h2>

					<div className="flex space-between w-full mt-10">
						<div className="w-[50%] flex justify-center">
							<div className="flex flex-col justify-center text-center p-[5em] bg-white shadow-lg shadow-gray-500/.5 gap-1 w-[500px]">
								<h3 className="text-[#6B27B0] text-[24px] font-semibold">
									Top Student
								</h3>
								<div className="my-4 w-full flex justify-center">
									<Image
										alt=""
										className="object-cover w-[100px] h-auto"
										src={"/assets/student.png"}
										width={600}
										height={600}
									/>
								</div>

								<h4 className="text-[#333] uppercase text-[22px]">
									Waqqam Usman
								</h4>
								<span className="text-[#bbb] text-[22px]">
									from
								</span>
								<h4 className="text-[#333] text-[22px]">
									Karachi Public School
								</h4>

								<span className="py-1 px-2 rounded-full text-[#333] text-[22px] bg-[#8640cd27] mt-4">
									<PointsBreakdown
										userName="Waqqam Usman"
										schoolName="Karachi Public School"
										userRank={"1st"}
										userClass={"5th Grade"}
										role={"student"}
										points={"500"}
										assignmentPoints={"100"}
										quizPoints={"150"}
										lecturePoints={"200"}
									/>
									{/* ⭐ <span>500+ Points</span> */}
								</span>
							</div>
						</div>
						<div className="w-[50%] flex justify-center">
							<div className="flex flex-col justify-center text-center p-[5em] bg-white shadow-lg shadow-gray-500/.5  gap-1 w-[500px]">
								<h3 className="text-[#6B27B0] text-[24px] font-semibold">
									Top Faculty
								</h3>
								<div className="my-4 w-full flex justify-center">
									<Image
										alt=""
										className="object-cover items-center w-[100px] h-auto"
										src={"/assets/teacher.png"}
										width={600}
										height={600}
									/>
								</div>

								<h4 className="text-[#333] uppercase text-[22px]">
									Mr. Mobin Idrees
								</h4>
								<span className="text-[#bbb] text-[22px]">
									from
								</span>
								<h4 className="text-[#333] text-[22px]">
									Headstart School
								</h4>

								<span className="py-1 px-2 rounded-full text-[#333] text-[22px] bg-[#8640cd27] mt-4">
									{/* ⭐ <span>500+ Points</span> */}
									<PointsBreakdown
										userName="Mr. Mobin Idrees"
										schoolName="Headstart School"
										userRank={"1st"}
										qualification={
											"BA in English Literature"
										}
										role={"teacher"}
										points={"500"}
										assignmentPoints={"100"}
										quizPoints={"150"}
										lecturePoints={"200"}
									/>
								</span>
							</div>
						</div>
					</div>

					<h3 className="font-normal mt-[150px] mb-[20px] text-[35px] sm:text-[50px] leading-tight text-center text-[#3F1954]">
						Top Students
					</h3>

					<div className="flex flex-col w-full">
						<table>
							<thead>
								<tr>
									<th className="text-center pb-4 px-2 text-[#bbb]">
										{""}
									</th>
									<th className="text-center pb-4 px-2 text-[#bbb]">
										{""}
									</th>
									<th className="text-center pb-4 px-2 text-[#bbb]">
										School
									</th>
									<th className="text-center pb-4 px-2 text-[#bbb]">
										Points
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className="bg-white shadow-lg shadow-gray-500/.5 mt-[20px]">
									<td>
										<div className="bg-white p-[20px]">
											2nd
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex items-center">
											<Image
												alt=""
												className="object-cover items-center w-[40px] h-auto mr-[10px]"
												src={"/assets/male.png"}
												width={600}
												height={600}
											/>
											Waqqam Usman
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											Karachi Public School
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											<span className="py-1 px-2 rounded-full text-[#333] bg-[#8640cd27]">
												{/* ⭐ 400+ Points */}
												<PointsBreakdown
													userName="Waqqam Usman"
													schoolName="Karachi Public School"
													userRank={"2nd"}
													userClass={"5th Grade"}
													role={"student"}
													points={"500"}
													assignmentPoints={"100"}
													quizPoints={"150"}
													lecturePoints={"200"}
												/>
											</span>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>

					<h3 className="font-normal mt-[150px] mb-[20px] text-[35px] sm:text-[50px] leading-tight text-center text-[#3F1954]">
						Top Faculty
					</h3>

					{/* <RankTableComponent topRankers={topRankTeachers} /> */}

					<div className="flex flex-col w-full">
						<table>
							<thead>
								<tr>
									<th className="text-center pb-4 px-2 text-[#bbb]">
										{""}
									</th>
									<th className="text-center pb-4 px-2 text-[#bbb]">
										{""}
									</th>
									<th className="text-center pb-4 px-2 text-[#bbb]">
										School
									</th>
									<th className="text-center pb-4 px-2 text-[#bbb]">
										Points
									</th>
								</tr>
							</thead>
							<tbody>
								<tr className="bg-white shadow-lg shadow-gray-500/.5 mt-[20px]">
									<td>
										<div className="bg-white p-[20px]">
											2nd
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex items-center">
											<Image
												alt=""
												className="object-cover items-center w-[40px] h-auto mr-[10px]"
												src={"/assets/female.png"}
												width={600}
												height={600}
											/>
											Waqqam Usman
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											Karachi Public School
										</div>
									</td>
									<td>
										<div className="bg-white p-[20px] flex justify-center">
											<span className="py-1 px-2 rounded-full text-[#333] bg-[#8640cd27]">
												{/* ⭐ 400+ Points */}
												<PointsBreakdown
													userName="Waqqam Usman"
													schoolName="Karachi Public School"
													userRank={"2nd"}
													qualification="BA in English Literature"
													role={"teacher"}
													points={"500"}
													assignmentPoints={"100"}
													quizPoints={"150"}
													lecturePoints={"200"}
												/>
											</span>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</section>
		</>
	);
}
