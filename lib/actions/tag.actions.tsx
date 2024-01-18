"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Tag, { ITag } from "@/database/tags.mode";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();
    const { userId, limit = 3 } = params;
    const user = await User.findById(userId);
    if (!user) throw new Error("user not found");
    //find interactions for the user and group by tags....
    //Interaction....
    return [
      { _id: "1", name: "tag 1" },
      { _id: "2", name: "tag 2" },
    ];
  } catch (error) {
    throw error;
  }
}
export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    //const { userId, limit = 3 } = params;
    //const user = await User.findById(userId);
    //if (!user) throw new Error("user not found");
    //find interactions for the user and group by tags....
    //Interaction....
    const tags = await Tag.find({}).sort({ createdAt: -1 });
    return { tags };
  } catch (error) {
    throw error;
  }
}
export async function getQuestionsByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();
    const { tagId, page = 1, pageSize = 10, searchQuery } = params;
    const tagFilter: FilterQuery<ITag> = { _id: tagId };
    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: {
          createdAt: -1,
        },
      },
      populate: [
        {
          path: "tags",
          model: Tag,
          select: "_id name",
        },
        {
          path: "author",
          model: User,
          select: "_id clerkId name picture",
        },
      ],
    });
    console.log(tag, "printing tag");
    if (!tag) {
      throw new Error("tags not found");
    }
    const questions = tag.questions;
    return { tagTitle: tag.name, questions };
  } catch (error) {
    throw error;
  }
}

export async function getTopPopularTags() {
  try {
    connectToDatabase();
    const popularTags = await Tag.aggregate([
      {
        $addFields: {
          totalQuestions: { $size: "$questions" },
        },
      },
    ])
      .sort({ totalQuestions: -1 })
      .limit(5);
    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
