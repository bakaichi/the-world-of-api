import Mongoose from "mongoose";

const { Schema } = Mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
});

export const UserMongoose = Mongoose.model("User", userSchema);