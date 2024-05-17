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
  bookno: number;
  charactersinv: string;
  lat: number;
  lng: number;
  lore: string;
  contributor: string;
  nation: string;
  _id?: string; 
  images: string[]; 
};

export type Db = {
  userStore: any;
  characterStore: any;
  loreStore: any;
};
