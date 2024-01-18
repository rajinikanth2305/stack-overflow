"use client";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { formUrlQuery, removeKeysfromQuery } from "@/lib/utils";
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
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const query = searchParams.get("q");
  const [value, setValue] = useState(query || "");
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (value) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "q",
          value: value,
        });
        router.push(newUrl, { scroll: false });
      } else {
        if (pathname == route) {
          const newUrl = removeKeysfromQuery({
            params: searchParams.toString(),
            keys: ["q"],
          });
          router.push(newUrl, { scroll: false });
        }
      }
    }, 500);
    return () => clearTimeout(delayDebounceFn);
  }, [value, route, pathname, router, searchParams, query]);

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
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
