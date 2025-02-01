import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost/proyectoNew");
    console.log(">>>Db is connected");
  } catch (error) {
    console.log(error);
  }
};
