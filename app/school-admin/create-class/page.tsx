"use client";
import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils";
import { createClass } from "@/services/apis/school.api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"

export default function ClassCreate() {
	const [classInput, setClassInput] = useState("");
	const [section,setSection] = useState("");

	const [error, setError] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (/^(10|[1-9])$/.test(value) || value === "") {
			setClassInput(value);
			setError("");
		} else {
			setError("Please enter a single digit (1-9) or 10.");
		}
	};

	const handleInputChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;

		if (/^(10|[1-9])$/.test(value) || value === "") {
			setError("");
		} else {
			setError("Please enter a single digit (1-9) or 10.");
		}
	};

	const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const inputNumber = Number(classInput);

		if (
			classInput === "" ||
			!Number.isInteger(inputNumber) ||
			inputNumber < 1 ||
			inputNumber > 10
		) {
			setError("Please enter a single digit (1-9) or 10.");
		} else {
			setError("");
			let classes = inputNumber.toString();
			if(section !== 'no-section'){
				 classes = inputNumber+section;
			}

			const { response, success } = await createClass(classes);
			if (!success) {
				toast.error(response);
			} else {
				toast.success("Class Created successfully");
				setClassInput(""); // Clear the input field on success
			}
		}
	};

	return (
		<DashboardLayout
			mainSectionHeading={"Create Class"}
			quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
			leftSidebarLinks={schoolAdminLeftSidebarLinks()}
		>
			<div className="flex justify-center">
				<div className="bg-white p-8 rounded-lg shadow-md w-full">
					<form onSubmit={handleFormSubmit} className="grid grid-cols-1 gap-4">
						<div className="grid grid-cols-2 gap-4">
							<div className="mb-4 col-span-1">
								<label
									htmlFor="classInput"
									className="block text-sm font-medium text-gray-700"
								>
									Class
								</label>
								<Input
									id="classInput"
									className=""
									type="text"
									placeholder="Enter class number (1-10)"
									value={classInput}
									onChange={handleInputChange}
								/>
								{error && (
									<p className="text-red-500 text-xs mt-2">
										{error}
									</p>
								)}
							</div>
							<div className="mb-4 col-span-1">
								<label
									htmlFor="classInput2"
									className="block text-sm font-medium text-gray-700"
								>
									Section
								</label>
								<Select onValueChange={(value)=>setSection(value)}>
									<SelectTrigger className="">
										<SelectValue placeholder="Select a Section" />
									</SelectTrigger>
									<SelectContent className="w-full">
										<SelectGroup>
											<SelectLabel>Section</SelectLabel>
											<SelectItem value="A">A</SelectItem>
											<SelectItem value="B">B</SelectItem>
											<SelectItem value="C">C</SelectItem>
											<SelectItem value="D">D</SelectItem>
											<SelectItem value="E">E</SelectItem>
											<SelectItem value="no-section">No Section</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>

							</div>
						</div>
						<div className="flex justify-center">
							<Button
								size={"lg"}
								type="submit"
								className="w-full "
							>
								Create Class
							</Button>
						</div>
					</form>
				</div>
			</div>
		</DashboardLayout>
	);
}
