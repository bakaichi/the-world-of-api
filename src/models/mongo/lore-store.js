import { LoreMongoose } from "./lore.js";

export const loreStore = {
    async find() {
        const lore = await LoreMongoose.find().populate("charactersinv").populate("lore").lean();
        return lore;
      },
    
      async findBy(id) {
        const lore = await LoreMongoose.find({ contributor: id });
        return lore;
      },
    
      async add(lore) {
        let newLore = new LoreMongoose({ ...lore });
        await newLore.save();
        newLore = await LoreMongoose.findOne({ _id: newLore._id }).populate("lore").lean();
        return newLore;
      },
    
      async delete() {
        await LoreMongoose.deleteMany({});
      },
 };