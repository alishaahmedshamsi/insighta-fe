import { convertImage } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from 'react';

export const GalleryUpload = ({
  setFile,
  cover,
  setImage,
  id,
  placeholder,
}: any) => {
  const handleFileChange = async (file: File) => {
    try {
      setFile(file); // Update the coverFile state with the selected file
      const base64Image = await convertImage(file);
      setImage(base64Image); // Update the cover state with the base64 image
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative my-2 sm:w-[160px] w-[160px] h-[160px] flex items-center justify-center">
      <label
        htmlFor={id}
        className="cursor-pointer w-full h-full flex items-center justify-center rounded-full flex-col bg-[#F0F0F0] border-2 border-primary"
      >
        {cover ? (
          <Image
            src={cover}
            alt="Profile Picture"
            width={160}
            height={160}
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <>
            <div className="w-12 h-12 rounded-full border-2 border-primary flex items-center justify-center mb-2">
              <i className="fas fa-plus"></i>
            </div>
            <p className="font-normal text-xs text-center">{placeholder}</p>
          </>
        )}
      </label>
      <input
        type="file"
        id={id}
        className="hidden"
        accept="image/*"
        onChange={(e) => e.target.files && handleFileChange(e.target.files[0])}
      />
    </div>
  );
};
