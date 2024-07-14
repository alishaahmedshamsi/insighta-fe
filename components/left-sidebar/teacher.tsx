import Image from "next/image";
import Link from "next/link";

export const teacherLeftSidebarLinks = () => {
	return (
		<>
		
			<Link
				href="/profile"
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
				href="/teacher-dashboard"
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
				href="/teacher-dashboard/announcement"
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

			<Link
				href="/teacher-dashboard/points-log"
				className="flex w-full text-center text-[1.1em] font-normal text-[#ccc] hover:text-[#ddd] mt-[1em]"
			>
				<Image
					alt=""
					className="object-contain w-[1.3em] h-auto mr-[0.8em]"
					src={"/assets/icons/date.png"}
					width={600}
					height={600}
				/>{" "}
				Points Log
			</Link>

			<hr className="my-[50px] opacity-[.3] " />
			</>
	);
};
