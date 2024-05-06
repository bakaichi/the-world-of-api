import Mongoose from "mongoose";

const { Schema } = Mongoose;

const characterSchema = new Schema({
  name: String,
});

export const CharacterMongoose = Mongoose.model("Character", characterSchema);