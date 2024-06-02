"use client";


import React from "react";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { SUPER_ADMIN_QUICK_START_LIST } from "@/utils/constant/constant";
import { superAdminLeftSidebarLinks } from "@/components/left-sidebar/supAdmin";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema } from "@/validation";

import { useMutation } from "@tanstack/react-query";
import { onRegister } from "@/services/apis";
import { toast } from "sonner";
import { IRegisterFields } from "@/types/type";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";


export default function Component() {
  const { mutateAsync, error, reset } = useMutation({
    mutationFn: onRegister,
    onError: (error) => {
      console.log(error.message);
      setTimeout(() => {
        reset();
      }, 3000);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterFields>({ resolver: zodResolver(registerSchema) });


  const onSubmit: SubmitHandler<IRegisterFields> = async (data, e) => {
    data.role = "school";
    const { success, response } = await mutateAsync(data);
    if (!success) return toast.error(response);
    if (success) toast.success("School created successful");
    reset();
  }
    return (
      <>
        <DashboardLayout
          mainSectionHeading={"Create School"}
          quickStartList={SUPER_ADMIN_QUICK_START_LIST}
          leftSidebarLinks={superAdminLeftSidebarLinks()}
        >
          <div className="rounded-lg p-6 bg-white shadow-md">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block font-medium text-gray-700"
                >
                  Name
                </label>
                <Input
                  {...register("fullname")}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 w-full"
                  id="name"
                  type="text"
                />
                {errors.fullname && (
                  <span className="text-red-500">
                    {errors.fullname.message}
                  </span>
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block font-medium text-gray-700"
                >
                  Email
                </label>
                <Input
                  {...register("email")}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 w-full"
                  id="name"
                  type="text"
                />
                {errors.email && (
                  <span className="text-red-500">{errors.email.message}</span>
                )}
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block font-medium text-gray-700"
                >
                  password
                </label>
                <Input
                  {...register("password")}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 w-full"
                  id="name"
                  type="text"
                />
                {errors.password && (
                  <span className="text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </div>
              <div className="flex justify-end">
                <Button disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create School"}
                </Button>
              </div>
            </form>
          </div>
        </DashboardLayout>
      </>
    );
  };


