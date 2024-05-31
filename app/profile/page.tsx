'use client'
import DashboardLayout from '@/components/layouts/dashboard.layout'
import { schoolAdminLeftSidebarLinks } from '@/components/left-sidebar/schoolAdmin'
import { studentLeftSidebarLinks } from '@/components/left-sidebar/student'
import { superAdminLeftSidebarLinks } from '@/components/left-sidebar/supAdmin'
import { teacherLeftSidebarLinks } from '@/components/left-sidebar/teacher'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GalleryUpload } from '@/components/upload/GalleryUpload'
import { useCurrentUser } from '@/hooks/user.hook'
import { updateUser } from '@/services/apis/user.api'
import { IUserUpdate } from '@/types/type'
import { SCHOOL_ADMIN_QUICK_START_LIST, STUDENT_QUICK_START_LIST, SUPER_ADMIN_QUICK_START_LIST, TEACHER_QUICK_START_LIST } from '@/utils'
import { userUpdateSchema } from '@/validation/user.validation'
import { zodResolver } from '@hookform/resolvers/zod'
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'

export default function Page() {

  const router = useRouter();
  const queryClient = useQueryClient();
  const [coverFile, setCoverFile] = useState();
  const [cover, setCover] = useState("");

  const { user, isError, isLoading } = useCurrentUser()

    const { mutateAsync, error, reset } = useMutation({
    mutationFn: updateUser,

    onError: (error) => {
      console.log(error.message);
      setTimeout(() => {
        reset();
      }, 3000);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["current-user"] });
    }
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }, // isSubmitting for loading state
  } = useForm<IUserUpdate>({ resolver: zodResolver(userUpdateSchema) });

  const onSubmit: SubmitHandler<IUserUpdate> = async (data, e) => {
    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("location", data.location);
    formData.append("image", coverFile ?? "");

    const { success, response } = await mutateAsync(formData);
    if (!success) return toast.error(response);
    if (success) toast.success("Profile updated successfully");
  }

  if (isLoading) return <div>Loading...</div>
  if (isError || !user) return <div>{isError || "user doesnt exst"}</div>

  return (
    <DashboardLayout
      mainSectionHeading={"Profile"}
      // pointsEarned={"400"}
      quickStartList={user.role === "school" ? SCHOOL_ADMIN_QUICK_START_LIST : user.role === "admin" ? SUPER_ADMIN_QUICK_START_LIST : user.role === "teacher" ? TEACHER_QUICK_START_LIST : STUDENT_QUICK_START_LIST}
      leftSidebarLinks={user.role === "school" ? schoolAdminLeftSidebarLinks() : user.role === "admin" ? superAdminLeftSidebarLinks() : user.role === "teacher" ? teacherLeftSidebarLinks() : studentLeftSidebarLinks()}
    >
      <div className="p-6 bg-white rounded-lg shadow-md">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <GalleryUpload
              setFile={setCoverFile} // Ensure this prop is correctly set to update the file state
              cover={cover} // Ensure this prop is correctly set to display the image preview
              setImage={setCover} // Ensure this prop is correctly set to update the image state
              id="cover"
              placeholder="Update Profile Picture"
            />
          </div>
          <div className="mb-4">
            <Input
              {...register("fullname")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type='text'
              placeholder='Enter your name'
            />
          </div>
          <div className="mb-4">
            <Input
              {...register("location")}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              type='text'
              placeholder='Location'
            />
          </div>

          <Button>{isSubmitting ? "Updating" : "Submit"}</Button>
        </form>
      </div>

    </DashboardLayout>
  )
}
