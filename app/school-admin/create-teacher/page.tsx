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
import { ArrowDownCircleIcon, Check } from "lucide-react";
import { useCurrentUser } from "@/hooks/user.hook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export default function SchoolAdminCreateTeacher() {
	const [fullName, setFullName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [classes, setclasses] = useState([{ classId: "", subject: "" }]);
	const [classId, setClassId] = useState<string | undefined>(undefined);

	const [open, setOpen] = useState(false);
	// const [selectedClass, setSelectedClass] = useState("");

	const [teacherData, setTeacherData] = useState({
		name: "",
		email: "",
		password: "",
		classes: [{ name: "", subject: "" }],
	});

	const [selectedClass, setSelectedClass] = useState<string | undefined>(
		undefined
	);
	const [classSubjects, setClassSubjects] = useState<ISubjects[]>([]);

	useEffect(() => {
		const fetchAndSetSubjects = async () => {
			try {
				const subjectsResponse = await fetchSubjects(selectedClass);
				setClassSubjects(subjectsResponse);
			} catch (error) {
				console.error("Failed to fetch subjects:", error);
				setClassSubjects([]); // Fallback to empty array on error
			}
		};

		if (selectedClass) {
			fetchAndSetSubjects();
		} else {
			setClassSubjects([]); // Clear subjects if no class is selected
		}
	}, [selectedClass]);

	const { data, isLoading, error } = useQuery({
		queryKey: ["fetch-classes"],
		queryFn: () => fetchClasses(),
	});

	const queryClient = useQueryClient();
	const { mutateAsync, reset } = useMutation({
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

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const data: IRegisterFields = {
			fullname: teacherData.name,
			email: teacherData.email,
			password: teacherData.password,
			classes: teacherData.classes.map((classId) => findClassId(classId.name)),
			subject: teacherData.classes.map((subjectId) => findSubjectId(subjectId.subject)),
			role: "teacher",
		};

		console.log("final data: ", data);

		console.log("teacherData.classes: ", teacherData.classes);
		console.log("selectedClass: ", selectedClass);
		console.log("classSubjects: ", classSubjects);

		const { success, response } = await mutateAsync(data);
		if (!success) return toast.error(response);
		if (success) toast.success("Teacher created successfully");
		queryClient.invalidateQueries({ queryKey: ["user-points"] });

		// const { success, response } = await mutateAsync(data);

		// if (!success) return toast.error(response);
		// if (success) toast.success("Quiz Added Successfully");
		// queryClient.invalidateQueries({ queryKey: ["user-points"] });
	};

    const findClassId = (value: string) => {
		// console.log("class value: ", value);

		const classData = data?.data.find(
			(item: { className: any; }) => String(item.className) === String(value)
		);
		return classData?._id
	};
    const findSubjectId = (value: string) => {
		// console.log("class value: ", value);

        const subjectData = classSubjects.find(
            (item: { name: any; }) => String(item.name) === String(value)
        );

        return subjectData?._id

		// const classData = user?.classes.find(
		// 	(item) => String(item.className) === String(value)
		// );
		// setClassId(classData?._id);
	};

	const handleClassChange = async (value: string, index: number) => {
		console.log("class value: ", value);
		const classData = data?.data.find(
			(item: { className: any }) =>
				String(item.className) === String(value)
		);
		setSelectedClass(classData?._id);
		console.log("classData._id", classData?._id);
		if (classData) {
			const subjectsResponse = await fetchSubjects(classData._id);
			setClassSubjects(subjectsResponse.data);
			const updatedClasses = [...teacherData.classes];
			updatedClasses[index].name = classData.className;
			setTeacherData({ ...teacherData, classes: updatedClasses });
		}
	};
	// const {
	// 	data: subjectsData,
	// 	isLoading: subjectLoading,
	// 	error: subjectError,
	// }: {
	// 	data: ApiResponse<ISubjects> | undefined;
	// 	isLoading: boolean;
	// 	error: unknown;
	// } = useQuery({
	// 	queryKey: ["fetch-classes"],
	// 	queryFn: () => fetchSubjects(classId),
	// });

	// -----------------------

	// const { mutateAsync, error, reset } = useMutation({
	// 	mutationFn: onRegister,
	// 	onError: (error) => {
	// 		console.log(error.message);
	// 		setTimeout(() => {
	// 			reset();
	// 		}, 3000);
	// 	},
	// });
	// const {
	// 	register,
	// 	handleSubmit,
	// 	setValue,
	// 	formState: { errors, isSubmitting }, // isSubmitting for loading state
	// } = useForm<IRegisterFields>({
	// 	resolver: zodResolver(registerTeacherSchema),
	// });
	// console.log(errors);

	// const onSubmit: SubmitHandler<IRegisterFields> = async (data, e) => {
	// 	e?.preventDefault();

	// 	console.log("DATAAAAA", data);
	// 	data.role = "teacher";
	// 	const { success, response } = await mutateAsync(data);

	// 	if (!success) return toast.error(response);
	// 	if (success) toast.success("Teacher created successful");
	// };

	// -----------------
	// const {
	// 	data,
	// }: {
	// 	data: ApiResponse<IClasses> | undefined;
	// 	isLoading: boolean;
	// } = useQuery({
	// 	queryKey: ["fetch-classes"],
	// 	queryFn: () => fetchClasses(),
	// });

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
							// name="name"
							// value={teacherData.name}
							onChange={(e) => setTeacherData({
                                ...teacherData,
                                name: e.target.value
                            })}
						/>
					</div>

					{/* <div className="w-full flex flex-col">
						<label htmlFor="qualification">Qualification</label>
						<input
							className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
							id="qualification"
							type="text"
							name="qualification"
							value={teacherData.qualification}
							onChange={(e) => handleInputChange(e)}

						/>
					</div> */}

					<div className="w-full flex flex-col">
						<label htmlFor="email">Email</label>
						<input
							className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
							id="email"
							type="email"
							// name="email"
							// value={teacherData.email}
							// onChange={(e) => handleInputChange(e)}
                            onChange={(e) => setTeacherData({
                                ...teacherData,
                                email: e.target.value
                            })}
						/>
					</div>

					<div className="w-full flex flex-col">
						<label htmlFor="password">Password</label>
						<input
							className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
							id="password"
							type="text"
							// name="password"
							// value={teacherData.password}
							// onChange={(e) => handleInputChange(e)}
                            onChange={(e) => setTeacherData({
                                ...teacherData,
                               password: e.target.value
                            })}
						/>
					</div>
				</div>

				<div className="flex flex-col gap-[1em] rounded-[2em] p-[2.5em] border border-[#ddd]">
					{teacherData.classes.map((classItem, classIndex) => (
						<div
							className="grid grid-cols-2 gap-[1em] items-center relative "
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
												data?.data.map(
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
															value={item.className!.toString()}
														>
															{item.className}
														</SelectItem>
													)
												)
											)}
										</SelectGroup>
									</SelectContent>
								</Select>
								{/* <Select
									onValueChange={(value) =>
										handleClassChange(value, classIndex)
									}
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
												data?.data.map((item) => (
													<SelectItem
														key={item._id}
														value={item.className.toString()}
													>
														{item.className}
													</SelectItem>
												))
											)}
										</SelectGroup>
									</SelectContent>
								</Select> */}
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
								>
									<SelectTrigger className="rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]">
										<SelectValue placeholder="Select a Subject" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Subjects</SelectLabel>
											{classSubjects?.length === 0 ? (
												<div>Select a class first</div>
											) : (
												classSubjects?.map((item) => (
													<SelectItem
														key={item._id}
														value={item.name.toString()}
													>
														{item.name}
													</SelectItem>
												))
											)}
										</SelectGroup>
									</SelectContent>
								</Select>
								{/* <Select onValueChange={handleClassChange}>
									<SelectTrigger className="rounded-[1em] border border-[#ddd] bg-white p-[.8em] h-[3.5em]">
										<SelectValue placeholder="Select a Class" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Subjects</SelectLabel>
											{subjectLoading ? (
												<div>Loading...</div>
											) : subjectError ? (
												<div>
													Error loading subjects
												</div>
											) : (
												subjectsData?.data.map(
													(item) => (
														<SelectItem
															key={item._id}
															value={item.name}
														>
															{item.name}
														</SelectItem>
													)
												)
											)}
										</SelectGroup>
									</SelectContent>
								</Select> */}
								{/* <input
									className="col-span-3 p-[.8em] rounded-[1em] border border-[#ddd] bg-white"
									type="text"
									// name={`subject`}
									// value={classItem.subject}
									// onChange={(e) =>
									// 	handleInputChange(
									// 		e,
									// 		"classes",
									// 		classIndex
									// 	)
									// }
								/> */}
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
			</form>
		</DashboardLayout>
	);
}

