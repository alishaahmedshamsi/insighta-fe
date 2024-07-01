"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import Link from "next/link";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import PointsBreakdown from "@/components/points-breakdown";
import TopFive from "@/components/TopFive/TopFive";

export default function SchoolAdminTopFive() {
	return (
		<>
			<DashboardLayout
				mainSectionHeading={"Top 5"}
				// pointsEarned={"400"}
				quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
				leftSidebarLinks={schoolAdminLeftSidebarLinks()}
			>
				<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
					<TopFive />
				</div>
			</DashboardLayout>
		</>
	);
}
