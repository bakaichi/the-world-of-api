import { Schema, model } from "mongoose";
import { Lore } from "../../types/contribution-types"


const loreSchema = new Schema<Lore>({
    bookno: Number,
    charactersinv: String,
    lore: String,
    lat: String,
    lng: String,
    contributor: String,
});

export const LoreMongoose = model( "Lore", loreSchema );