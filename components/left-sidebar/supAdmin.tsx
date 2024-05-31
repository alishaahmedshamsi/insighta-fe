import Image from "next/image";
import Link from "next/link";

export const superAdminLeftSidebarLinks = () => {
	return (
		<div className="quick-links-box w-[60%] flex flex-col mt-[2em]">
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
				href="/sup-admin"
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
			

			<hr className="my-[50px] opacity-[.3] " />
			
		</div>
	);
};
