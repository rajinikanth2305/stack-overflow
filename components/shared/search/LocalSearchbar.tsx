"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React from "react";
interface CustomInputProps {
  route: string;
  iconPosition: string;
  imgSrc: string;
  placeholder: string;
  otherClasses: string;
}
const LocalSearchbar = ({
  route,
  iconPosition,
  imgSrc,
  placeholder,
  otherClasses,
}: CustomInputProps) => {
  return (
    <div className="w-full relative">
      <div
        className={`background-light800_darkgradient relative flex min-h-[56px] grow items-center gap-4 rounded-[10px] px-4 ${otherClasses}`}
      >
        {iconPosition == "left" && (
          <Image
            src={imgSrc}
            width={24}
            height={24}
            className="cursor-pointer"
            alt="search"
          />
        )}
        <Input
          type="text"
          placeholder={placeholder}
          value=""
          onChange={() => {}}
          className="no-focus paragraph-regular placeholder text-dark400_light700 border-none bg-transparent shadow-none outline-none"
        />
        {iconPosition == "right" && (
          <Image
            src={imgSrc}
            width={24}
            height={24}
            className="cursor-pointer"
            alt="search"
          />
        )}
      </div>
    </div>
  );
};

export default LocalSearchbar;
