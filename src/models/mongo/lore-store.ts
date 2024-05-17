import { LoreMongoose } from "./lore.js";
import { Lore } from "../../types/contribution-types.js";

export const loreStore = {
    async find(): Promise<Lore[]> {
        const lores = await LoreMongoose.find().populate("charactersinv").populate("lore").lean();
        return lores;
      },
    
      async findBy(id: string): Promise<Lore[] | null> {
        const lore = await LoreMongoose.find({ contributor: id });
        if (!lore){
          return null;
        }
        return lore;
      },
    
      async add(lore: Lore): Promise<Lore | null> {
        let newLore = new LoreMongoose({ ...lore });
        await newLore.save();
       // newLore = await LoreMongoose.findOne({ _id: newLore._id }).populate("lore").lean() as any;
        return newLore;
      },
    
      async delete() {
        await LoreMongoose.deleteMany({});
      },

      async findOne(id: string): Promise<Lore | null> {
        const lore = await LoreMongoose.findById(id).populate("charactersinv").lean();
        if (!lore) {
          return null;
        }
        return lore;
      },

      async update(lore: Lore): Promise<Lore | null> {
        const updatedLore = await LoreMongoose.findByIdAndUpdate(lore._id, lore, { new: true }).lean();
        return updatedLore;
      },
 };