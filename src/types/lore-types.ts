import { characterStore } from "../models/mongo/character-store";

export type User = {
    username: string;
    email: string;
    password: string;
    _id: string;
  };
  
  export type Character = {
    name: string;
    _id: string;
  };

  export type Lore = {
    bookno: number,
    charactersinv: string,
    lore: string,
    lat: string,
    lng: string,
    contributor: string,
  };

  export type Db = {
    userStore: any;
    characterStore: any;
    loreStore: any;
  };