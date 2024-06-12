"use client";

import { useState, ChangeEvent } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import { registerTeacherSchema } from "@/validation";
import { onRegister } from "@/services/apis";
import { fetchClasses } from "@/services/apis/school.api";

import { IRegisterFields, ApiResponse, IClasses } from "@/types/type";
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

export default function SchoolAdminCreateTeacher() {
    const [teacherData, setTeacherData] = useState<IRegisterFields>({
		fullname: "",
		email: "",
		password: "",
		classes: [],
		subject: [],
		role: "teacher",
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
                updatedClasses[index].classId = value;
            } else if (name === "subject") {
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
            classes: [...teacherData.classes, { classId: "", subject: "" }],
        });
    };

    const removeClass = (classIndex: number) => {
        const updatedClasses = [...teacherData.classes];
        if (updatedClasses.length > 1) {
            updatedClasses.splice(classIndex, 1);
        }
        setTeacherData({ ...teacherData, classes: updatedClasses });
    };

    const { mutateAsync, error, reset } = useMutation({
        mutationFn: onRegister,
        onError: (error) => {
            console.log(error.message);
            setTimeout(() => {
                reset();
            }, 3000);
        },
    });
    const [open, setOpen] = useState(false);
    const [selectedClass, setSelectedClass] = useState("");
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm<IRegisterFields>({
        resolver: zodResolver(registerTeacherSchema),
    });

    const onSubmit: SubmitHandler<IRegisterFields> = async (data, e) => {
        e?.preventDefault();
        console.log("DATAAAAA", data);
        data.role = "teacher";
        const { success, response } = await mutateAsync(data);

        if (!success) return toast.error(response);
        if (success) toast.success("Teacher created successfully");
    };

    const {
        data,
    }: {
        data: ApiResponse<IClasses> | undefined;
        isLoading: boolean;
    } = useQuery({
        queryKey: ["fetch-classes"],
        queryFn: () => fetchClasses(),
    });

    return (
        <DashboardLayout
            mainSectionHeading={"Create Teacher"}
            quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
            leftSidebarLinks={schoolAdminLeftSidebarLinks()}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]"
            >
                <div className="grid grid-cols-2 gap-[1em]">
                    <div className="w-full flex flex-col col-span-2">
                        <label htmlFor="name">Name</label>
                        <input
                            className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
                            id="name"
                            type="text"
                            value={teacherData.fullname}
                            {...register("fullname")}
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label htmlFor="email">Email</label>
                        <input
                            className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
                            id="email"
                            type="email"
                            value={teacherData.email}
                            {...register("email")}
                        />
                    </div>
                    <div className="w-full flex flex-col">
                        <label htmlFor="password">Password</label>
                        <input
                            className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
                            id="password"
                            type="text"
                            value={teacherData.password}
                            {...register("password")}
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
                                <label htmlFor={`class-${classIndex}`}>Class</label>
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-full justify-between"
                                        >
                                            {selectedClass
                                                ? data?.data.find(item => item._id === selectedClass)?.className
                                                : "Select Class"}
                                            <ArrowDownCircleIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[400px] p-0">
                                        <Command>
                                            <CommandInput placeholder="Search classes..." />
                                            <CommandList>
                                                <CommandEmpty>No classes found.</CommandEmpty>
                                                <CommandGroup>
                                                    {data?.data.map((item) => (
                                                        <CommandItem
                                                            key={item._id}
                                                            onSelect={() => {
                                                                setSelectedClass(item._id);
                                                                handleInputChange({ target: { name: 'class', value: item._id } } as ChangeEvent<HTMLInputElement>, 'classes', classIndex);
                                                                setOpen(false);
                                                            }}
                                                        >
                                                            <Check
                                                                className={`mr-2 h-4 w-4 ${selectedClass === item._id ? 'opacity-100' : 'opacity-0'}`}
                                                            />
                                                            {item.className}
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>
                                </Popover>
                                {errors.classes && (
                                    <span>{errors.classes.message}</span>
                                )}
                            </div>
                            <div className="flex flex-col w-full">
                                <label>Subject</label>
                                <input
                                    className="col-span-3 p-[.8em] rounded-[1em] border border-[#ddd] bg-white"
                                    type="text"
                                    name="subject"
                                    value={classItem.subject}
                                    onChange={(e) => handleInputChange(e, "classes", classIndex)}
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
            </form>
        </DashboardLayout>
    );
}




















// "use client";
// import DashboardLayout from "@/components/layouts/dashboard.layout";
// import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
// import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
// import { ChangeEvent, useState } from "react";

// import { registerTeacherSchema } from "@/validation";
// import { onRegister } from "@/services/apis";
// import { useMutation, useQuery } from "@tanstack/react-query";
// import { IRegisterTeacherFields, ApiResponse, IClasses } from "@/types/type";
// import { fetchClasses } from "@/services/apis/school.api";
// import { toast } from "sonner";
// import { SubmitHandler, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import {
// 	Popover,
// 	PopoverContent,
// 	PopoverTrigger,
// } from "@/components/ui/popover";
// import {
// 	Command,
// 	CommandEmpty,
// 	CommandGroup,
// 	CommandInput,
// 	CommandItem,
// 	CommandList,
// } from "@/components/ui/command";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { ArrowDownCircleIcon, Check } from "lucide-react";

// export default function SchoolAdminCreateTeacher() {
// 	const [teacherData, setTeacherData] = useState({
// 		name: "",
// 		qualification: "",
// 		email: "",
// 		password: "",
// 		teacherId: "",
// 		classes: [{ name: "", subject: "" }],
// 	});

// 	const handleInputChange = (
// 		e: ChangeEvent<HTMLInputElement>,
// 		field?: string,
// 		index = -1
// 	) => {
// 		const { name, value } = e.target;

// 		if (field === "classes") {
// 			const updatedClasses = [...teacherData.classes]; // Create new array for re-rendering
// 			if (name === "class") {
// 				updatedClasses[index].name = value;
// 			} else if (name.startsWith("subject")) {
// 				updatedClasses[index].subject = value;
// 			}
// 			setTeacherData({ ...teacherData, classes: updatedClasses });
// 		} else {
// 			setTeacherData({ ...teacherData, [name]: value });
// 		}
// 	};

// 	const addClass = () => {
// 		setTeacherData({
// 			...teacherData,
// 			classes: [...teacherData.classes, { name: "", subject: "" }],
// 		});
// 	};

// 	const removeClass = (classIndex: number) => {
// 		const updatedClasses = [...teacherData.classes];
// 		if (updatedClasses.length > 1) {
// 			// Ensure there's at least one class
// 			updatedClasses.splice(classIndex, 1);
// 		}
// 		setTeacherData({ ...teacherData, classes: updatedClasses });
// 	};

// 	// -----------------------

// 	const { mutateAsync, error, reset } = useMutation({
// 		mutationFn: onRegister,
// 		onError: (error) => {
// 			console.log(error.message);
// 			setTimeout(() => {
// 				reset();
// 			}, 3000);
// 		},
// 	});
// 	const [open, setOpen] = useState(false);
// 	const [selectedClass, setSelectedClass] = useState("");
// 	const {
// 		register,
// 		handleSubmit,
// 		setValue,
// 		formState: { errors, isSubmitting }, // isSubmitting for loading state
// 	} = useForm<IRegisterFields>({
// 		resolver: zodResolver(registerTeacherSchema),
// 	});
// 	console.log(errors);

// 	const onSubmit: SubmitHandler<IRegisterFields> = async (data, e) => {
// 		e?.preventDefault();

// 		console.log("DATAAAAA", data);
// 		data.role = "teacher";
// 		const { success, response } = await mutateAsync(data);

// 		if (!success) return toast.error(response);
// 		if (success) toast.success("Teacher created successful");
// 	};

// 	// -----------------
// 	const {
// 		data,
// 	}: {
// 		data: ApiResponse<IClasses> | undefined;
// 		isLoading: boolean;
// 	} = useQuery({
// 		queryKey: ["fetch-classes"],
// 		queryFn: () => fetchClasses(),
// 	});

// 	return (
// 		<DashboardLayout
// 			mainSectionHeading={"Create Teacher"}
// 			quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
// 			leftSidebarLinks={schoolAdminLeftSidebarLinks()}
// 		>
// 			<form
// 				onSubmit={handleSubmit(onSubmit)}
// 				className="rounded-[2em] flex flex-col gap-[2em] pb-[2em]"
// 			>
// 				<div className="grid grid-cols-2 gap-[1em]">
// 					<div className="w-full flex flex-col col-span-2">
// 						<label htmlFor="name">Name</label>
// 						<input
// 							className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
// 							id="name"
// 							type="text"
// 							// name="name"
// 							// value={teacherData.name}
// 							// onChange={(e) => handleInputChange(e)}
// 							{...register("fullname")}
// 						/>
// 					</div>

// 					{/* <div className="w-full flex flex-col">
// 						<label htmlFor="qualification">Qualification</label>
// 						<input
// 							className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
// 							id="qualification"
// 							type="text"
// 							name="qualification"
// 							value={teacherData.qualification}
// 							onChange={(e) => handleInputChange(e)}

// 						/>
// 					</div> */}

// 					<div className="w-full flex flex-col">
// 						<label htmlFor="email">Email</label>
// 						<input
// 							className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
// 							id="email"
// 							type="email"
// 							// name="email"
// 							// value={teacherData.email}
// 							// onChange={(e) => handleInputChange(e)}
// 							{...register("email")}

// 						/>
// 					</div>

// 					<div className="w-full flex flex-col">
// 						<label htmlFor="password">Password</label>
// 						<input
// 							className="rounded-[1em] border border-[#ddd] bg-white p-[.8em]"
// 							id="password"
// 							type="text"
// 							// name="password"
// 							// value={teacherData.password}
// 							// onChange={(e) => handleInputChange(e)}
// 							{...register("password")}

// 						/>
// 					</div>
// 				</div>

// 				<div className="flex flex-col gap-[1em] rounded-[2em] p-[2.5em] border border-[#ddd]">
// 					{teacherData.classes.map((classItem, classIndex) => (
// 						<div
// 							className="grid grid-cols-2 gap-[1em] items-center relative "
// 							key={classIndex}
// 						>
// 							<div className="flex items-center h-full absolute top-1 left-[-40px]">
// 								<Button
// 									disabled={teacherData.classes.length === 1}
// 									onClick={() => removeClass(classIndex)}
// 									className="text-red-500 bg-transparent rounded-full font-semibold text-[20px] mt-[5px] hover:bg-transparent"
// 								>
// 									&times;
// 								</Button>
// 							</div>
// 							<div className="flex flex-col w-full">
// 								<label htmlFor={`class-${classIndex}`}>
// 									Class
// 								</label>
// 								<Popover open={open} onOpenChange={setOpen}>
// 									<PopoverTrigger asChild>
// 										<Button
// 											variant="outline"
// 											role="combobox"
// 											aria-expanded={open}
// 											className="w-full  justify-between"
// 										>
// 											{selectedClass
// 												? data?.data.find(
// 														(item) =>
// 															item._id ===
// 															selectedClass
// 												  )?.className
// 												: "Select Class"}
// 											<ArrowDownCircleIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
// 										</Button>
// 									</PopoverTrigger>
// 									<PopoverContent className="w-[400px] p-0">
// 										<Command>
// 											<CommandInput placeholder="Search classes..." />
// 											<CommandList>
// 												<CommandEmpty>
// 													No classes found.
// 												</CommandEmpty>
// 												<CommandGroup>
// 													{data?.data.map((item) => (
// 														<CommandItem
// 															key={item._id}
// 															onSelect={() => {
// 																setSelectedClass(
// 																	item._id
// 																);
// 																setValue(
// 																	"classes",
// 																	[item._id]
// 																);
// 																setOpen(false);
// 															}}
// 														>
// 															<Check
// 																className={`mr-2 h-4 w-4 ${
// 																	selectedClass ===
// 																	item._id
// 																		? "opacity-100"
// 																		: "opacity-0"
// 																}`}
// 															/>
// 															{item.className}
// 														</CommandItem>
// 													))}
// 												</CommandGroup>
// 											</CommandList>
// 										</Command>
// 									</PopoverContent>
// 								</Popover>

// 								{errors.classes && (
// 									<span>{errors.classes.message}</span>
// 								)}
// 							</div>

// 							<div className="flex flex-col w-full">
// 								<label>Subject</label>
// 								<input
// 									className="col-span-3 p-[.8em] rounded-[1em] border border-[#ddd] bg-white"
// 									type="text"
// 									{...register("subject")}
// 									// name={`subject`}
// 									// value={classItem.subject}
// 									// onChange={(e) =>
// 									// 	handleInputChange(
// 									// 		e,
// 									// 		"classes",
// 									// 		classIndex
// 									// 	)
// 									// }
// 								/>
// 							</div>
// 						</div>
// 					))}
// 					<hr className="my-2" />
// 					<div className="flex justify-end">
// 						<Button onClick={addClass}>Add Class</Button>
// 					</div>
// 				</div>

// 				<div className="col-span-1 w-full">
// 					<button className="rounded-[1em] bg-brand-sea-green py-[.8em] px-[1em] text-white font-semibold transition duration-300 ease-in-out hover:bg-brand-pink">
// 						Create Teacher
// 					</button>
// 				</div>
// 			</form>
// 		</DashboardLayout>
// 	);
// }
