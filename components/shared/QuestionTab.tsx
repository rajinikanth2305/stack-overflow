import { getQuestionByUserId } from "@/lib/actions/user.action";
import React from "react";
import NoResult from "./NoResult";
import QuestionCard from "../cards/QuestionCard";
import { SearchParamsProps } from "@/types";
interface Props extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}
const QuestionTab = async ({ userId, clerkId, searchProps }: Props) => {
  const result = await getQuestionByUserId({ userId, page: 1 });
  return (
    <div className="mt-10 flex flex-col gap-6 w-full">
      {result && result?.questions?.length > 0 ? (
        result?.questions?.map((question) => (
          <QuestionCard
            key={question._id}
            _id={question._id}
            clerkId={clerkId}
            title={question.title}
            tags={JSON.parse(JSON.stringify(question.tags))}
            author={JSON.parse(JSON.stringify(question.author))}
            upvotes={question.upvotes}
            views={question.views}
            answers={question.answers}
            createdAt={question.createdAt}
          />
        ))
      ) : (
        <NoResult
          title="There is no question to show"
          description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
          link="/ask-question"
          linkTitle="Ask a Question"
        />
      )}
    </div>
  );
};

export default QuestionTab;
