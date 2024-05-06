import {Schema, model} from "mongoose";
import { User } from "../../types/lore-types";

const userSchema = new Schema<User>({
  username: String,
  email: String,
  password: String,
});

export const UserMongoose = model("User", userSchema);