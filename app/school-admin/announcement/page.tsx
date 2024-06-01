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
  const queryClient = useQueryClient();
  const handleSubmit = async () => {
    const { success, response } = await createAnnouncement({
      content: announcementText,
    });
    if (!success) return toast.error(response);
    toast.success("Announcement created successfully");
    queryClient.invalidateQueries({ queryKey: ["fetchAnnouncements"] });
  };

  return (
    <div className="grid grid-cols-4 rounded-[1em] gap-[1.5em]">
      <Input
        placeholder="Write your announcement here..."
        id="announcement"
        className="col-span-3"
        value={announcementText}
        onChange={(e) => setAnnouncementText(e.target.value)}
      />
      <Button onClick={handleSubmit}>Post</Button>
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
  if (!data) return <div>No announcements found</div>;

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
