"use client";
import Image from "next/image";
import Link from "next/link";

// const leftSidebarLinks = [
// 	{
// 		imgSource: "/assets/icons/user.png",
// 		linkText: "Profile",
// 	},
// 	{
// 		imgSource: "/assets/icons/user.png",
// 		linkText: "Dashboard",
// 	},
// 	{
// 		imgSource: "/assets/icons/user.png",
// 		linkText: "Schedule",
// 	},
// 	{
// 		imgSource: "/assets/icons/user.png",
// 		linkText: "Announcement",
// 	},
// 	{
// 		imgSource: "/assets/icons/user.png",
// 		linkText: "Setting",
// 	},
// 	{
// 		imgSource: "/assets/icons/user.png",
// 		linkText: "Log Out",
// 	},
// ];

const studentPoints = 400;
const teacherPoints = 350;

export default function DashboardLayout({
	mainSectionHeading,
	// subjectList,
	userDetails,
	quickStartList,
	children,
	// pointsEarned,
	leftSidebarLinks,
}: {
	mainSectionHeading: String;
	// subjectList: Array<{
	// 	name: String;
	// 	duration: String;subjectList
	// }>;
	userDetails: {
		userName: String;
		role: String;
		class?: String;
		section?: String;
		qualification?: String;
		schoolName?: String;
	};
	quickStartList: Array<{
		heading: String;
		count: String;
		link: String;
	}>;
	children: React.ReactNode;
	// pointsEarned: String;
	leftSidebarLinks: React.ReactNode;
}) {
	return (
		<section className="relative grid h-[100vh] grid-cols-5 bg-[#F4F8FB]">
			{/* left sidebar */}
			<div className="left-sidebar bg-[#242730] col-span-1 rounded-r-[3em] flex items-center flex-col pt-[2em] overflow-y-auto mr-[1em]">
				<div className="avatar-box w-[65%]">
					<Image
						alt=""
						className="object-cover w-[60%] h-auto"
						src={"/assets/dashboard-avatar.png"}
						width={600}
						height={600}
					/>
				</div>
				{leftSidebarLinks}
			</div>

			{/* main container */}
			<div
				// className={`main-container col-span-3 overflow-y-auto px-[2em] ${
				// 	isLoading ? "opacity-50" : "opacity-100"
				// }`}
				className={`main-container col-span-3 overflow-y-auto px-[2em]`}
			>
				<div className="cta-header-main pt-[3em]">
					{userDetails.role === "Student" ||
					userDetails.role === "Teacher" ? (
						<div className="flex gap-[1em] w-full">
							<div className="flex flex-col justify-between items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] ">
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
										⭐{" "}
										{userDetails.role === "Student"
											? studentPoints
											: teacherPoints}
									</p>
								</div>
							</div>
							<div className="flex flex-col justify-between items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] ">
								<Image
									alt=""
									className="object-cover mx-auto w-[40%] h-auto"
									src={"/assets/calendar.png"}
									width={600}
									height={600}
								/>
								<div className="flex justify-between w-full items-center mt-[1em]">
									<h3 className="text-white font-semibold text-[1.5em]">
										Calendar
									</h3>
									<p className="text-[#581D7D] font-semibold text-[1.2em]">
										{new Date().getDate()}/
										{new Date().getMonth() + 1}/
										{new Date().getFullYear()}
									</p>
								</div>
							</div>
							{userDetails.role === "Student" ? (
								<Link href="#">
									<div className="flex flex-col justify-between items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] ">
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
									<div className="flex flex-col justify-center items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] ">
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
					) : (
						// School Admin
						<div className="flex gap-[1em] w-full">
							<div className="flex flex-col justify-center items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] ">
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

							<div className="flex flex-col justify-center items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] ">
								<Image
									alt=""
									className="object-cover mx-auto w-[40%] h-auto"
									src={"/assets/calendar.png"}
									width={600}
									height={600}
								/>
								<div className="flex justify-between w-full items-center mt-[1em]">
									<h3 className="text-white font-semibold text-[1.5em]">
										Calendar
									</h3>
									<p className="text-[#581D7D] font-semibold text-[1.2em]">
										{new Date().getDate()}/
										{new Date().getMonth() + 1}/
										{new Date().getFullYear()}
									</p>
								</div>
							</div>

							<Link href="/school-admin/manage-points">
								<div className="flex flex-col justify-center items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] ">
									<Image
										alt=""
										className="object-cover mx-auto w-[40%] h-auto"
										src={"/assets/scoreboard.png"}
										width={600}
										height={600}
									/>
									<div className="flex justify-between w-full items-center mt-[1em]">
										<h3 className="text-white font-semibold text-[1.5em]">
											Manage Points
										</h3>
										{/* <p className="text-[#581D7D] font-semibold text-[1.2em]">
										B+
									</p> */}
									</div>
								</div>
							</Link>
						</div>
					)}
				</div>

				{/* add greyish screen until the children loads  */}
				{/* <Suspense fallback={<SkeletonLoader />}> */}

				{/* <div className={`${isLoading ? "opacity-50" : "opacity-100"}`}>
					<h3 className="font-semibold text-[#212121] capitalize align-middle text-[1.6em] mt-[2em] mb-[1em]">
						{mainSectionHeading}
					</h3>
					{children}
				</div> */}

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
							className="object-cover mx-auto w-[40%] h-auto -mb-[2em] mt-[1em]"
							src={"/assets/dashboard-avatar.png"}
							width={600}
							height={600}
						/>
					</div>

					<div className="bg-white rounded-[2em] p-[2em] flex flex-col items-center pt-[3em]">
						<h3 className="font-medium text-[#212121] align-middle text-[1.6em]">
							{userDetails.userName}
						</h3>
						<p className="text-[#959BA5] text-[1em] align-middle">
							{userDetails.role}
						</p>
						{userDetails.role === "Student" ? (
							<div className="flex justify-evenly items-center w-full mt-[1em]">
								<div className="flex flex-col items-center">
									<p className="text-[#959BA5] text-[1.2em] align-middle">
										Class
									</p>
									<p className="font-bold text-[#212121] align-middle text-[2em]">
										{userDetails.class}
									</p>
								</div>
								<div className="flex flex-col items-center">
									<p className="text-[#959BA5] text-[1.2em] align-middle">
										Section
									</p>
									<p className="font-bold text-[#212121] align-middle text-[2em]">
										{userDetails.section}
									</p>
								</div>
							</div>
						) : (
							<div className="flex justify-evenly items-center w-full mt-[1em]">
								<h3 className="font-medium text-[#212121] align-middle text-[1.3em]">
									{userDetails.qualification}
								</h3>
							</div>
						)}
						{userDetails.role === "Admin" && (
							<div className="flex justify-evenly items-center w-full mt-[1em]">
								<h3 className="font-medium text-[#212121] align-middle text-[1.3em]">
									{userDetails.schoolName}
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
							<Link href={list.link.toString()}>
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
										<p className="text-[#959BA5] text-[1em] align-middle">
											{list.count}
										</p>
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
