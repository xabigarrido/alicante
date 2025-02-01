import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://piconeratriana:123@cluster0.jqecv.mongodb.net/TaskManager?retryWrites=true&w=majority"
    );
    console.log(">>>Db is connected");
  } catch (error) {
    console.log(error);
  }
};
