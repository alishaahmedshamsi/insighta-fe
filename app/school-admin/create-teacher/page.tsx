"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import { ChangeEvent, useState } from "react";

const userDetails = {
	userName: "School Admin",
	role: "Admin",
	schoolName: "Karachi Public School",
};
export default function SchoolAdminCreateTeacher() {
	const [teacherData, setTeacherData] = useState({
		name: "",
		qualification: "",
		email: "",
		password: "",
		classes: [{ name: "", subjects: [""] }],
	});

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement>,
		field?: string,
		index = -1
	) => {
		const { name, value } = e.target;

		if (field === "classes") {
			const updatedClasses = [...teacherData.classes]; // Create new array for re-rendering
			if (name === "class") {
				updatedClasses[index].name = value;
			} else if (name.startsWith("subject")) {
				const subjectIndex = parseInt(name.split("-")[1], 10);
				updatedClasses[index].subjects[subjectIndex] = value;
			}
			setTeacherData({ ...teacherData, classes: updatedClasses });
		} else {
			setTeacherData({ ...teacherData, [name]: value });
		}
	};

	const addClass = () => {
		setTeacherData({
			...teacherData,
			classes: [...teacherData.classes, { name: "", subjects: [""] }],
		});
	};

	const addSubject = (classIndex: number) => {
		const updatedClasses = [...teacherData.classes]; // Create new array for re-rendering
		updatedClasses[classIndex].subjects.push("");
		setTeacherData({ ...teacherData, classes: updatedClasses });
	};

	const removeSubject = (classIndex: number, subjectIndex: number) => {
		const updatedClasses = [...teacherData.classes];
		if (updatedClasses[classIndex].subjects.length > 1) {
			updatedClasses[classIndex].subjects.splice(subjectIndex, 1);
		}
		setTeacherData({ ...teacherData, classes: updatedClasses });
	};

	const removeClass = (classIndex: number) => {
		const updatedClasses = [...teacherData.classes];
		if (updatedClasses.length > 1) {
			// Ensure there's at least one class
			updatedClasses.splice(classIndex, 1);
		}
		setTeacherData({ ...teacherData, classes: updatedClasses });
	};

	return (
		<DashboardLayout
			mainSectionHeading={"Create Teacher"}
			userDetails={userDetails}
			quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
			leftSidebarLinks={schoolAdminLeftSidebarLinks()}
		>
			<div className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]">
				<div className="grid grid-cols-2 gap-[1em]">
					<div className="w-full flex flex-col">
						<label htmlFor="name">Name</label>
						<input
							className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
							id="name"
							type="text"
							name="name"
							value={teacherData.name}
							onChange={(e) => handleInputChange(e)}
						/>
					</div>

					<div className="w-full flex flex-col">
						<label htmlFor="qualification">Qualification</label>
						<input
							className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
							id="qualification"
							type="text"
							name="qualification"
							value={teacherData.qualification}
							onChange={(e) => handleInputChange(e)}
						/>
					</div>

					<div className="w-full flex flex-col">
						<label htmlFor="email">Email</label>
						<input
							className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
							id="email"
							type="email"
							name="email"
							value={teacherData.email}
							onChange={(e) => handleInputChange(e)}
						/>
					</div>

					<div className="w-full flex flex-col">
						<label htmlFor="password">Password</label>
						<input
							className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
							id="password"
							type="password"
							name="password"
							value={teacherData.password}
							onChange={(e) => handleInputChange(e)}
						/>
					</div>
				</div>

				{teacherData.classes.map((classItem, classIndex) => (
					<div
						className="col-span-2 grid grid-cols-2 gap-[1em] rounded-[2em] border border-[#DBDBDB] p-[2em]"
						key={classIndex}
					>
						<div className="w-full flex flex-col">
							<label htmlFor={`class-${classIndex}`}>Class</label>
							<input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id={`class-${classIndex}`}
								type="text"
								name="class"
								value={classItem.name}
								onChange={(e) =>
									handleInputChange(e, "classes", classIndex)
								}
							/>
							{teacherData.classes.length > 1 && ( // Show only if there's more than one class
								<button
									onClick={() => removeClass(classIndex)}
									className="text-red-500 font-bold text-[1.5em]"
								>
									&times;
								</button>
							)}
						</div>

						<div className="w-full flex flex-col">
							<label>Subjects</label>
							{classItem.subjects.map((subject, subjectIndex) => (
								<div
									key={subjectIndex}
									className="grid grid-cols-4 gap-2"
								>
									<input
										className="col-span-3 mb-2 p-[.8em] rounded-[1em] border border-[#ddd] bg-white"
										type="text"
										name={`subject-${subjectIndex}`}
										value={subject}
										onChange={(e) =>
											handleInputChange(
												e,
												"classes",
												classIndex
											)
										}
									/>
									{classItem.subjects.length > 1 && (
										<button
											onClick={() =>
												removeSubject(
													classIndex,
													subjectIndex
												)
											}
											className="text-red-500"
										>
											&times;
										</button>
									)}
								</div>
							))}
							<button
								className="rounded-[1em] bg-brand-sea-green py-[.6em] px-[1em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink"
								onClick={() => addSubject(classIndex)}
							>
								Add Subject
							</button>
						</div>
					</div>
				))}

				<button
					className="col-span-1 w-full rounded-[1em] bg-brand-sea-green py-[.9em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink"
					onClick={addClass}
				>
					Add Class
				</button>

				<div className="col-span-1 w-full">
					<button className="w-full rounded-[1em] bg-brand-sea-green py-[.9em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink">
						Create Teacher
					</button>
				</div>
			</div>
		</DashboardLayout>
	);
}
