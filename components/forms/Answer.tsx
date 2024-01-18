"use client";

import React, { useRef, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnswerSchema } from "@/lib/validation";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "@/context/ThemeProvider";
import * as z from "zod";
import { Button } from "../ui/button";
import Image from "next/image";
import { createAnswer } from "@/lib/actions/answer.action";
import { usePathname } from "next/navigation";

interface Params {
  questionId: string;
  authorId: string;
  question: string;
}
const Answer = ({ questionId, authorId, question }: Params) => {
  const editorRef = useRef(null);
  const pathname = usePathname();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { mode } = useTheme();
  const form = useForm<z.infer<typeof AnswerSchema>>({
    resolver: zodResolver(AnswerSchema),
    defaultValues: {
      answer: "",
    },
  });
  async function handleCreateAnswer(values: z.infer<typeof AnswerSchema>) {
    setIsSubmitting(true);
    try {
      //make  async call to call answer api
      await createAnswer({
        content: values.answer,
        path: pathname,
        question: questionId,
        author: JSON.parse(authorId),
      });
      form.reset();
      if (editorRef.current) {
        const editor = editorRef.current as any;
        editor.setContent("");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div>
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
        <h4 className="paragraph-semibold text-dark400_light800">
          Write your answer here
        </h4>
        <Button className="btn light-border-2 gap-1.5 rounded-md px-4 py-2.5 text-primary-500 dark:text-primary-500">
          <Image
            src="/assets/icons/stars.svg"
            alt="user"
            width={12}
            height={12}
            className="object-contain"
          />
          Generate an AI Answer
        </Button>
      </div>

      <Form {...form}>
        <form
          className="mt-6 flex w-full flex-col gap-10"
          onSubmit={form.handleSubmit(handleCreateAnswer)}
        >
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-3">
                <FormControl className="mt-3.5">
                  {/* add to do */}
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
                    onInit={(evt, editor) => {
                      //@ts-ignore
                      editorRef.current = editor;
                    }}
                    onBlur={field.onBlur}
                    onEditorChange={(content) => field.onChange(content)}
                    init={{
                      height: 350,
                      // selector: "textarea",
                      // content_css: "/app/globals.css",
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "codesample",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "fullscreen",
                      ],
                      toolbar:
                        "undo redo | blocks | " +
                        "codesample | bold italic forecolor | alignleft aligncenter " +
                        "alignright alignjustify | bullist numlist",
                      content_style:
                        "body { font-family:Inter;font-size:16px;}",
                      skin: mode === "dark" ? "oxide-dark" : "oxide",
                      content_css: mode === "dark" ? "dark" : "light",
                    }}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
          <div className="flex justify-end font-text-white">
            <Button
              type="submit"
              className="primary-gradient w-fit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting" : "Post Answer"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Answer;
