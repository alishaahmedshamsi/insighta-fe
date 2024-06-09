"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils";
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
import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponse, IClasses } from "@/types/type";
import { createSubject, fetchClasses } from "@/services/apis/school.api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronsUpDown, PlusCircleIcon, Check, ArrowDownCircleIcon } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import subjectSchema, { Subject } from "@/validation/subject.validation";

export default function Page() {
  const {
    isLoading,
    data,
    error,
  }: {
    data: ApiResponse<IClasses> | undefined;
    error: any;
    isLoading: boolean;
  } = useQuery({
    queryKey: ["fetch-classes"],
    queryFn: () => fetchClasses(),
  });

  const [open, setOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState("");

  const { mutateAsync, reset } = useMutation({
    mutationFn: createSubject,
    onError: (error) => {
      console.log(error.message);
      setTimeout(() => {
        reset();
      }, 3000);
    },
  });

  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Subject>({
    resolver: zodResolver(subjectSchema),
  });

  const onSubmit: SubmitHandler<Subject> = async (data) => {
    const { success, response } = await mutateAsync(data);
    if (!success) return toast.error(response);
    if (success) toast.success("Subject Created successfully");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error(error);
    return null;
  }

  return (
    <DashboardLayout
      mainSectionHeading="Create Subject"
      quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
      leftSidebarLinks={schoolAdminLeftSidebarLinks()}
    >
      <div className="bg-white p-8 rounded-lg shadow-md flex flex-col">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full  justify-between"
                  >
                    {selectedClass
                      ? data?.data.find((item) => item._id === selectedClass)?.className
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
                              setValue("class", item._id);
                              setOpen(false);
                            }}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${
                                selectedClass === item._id
                                  ? "opacity-100"
                                  : "opacity-0"
                              }`}
                            />
                            {item.className}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              {errors.class && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.class.message}
                </p>
              )}
            </div>
            <div>
              <Input
                type="text"
                placeholder="Subject"
                className="w-full "
                {...register("name")}
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full flex items-center justify-center transition duration-300 ease-in-out"
              disabled={isSubmitting}
            >
              <PlusCircleIcon className="w-6 h-6 mr-2" /> Create Subject
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
