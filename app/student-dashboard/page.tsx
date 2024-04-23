"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";

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
	},
	{
		heading: "Assignments",
		count: "2 Assignments",
	},
	{
		heading: "Lectures",
		count: "2 Lectures",
	},
	{
		heading: "Competition",
		count: "2 Competition",
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

export default function StudentDashboard() {
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Subjects"}
				subjectList={subjectList}
				userDetails={userDetails}
				quickStartList={quickStartList}
				pointsEarned={"400"}
				leftSidebarLinks={leftSidebarLinks}
				/>
			{/* ></DashboardLayout> */}
		</>
	);
}
