import Answer from "@/components/forms/Answer";
import Metric from "@/components/shared/Metric";
import ParseHTML from "@/components/shared/ParseHTML";
import RenderTag from "@/components/shared/RenderTag";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatAndDivideNumber, getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/actions/user.action";
import { getAllAnswers } from "@/lib/actions/answer.action";
import AllAnswers from "@/components/shared/AllAnswers";
import Votes from "@/components/shared/Votes";

const page = async ({ params, searchParams }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const mongoUser = await getUserById({ userId });

  const result = await getQuestionById({ questionId: params.id });
  return (
    <>
      <div className="flex-start flex-col w-full">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result.author.clerkId}`}
            className="flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              className="rounded-full"
              width={22}
              height={22}
              alt="profile"
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>
          <div className="flex justify-end">
            <Votes
              type="Question"
              itemId={result._id}
              userId={mongoUser._id}
              upvotes={result.upvotes.length}
              hasupVoted={result.upvotes.includes(mongoUser._id)}
              downvotes={result.downvotes.length}
              hasdownVoted={result.downvotes.includes(mongoUser._id)}
              hasSaved={mongoUser?.saved.includes(result._id)}
            />
          </div>
        </div>
        <h2 className="h2-semibold text-dark200_light900 mt-3.5">
          {result.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex flex-wrap gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="upvotes"
          value={`asked ${getTimestamp(result.createdAt)}`}
          title="Asked"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="upvotes"
          value={formatAndDivideNumber(result.answers.length)}
          title="Answers"
          textStyles="small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="upvotes"
          value={formatAndDivideNumber(result.views)}
          title="Views"
          textStyles="small-medium text-dark400_light800"
        />
      </div>
      <ParseHTML data={result.content} />
      <div className="mt-8 flex flex-wrap gap-2">
        {result.tags.map((tag: any) => (
          <RenderTag
            key={tag._id}
            id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>
      <AllAnswers
        questionId={params.id}
        userId={mongoUser._id}
        totalAnswers={result.answers.length}
      />
      <Answer
        questionId={params.id}
        authorId={JSON.stringify(mongoUser._id)}
        question={result.content}
      />
    </>
  );
};

export default page;
