"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function DashboardLayout() {
	return (
		<section className="relative grid h-[100vh] grid-cols-5 bg-[#F4F8FB]">
			{/* left sidebar */}
			<div className="left-sidebar bg-[#242730] col-span-1 rounded-r-[3em] flex items-center flex-col pt-[2em] overflow-y-auto">
				<div className="avatar-box w-[65%]">
					<Image
						alt=""
						className="object-cover w-[60%] h-auto"
						src={"/assets/dashboard-avatar.png"}
						width={600}
						height={600}
					/>
				</div>

				<div className="quick-links-box w-[60%] flex flex-col mt-[2em]">
					<Link
						href="#"
						className="flex w-full text-center text-[1.1em] font-normal text-[#ccc] hover:text-[#ddd] mt-[1em]"
					>
						<Image
							alt=""
							className="object-contain w-[1.3em] h-auto mr-[0.8em]"
							src={"/assets/icons/user.png"}
							width={600}
							height={600}
						/>{" "}
						Profile
					</Link>

					<hr className="my-[50px] opacity-[.3] " />

					<Link
						href="#"
						className="flex w-full text-center text-[1.1em] font-normal text-[#ccc] hover:text-[#ddd] mt-[1em]"
					>
						<Image
							alt=""
							className="object-contain w-[1.3em] h-auto mr-[0.8em]"
							src={"/assets/icons/home.png"}
							width={600}
							height={600}
						/>{" "}
						Dashboard
					</Link>
					<Link
						href="#"
						className="flex w-full text-center text-[1.1em] font-normal text-[#ccc] hover:text-[#ddd] mt-[1em]"
					>
						<Image
							alt=""
							className="object-contain w-[1.3em] h-auto mr-[0.8em]"
							src={"/assets/icons/date.png"}
							width={600}
							height={600}
						/>{" "}
						Schedule
					</Link>
					<Link
						href="#"
						className="flex w-full text-center text-[1.1em] font-normal text-[#ccc] hover:text-[#ddd] mt-[1em]"
					>
						<Image
							alt=""
							className="object-contain w-[1.3em] h-auto mr-[0.8em]"
							src={"/assets/icons/date.png"}
							width={600}
							height={600}
						/>{" "}
						Announcement
					</Link>

					<hr className="my-[50px] opacity-[.3] " />

					<Link
						href="#"
						className="flex w-full text-center text-[1.1em] font-normal text-[#ccc] hover:text-[#ddd] mt-[1em]"
					>
						<Image
							alt=""
							className="object-contain w-[1.3em] h-auto mr-[0.8em]"
							src={"/assets/icons/set.png"}
							width={600}
							height={600}
						/>{" "}
						Settings
					</Link>
					<Link
						href="#"
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
					</Link>
				</div>
			</div>

			{/* main container */}
			<div className="main-containe col-span-3 overflow-y-auto px-[2em]">
				<div className="cta-header-main pt-[3em]">
					<div className="flex gap-[1em] w-full">
						<div className="flex flex-col justify-center items-center p-[2em] rounded-[2em] bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] ">
							<Image
								alt=""
								className="object-cover mx-auto w-[40%] h-auto"
								src={"/assets/star.png"}
								width={600}
								height={600}
							/>
							<div className="flex justify-between w-full items-center mt-[1em]">
								<h3 className="text-white font-semibold text-[1.5em]">
									Points Earned
								</h3>
								<p className="text-[#581D7D] font-semibold text-[1em]">
									⭐ 340
								</p>
							</div>
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
								<p className="text-[#581D7D] font-semibold text-[1em]">
									24th Nov, 2023
								</p>
							</div>
						</div>
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
									Grades
								</h3>
								<p className="text-[#581D7D] font-semibold text-[1em]">
									B+
								</p>
							</div>
						</div>
					</div>
				</div>

				<h3 className="font-semibold text-[#212121] align-middle text-[1.6em] mt-[2em] mb-[1em]">
					Subjects
				</h3>

				<div className="rounded-[2em] grid grid-cols-2 gap-[2em]">
					<div className="flex justify-start items-center w-full bg-white rounded-[1em] gap-[1.5em] px-[1em] py-[1em]">
						<div className="w-[80px]">
							<div className="bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] p-[.5em] w-[100%] rounded-[.5em] ">
								<Image
									alt=""
									className="object-contain w-[5em] inline"
									src={"/assets/folder.png"}
									width={600}
									height={600}
								/>
							</div>
						</div>
						<div className="w-[75%]">
							<h4 className="font-medium text-[#212121] align-middle text-[1.4em]">
								English
							</h4>
							<p className="text-[#959BA5] text-[1em] align-middle">
								17 min
							</p>
						</div>
					</div>

					<div className="flex justify-start items-center w-full bg-white rounded-[1em] gap-[1.5em] px-[1em] py-[1em]">
						<div className="w-[80px]">
							<div className="bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] p-[.5em] w-[100%] rounded-[.5em] ">
								<Image
									alt=""
									className="object-contain w-[5em] inline"
									src={"/assets/folder.png"}
									width={600}
									height={600}
								/>
							</div>
						</div>
						<div className="w-[75%]">
							<h4 className="font-medium text-[#212121] align-middle text-[1.4em]">
								Maths
							</h4>
							<p className="text-[#959BA5] text-[1em] align-middle">
								17 min
							</p>
						</div>
					</div>
					<div className="flex justify-start items-center w-full bg-white rounded-[1em] gap-[1.5em] px-[1em] py-[1em]">
						<div className="w-[80px]">
							<div className="bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] p-[.5em] w-[100%] rounded-[.5em] ">
								<Image
									alt=""
									className="object-contain w-[5em] inline"
									src={"/assets/folder.png"}
									width={600}
									height={600}
								/>
							</div>
						</div>
						<div className="w-[75%]">
							<h4 className="font-medium text-[#212121] align-middle text-[1.4em]">
								Computer
							</h4>
							<p className="text-[#959BA5] text-[1em] align-middle">
								17 min
							</p>
						</div>
					</div>
					<div className="flex justify-start items-center w-full bg-white rounded-[1em] gap-[1.5em] px-[1em] py-[1em]">
						<div className="w-[80px]">
							<div className="bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] p-[.5em] w-[100%] rounded-[.5em] ">
								<Image
									alt=""
									className="object-contain w-[5em] inline"
									src={"/assets/folder.png"}
									width={600}
									height={600}
								/>
							</div>
						</div>
						<div className="w-[75%]">
							<h4 className="font-medium text-[#212121] align-middle text-[1.4em]">
								Science
							</h4>
							<p className="text-[#959BA5] text-[1em] align-middle">
								17 min
							</p>
						</div>
					</div>
				</div>
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
							Annie Leonchart
						</h3>
						<p className="text-[#959BA5] text-[1em] align-middle">
							Student
						</p>
						<div className="flex justify-evenly items-center w-full mt-[1em]">
							<div className="flex flex-col items-center">
								<p className="text-[#959BA5] text-[1.2em] align-middle">
									Class
								</p>
								<p className="font-bold text-[#212121] align-middle text-[2em]">
									5
								</p>
							</div>
							<div className="flex flex-col items-center">
								<p className="text-[#959BA5] text-[1.2em] align-middle">
									Section
								</p>
								<p className="font-bold text-[#212121] align-middle text-[2em]">
									B
								</p>
							</div>
						</div>
					</div>
				</div>

				<h3 className="font-semibold text-[#212121] align-middle text-[1.6em] mt-[1em]">
					Quick Start
				</h3>

				<div className="bg-[#f7e3e367] rounded-[2em] p-[1em] mt-[1em] flex flex-col gap-[1em]">
					<div className="flex justify-center items-center w-full bg-white rounded-[1.5em] gap-[1.5em] px-[1em] py-[1em]">
						<div className="w-[25%]">
							<div className="bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] p-[.5em] w-[100%] rounded-[.5em] ">
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
							<h4 className="font-medium text-[#212121] align-middle text-[1.4em]">
								Quiz
							</h4>
							<p className="text-[#959BA5] text-[1em] align-middle">
								2 Quiz
							</p>
						</div>
					</div>

					<div className="flex justify-center items-center w-full bg-white rounded-[1.5em] gap-[1.5em] px-[1em] py-[1em]">
						<div className="w-[25%]">
							<div className="bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] p-[.5em] w-[100%] rounded-[.5em] ">
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
							<h4 className="font-medium text-[#212121] align-middle text-[1.4em]">
								Assignments
							</h4>
							<p className="text-[#959BA5] text-[1em] align-middle">
								2 Assignments
							</p>
						</div>
					</div>

					<div className="flex justify-center items-center w-full bg-white rounded-[1.5em] gap-[1.5em] px-[1em] py-[1em]">
						<div className="w-[25%]">
							<div className="bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] p-[.5em] w-[100%] rounded-[.5em] ">
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
							<h4 className="font-medium text-[#212121] align-middle text-[1.4em]">
								Lectures
							</h4>
							<p className="text-[#959BA5] text-[1em] align-middle">
								4 Lectures
							</p>
						</div>
					</div>

					<div className="flex justify-center items-center w-full bg-white rounded-[1.5em] gap-[1.5em] px-[1em] py-[1em]">
						<div className="w-[25%]">
							<div className="bg-gradient-to-b from-[#FB8397] to-[#B1CBF2] p-[.5em] w-[100%] rounded-[.5em] ">
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
							<h4 className="font-medium text-[#212121] align-middle text-[1.4em]">
								Competition
							</h4>
							<p className="text-[#959BA5] text-[1em] align-middle">
								2 Competition
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
