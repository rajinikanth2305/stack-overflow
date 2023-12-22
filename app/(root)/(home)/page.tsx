import QuestionCard from "@/components/cards/QuestionCard";
import Filter from "@/components/shared/HomeFilter/Filter";
import HomeFilter from "@/components/shared/HomeFilter/Filter";
import HomeFilters from "@/components/shared/HomeFilter/HomeFilters";
import NoResult from "@/components/shared/NoResult";
import LocalSearchbar from "@/components/shared/search/LocalSearchbar";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filters";
import Question from "@/database/question.model";
import { getQuestions } from "@/lib/actions/question.action";
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

// const questions = [
//   {
//     _id: "1",
//     title: "The first question about next js",
//     tags: [
//       {
//         _id: "1",
//         name: "python",
//       },
//       {
//         _id: "2",
//         name: "React",
//       },
//     ],
//     author: {
//       _id: "1",
//       name: "Rajinikanth",
//       picture: "john-doe.jpg",
//     },
//     upvotes: 10,
//     views: 100,
//     answers: [],
//     createdAt: new Date("2023-04-20T00:00:00+02:00"),
//   },
// ];
export default async function Home() {
  const result = await getQuestions({});
  console.log(result?.questions, "checking questions here");
  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient px-4 py-3 !text-light-900 min-h-[46px]">
            Ask A Question
          </Button>
        </Link>
      </div>
      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearchbar
          route="/"
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for questions"
          otherClasses="flex-1"
        />
        <Filter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </div>
      <HomeFilters />
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
            title="There is no question to show"
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
