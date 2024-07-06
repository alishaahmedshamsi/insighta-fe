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
} from "@/components/ui/select";
import { Loader2Icon } from "lucide-react";

export default function ClassCreate() {
	const [classInput, setClassInput] = useState("");
	const [section, setSection] = useState("");
	const [isPending, setIsPending] = useState(false);

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
		setIsPending(true);

		const inputNumber = Number(classInput);

		if (
			classInput === "" ||
			!Number.isInteger(inputNumber) ||
			inputNumber < 1 ||
			inputNumber > 10
		) {
			toast.error("Please enter a single digit (1-9) or 10.");
			setError("Please enter a single digit (1-9) or 10.");
			setIsPending(false);
			return;
		} else if (section == "") {
			toast.error("Please select a section");
			// setError("Please select a section");
			setIsPending(false);
			return;
		} else {
			setError("");
			let classes = inputNumber.toString();

			if (section !== "no-section") {
				classes = inputNumber + section;
			}

			const { response, success } = await createClass(classes);
			if (!success) {
				toast.error(response);
				setIsPending(false);
			} else {
				setIsPending(false);
				toast.success("Class Created successfully");
				setClassInput(""); // Clear the input field on success
				setSection("");
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
					<form
						onSubmit={handleFormSubmit}
						className="grid grid-cols-1 gap-4"
					>
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
									className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]"
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
								<Select
									value={section}
									onValueChange={(value) => setSection(value)}
								>
									<SelectTrigger className="w-full px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]">
										<SelectValue placeholder="Select a Section" />
									</SelectTrigger>
									<SelectContent className="w-full">
										<SelectGroup>
											{/* {section == "" ? (
												<SelectItem value="no-section">
													Select a Section
												</SelectItem>
											) : (
												<> */}
											<SelectLabel>Section</SelectLabel>
											<SelectItem value="A">A</SelectItem>
											<SelectItem value="B">B</SelectItem>
											<SelectItem value="C">C</SelectItem>
											<SelectItem value="D">D</SelectItem>
											<SelectItem value="E">E</SelectItem>
											{/* </>
											)} */}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
						</div>
						<div className="flex justify-center">
							{/* <Button
								size={"lg"}
								type="submit"
								className="w-full "
							>
								Create Class
							</Button> */}

							<Button
								className="w-full rounded-[1em] bg-brand-sea-green py-[.9em] px-[1.5em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink focus:outline-none focus:ring focus:border-PrimaryColor"
								type="submit"
							>
								{isPending ? (
									<>
										<div className="flex justify-center items-center">
											<Loader2Icon className="mr-2 animate-spin" />
											<span>Creating...</span>
										</div>
									</>
								) : (
									"Create Class"
								)}
							</Button>
						</div>
					</form>
				</div>
			</div>
		</DashboardLayout>
	);
}
