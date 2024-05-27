import { convertImage } from "@/lib/utils";
import { X } from "lucide-react";
import Image from "next/image";
import React from 'react';

export const GalleryUpload = ({
  image,
  setFile,
  setImage,
  id,
  placeholder,
}:any) => {
  const handleFileChange = async (file:any) => {
    try {
      setFile(file);
      const base64Image = await convertImage(file);
      setImage(base64Image);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="relative my-2 sm:w-[160px] w-[160px] h-[160px] flex items-center justify-center">
      {image && (
        <div 
          className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 cursor-pointer"
          onClick={() => setImage(null)}
        >
          <X size={16} />
        </div>
      )}
      <label
        htmlFor={id}
        className="cursor-pointer w-full h-full flex items-center justify-center rounded-full flex-col bg-[#F0F0F0] border-2 border-primary"
      >
        {image ? (
          <Image
            src={image}
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
        onChange={(e) => handleFileChange(e.target.files?.[0])}
      />
    </div>
  );
};
