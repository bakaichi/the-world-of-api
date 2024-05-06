import { Schema, model } from "mongoose";
import { Character } from "../../types/lore-types"

const characterSchema = new Schema<Character>({
  name: String,
});

export const CharacterMongoose = model("Character", characterSchema);