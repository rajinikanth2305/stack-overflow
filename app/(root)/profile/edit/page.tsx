import EditProfile from "@/components/forms/EditProfile";
import { getUserById } from "@/lib/actions/user.action";
import { auth } from "@clerk/nextjs";
import React from "react";

const page = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  const user = await getUserById({ userId });
  return (
    <div className="flex flex-col gap-3">
      <h1 className="h1-bold text-dark100_light900">Edit Profile</h1>
      <EditProfile user={JSON.stringify(user)} clerkId={userId} />
    </div>
  );
};

export default page;
