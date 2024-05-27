'use client';
import React, { useState } from 'react';
import DashboardLayout from '@/components/layouts/dashboard.layout';
import { schoolAdminLeftSidebarLinks } from '@/components/left-sidebar/schoolAdmin';
import { SCHOOL_ADMIN_QUICK_START_LIST } from '@/utils';
import { createClass } from '@/services/apis/school.api';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import useAuthStore from '@/store/auth/auth.store';
import { useRouter } from 'next/navigation';

const userDetails = {
    userName: "School Admin",
    role: "Admin",
    schoolName: "Karachi Public School",
};

export default function ClassCreate() {
    
    const [classInput, setClassInput] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const user = useAuthStore((state) => state.user);
		
	if(!user) {
			router.push('/login')
		}
   

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        
        if (/^(10|[1-9])$/.test(value) || value === '') {
            setClassInput(value);
            setError('');
        } else {
            setError('Please enter a single digit (1-9) or 10.');
        }
    };

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const inputNumber = Number(classInput);

        if (classInput === '' || !Number.isInteger(inputNumber) || (inputNumber < 0 || inputNumber > 10)) {
            setError('Please enter a single digit (1-9) or 10.');
        } else {
            setError('');
            const {response,success} = await createClass(Number(classInput));
            if(!success)  return toast.error(response);
            if(success) toast.success("Class Created successfully");
        }
    };

    return (
        <DashboardLayout
            mainSectionHeading={"Create Class"}
            // pointsEarned={"400"}
            userDetails={{role: user?.role!, userName: user?.fullname!, schoolName: user?.school!}}
            quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
            leftSidebarLinks={schoolAdminLeftSidebarLinks()}
        >
            <form onSubmit={handleFormSubmit}>
                <div className="flex w-full items-center space-x-2 md:w-1/3">
                    <input
                        className="flex h-10 w-full rounded-md border border-black/30 bg-transparent px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                        type="text"
                        placeholder="Class"
                        value={classInput}
                        onChange={handleInputChange}
                    />
                    <Button
                        size={'lg'}                   
                        type="submit"
                    >
                        Create
                    </Button>
                </div>
                {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            </form>
        </DashboardLayout>
    );
}
