"use client";
import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { EditProfileSchema } from "@/lib/validation";
import { Textarea } from "../ui/textarea";
import { updateUser } from "@/lib/actions/user.action";
interface UserProps {
  user: string;
  clerkId: string;
}
const EditProfile = ({ user, clerkId }: UserProps) => {
  const parsedUser = JSON.parse(user);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const form = useForm<z.infer<typeof EditProfileSchema>>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      username: parsedUser.username || "",
      name: parsedUser.name || "",
      location: parsedUser?.location || "",
      bio: parsedUser?.bio || "",
      portfolioWebsite: parsedUser?.portfolioWebsite || "",
    },
  });
  async function onSubmit(values: z.infer<typeof EditProfileSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsSubmitting(true);

    try {
      //router.back
      await updateUser({
        clerkId,
        updateData: {
          name: values.name,
          username: values.username,
          portfolioWebsite: values.portfolioWebsite,
          location: values.location,
          bio: values.bio,
        },
        path: pathname,
      });
      router.back();
    } catch (error) {
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <>
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-3.5">
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Name
                  <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="shadcn"
                    {...field}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Username
                  <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="your username "
                    {...field}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Location
                  <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Where are you from ?"
                    {...field}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portfolioWebsite"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Portfolio Link
                </FormLabel>
                <FormControl>
                  <Input
                    type="url"
                    placeholder="Your url"
                    {...field}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="paragraph-semibold text-dark400_light800">
                  Bio
                  <span className="text-primary-500">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter your bio"
                    {...field}
                    className="no-focus paragraph-regular background-light900_dark300 light-border-2 text-dark300_light700 min-h-[56px] border"
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end">
            <Button
              className="primary-gradient w-fit  px-4 py-3 !text-light-900 min-h-[46px]"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Saving" : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default EditProfile;
