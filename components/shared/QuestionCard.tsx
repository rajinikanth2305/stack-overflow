import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const QuestionCard = () => {
  const tags = [
    { name: "REACT JS", value: "react js" },
    {
      name: "REDUX",
      value: "redux",
    },
    {
      name: "NEXT JS",
      value: "next js",
    },
    {
      name: "NEXT JS",
      value: "next js",
    },
    {
      name: "NEXT JS",
      value: "next js",
    },
  ];
  return (
    <div className="mt-10 w-full flex flex-col gap-6">
      {tags.map((question) => (
        <Link href="/">
          <div className="card-wrapper w-full px-[45px] py-9 rounded-[12px] sm:px-11">
            <div className="flex flex-col">
              <h3 className="h3-semibold text-dark200_light900 line-clamp-1">
                The Lightning Component c:LWC_PizzaTracker generated invalid
                output for field status. Error How to solve this
              </h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map((tag) => (
                  <Button className="rounded-[6px] subtle-medium px-6 py-3 capitalize shadow-none bg-light-800 text-light-500 dark:bg-dark-300">
                    {tag.name}
                  </Button>
                ))}
              </div>
              <div className="flex-between w-full mt-6 flex-wrap gap-3">
                <Link href="/" className="flex-center gap-2">
                  <Image
                    src="/assets/icons/avatar.svg"
                    width={20}
                    height={20}
                    alt="iamge"
                    className="invert-colors"
                  />
                  <p className="body-medium text-dark400_light700 flex items-center gap-1">
                    Satheesh
                    <span className="small-regular line-clamp-1">
                      . asked 99 days ago
                    </span>
                  </p>
                </Link>
                <Link href="/" className="flex-center gap-2">
                  <div className="flex gap-1">
                    <Image
                      src="/assets/icons/like.svg"
                      width={20}
                      height={20}
                      alt="image"
                      className="invert-colors"
                    />
                    <p className="small-medium text-dark400_light800">
                      1.2k votes
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Image
                      src="/assets/icons/message.svg"
                      width={20}
                      height={20}
                      alt="iamge"
                      className="invert-colors"
                    />
                    <p className="small-medium text-dark400_light800 ">
                      900 Answers
                    </p>
                  </div>
                  <div className="flex gap-1">
                    <Image
                      src="/assets/icons/eye.svg"
                      width={20}
                      height={20}
                      alt="iamge"
                      className="invert-colors"
                    />
                    <p className="small-medium text-dark400_light800">
                      5.2k views
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default QuestionCard;
