'use client'
import DashboardLayout from '@/components/layouts/dashboard.layout'
import { schoolAdminLeftSidebarLinks } from '@/components/left-sidebar/schoolAdmin'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { GalleryUpload } from '@/components/upload/GalleryUpload'
import useAuthStore from '@/store/auth/auth.store'
import { SCHOOL_ADMIN_QUICK_START_LIST } from '@/utils'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function Page() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(null);
  
  console.log(user);

  // if(!user) return router.push('/login')
    const [coverFile, setCoverFile] = useState();
  const [cover, setCover] = useState("");
  

  return (
    <DashboardLayout
      mainSectionHeading={"Profile"}
      // pointsEarned={"400"}
      userDetails={{ role: user?.role!, userName: user?.fullname!, schoolName: user?.school! }}
      quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
      leftSidebarLinks={schoolAdminLeftSidebarLinks()}
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
            placeholder='School Name' 
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
