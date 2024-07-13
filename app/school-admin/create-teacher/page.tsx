"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import {
	AwaitedReactNode,
	ChangeEvent,
	JSXElementConstructor,
	Key,
	ReactElement,
	ReactNode,
	ReactPortal,
	useEffect,
	useState,
} from "react";

import { registerTeacherSchema } from "@/validation";
import { onRegister } from "@/services/apis";
import {
	IRegisterTeacherFields,
	IRegisterFields,
	ApiResponse,
	IClasses,
	ISubjects,
} from "@/types/type";
import { fetchClasses, fetchSubjects } from "@/services/apis/school.api";
import { toast } from "sonner";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowDownCircleIcon, Check, Loader2Icon } from "lucide-react";
import { useCurrentUser } from "@/hooks/user.hook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function SchoolAdminCreateTeacher() {
	const [teacherData, setTeacherData] = useState({
		name: "",
		email: "",
		password: "",
		classes: [{ name: "", subject: "", nameId: "", subjectId: "" }],
	});
	const [classSubjects, setClassSubjects] = useState<{
		[key: string]: ISubjects[];
	}>({});

	console.log("teacherData: ", teacherData);

	console.log("classSubjects: ", classSubjects);

	const { data, isLoading, error } = useQuery({
		queryKey: ["fetch-classes"],
		queryFn: fetchClasses,
	});

	const queryClient = useQueryClient();
	const { mutateAsync, reset, isPending } = useMutation({
		mutationFn: onRegister,
		onError: (error) => {
			setTimeout(() => {
				reset();
			}, 3000);
		},
	});

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement>,
		field?: string,
		index = -1
	) => {
		const { name, value } = e.target;
		if (field === "classes") {
			const updatedClasses = [...teacherData.classes];
			if (name === "class") {
				updatedClasses[index].name = value;
			} else if (name.startsWith("subject")) {
				updatedClasses[index].subject = value;
				updatedClasses[index].subjectId = findSubjectId(
					value,
					teacherData.classes[index].nameId
				);
			}
			setTeacherData({ ...teacherData, classes: updatedClasses });
		} else {
			setTeacherData({ ...teacherData, [name]: value });
		}
	};

	const addClass = (e: { stopPropagation: () => void }) => {
		e.stopPropagation();
		setTeacherData({
			...teacherData,
			classes: [
				...teacherData.classes,
				{ name: "", subject: "", nameId: "", subjectId: "" },
			],
		});
	};

	const removeClass = (classIndex: number) => {
		const updatedClasses = [...teacherData.classes];
		if (updatedClasses.length > 1) {
			updatedClasses.splice(classIndex, 1);
		}
		setTeacherData({ ...teacherData, classes: updatedClasses });
	};

	const handleClassChange = async (value: string, index: number) => {
		const classData = data?.data.find(
			(item: { className: string }) =>
				String(item.className) === String(value)
		);
		console.log("classData: ", classData);
		if (classData) {
			const subjectsResponse = await fetchSubjects(classData._id);
			console.log("subjectsResponse: ", subjectsResponse);
			console.log("subjectsResponse.data: ", subjectsResponse.data);
			setClassSubjects((prev) => ({
				...prev,
				[classData._id]: subjectsResponse,
			}));
			const updatedClasses = [...teacherData.classes];
			updatedClasses[index].name = classData.className;
			updatedClasses[index].nameId = classData._id;
			setTeacherData({ ...teacherData, classes: updatedClasses });
		}
	};

	const findSubjectId = (subjectName: string, classId: string) => {
		const subjectData = classSubjects[classId]?.find(
			(item) => String(item.name) === String(subjectName)
		);
		return String(subjectData?._id);
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const data = {
			fullname: teacherData.name,
			email: teacherData.email,
			password: teacherData.password,
			classes: teacherData.classes.map((classItem) => classItem.nameId),
			subject: teacherData.classes.map(
				(classItem) => classItem.subjectId
			),
			role: "teacher",
		};

		const { success, response } = await mutateAsync(data);
		if (!success) return toast.error(response);
		toast.success("Teacher created successfully");
		setTeacherData({
			name: "",
			email: "",
			password: "",
			classes: [{ name: "", subject: "", nameId: "", subjectId: "" }],
		});
		queryClient.invalidateQueries({ queryKey: ["fetch-classes"] });
	};

	const getAvailableClasses = (index: number) => {
		const selectedClassNames = teacherData.classes.map(
			(classItem) => classItem.name
		);
		return data?.data.filter(
			(classItem: { className: string }) =>
				!selectedClassNames.includes(classItem.className) ||
				teacherData.classes[index].name === classItem.className
		);
	};

	return (
		<DashboardLayout
			mainSectionHeading={"Create Teacher"}
			quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
			leftSidebarLinks={schoolAdminLeftSidebarLinks()}
		>
			<form
				onSubmit={handleSubmit}
				className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]"
			>
				<div className="grid grid-cols-2 gap-[1em]">
					<div className="w-full flex flex-col col-span-2">
						<label htmlFor="name">Name</label>
						<input
							className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
							id="name"
							type="text"
							onChange={(e) =>
								setTeacherData({
									...teacherData,
									name: e.target.value,
								})
							}
							value={teacherData.name ? teacherData.name : ""}
						/>
					</div>
					<div className="w-full flex flex-col">
						<label htmlFor="email">Email</label>
						<input
							className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
							id="email"
							type="email"
							onChange={(e) =>
								setTeacherData({
									...teacherData,
									email: e.target.value,
								})
							}
							value={teacherData.email ? teacherData.email : ""}
						/>
					</div>
					<div className="w-full flex flex-col">
						<label htmlFor="password">Password</label>
						<input
							className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
							id="password"
							type="text"
							onChange={(e) =>
								setTeacherData({
									...teacherData,
									password: e.target.value,
								})
							}
							value={
								teacherData.password ? teacherData.password : ""
							}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-[1em] rounded-[2em] p-[2.5em] border border-[#ddd]">
					{teacherData.classes.map((classItem, classIndex) => (
						<div
							className="grid grid-cols-2 gap-[1em] items-center relative"
							key={classIndex}
						>
							<div className="flex items-center h-full absolute top-1 left-[-40px]">
								<Button
									disabled={teacherData.classes.length === 1}
									onClick={() => removeClass(classIndex)}
									className="text-red-500 bg-transparent rounded-full font-semibold text-[20px] mt-[5px] hover:bg-transparent"
								>
									&times;
								</Button>
							</div>
							<div className="flex flex-col w-full">
								<label htmlFor={`class-${classIndex}`}>
									Class
								</label>
								<Select
									onValueChange={(value) =>
										handleClassChange(value, classIndex)
									}
									value={classItem.name}
								>
									<SelectTrigger className="rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]">
										<SelectValue placeholder="Select a Class" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Classes</SelectLabel>
											{isLoading ? (
												<div>Loading...</div>
											) : error ? (
												<div>Error loading classes</div>
											) : (
												getAvailableClasses(
													classIndex
												)?.map(
													(item: {
														_id:
														| Key
														| null
														| undefined;
														className:
														| string
														| number
														| boolean
														| ReactElement<
															any,
															| string
															| JSXElementConstructor<any>
														>
														| Iterable<ReactNode>
														| ReactPortal
														| Promise<AwaitedReactNode>
														| null
														| undefined;
													}) => (
														<SelectItem
															key={item._id}
															value={String(
																item.className
															)}
														>
															{item.className}
														</SelectItem>
													)
												)
											)}
										</SelectGroup>
									</SelectContent>
								</Select>
							</div>
							<div className="flex flex-col w-full">
								<label>Subject</label>
								<Select
									onValueChange={(value) =>
										handleInputChange(
											{
												target: {
													name: "subject",
													value,
												},
											} as ChangeEvent<HTMLInputElement>,
											"classes",
											classIndex
										)
									}
									value={classItem.subject}
								>
									<SelectTrigger className="rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]">
										<SelectValue placeholder="Select a Subject" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Subjects</SelectLabel>
											{classSubjects[
												teacherData.classes[classIndex]
													.nameId
											]?.length === 0 ? (
												<div>Select a class first</div>
											) : (
												classSubjects[
													teacherData.classes[
														classIndex
													].nameId
												]?.map((item) => (
													<SelectItem
														key={item._id}
														value={String(
															item.name
														)}
													>
														{item.name}
													</SelectItem>
												))
											)}
										</SelectGroup>
									</SelectContent>
								</Select>
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
						{isPending ? (
							<>
								<div className="flex justify-center items-center">
									<Loader2Icon className="mr-2 animate-spin" />
									<span>Creating...</span>
								</div>
							</>
						) : (
							"Create Teacher"
						)}

					</button>
				</div>
				{/* <div className="col-span-1 w-full">
					<button
						className="border text-white bg-primaryColor px-[1em] py-[1em] w-full rounded-[1em]"
						type="submit"
					>
						Create Teacher
					</button>
				</div> */}
			</form>
		</DashboardLayout>
	);
}