// "use client";

// import { useState, ChangeEvent } from "react";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "sonner";
// import DashboardLayout from "@/components/layouts/dashboard.layout";
// import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
// import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
// import { registerTeacherSchema } from "@/validation";
// import { onRegister } from "@/services/apis";
// import { fetchClasses } from "@/services/apis/school.api";

// import { IRegisterFields, ApiResponse, IClasses } from "@/types/type";
// import {
//     Popover,
//     PopoverContent,
//     PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//     Command,
//     CommandEmpty,
//     CommandGroup,
//     CommandInput,
//     CommandItem,
//     CommandList,
// } from "@/components/ui/command";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ArrowDownCircleIcon, Check } from "lucide-react";
// import { useCurrentUser } from "@/hooks/user.hook";

// export default function SchoolAdminCreateTeacher() {
//     const [teacherData, setTeacherData] = useState<IRegisterFields>({
// 		fullname: "",
// 		email: "",
// 		password: "",
// 		classes: [],
// 		subject: [],
// 		role: "teacher",
// 	});

// 	const [fullName, setFullName] = useState("");
// 	const [email, setEmail] = useState("");
// 	const [password, setPassword] = useState("");
// 	const [classes, setclasses] = useState([{ classId: "", subject: "" }]);

//     const handleInputChange = (
//         e: ChangeEvent<HTMLInputElement>,
//         field?: string,
//         index = -1
//     ) => {
//         const { name, value } = e.target;
//         if (field === "classes") {
//             const updatedClasses = [...teacherData.classes];
//             if (name === "class") {
//                 updatedClasses[index].classId = value;
//             } else if (name === "subject") {
//                 updatedClasses[index].subject = value;
//             }
//             setTeacherData({ ...teacherData, classes: updatedClasses });
//         } else {
//             setTeacherData({ ...teacherData, [name]: value });
//         }
//     };

