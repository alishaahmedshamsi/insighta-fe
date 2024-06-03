"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import { ChangeEvent, useState } from "react";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerStudentSchema } from "@/validation";
import { useMutation } from "@tanstack/react-query";
import { onRegister } from "@/services/apis";
import { toast } from "sonner";
import { IRegisterFields } from "@/types/type";
import { Button } from "@/components/ui/button";

export default function SchoolAdminCreateTeacher() {
	const [teacherData, setTeacherData] = useState({
		name: "",
		qualification: "",
		email: "",
		password: "",
		teacherId: "",
		classes: [{ name: "", subject: "" }],
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
				updatedClasses[index].subject = value;
			}
			setTeacherData({ ...teacherData, classes: updatedClasses });
		} else {
			setTeacherData({ ...teacherData, [name]: value });
		}
	};

	const addClass = () => {
		setTeacherData({
			...teacherData,
			classes: [...teacherData.classes, { name: "", subject: "" }],
		});
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
							type="text"
							name="password"
							value={teacherData.password}
							onChange={(e) => handleInputChange(e)}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-[1em] rounded-[2em] p-[2.5em] border border-[#ddd]">
					{teacherData.classes.map((classItem, classIndex) => (
						<div
							className="grid grid-cols-2 gap-[1em] items-center relative "
							key={classIndex}
						>
							{/* {teacherData.classes.length > 1 && ( */}
							<div className="flex items-center h-full absolute top-1 left-[-40px]">
								<Button
									disabled={teacherData.classes.length === 1}
									onClick={() => removeClass(classIndex)}
									className="text-red-500 bg-transparent rounded-full font-semibold text-[20px] mt-[5px] hover:bg-transparent"
								>
									&times;
								</Button>
							</div>
							{/* )} */}
							<div className="flex flex-col w-full">
								<label htmlFor={`class-${classIndex}`}>
									Class
								</label>
								<Select
								// onValueChange={(value) =>
								// 	setValue("class", value)
								// }
								>
									<SelectTrigger className="rounded-[1em] border border-[#ddd] bg-white p-[.9em] h-[3.5em]">
										<SelectValue placeholder="Select a Class" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Classes</SelectLabel>
											{/* {isLoading ? (
											<div>Loading...</div>
										) : error ? (
											<div>Error loading classes</div>
										) : (
											data?.data.map((item) => (
												<SelectItem
													key={item._id}
													value={String(item._id)}
												>
													{item.className}
												</SelectItem>
											))
										)} */}
										</SelectGroup>
									</SelectContent>
								</Select>

								{/* <input
								className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
								id={`class-${classIndex}`}
								type="text"
								name="class"
								value={classItem.name}
								onChange={(e) =>
									handleInputChange(e, "classes", classIndex)
								}
							/> */}
							</div>

							<div className="flex flex-col w-full">
								<label>Subject</label>
								<input
									className="col-span-3 p-[.8em] rounded-[1em] border border-[#ddd] bg-white"
									type="text"
									name={`subject`}
									value={classItem.subject}
									onChange={(e) =>
										handleInputChange(
											e,
											"classes",
											classIndex
										)
									}
								/>
							</div>
						</div>
					))}
					<hr className="my-2" />
					<div className="flex justify-end">
						<Button onClick={addClass}>Add Class</Button>
					</div>
				</div>

				<div className="col-span-1 w-full">
					<button className="rounded-[1em] bg-brand-sea-green py-[.8em] px-[1em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink">
						Create Teacher
					</button>
				</div>
			</div>
		</DashboardLayout>
	);
}
