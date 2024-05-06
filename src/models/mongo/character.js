import { Schema, model } from "mongoose";
const characterSchema = new Schema({
    name: String,
});
export const CharacterMongoose = model("Character", characterSchema);
