"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";

const subjectList = [
	{
		name: "English",
		duration: "17 min",
	},
	{
		name: "Maths",
		duration: "17 min",
	},
	{
		name: "Computer",
		duration: "17 min",
	},
	{
		name: "Science",
		duration: "17 min",
	},
];

const userDetails = {
	userName: "Annie Leonchart",
	role: "Student",
	class: "5",
	section: "B",
};

const quickStartList = [
	{
		heading: "Quiz",
		count: "2 Quiz",
		link: "/student-quiz",
	},
	{
		heading: "Assignments",
		count: "2 Assignments",
		link: "/student-assignments",
	},
	{
		heading: "Lectures",
		count: "2 Lectures",
		link: "/student-lectures",
	},
	{
		heading: "Competition",
		count: "2 Competition",
		link: "/student-competitions",
	},
];

const leftSidebarLinks = (
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
);

export default function StudentAssignments() {
	const pointsEarned = 400;
	const mainSectionHeading = "Assignments";
	return (
		<>
			<DashboardLayout
				// mainSectionHeading={"Assignments"}
				subjectList={subjectList}
				userDetails={userDetails}
				quickStartList={quickStartList}
				// pointsEarned={"400"}
				leftSidebarLinks={leftSidebarLinks}
			>
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
								<p className="text-[#581D7D] font-semibold text-[1.2em]">
									⭐ {pointsEarned}
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
								<p className="text-[#581D7D] font-semibold text-[1.2em]">
									{new Date().getDate()}/
									{new Date().getMonth() + 1}/
									{new Date().getFullYear()}
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
								<p className="text-[#581D7D] font-semibold text-[1.2em]">
									B+
								</p>
							</div>
						</div>
					</div>
				</div>

				<h3 className="font-semibold text-[#212121] align-middle text-[1.6em] mt-[2em] mb-[1em]">
					{mainSectionHeading}
				</h3>

				<div className="rounded-[2em] flex flex-col gap-[2em]">
					<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
						English
					</h3>
					<div className="subject-assignments-container flex flex-col">
						<div className="assignment flex flex-col rounded-[2em] border border-[#DBDBDB] bg-white p-[2em]">
							<div className="assginment-details grid grid-cols-4 gap-5">
								<div>
									<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
										Title
									</h5>
									<h4 className="text-[#111] capitalize text-[1.2em]">
										Assignment #1
									</h4>
								</div>
								<div>
									<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
										Deadline
									</h5>
									<h4 className="text-[#111] capitalize text-[1.2em]">
										5 May 2024
									</h4>
								</div>
								<div>
									<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
										Total Marks
									</h5>
									<h4 className="text-[#111] capitalize text-[1.2em]">
										10
									</h4>
								</div>
								<div>
									<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
										Obt. Marks
									</h5>
									<h4 className="text-[#111] capitalize text-[1.2em]">
										8
									</h4>
								</div>
								<div>
									<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
										Status
									</h5>
									<h4 className="text-[#111] capitalize text-[1.2em]">
										Not completed
									</h4>{" "}
									{/* Completed/Checked/Not Completed */}
								</div>
								<div>
									<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
										Assignment
									</h5>
									<h4 className="text-[#111] underline capitalize text-[1.2em]">
										<Link href="#">Download File</Link>
									</h4>
								</div>
							</div>
							<hr className="my-[1em]" />
							<div className="upload-file-container">
								<div>
									<h5 className="text-[#777] font-medium uppercase text-[.9em] tracking-wider">
										Submit Assignment
									</h5>
									<h4 className="text-[#111] capitalize text-[1.2em] mb-[1em]">
										Upload File
									</h4>
									<div className="grid grid-cols-4">
										<input
											type="file"
											name="file"
											id="file"
											className="col-span-3 w-full border-2 border-[#777] border-dashed rounded-[2em] p-[.9em]"
										/>
										<button className="col-span-1 w-full rounded-[2em] bg-brand-sea-green py-3 text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor">
											Upload
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <div className="rounded-[2em] grid grid-cols-2 gap-[2em]">
					{subjectList.map((subject) => {
						return (
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
										{subject.name}
									</h4>
									<p className="text-[#959BA5] text-[1em] align-middle">
										{subject.duration}
									</p>
								</div>
							</div>
						);
					})}
				</div> */}
			</DashboardLayout>
		</>
	);
}
