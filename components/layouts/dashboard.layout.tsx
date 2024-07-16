"use client";
import { fetchCurrentUser, logout } from "@/services/apis";
import { IPoints, IUser } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { capitalizeFirstLetter } from "@/lib/utils";
import defaultUserPicture from "@/public/assets/default.jpg";
import PBreakdown from "@/components/p-breakdown";
import { useState } from "react";
import CalenderDialog from "../CalenderDialog/CalenderDialog";
import { fetchPoints } from "@/services/apis/user.api";
import { ApiResponse, ISchoolInfo } from "@/types/type";
import { fetchSchoolsInfo } from "@/services/apis/school.api";
import { useSchoolInfo } from "@/hooks/school.hook";
import { Router } from "next/router";

export default function DashboardLayout({
	mainSectionHeading,
	quickStartList,
	children,
	leftSidebarLinks,
}: {
	mainSectionHeading: String;
	quickStartList: Array<{
		heading: String;
		link: String;
	}>;
	children: React.ReactNode;
	leftSidebarLinks: React.ReactNode;
}) {
	const [pointsOpen, setPointsOpen] = useState(false);
	const [calenderOpen, setCalenderOpen] = useState(false);

	const {
		data: user,
		isLoading,
		isError,
	} = useQuery<IUser, Error>({
		queryKey: ["current-user"],
		queryFn: fetchCurrentUser,
	});

	const {
		data: points,
		isLoading: isLoadingPoints,
		isError: isPointsError,
	} = useQuery<IPoints | undefined>({
		queryKey: ["user-points"],
		queryFn: fetchPoints,
	});

	console.log("points: ", points)

	const { schoolData } = useSchoolInfo();

	if (isLoading && isLoadingPoints) {
		return <div>Loading...</div>;
	}

	if (isError) {
		return <div>isError</div>;
	}
	if (!user) {
		return <div>!user</div>;
	}

	const handleLogout = async () => {
		await logout();
		window.location.href = "/login";
	};

	// console.log("🚀 Points Data:", points);

	// const {
	// 	data: schoolData,
	// }: {
	// 	data: ApiResponse<ISchoolInfo> | undefined;
	// } = useQuery({
	// 	queryKey: ["fetch-classes"],
	// 	queryFn: () => fetchSchoolsInfo(),
	// });

	const topBoxes = () => {
		if (user.role === "student" || user.role === "teacher") {
			return (
				<>
					<div className="grid grid-cols-3 gap-[1em] w-full">
						{points && (
							<PBreakdown
								userName={user.fullname}
								// schoolName={user.school}
								// userRank={""}
								userClass={user.classes}
								// role={"student"}
								points={points.total}
								assignmentPoints={points.assignment}
								quizPoints={points.quiz}
								lecturePoints={points.lecture}
								reviewPoints={points.review}
								open={pointsOpen}
								setOpen={setPointsOpen}
							>
								<div
									onClick={() => setPointsOpen(!pointsOpen)}
									className="h-full flex flex-col justify-between items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] "
								>
									<Image
										alt=""
										className="object-cover mx-auto w-[40%] h-auto"
										src={"/assets/credit-card.png"}
										width={600}
										height={600}
									/>
									<div className="flex justify-between w-full items-center mt-[1em]">
										<h3 className="text-white font-semibold text-[1.5em]">
											Points Earned
										</h3>
										<p className="text-[#581D7D] font-semibold text-[1.2em]">
											⭐ {points.total}
										</p>
									</div>
								</div>
							</PBreakdown>
						)}
						<div className="h-full flex flex-col justify-between items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] ">
							<Image
								alt=""
								className="object-cover mx-auto w-[40%] h-auto"
								src={"/assets/calendar.png"}
								width={600}
								height={600}
							/>
							<CalenderDialog
								open={calenderOpen}
								setOpen={setCalenderOpen}
							>
								<div
									onClick={() =>
										setCalenderOpen(!calenderOpen)
									}
									className="flex justify-between w-full items-center mt-[1em]"
								>
									<h3 className="text-white font-semibold text-[1.5em]">
										Calendar
									</h3>
									<p className="text-[#581D7D] font-semibold text-[1.2em]">
										{new Date().getDate()}/
										{new Date().getMonth() + 1}/
										{new Date().getFullYear()}
									</p>
								</div>
							</CalenderDialog>
						</div>
						{user.role === "student" ? (
							<Link href="/student-dashboard/grades">
								<div className="h-full flex flex-col justify-between items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] ">
									<Image
										alt=""
										className="object-cover mx-auto w-[40%] h-auto"
										src={"/assets/scoreboard.png"}
										width={600}
										height={600}
									/>
									<div className="flex justify-between w-full items-center mt-[1em]">
										<h3 className="text-white font-semibold text-[1.5em]">
											Grades
										</h3>
										{/* <p className="text-[#581D7D] font-semibold text-[1.2em]">
										B+
									</p> */}
									</div>
								</div>
							</Link>
						) : (
							<Link href="/teacher-dashboard/add-grades">
								<div className="h-full flex flex-col justify-center items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] ">
									<Image
										alt=""
										className="object-cover mx-auto w-[40%] h-auto"
										src={"/assets/scoreboard.png"}
										width={600}
										height={600}
									/>
									<div className="flex justify-between w-full items-center mt-[1em]">
										<h3 className="text-white font-semibold text-[1.5em]">
											Add Grades
										</h3>
										{/* <p className="text-[#581D7D] font-semibold text-[1.2em]">
										B+
									</p> */}
									</div>
								</div>
							</Link>
						)}
					</div>
				</>
			);
		} else if (user.role === "school") {
			return (
				<>
					<div className="grid grid-cols-3  gap-[1em] w-full">
						<div className="h-full flex flex-col justify-center items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] ">
							<Link href={"/school-admin/top-five"}>
								<Image
									alt=""
									className="object-cover mx-auto w-[40%] h-auto"
									src={"/assets/star.png"}
									width={600}
									height={600}
								/>
								<div className="flex justify-between w-full items-center mt-[1em]">
									<h3 className="text-white font-semibold text-[1.5em]">
										Top 5
									</h3>
								</div>
							</Link>
						</div>

						<div className="h-full flex flex-col justify-center items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] ">
							<Image
								alt=""
								className="object-cover mx-auto w-[40%] h-auto"
								src={"/assets/calendar.png"}
								width={600}
								height={600}
							/>
							<CalenderDialog
								open={calenderOpen}
								setOpen={setCalenderOpen}
							>
								<div
									onClick={() =>
										setCalenderOpen(!calenderOpen)
									}
									className="flex justify-between w-full items-center mt-[1em]"
								>
									<h3 className="text-white font-semibold text-[1.5em]">
										Calendar
									</h3>
									<p className="text-[#581D7D] font-semibold text-[1.2em]">
										{new Date().getDate()}/
										{new Date().getMonth() + 1}/
										{new Date().getFullYear()}
									</p>
								</div>
							</CalenderDialog>
						</div>

						<Link href="/school-admin/manage-access">
							<div className="h-full flex flex-col justify-center items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] ">
								<Image
									alt=""
									className="object-cover mx-auto w-[40%] h-auto"
									src={"/assets/scoreboard.png"}
									width={600}
									height={600}
								/>
								<div className="flex justify-between w-full items-center mt-[1em]">
									<h3 className="text-white font-semibold text-[1.5em]">
										Manage Access
									</h3>
									{/* <p className="text-[#581D7D] font-semibold text-[1.2em]">
										B+
									</p> */}
								</div>
							</div>
						</Link>
					</div>
				</>
			);
		} else {
			return (
				<>
					<div className="grid grid-cols-3 gap-[1em] w-full">
						<div className="h-full flex flex-col justify-center items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] ">
							<Link href={"/sup-admin/create-school"}>
								<Image
									alt=""
									className="object-cover mx-auto w-[70%] h-auto"
									src={"/assets/degree-cap.png"}
									width={600}
									height={600}
								/>
								<div className="flex justify-start w-full mt-[1em]">
									<h3 className="text-white w-full text-left font-semibold text-[1.5em]">
										Create School
									</h3>
								</div>
							</Link>
						</div>

						<div className="h-full flex flex-col justify-center items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] ">
							<Image
								alt=""
								className="object-cover mx-auto w-[40%] h-auto"
								src={"/assets/calendar.png"}
								width={600}
								height={600}
							/>
							<CalenderDialog
								open={calenderOpen}
								setOpen={setCalenderOpen}
							>
								<div
									onClick={() =>
										setCalenderOpen(!calenderOpen)
									}
									className="flex justify-between w-full items-center mt-[1em]"
								>
									<h3 className="text-white font-semibold text-[1.5em]">
										Calendar
									</h3>
									<p className="text-[#581D7D] font-semibold text-[1.2em]">
										{new Date().getDate()}/
										{new Date().getMonth() + 1}/
										{new Date().getFullYear()}
									</p>
								</div>
							</CalenderDialog>
						</div>

						<div className="h-full flex flex-col justify-center items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] ">
							<Image
								alt=""
								className="object-cover mx-auto w-[40%] h-auto"
								src={"/assets/scoreboard.png"}
								width={600}
								height={600}
							/>
							<div className="flex justify-between w-full items-center mt-[1em]">
								<h3 className="text-white font-semibold text-[1.5em]">
									Total Schools
								</h3>
								<p className="text-[#581D7D] font-semibold text-[1.2em]">
									{schoolData?.data.length}
								</p>
							</div>
						</div>
					</div>
				</>
			);
		}
	};

	return (
		<section className="relative grid h-[100vh] grid-cols-5 bg-[#F4F8FB]">
			{/* left sidebar */}
			<div className="left-sidebar bg-[#242730] col-span-1 rounded-r-[3em] flex items-center flex-col pt-[2em] overflow-y-auto mr-[1em]">
				<div className="avatar-box w-[65%]">
					<Image
						alt=""
						className="object-cover w-[10em] h-[10em] rounded-full"
						src={user.profilePicture || defaultUserPicture}
						width={600}
						height={600}
					/>
				</div>
				<div className="quick-links-box w-[60%] flex flex-col mt-[2em]">
					{leftSidebarLinks}
					<button
						onClick={handleLogout}
						className="flex w-full text-center text-[1.1em] font-normal text-[#ccc] hover:text-[#ddd] mt-[1em]"
					>
						<Image
							alt=""
							className="object-contain w-[1.3em] h-auto mr-[0.8em]"
							src={"/assets/icons/log out.png"}
							width={600}
							height={600}
						/>{" "}
						Log Out
					</button>
				</div>
			</div>

			{/* main container */}
			<div
				className={`main-container col-span-3 overflow-y-auto px-[2em] pb-[2em]`}
			>
				<div className="cta-header-main pt-[3em]">{topBoxes()}</div>

				<h3 className="font-semibold text-[#212121] capitalize align-middle text-[1.6em] mt-[2em] mb-[1em]">
					{mainSectionHeading}
				</h3>
				{children}
			</div>

			{/* right sidebar */}
			<div className="right-sidebar col-span-1 p-[1em] overflow-y-auto">
				<div className="user-detail-box">
					<div className="avatar-box w-[100%]">
						<Image
							alt=""
							className="object-cover mx-auto w-[10em] h-[10em] -mb-[2em] mt-[1em] rounded-full"
							src={user.profilePicture || defaultUserPicture}
							width={600}
							height={600}
						/>
					</div>

					<div className="bg-white rounded-[2em] p-[2em] flex flex-col items-center pt-[3em]">
						<h3 className="font-medium text-[#212121] align-middle text-lg">
							{capitalizeFirstLetter(user.fullname)}
							{/* abc */}
						</h3>
						<p className="text-[#959BA5] text-[1em] align-middle">
							{capitalizeFirstLetter(user.role)}
							{/* abc */}
						</p>
						{user.role === "student" ? (
							<div className="flex justify-evenly items-center w-full mt-[1em]">
							<div className="flex flex-col items-center">
								<p className="text-[#959BA5] text-[1.2em] align-middle">
									Class
								</p>
								<p className="font-bold text-[#212121] align-middle text-[2em]">
									{user.classes.map((cls: { className: any }) => {
										const classPart = cls.className.slice(0, -1);
										return classPart;
									})}
								</p>
							</div>
							<div className="flex flex-col items-center">
								<p className="text-[#959BA5] text-[1.2em] align-middle">
									Section
								</p>
								<p className="font-bold text-[#212121] align-middle text-[2em]">
									{user.classes.map((cls: { className: any }) => {
										const sectionPart = cls.className.slice(-1);
										return isNaN(Number(sectionPart)) ? sectionPart : '-';
									})}
								</p>
							</div>
						</div>
							// <div className="flex justify-evenly items-center w-full mt-[1em]">
							// 	<div className="flex flex-col items-center">
							// 		<p className="text-[#959BA5] text-[1.2em] align-middle">
							// 			Class
							// 		</p>
							// 		<p className="font-bold text-[#212121] align-middle text-[2em]">
							// 			{user.classes.map(
							// 				(cls: { className: any }) =>
							// 					cls.className[0]
							// 			)}
							// 		</p>
							// 	</div>
							// 	<div className="flex flex-col items-center">
							// 		<p className="text-[#959BA5] text-[1.2em] align-middle">
							// 			Section
							// 		</p>
							// 		<p className="font-bold text-[#212121] align-middle text-[2em]">
							// 			{/* {user.section[0].toUpperCase()} */}
							// 			{user.classes.map(
							// 				(cls: { className: any }) =>
							// 					cls.className[1]
							// 						? cls.className[1]
							// 						: "-"
							// 			)}
							// 		</p>
							// 	</div>
							// </div>
						) : (
							<div className="flex justify-evenly items-center w-full mt-[1em]">
								<h3 className="font-medium text-[#212121] align-middle text-[1.3em]">
									{user.qualification}
								</h3>
							</div>
						)}
						{user.role === "school" && (
							<div className="flex justify-evenly items-center w-full mt-[1em]">
								<h3 className="font-medium text-[#212121] align-middle text-[1.3em]">
									{user.school}
								</h3>
							</div>
						)}
					</div>
				</div>

				<h3 className="font-semibold text-[#212121] align-middle text-[1.6em] mt-[1em]">
					Quick Start
				</h3>

				<div className="bg-[#f7e3e367] rounded-[2em] p-[1em] mt-[1em] flex flex-col gap-[1em]">
					{quickStartList.map((list) => {
						return (
							<Link
								href={list.link.toString()}
								key={list.heading.toString()}
							>
								<div className="flex justify-center items-center w-full bg-white rounded-[1.5em] gap-[1em] px-[1em] py-[1em]">
									<div className="w-[25%]">
										<div className="bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] p-[.3em] w-[100%] rounded-[.5em] ">
											<Image
												alt=""
												className="object-contain w-[5em] inline"
												src={"/assets/degree-cap.png"}
												width={600}
												height={600}
											/>
										</div>
									</div>
									<div className="w-[75%]">
										<h4 className="font-medium text-[#212121] align-middle text-[1.2em] leading-6">
											{list.heading}
										</h4>
									</div>
								</div>
							</Link>
						);
					})}
				</div>
			</div>
		</section>
	);
}
