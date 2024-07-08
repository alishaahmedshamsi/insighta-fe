"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import { Pagination } from "@/components/Pagination/Pagination";
import { SchoolTable } from "@/components/schoolTable/SchoolTable";
import { SearchBar } from "@/components/Search/page";
import { Input } from "@/components/ui/input";
import { fetchUsers } from "@/services/apis/school.api";
import { ApiResponse, IUser } from "@/types/type";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

interface SearchParams {
  searchParams: {
    page: number;
    limit: number;
    search: string;
  };
}

export default function Page({ searchParams }: SearchParams) {
  const { page, search } = searchParams;

  const {
    isLoading,
    data,
    error,
  }: { data: ApiResponse<IUser> | undefined; error: any; isLoading: boolean } =
    useQuery({
      queryKey: ["fetch-students", page, search],
      queryFn: () => fetchUsers({ page, search, role: "student" }),
    });

    console.log("students data: ", data)

  if (isLoading) {
    <div>loading...</div>;
  }
  if (error) {
    toast.error(error);
  }



  return (
    <DashboardLayout
      mainSectionHeading={"Students"}
      // pointsEarned={"400"}
      quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
      leftSidebarLinks={schoolAdminLeftSidebarLinks()}
    >
      <div className="flex flex-col min-h-screen">
        <SearchBar initialValue={search} />
        <div className="mb-6"></div>
        <hr className="py-6" />
        <div className="flex-grow">
          {data?.data &&
            <SchoolTable
              caption="A list of your School Students"
              data={data.data}
              role="student"
            />
          }
        </div>
        <div className="sticky bottom-0  py-4">
          {data?.pagination &&
            <Pagination data={data.pagination} />
          }
        </div>
      </div>
    </DashboardLayout>
  );
}
