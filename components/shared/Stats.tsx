import { formatAndDivideNumber } from "@/lib/utils";
import Image from "next/image";
import React from "react";
interface StatsCardProps {
  imgUrl: string;
  value: number;
  title: string;
}
const StatsCard = ({ imgUrl, value, title }: StatsCardProps) => {
  return (
    <div className="light-border background-light900_dark300  flex flex-wrap items-center justify-start gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
      <Image src={imgUrl} alt="ttile" width={40} height={50} />
      <div>
        <p className="paragraph-semibold text-dark200_light900">{value}</p>
        <p className="text-dark400_light700 body-medium">{title}</p>
      </div>
    </div>
  );
};
interface Props {
  totalQuestions: number;
  totalAnswers: number;
}
const Stats = ({ totalQuestions, totalAnswers }: Props) => {
  return (
    <div className="mt-10">
      <h4 className="h3-semibold text-dark200_light900"> Stats</h4>
      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <div className="light-border background-light900_dark300  flex flex-wrap items-center justify-evenly gap-4 rounded-md border p-6 shadow-light-300 dark:shadow-dark-200">
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatAndDivideNumber(totalQuestions)}
            </p>
            <p className="text-dark400_light700 body-medium">Questions</p>
          </div>
          <div>
            <p className="paragraph-semibold text-dark200_light900">
              {formatAndDivideNumber(totalAnswers)}
            </p>
            <p className="text-dark400_light700 body-medium">Answers</p>
          </div>
        </div>
        <StatsCard
          imgUrl="/assets/icons/gold-medal.svg"
          value={0}
          title="Gold Badges"
        />
        <StatsCard
          imgUrl="/assets/icons/silver-medal.svg"
          value={0}
          title="Silver Badges"
        />
        <StatsCard
          imgUrl="/assets/icons/bronze-medal.svg"
          value={0}
          title="Bronze Badges"
        />
      </div>
    </div>
  );
};

export default Stats;
{
  /*<div>
      <h3 className="h3-semibold text-dark200_light900 mt-5">Stats</h3>
      <div className="flex flex-col sm:w-full sm:flex-row mt-5">
        <div className="card-wrapper background-light900_dark300 w-[257px] h-[90px] rounded-[6px] flex items-center justify-between px-[43px]">
          <div className="flex flex-col">
            <p className="text-dark200_light900 body-regular">156</p>
            <p className="text-dark400_light700 body-medium">Questions</p>
          </div>
        </div>
      </div>
  </div>*/
}
