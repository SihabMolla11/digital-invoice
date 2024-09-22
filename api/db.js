import mongoose from "mongoose";

export const connectWithDatabase = async (db_url) => {
  try {
    await mongoose.connect(db_url);
  } catch (error) {
    console.log(error.message);
  }
};
