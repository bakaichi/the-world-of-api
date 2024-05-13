import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { Lore, Character } from "../types/contribution-types.js";

export const loreApi = {
    findAll: {
      auth: {
        strategy: "jwt",
      },
      handler: async function (request: Request, h: ResponseToolkit) {
        try {
          const lores = await db.loreStore.find();
          return h.response(lores).code(200);
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
    },
  
    findByCharacter: {
      auth: {
        strategy: "jwt",
      },
      handler: async function (request: Request, h: ResponseToolkit) {
        const lores = (await db.loreStore.findBy(request.params.id)) as Lore;
        return h.response(lores).code(200);
      },
    },
  
    addLore: {
      auth: {
        strategy: "jwt",
      },
      handler: async function (request: Request, h: ResponseToolkit) {
        const character = (await db.characterStore.findOne(request.params.id)) as Character;
        if (character === null) {
          return Boom.notFound("No Character with this id");
        }
        const lorePayload = request.payload as Lore;
        const lore = {
          bookno: lorePayload.bookno,
          charactersinv: character.name,
          lat: lorePayload.lat,
          lng: lorePayload.lng,
          lore: lorePayload.lore,
          contributor: lorePayload.contributor,
          nation: lorePayload.nation,
        };
        const newLore = (await db.loreStore.add(lore)) as Lore;
        return h.response(newLore).code(200);
      },
    },
  
    deleteAll: {
      auth: {
        strategy: "jwt",
      },
      handler: async function (request: Request, h: ResponseToolkit) {
        console.log("delete...");
        await db.loreStore.delete();
        return h.response().code(204);
      },
    },
  };