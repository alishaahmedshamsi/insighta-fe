"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";

const subjectList = [
	{
		name: "Class 5A",
		duration: "17 min",
	},
	{
		name: "Class 5B",
		duration: "17 min",
	},
	{
		name: "Class 6B",
		duration: "17 min",
	},
	{
		name: "Class 7A",
		duration: "17 min",
	},
	{
		name: "Class 8B",
		duration: "17 min",
	},
];

const userDetails = {
	userName: "Annie Leonchart",
	role: "Teacher",
	qualification: "BA in English",
};

const quickStartList = [
	{
		heading: "Add Quiz",
		count: "2 Quiz",
		link: "add-teacher-quiz",
	},
	{
		heading: "Add an Assignment",
		count: "2 Assignments",
		link: "add-teacher-assignments",
	},
	{
		heading: "Add Lectures",
		count: "2 Lectures",
		link: "add-teacher-lectures",
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
				mainSectionHeading={"Classes and Sections"}
				subjectList={subjectList}
				userDetails={userDetails}
				quickStartList={quickStartList}
				pointsEarned={"350"}
				leftSidebarLinks={leftSidebarLinks}
			/>

			{/* </DashboardLayout> */}
		</>
	);
}
