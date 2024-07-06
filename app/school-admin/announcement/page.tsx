"use client";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
	createAnnouncement,
	fetchAnnouncements,
} from "@/services/apis/announcment.api";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/user.hook";
import { formatDate } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";

export default function Component() {
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"All announcements"}
				quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
				leftSidebarLinks={schoolAdminLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] w-full p-[2em] bg-gray-50">
					<CreateAnnouncment />
					<Announcements />
				</div>
			</DashboardLayout>
		</>
	);
}

function CreateAnnouncment() {
	const [announcementText, setAnnouncementText] = useState("");
	const [isPending, setIsPending] = useState(false);
	const queryClient = useQueryClient();
	const handleSubmit = async () => {
		setIsPending(true);
		if (!announcementText) {
			toast.error("Please write something to post");
			setIsPending(false);
			return;
		}
		const { success, response } = await createAnnouncement({
			content: announcementText,
		});
		if (!success) return toast.error(response);
		toast.success("Announcement created successfully");
		setIsPending(false);
		setAnnouncementText("");
		queryClient.invalidateQueries({ queryKey: ["fetchAnnouncements"] });
	};

	return (
		<div className="grid grid-cols-4 rounded-[1em] gap-[1.5em]">
			<Input
				placeholder="Write your announcement here..."
				id="announcement"
				className="col-span-3 w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]"
				value={announcementText}
				onChange={(e) => setAnnouncementText(e.target.value)}
			/>
			{/* <Button >Post</Button> */}
			<Button
				className="rounded-[1em] bg-brand-sea-green py-[.9em] px-[1.5em] h-full text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
				type="submit"
				onClick={handleSubmit}
			>
				{isPending ? (
					<>
						<div className="flex justify-center items-center">
							<Loader2Icon className="mr-2 animate-spin" />
							<span>Posting...</span>
						</div>
					</>
				) : (
					"Post"
				)}
			</Button>
		</div>
	);
}

function Announcements() {
	const { user } = useCurrentUser();
	const { isLoading, data, error } = useQuery({
		queryKey: ["fetchAnnouncements"],
		queryFn: () => fetchAnnouncements(user?._id),
	});
	if (error) console.log(error);
	if (isLoading) return <div>Loading...</div>;
	console.log("announcements data admin: ", data.length);
	if (data.length == 0) return <div>No announcements found</div>;

	return (
		<div className="flex flex-col w-full rounded-[1em] gap-[1.5em] p-[2em] bg-white shadow-lg">
			<h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
				Previous Announcements
			</h3>
			<div className="flex flex-col gap-[2em] w-full">
				{data?.map((announcement: any, index: number) => (
					<div
						className="flex flex-col w-full bg-gray-100 p-[1em] rounded-[1em] shadow-sm"
						key={index}
					>
						<p className="text-[#555] text-[14px] font-semibold">
							{formatDate(announcement.createdAt)}{" "}
						</p>
						<p className="text-[#111] text-[18px] font-normal">
							{announcement.content}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}
