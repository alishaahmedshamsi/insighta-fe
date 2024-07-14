"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { teacherLeftSidebarLinks } from "@/components/left-sidebar/teacher";
import PointsLogComponent from "@/components/PointsLog/PointsLogComponent";
import { useCurrentUser } from "@/hooks/user.hook";
import { fetchPointsLog } from "@/services/apis/school.api";
import { TEACHER_QUICK_START_LIST } from "@/utils";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";

export default function Page() {
	// const { users: userId } = params;

	const { user, isLoading: userLoading } = useCurrentUser();
	console.log("user: ", user);

	// if (isLoading) return <div>Loading...</div>;
	// if (isError || !user) return <div>{isError || "User does not exist"}</div>;

	const {
		data: logData,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["fetch-students"],
		queryFn: () => fetchPointsLog(user?._id),
	});

	console.log("logData: ", logData);

	return (
		<DashboardLayout
			mainSectionHeading={"Points Log"}
			// pointsEarned={"400"}
			quickStartList={TEACHER_QUICK_START_LIST}
			leftSidebarLinks={teacherLeftSidebarLinks()}
		>
			<div className="p-6 bg-white rounded-lg shadow-md">
				{isLoading ? (
					<div className="text-center text-gray-500">Loading...</div>
				) : error ? (
					<div className="text-center text-gray-500">
						Error Loading data.
					</div>
				) : logData && logData.length === 0 ? (
					<div className="text-center text-gray-500">
						No points log available
					</div>
				) : (
					logData?.map((item: any) => (
						<PointsLogComponent
							id={item._id}
							title={item.title}
							createdAt={item.createdAt}
							points={item.points}
						/>
					))
				)}
				{/* { } */}
			</div>
		</DashboardLayout>
	);
}
