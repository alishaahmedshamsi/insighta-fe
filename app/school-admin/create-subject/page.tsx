"use client";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ApiResponse, IClasses } from "@/types/type";
import { createSubject, fetchClasses } from "@/services/apis/school.api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircleIcon } from "lucide-react";
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
      <div className="bg-white p-8 rounded-lg shadow-md max-w-lg mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Create a New Subject
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div>
              <Select onValueChange={(value) => setValue("class", value)}>
                <SelectTrigger className="w-full">
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
                        <SelectItem key={item._id} value={String(item._id)}>
                          {item.className}
                        </SelectItem>
                      ))
                    )}
                  </SelectGroup>
                </SelectContent>
              </Select>
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
                className="w-full"
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
              className="w-full flex items-center justify-center bg-brand-sea-green hover:bg-brand-pink transition duration-300 ease-in-out"
            >
              <PlusCircleIcon className="w-6 h-6 mr-2" /> Create Subject
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
