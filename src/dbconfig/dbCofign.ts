import mongoose, { mongo } from "mongoose";

export const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected", () => {
      console.log("MongoDb Connected");
    });
    connection.on("error", (error) => {
      console.log("MongoDB Connection Error" + error);
      process.exit();
    });
  } catch (error) {
    console.log("Error from mongoDb" + error);
  }
};
