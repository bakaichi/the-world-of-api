import { CharacterMongoose } from "./character.js";

export const characterStore = {
    async find () {
        const characters = await CharacterMongoose.find().lean();
        return characters;
    },

    async findOne(id) {
        const character = await CharacterMongoose.findOne({ _id: id }).lean();
        return character;
    },

    async findBy(name) {
        const character = await CharacterMongoose.findOne({
            name,
        });
        return character;
    },

    capitalizeFirstLetter(string) {
        return string
          .split(" ") // splits the name into multiple words
          .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) 
          .join(" "); // rejoin words
      }
};