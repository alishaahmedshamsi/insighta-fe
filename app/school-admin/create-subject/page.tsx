'use client'
import DashboardLayout from '@/components/layouts/dashboard.layout'
import { schoolAdminLeftSidebarLinks } from '@/components/left-sidebar/schoolAdmin';
import { SCHOOL_ADMIN_QUICK_START_LIST } from '@/utils';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
   
import React from 'react'
import { useQuery } from '@tanstack/react-query';
import { ApiResponse, IClasses } from '@/types/type';
import { fetchClasses } from '@/services/apis/school.api';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function page() {
    const userDetails = {
        userName: "School Admin",
        role: "Admin",
        schoolName: "Karachi Public School",
    };

    const [selectedClass, setSelectedClass] = React.useState("");

    const {
      isLoading,
      data,
      error
    }: { data: ApiResponse<IClasses> | undefined; error: any; isLoading: boolean } =
      useQuery({
        queryKey: ["fetch-classes"],
        queryFn: () => fetchClasses(),
      });

      if(isLoading){
        <div>
          loading...
        </div>
      }
      if(error){
        toast.error(error)
      }

      if(!data){
        return
      }
  return (

    <DashboardLayout
    mainSectionHeading={"Create Subject"}
    // pointsEarned={"400"}
    userDetails={userDetails}
    quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
    leftSidebarLinks={schoolAdminLeftSidebarLinks()}
  >
    <div className="flex flex-col gap-4">
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a Class" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Fruits</SelectLabel>
            {data.data?.map((item) => (
              <SelectItem key={item._id} value={String(item.className)}>
                {item.className}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      <Input type="text" placeholder='Subject' className='max-w-[180px]'/>
      <Button className='bg-red-500 hover:bg-red-300 max-w-[180px]'>Create Subject</Button>
    </div>
  </DashboardLayout>
  )
}
