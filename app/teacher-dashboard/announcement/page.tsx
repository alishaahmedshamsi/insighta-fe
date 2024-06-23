"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import {  TEACHER_QUICK_START_LIST } from "@/utils/constant/constant";
import {
  fetchAnnouncements,
} from "@/services/apis/announcment.api";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/hooks/user.hook";
import { formatDate } from "@/lib/utils";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";

export default function Component() {
  return (
    <>
      <DashboardLayout
        mainSectionHeading={"All announcements"}
        quickStartList={TEACHER_QUICK_START_LIST}
        leftSidebarLinks={teacherLeftSidebarLinks()}
      >
        <div className="rounded-[2em] flex flex-col gap-[2em] w-full p-[2em] bg-gray-50">
          <Announcements />
        </div>
      </DashboardLayout>
    </>
  );
}

function Announcements() {
  const { user } = useCurrentUser();
  const { isLoading, data, error } = useQuery({
    queryKey: ["fetchAnnouncements"],
    queryFn: () => fetchAnnouncements(user?.school),
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
