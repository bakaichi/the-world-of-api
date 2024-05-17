import { LoreMongoose } from "./lore.js";
export const loreStore = {
    async find() {
        const lores = await LoreMongoose.find().populate("charactersinv").populate("lore").lean();
        return lores;
    },
    async findBy(id) {
        const lore = await LoreMongoose.find({ contributor: id });
        if (!lore) {
            return null;
        }
        return lore;
    },
    async add(lore) {
        let newLore = new LoreMongoose({ ...lore });
        await newLore.save();
        // newLore = await LoreMongoose.findOne({ _id: newLore._id }).populate("lore").lean() as any;
        return newLore;
    },
    async delete() {
        await LoreMongoose.deleteMany({});
    },
    async findOne(id) {
        const lore = await LoreMongoose.findById(id).populate("charactersinv").lean();
        if (!lore) {
            return null;
        }
        return lore;
    },
    async update(lore) {
        const updatedLore = await LoreMongoose.findByIdAndUpdate(lore._id, lore, { new: true }).lean();
        return updatedLore;
    },
};
