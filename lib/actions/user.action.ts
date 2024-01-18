"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  CreateUserParams,
  DeleteUserParams,
  GetAllUsersParams,
  GetSavedQuestionsParams,
  GetUserByIdParams,
  GetUserStatsParams,
  ToggleSaveQuestionParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import { FilterQuery } from "mongoose";
import Question from "@/database/question.model";
import Tag from "@/database/tags.mode";
import Answer from "@/database/answer.model";

export async function getUserById(params: any) {
  try {
    await connectToDatabase();
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    return user;
  } catch (error) {
    throw error;
  }
}

export async function createUser(userParam: CreateUserParams) {
  try {
    connectToDatabase();
    const newUser = await User.create(userParam);
    return newUser;
  } catch (error) {
    console.log(error, "error message");
    throw error;
  }
}
export async function updateUser(params: UpdateUserParams) {
  try {
    connectToDatabase();
    const { clerkId, updateData, path } = params;
    await User.findOneAndUpdate({ clerkId }, updateData, {
      new: true,
    });
    revalidatePath(path);
  } catch (error) {
    console.log(error, "error message");
    throw error;
  }
}
export async function deleteUser(params: DeleteUserParams) {
  try {
    connectToDatabase();
    const { clerkId } = params;
    const user = await User.findOneAndDelete({ clerkId });
    if (!user) {
      throw new Error("user not found");
    }

    //delete user from databse
    //and questions,answers,comments
    //get user question id
    const userQuestionIds = await Question.find({
      author: user._id,
    }).distinct("_id");

    //delete user questions
    await Question.deleteMany({ author: user._id });

    //TODO: delte user answers,comments,etc...

    const deletedUser = await User.findByIdAndDelete(user._id);
    return deletedUser;
  } catch (error) {
    console.log(error, "error message");
    throw error;
  }
}

export async function getAllUsers(params: GetAllUsersParams) {
  try {
    connectToDatabase();
    //const {page=1,pageSize=20,filter,searchQuery}=params;
    const users = await User.find({}).sort({ createdAt: -1 });
    return { users };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function toggleSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();
    const { userId, questionId, path } = params;
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("user not found");
    }
    const isQuestionSaved = user.saved.includes(questionId);
    if (isQuestionSaved) {
      await User.findByIdAndUpdate(
        userId,
        {
          $pull: { saved: questionId },
        },
        {
          new: true,
        }
      );
    } else {
      await User.findByIdAndUpdate(
        userId,
        {
          $addToSet: { saved: questionId },
        },
        {
          new: true,
        }
      );
    }

    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}

export async function removeSaveQuestion(params: ToggleSaveQuestionParams) {
  try {
    connectToDatabase();
    const { userId, questionId, path } = params;
    let updateQuery = {};
    updateQuery = {
      $pull: { saved: questionId },
    };
    const removeSaveQuestion = await User.findByIdAndUpdate(
      userId,
      updateQuery,
      {
        new: true,
      }
    );
    if (!removeSaveQuestion) {
      throw new Error("Question not found");
    }
    revalidatePath(path);
  } catch (error) {
    throw error;
  }
}

export async function getSavedQuestions(params: GetSavedQuestionsParams) {
  try {
    connectToDatabase();
    const { clerkId, page = 1, pageSize = 10, filter, searchQuery } = params;
    const query: FilterQuery<typeof Question> = searchQuery
      ? { title: { $regex: new RegExp(searchQuery, "i") } }
      : {};
    const user = await User.findOne({ clerkId: clerkId }).populate({
      path: "saved",
      match: query,
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
    if (!user) {
      throw new Error("user not found");
    }
    const savedQuestions = user.saved;
    return { questions: savedQuestions };

    //return user;
  } catch (error) {
    throw error;
  }
}
export async function getUserProfile(params: GetUserByIdParams) {
  try {
    const { userId } = params;
    const user = await User.findOne({ clerkId: userId });
    if (!user) {
      throw new Error("user not found");
    }
    const totalQuestions = await Question.countDocuments({ author: user._id });
    const totalAnswers = await Answer.countDocuments({ author: user._id });
    return { user, totalQuestions, totalAnswers };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getQuestionByUserId(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;
    const totalQuestions = await Question.countDocuments({ author: userId });
    const questions = await Question.find({ author: userId })
      .sort({ views: -1, upvotes: -1 })
      .populate({ path: "tags", model: Tag, select: "_id name" })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });
    return { questions, totalQuestions };
  } catch (error) {
    throw error;
  }
}
export async function getUserAnswers(params: GetUserStatsParams) {
  try {
    connectToDatabase();
    const { userId, page = 1, pageSize = 10 } = params;
    const totalAnswers = await Answer.countDocuments({ author: userId });
    const answers = await Answer.find({ author: userId })
      .sort({ upvotes: -1 })
      .populate({
        path: "question",
        model: Question,
        select: "_id title",
      })
      .populate({
        path: "author",
        model: User,
        select: "_id clerkId name picture",
      });
    return { totalAnswers, answers };
  } catch (error) {
    console.log(error, "chekcign error");
    throw error;
  }
}
