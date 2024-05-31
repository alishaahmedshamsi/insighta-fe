'use client'
import DashboardLayout from '@/components/layouts/dashboard.layout'
import { schoolAdminLeftSidebarLinks } from '@/components/left-sidebar/schoolAdmin'
import { studentLeftSidebarLinks } from '@/components/left-sidebar/student'
import { superAdminLeftSidebarLinks } from '@/components/left-sidebar/supAdmin'
import { teacherLeftSidebarLinks } from '@/components/left-sidebar/teacher'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GalleryUpload } from '@/components/upload/GalleryUpload'
import { fetchCurrentUser } from '@/services/apis'
import { SCHOOL_ADMIN_QUICK_START_LIST, STUDENT_QUICK_START_LIST, SUPER_ADMIN_QUICK_START_LIST, TEACHER_QUICK_START_LIST } from '@/utils'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Page() {
  
  const router = useRouter();
    const [coverFile, setCoverFile] = useState();
  const [cover, setCover] = useState("");
  const {
		data: user,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["current-user"],
		queryFn: fetchCurrentUser,
	});

  if(isLoading){
    return <div>Loading...</div>
  }

  if(isError){
    return <div>Error...</div>
  }

  return (
    <DashboardLayout
      mainSectionHeading={"Profile"}
      // pointsEarned={"400"}
      quickStartList={user.role === "school" ? SCHOOL_ADMIN_QUICK_START_LIST : user.role === "admin" ? SUPER_ADMIN_QUICK_START_LIST : user.role === "teacher" ? TEACHER_QUICK_START_LIST : STUDENT_QUICK_START_LIST}
      leftSidebarLinks={user.role === "school" ? schoolAdminLeftSidebarLinks() : user.role === "admin" ? superAdminLeftSidebarLinks() : user.role === "teacher" ? teacherLeftSidebarLinks() : studentLeftSidebarLinks()}
    >
      <div className="p-6 bg-white rounded-lg shadow-md">
        <div className="mb-4">
            <GalleryUpload
             image={cover}
             setFile={setCoverFile}
             setImage={setCover}
             id="cover"
             placeholder="Update Profile Picture"
            />
        </div>
        <div className="mb-4">
          <Input 
          
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type='text' 
            placeholder='Enter your name' 
          />
        </div>
        <div className="mb-4">
          <Input 
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type='text' 
            placeholder='Location' 
          />
        </div>
       
        <Button>Submit</Button>
      </div>
    </DashboardLayout>
  )
}
