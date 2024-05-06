import Mongoose from "mongoose";

const { Schema } = Mongoose;

const loreSchema = new Schema({
    bookno: Number,
    charactersinv: String,
    lore: String,
    lat: String,
    lng: String,
    contributor: String,
});

export const LoreMongoose = Mongoose.model( "Lore", loreSchema );