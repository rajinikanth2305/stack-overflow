import Question from "@/components/forms/Question";
import { getQuestionById } from "@/lib/actions/question.action";
import { getUserById } from "@/lib/actions/user.action";
import { URLProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async ({ params, searchParams }: URLProps) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }
  //const userId = "clerk123";
  const mongoUser = await getUserById({ userId });

  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Edit question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser?._id)} />
      </div>
    </div>
  );
};

export default Page;
