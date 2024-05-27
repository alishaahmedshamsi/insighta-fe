"use client";
import { IPagination } from "@/types/type";
import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export const Pagination = ({ data }: { data: IPagination }) => {
  const { currentPage, hasNextPage, hasPrevPage, totalPages } = data;
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = (pageNumber: number) => {
    const queryParams = new URLSearchParams(searchParams);
    queryParams.set("page", pageNumber.toString());

    const queryString = queryParams.toString();
    router.push(`${pathname}?${queryString}`, { scroll: false });
  };

  return (
    <div className="flex items-center gap-x-2 py-3 px-4 rounded-md bg-gray-100 shadow-md">
      <Button
        variant="ghost"
        disabled={!hasPrevPage}
        className="border border-gray-300 flex items-center gap-x-2 text-gray-700 font-bold hover:text-white hover:bg-blue-600"
        onClick={() => handlePageChange(currentPage - 1)}
      >
        <ChevronLeft className="w-5 h-5" />
        Prev
      </Button>
      {hasPrevPage && (
        <Button
          variant="ghost"
          className="hover:bg-blue-600 hover:text-white border border-gray-300 text-gray-700"
          onClick={() => handlePageChange(currentPage - 1)}
        >
          {currentPage - 1}
        </Button>
      )}
      <Button className="bg-blue-600 text-white font-bold">
        {currentPage}
      </Button>
      {hasNextPage && (
        <Button
          variant="ghost"
          className="hover:bg-blue-600 hover:text-white border border-gray-300 text-gray-700"
          onClick={() => handlePageChange(currentPage + 1)}
        >
          {currentPage + 1}
        </Button>
      )}
      {totalPages > 2 && totalPages - currentPage > 1 && (
        <>
          <Button disabled variant="ghost" className="text-gray-500">
            ...
          </Button>

          <Button
            variant="ghost"
            className="border border-gray-300 hover:bg-blue-600 hover:text-white text-gray-700"
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Button>
        </>
      )}

      <Button
        variant="ghost"
        className="border border-gray-300 flex items-center gap-x-2 hover:bg-blue-600 hover:text-white text-gray-700"
        disabled={!hasNextPage}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
        <ChevronRight className="w-5 h-5" />
      </Button>
    </div>
  );
};
