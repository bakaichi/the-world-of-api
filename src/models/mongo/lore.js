import { Schema, model } from "mongoose";
const loreSchema = new Schema({
    bookno: Number,
    charactersinv: String,
    lore: String,
    lat: String,
    lng: String,
    contributor: String,
    nation: String,
});
export const LoreMongoose = model("Lore", loreSchema);