//     const addClass = () => {
//         setTeacherData({
//             ...teacherData,
//             classes: [...teacherData.classes, { classId: "", subject: "" }],
//         });
//     };

//     const removeClass = (classIndex: number) => {
//         const updatedClasses = [...teacherData.classes];
//         if (updatedClasses.length > 1) {
//             updatedClasses.splice(classIndex, 1);
//         }
//         setTeacherData({ ...teacherData, classes: updatedClasses });
//     };

//     const [open, setOpen] = useState(false);
//     const [selectedClass, setSelectedClass] = useState("");

//     const { user, isLoading, error } = useCurrentUser();

//     const handleSubmit = async (e: React.FormEvent) => {
// 		e.preventDefault();

// 		// const data: IAddQuiz = {
// 		// 	title,
// 		// 	class: classId,
// 		// 	// subjectName,
// 		// 	marks,
// 		// 	deadline: date!,
// 		// 	question: question.map((q) => q.text),
// 		// };

// 		// // console.log("quiz data: ", data);

// 		// const { success, response } = await mutateAsync(data);

// 		// if (!success) return toast.error(response);
// 		// if (success) toast.success("Quiz Added Successfully");
// 		// queryClient.invalidateQueries({ queryKey: ["user-points"] });
// 	};

//     return (
//         <DashboardLayout
//             mainSectionHeading={"Create Teacher"}
//             quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
//             leftSidebarLinks={schoolAdminLeftSidebarLinks()}
//         >
//             <form
//                 onSubmit={handleSubmit}
//                 className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]"
//             >
//                 <div className="grid grid-cols-2 gap-[1em]">
//                     <div className="w-full flex flex-col col-span-2">
//                         <label htmlFor="name">Name</label>
//                         <input
//                             className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
//                             id="name"
//                             type="text"
//                             value={teacherData.fullname}
//                         />
//                     </div>
//                     <div className="w-full flex flex-col">
//                         <label htmlFor="email">Email</label>
//                         <input
//                             className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
//                             id="email"
//                             type="email"
//                             value={teacherData.email}
//                         />
//                     </div>
//                     <div className="w-full flex flex-col">
//                         <label htmlFor="password">Password</label>
//                         <input
//                             className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
//                             id="password"
//                             type="text"
//                             value={teacherData.password}
//                         />
//                     </div>
//                 </div>

