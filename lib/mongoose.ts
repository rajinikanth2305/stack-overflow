import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);
  if (!process.env.MONGODB_URL) {
    return console.log("MISSING MONGODB URL");
  }
  if (isConnected) {
    return console.log("MONGO DB IS already connected");
  }
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "devoverflow",
    });
    isConnected = true;
    console.log("mongo db is connected");
  } catch (error) {
    console.log("connection failed mongo db", error);
  }
};
