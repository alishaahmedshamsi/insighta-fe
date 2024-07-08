"use client";
import Image from "next/image";

import PointsBreakdown from "@/components/points-breakdown";
import HeaderComponent from "@/components/header.component";
import { useQuery } from "@tanstack/react-query";
import api from "@/services/middleware/middleware";
import defaultImage from "@/public/assets/male.png";
import { getRank } from "@/components/TopFive/TopFive";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function FrontPage() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["class-teachers"],
		queryFn: async () => {
			const { data } = await api.get(`/point/global`);
			return data.data;
		},
	});

	console.log("Global Points", data);

	let assignmentPoints, lecturePoints, quizPoints, reviewPoints;

	if (data?.topStudents[0]?.points) {
		({
			assignment: assignmentPoints,
			lecture: lecturePoints,
			quiz: quizPoints,
			review: reviewPoints,
		} = data.topStudents[0].points);
	}

	const otherStudents = data?.topStudents.slice(1);
	const otherTeachers = data?.topTeachers.slice(1);

	// console.log("other students: ", otherStudents);

	console.log("Points: ", assignmentPoints, lecturePoints, quizPoints);

	return (
		<>
			<HeaderComponent />

			<section className="my-0 mx-auto flex flex-col justify-center items-center w-[100%] h-[100vh] relative z-0 bg-[#000931] overflow-hidden">
				<span id="bg-circle-gradient-1"></span>
				<span id="bg-circle-gradient-2"></span>
				<div className="flex flex-col items-center p-[10px] relative my-0 mx-auto w-[min(100%_-_20px,1250px)]">
					<div className="text-wrapper sm:w-[650px] flex flex-col justify-center items-center">
						<h3 className="text-white relative font-bold sm:text-[20px] leading-[2em] text-center tracking-[0.3em] uppercase text-off_white">
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

			<section className="bg-[#F4F8FB] my-0 mx-auto flex flex-col justify-center items-center w-[100%] py-[100px] px-[10px] relative overflow-hidden">
				<div className="flex flex-col items-center p-[10px] relative my-0 mx-auto w-[min(100%_-_20px,1250px)]">
					<h2 className="font-bold my-2 text-[35px] sm:text-[50px] leading-tight text-center text-[#000931]">
						Ranking Board
					</h2>
					{isLoading ? (
						<div>Loading...</div>
					) : error ? (
						<div>Error loading data.</div>
					) : (
						<>
							<div className="flex space-between w-full mt-10">
								<div className="w-[50%] flex justify-center">
									{data && (
										<div className="flex flex-col justify-center text-center p-[5em] bg-white shadow-lg shadow-gray-500/.5 gap-1 w-[500px]">
											<h3 className="text-[#6B27B0] text-[24px] font-semibold">
												Top Student
											</h3>
											<div className="my-4 w-full flex justify-center">
												<Image
													alt=""
													className="object-cover w-[100px] h-auto"
													src={
														data.topStudents[0]
															.profilePicture
															? data
																	.topStudents[0]
																	.profilePicture
															: defaultImage
													}
													width={600}
													height={600}
												/>
											</div>

											<h4 className="text-[#333] uppercase text-[22px]">
												{data.topStudents[0].fullname}
											</h4>
											<span className="text-[#bbb] text-[22px]">
												from
											</span>
											<h4 className="text-[#333] text-[22px]">
												{data.topStudents[0].school}
											</h4>

											<div className="py-1 px-2 rounded-full text-[#333] text-[22px] bg-[#8640cd27] mt-4">
												<PointsBreakdown
													userName={
														data.topStudents[0]
															.fullname
													}
													schoolName={
														data.topStudents[0]
															.school
													}
													userRank={""}
													userClass={""}
													role={"student"}
													points={
														data.topStudents[0]
															.points.total
													}
													assignmentPoints={
														data.topStudents[0]
															.points.assignment
													}
													quizPoints={
														data.topStudents[0]
															.points.quiz
													}
													lecturePoints={
														data.topStudents[0]
															.points.lecture
													}
													reviewPoints={
														data.topStudents[0]
															.points.review
													}
												/>
											</div>
										</div>
									)}
								</div>
								<div className="w-[50%] flex justify-center">
									{data && (
										<div className="flex flex-col justify-center text-center p-[5em] bg-white shadow-lg shadow-gray-500/.5  gap-1 w-[500px]">
											<h3 className="text-[#6B27B0] text-[24px] font-semibold">
												Top Faculty
											</h3>
											<div className="my-4 w-full flex justify-center">
												<Image
													alt=""
													className="object-cover items-center w-[100px] h-auto"
													src={
														data.topTeachers[0]
															.profilePicture
															? data
																	.topTeachers[0]
																	.profilePicture
															: defaultImage
													}
													width={600}
													height={600}
												/>
											</div>

											<h4 className="text-[#333] uppercase text-[22px]">
												{data.topTeachers[0].fullname}
											</h4>
											<span className="text-[#bbb] text-[22px]">
												from
											</span>
											<h4 className="text-[#333] text-[22px]">
												{data.topTeachers[0].school}
											</h4>

											<span className="py-1 px-2 rounded-full text-[#333] text-[22px] bg-[#8640cd27] mt-4">
												{/* ⭐ <span>500+ Points</span> */}
												<PointsBreakdown
													userName={
														data.topTeachers[0]
															.fullname
													}
													schoolName={
														data.topTeachers[0]
															.school
													}
													userRank={""}
													qualification={""}
													role={"teacher"}
													points={
														data.topTeachers[0]
															.points.total
													}
													assignmentPoints={
														data.topTeachers[0]
															.points.assignment
													}
													quizPoints={
														data.topTeachers[0]
															.points.quiz
													}
													lecturePoints={
														data.topTeachers[0]
															.points.lecture
													}
													reviewPoints={
														data.topTeachers[0]
															.points.review
													}
												/>
											</span>
										</div>
									)}
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
										{otherStudents?.map(
											(student: any, index: number) => (
												<tr className="bg-white shadow-lg shadow-gray-500/.5 mt-[20px]">
													<td>
														<div className="bg-white p-[20px]">
															{getRank(index + 2)}
														</div>
													</td>
													<td>
														<div className="bg-white p-[20px] flex items-center">
															<Image
																alt=""
																className="object-cover items-center w-[40px] h-auto mr-[10px]"
																src={
																	"/assets/male.png"
																}
																width={600}
																height={600}
															/>
															{capitalizeFirstLetter(
																student.fullname
															)}
														</div>
													</td>
													<td>
														<div className="bg-white p-[20px] flex justify-center">
															{student.school}
														</div>
													</td>
													<td>
														<div className="bg-white p-[20px] flex justify-center">
															<span className="py-1 px-2 rounded-full text-[#333] bg-[#8640cd27]">
																{/* ⭐ 400+ Points */}
																<PointsBreakdown
																	userName={
																		student.fullname
																	}
																	schoolName={
																		student.school
																	}
																	userRank={
																		""
																	}
																	qualification={
																		""
																	}
																	role={
																		"student"
																	}
																	points={
																		student
																			.points
																			.total
																	}
																	assignmentPoints={
																		student
																			.points
																			.assignment
																	}
																	quizPoints={
																		student
																			.points
																			.quiz
																	}
																	lecturePoints={
																		student
																			.points
																			.lecture
																	}
																	reviewPoints={
																		student
																			.points
																			.review
																	}
																/>
															</span>
														</div>
													</td>
												</tr>
											)
										)}
									</tbody>
								</table>
							</div>

							<h3 className="font-normal mt-[150px] mb-[20px] text-[35px] sm:text-[50px] leading-tight text-center text-[#3F1954]">
								Top Faculty
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
										{otherTeachers?.map(
											(teacher: any, index: number) => (
												<tr className="bg-white shadow-lg shadow-gray-500/.5 mt-[20px]">
													<td>
														<div className="bg-white p-[20px]">
															{getRank(index + 2)}
														</div>
													</td>
													<td>
														<div className="bg-white p-[20px] flex items-center">
															<Image
																alt=""
																className="object-cover items-center w-[40px] h-auto mr-[10px]"
																src={
																	"/assets/male.png"
																}
																width={600}
																height={600}
															/>
															{capitalizeFirstLetter(
																teacher.fullname
															)}
														</div>
													</td>
													<td>
														<div className="bg-white p-[20px] flex justify-center">
															{teacher.school}
														</div>
													</td>
													<td>
														<div className="bg-white p-[20px] flex justify-center">
															<span className="py-1 px-2 rounded-full text-[#333] bg-[#8640cd27]">
																{/* ⭐ 400+ Points */}
																<PointsBreakdown
																	userName={
																		teacher.fullname
																	}
																	schoolName={
																		teacher.school
																	}
																	userRank={
																		""
																	}
																	qualification={
																		""
																	}
																	role={
																		"teacher"
																	}
																	points={
																		teacher
																			.points
																			.total
																	}
																	assignmentPoints={
																		teacher
																			.points
																			.assignment
																	}
																	quizPoints={
																		teacher
																			.points
																			.quiz
																	}
																	lecturePoints={
																		teacher
																			.points
																			.lecture
																	}
																	reviewPoints={
																		teacher
																			.points
																			.review
																	}
																/>
															</span>
														</div>
													</td>
												</tr>
											)
										)}{" "}
									</tbody>
								</table>
							</div>
						</>
					)}
				</div>
			</section>
		</>
	);
}