//                 <div className="flex flex-col gap-[1em] rounded-[2em] p-[2.5em] border border-[#ddd]">
//                     {teacherData.classes.map((classItem, classIndex) => (
//                         <div
//                             className="grid grid-cols-2 gap-[1em] items-center relative"
//                             key={classIndex}
//                         >
//                             <div className="flex items-center h-full absolute top-1 left-[-40px]">
//                                 <Button
//                                     disabled={teacherData.classes.length === 1}
//                                     onClick={() => removeClass(classIndex)}
//                                     className="text-red-500 bg-transparent rounded-full font-semibold text-[20px] mt-[5px] hover:bg-transparent"
//                                 >
//                                     &times;
//                                 </Button>
//                             </div>
//                             <div className="flex flex-col w-full">
//                                 <label htmlFor={`class-${classIndex}`}>Class</label>
//                                 <Popover open={open} onOpenChange={setOpen}>
//                                     <PopoverTrigger asChild>
//                                         <Button
//                                             variant="outline"
//                                             role="combobox"
//                                             aria-expanded={open}
//                                             className="w-full justify-between"
//                                         >
//                                             {selectedClass
//                                                 ? data?.data.find(item => item._id === selectedClass)?.className
//                                                 : "Select Class"}
//                                             <ArrowDownCircleIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
//                                         </Button>
//                                     </PopoverTrigger>
//                                     <PopoverContent className="w-[400px] p-0">
//                                         <Command>
//                                             <CommandInput placeholder="Search classes..." />
//                                             <CommandList>
//                                                 <CommandEmpty>No classes found.</CommandEmpty>
//                                                 <CommandGroup>
//                                                     {data?.data.map((item) => (
//                                                         <CommandItem
//                                                             key={item._id}
//                                                             onSelect={() => {
//                                                                 setSelectedClass(item._id);
//                                                                 handleInputChange({ target: { name: 'class', value: item._id } } as ChangeEvent<HTMLInputElement>, 'classes', classIndex);
//                                                                 setOpen(false);
//                                                             }}
//                                                         >
//                                                             <Check
//                                                                 className={`mr-2 h-4 w-4 ${selectedClass === item._id ? 'opacity-100' : 'opacity-0'}`}
//                                                             />
//                                                             {item.className}
//                                                         </CommandItem>
//                                                     ))}
//                                                 </CommandGroup>
//                                             </CommandList>
//                                         </Command>
//                                     </PopoverContent>
//                                 </Popover>
//                                 {errors.classes && (
//                                     <span>{errors.classes.message}</span>
//                                 )}
//                             </div>
//                             <div className="flex flex-col w-full">
//                                 <label>Subject</label>
//                                 <input
//                                     className="col-span-3 p-[.8em] rounded-[1em] border border-[#ddd] bg-white"
//                                     type="text"
//                                     name="subject"
//                                     value={classItem.subject}
//                                     onChange={(e) => handleInputChange(e, "classes", classIndex)}
//                                 />
//                             </div>
//                         </div>
//                     ))}
//                     <hr className="my-2" />
//                     <div className="flex justify-end">
//                         <Button onClick={addClass}>Add Class</Button>
//                     </div>
//                 </div>

//                 <div className="col-span-1 w-full">
//                     <button className="rounded-[1em] bg-brand-sea-green py-[.8em] px-[1em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink">
//                         Create Teacher
//                     </button>
//                 </div>
//             </form>
//         </DashboardLayout>
//     );
// }
