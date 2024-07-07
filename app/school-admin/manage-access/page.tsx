"use client";
import { useState, useEffect } from "react";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import { useCurrentUser } from "@/hooks/user.hook";
import { updateDisplayPoints, updateIsReview } from "@/services/apis/school.api";

export default function SchoolAdminDashboard() {
	const { user, isLoading } = useCurrentUser();

	// State for checkboxes
	const [displayPoints, setDisplayPoints] = useState(false);
	const [isReviewOpen, setIsReviewOpen] = useState(false);

	// Effect to set initial state from user data
	useEffect(() => {
		if (user) {
			setDisplayPoints(user.displayPoints);
			setIsReviewOpen(user.isReviewOpen);
		}
	}, [user]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const handleDisplayPoints = async (e:any) => {
		setDisplayPoints(e.target.checked);
		await updateDisplayPoints(e.target.checked);
	};

	const handleIsReviewOpen = async (e:any) => {
		setIsReviewOpen(e.target.checked);
		await updateIsReview(e.target.checked);
	};

	return (
		<DashboardLayout
			mainSectionHeading={"Manage Points"}
			quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
			leftSidebarLinks={schoolAdminLeftSidebarLinks()}
		>
			<div className="rounded-[2em] grid grid-cols-2 gap-[2em]">
				<div className="flex justify-start items-center w-full bg-white rounded-[1em] gap-[1.5em] px-[1em] py-[1em]">
					<div className="w-[80px]">
						<div className="flex justify-center items-center p-[.5em] w-[100%] rounded-[.5em] ">
							<label
								htmlFor="points-display"
								className="inline-flex items-center cursor-pointer"
							>
								<input
									type="checkbox"
									checked={displayPoints}
									className="sr-only peer"
									onChange={handleDisplayPoints}
									id="points-display"
								/>
								<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
							</label>
						</div>
					</div>
					<div className="w-[75%]">
						<h4 className="font-medium text-[#212121] align-middle text-[1.2em] leading-7">
							Allow Student & Teacher Points to display on Landing Page
						</h4>
					</div>
				</div>
				<div className="flex justify-start items-center w-full bg-white rounded-[1em] gap-[1.5em] px-[1em] py-[1em]">
					<div className="w-[80px]">
						<div className="flex justify-center items-center p-[.5em] w-[100%] rounded-[.5em] ">
							<label className="inline-flex items-center cursor-pointer">
								<input
									type="checkbox"
									checked={isReviewOpen}
									className="sr-only peer"
									onChange={handleIsReviewOpen}
								/>
								<div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
							</label>
						</div>
					</div>
					<div className="w-[75%]">
						<h4 className="font-medium text-[#212121] align-middle text-[1.2em] leading-7">
							Allow Students to Give Feedback to Teachers
						</h4>
					</div>
				</div>
			</div>
		</DashboardLayout>
	);
}
