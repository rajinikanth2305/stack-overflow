import Image from "next/image";
import Link from "next/link";
import React from "react";
import RenderTag from "../RenderTag";

const RightSidebar = () => {
  const hotQuestions = [
    {
      _id: "1",
      title:
        "Best practices for data fetching in a Next.js application with Server-Side Rendering (SSR)?",
    },
    {
      _id: "2",
      title: "Is it only me or the font is bolder than necessary?",
    },
    {
      _id: "3",
      title: "Can I get the course for free?",
    },
    {
      _id: "4",
      title: "Redux Toolkit Not Updating State as Expected",
    },
    {
      _id: "5",
      title: "Async/Await Function Not Handling Errors Properly",
    },
  ];
  const popularTags = [
    {
      _id: "1",
      name: "javascript",
      totalQuestions: 5,
    },
    {
      _id: "2",
      name: "react",
      totalQuestions: 10,
    },
    {
      _id: "3",
      name: "next js",
      totalQuestions: 20,
    },
  ];
  return (
    <section className="custom-scrollbar  background-light900_dark200 light-border sticky right-0 gap-6 top-0 flex flex-col  border-l overflow-y-auto w-fit h-screen p-6 pt-36 shadow-light-300 dark:shadow-none max-xl:hidden lg:w-[350px]">
      <div className="flex flex-col flex-1 gap-6">
        <h3 className="h3-bold text-dark300_light900">Top Questions</h3>
        <div className="flex flex-col gap-[30px] mt-7 w-full">
          {hotQuestions.map((question, index) => (
            <Link
              href={`/questions/${question._id}`}
              className="flex items-center justify-between cursor-pointer gap-7"
            >
              <p className="text-dark500_light700 body-medium">
                {question.title}
              </p>
              <Image
                src="/assets/icons/chevron-right.svg"
                width={20}
                height={20}
                className="invert-colors"
                alt="arrow"
              />
            </Link>
          ))}
        </div>
      </div>
      <div className="mt-16">
        <h3 className="h3-bold text-dark300_light900">Popular Tags</h3>
        <div className="flex flex-col gap-4 mt-7 w-full ">
          {popularTags.map((tag) => (
            <RenderTag
              key={tag._id}
              id={tag._id}
              name={tag.name}
              showCount={true}
              totalQuestions={tag.totalQuestions}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RightSidebar;
