import { CharacterMongoose } from "./character.js";
import { Character } from "../../types/contribution-types.js";

export const characterStore = {
    async find(): Promise<Character[]> {
        const characters = await CharacterMongoose.find().lean();
        return characters;
    },

    async findOne(id: string): Promise<Character | null> {
        const character = await CharacterMongoose.findOne({ _id: id }).lean();
        return character;
    },

    async findBy(name: string): Promise<Character | null> {
        const character = await CharacterMongoose.findOne({
            name,
        });
        return character;
    },

    capitalizeFirstLetter(string: string) {
        return string
          .split(" ") // splits the name into multiple words
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
          .join(" "); // rejoin words
      }
};