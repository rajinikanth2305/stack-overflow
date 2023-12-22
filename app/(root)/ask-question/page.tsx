import Question from "@/components/forms/Question";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  //const {userId}=auth()
  // if(!userId){
  //   redirect("/sign-in")
  // }
  const userId = "clerk123";
  const mongoUser = await getUserById({ userId });
  console.log(mongoUser, "show in terminal");
  return (
    <div>
      <h1 className="h1-bold text-dark100_light900">Ask a question</h1>
      <div className="mt-9">
        <Question mongoUserId={JSON.stringify(mongoUser._id)} />
      </div>
    </div>
  );
};

export default Page;
