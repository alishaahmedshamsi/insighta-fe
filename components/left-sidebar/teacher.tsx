import Image from "next/image";
import Link from "next/link";

export const teacherLeftSidebarLinks = () => {
	return (
		<div className="quick-links-box w-[60%] flex flex-col mt-[2em]">
			<Link
				href="/teacher-dashboard"
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
};
