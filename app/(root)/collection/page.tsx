import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/HomeFilter/Filter";
import HomeFilter from "@/components/shared/HomeFilter/Filter";
import HomeFilters from "@/components/shared/HomeFilter/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters, QuestionFilters } from "@/constants/filters";
import Question from "@/database/question.model";
import { getQuestions } from "@/lib/actions/question.action";
import { getSavedQuestions } from "@/lib/actions/user.action";
import { UserButton, auth } from "@clerk/nextjs";
import Link from "next/link";
export default async function Home() {
  const { userId } = auth();
  if (!userId) return null;
  const result = await getSavedQuestions({ clerkId: userId });
  return (
    <>
      <h1 className="h1-bold text-dark100_light900">Saved Questions</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={QuestionFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>
      <div className="mt-10 w-full flex flex-col gap-6">
        {/*looping througn questions */}
        {/*eslint-disable-next-line*/}
        {result && result?.questions?.length > 0 ? (
          result?.questions?.map((question) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
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
            title="There is no saved question to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kickstart the
        discussion. our query could be the next big thing others learn from. Get
        involved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>
    </>
  );
}
