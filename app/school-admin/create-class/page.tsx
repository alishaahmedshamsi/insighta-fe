"use client";
import React, { useState } from "react";
import DashboardLayout from "@/components/layouts/dashboard.layout";
import { schoolAdminLeftSidebarLinks } from "@/components/left-sidebar/schoolAdmin";
import { SCHOOL_ADMIN_QUICK_START_LIST } from "@/utils";
import { createClass } from "@/services/apis/school.api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function ClassCreate() {
  const [classInput, setClassInput] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (/^(10|[1-9])$/.test(value) || value === "") {
      setClassInput(value);
      setError("");
    } else {
      setError("Please enter a single digit (1-9) or 10.");
    }
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const inputNumber = Number(classInput);

    if (
      classInput === "" ||
      !Number.isInteger(inputNumber) ||
      inputNumber < 1 ||
      inputNumber > 10
    ) {
      setError("Please enter a single digit (1-9) or 10.");
    } else {
      setError("");
      const { response, success } = await createClass(inputNumber);
      if (!success) {
        toast.error(response);
      } else {
        toast.success("Class Created successfully");
        setClassInput(""); // Clear the input field on success
      }
    }
  };

  return (
    <DashboardLayout
      mainSectionHeading={"Create Class"}
      quickStartList={SCHOOL_ADMIN_QUICK_START_LIST}
      leftSidebarLinks={schoolAdminLeftSidebarLinks()}
    >
      <div className="flex justify-center min-h-64  ">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
            Create a New Class
          </h2>
          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label
                htmlFor="classInput"
                className="block text-sm font-medium text-gray-700"
              >
                Class
              </label>
              <input
                id="classInput"
                className="mt-1 block w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-sea-green focus:border-brand-sea-green"
                type="text"
                placeholder="Enter class number (1-10)"
                value={classInput}
                onChange={handleInputChange}
              />
              {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
            </div>
            <div className="flex justify-end">
              <Button
                size={"lg"}
                type="submit"
                className="bg-brand-sea-green hover:bg-brand-pink"
              >
                Create
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
}
