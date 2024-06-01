"use client";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const previousAnnouncements = [
    {
        date: "2022-10-10",
        announcement: "This is the first announcement",
    },
];

export default function Component() {
    const router = useRouter();
    const [announcementText, setAnnouncementText] = useState("");

    const handlePost = () => {
        if (announcementText.trim() === "") {
            alert("Announcement cannot be empty.");
            return;
        }
        // Logic to post the announcement
        alert("Announcement posted successfully!");
        setAnnouncementText("");
    };

    return (
        <>
            <DashboardLayout
                mainSectionHeading={"All announcements"}
                quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
                leftSidebarLinks={schoolAdminLeftSidebarLinks()}
            >
                <div className="rounded-[2em] flex flex-col gap-[2em] w-full p-[2em] bg-gray-50">
                    <div className="grid grid-cols-4 rounded-[1em] gap-[1.5em]">
                        <Input
                            placeholder="Write your announcement here..."
                            id="announcement"
							className="col-span-3"
                            value={announcementText}
                            onChange={(e) => setAnnouncementText(e.target.value)}
                        />
                        <Button
                            onClick={handlePost}
                        >
                            Post
                        </Button>
                    </div>
                    <div className="flex flex-col w-full rounded-[1em] gap-[1.5em] p-[2em] bg-white shadow-lg">
                        <h3 className="uppercase text-[1.2em] font-semibold text-[#111]">
                            Previous Announcements
                        </h3>
                        <div className="flex flex-col gap-[2em] w-full">
                            {previousAnnouncements.map((announcement, index) => (
                                <div className="flex flex-col w-full bg-gray-100 p-[1em] rounded-[1em] shadow-sm" key={index}>
                                    <p className="text-[#555] text-[14px] font-semibold">
                                        {announcement.date}
                                    </p>
                                    <p className="text-[#111] text-[18px] font-normal">
                                        {announcement.announcement}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        </>
    );
}
