import { getTopInteractedTags } from "@/lib/actions/tag.actions";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import RenderTag from "../shared/RenderTag";

interface Props {
  tag: {
    _id: string;
    name: string;
    questions: [];
  };
}

const TagCard = async ({ tag }: Props) => {
  return (
    <Link
      href={`/tags/${tag._id}`}
      className="shadow-light100_darknone w-full max-xs:min-w-full xs:w-[260px]"
    >
      <article className="background-light900_dark200 light-border flex w-full flex-col rounded-2xl border p-8">
        <div className="background_light800-dark400 w-fit rounded-sm px-5 py-1.5">
          <p className="paragraph-semibold text-dark300_light900">{tag.name}</p>
        </div>
        <p className="small-medium text-dark400_light500 mt-3.5">
          <span className="body-semibold primary-text-gradient mr-2.5">
            {tag.questions.length}+
          </span>
          Questions
        </p>
      </article>
    </Link>
  );
};

export default TagCard;
