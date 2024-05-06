import { Db } from "../types/lore-types.js";
import { connectMongo } from "./mongo/connect.js";


export const db: Db = {
  userStore: null,
  loreStore: null,
  characterStore: null,
};

export function connectDb(dbType: string) {
  switch (dbType) {
    case "mongo":
      connectMongo(db);
      break;
    default:
  }
}