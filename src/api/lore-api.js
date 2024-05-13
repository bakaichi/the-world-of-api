import Boom from "@hapi/boom";
import { db } from "../models/db.js";
export const loreApi = {
    findAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const lores = await db.loreStore.find();
                return h.response(lores).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
    findByCharacter: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const lores = (await db.loreStore.findBy(request.params.id));
            return h.response(lores).code(200);
        },
    },
    addLore: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const character = (await db.characterStore.findOne(request.params.id));
            if (character === null) {
                return Boom.notFound("No Character with this id");
            }
            const lorePayload = request.payload;
            const lore = {
                bookno: lorePayload.bookno,
                charactersinv: character.name,
                lat: lorePayload.lat,
                lng: lorePayload.lng,
                lore: lorePayload.lore,
                contributor: lorePayload.contributor,
                nation: lorePayload.nation,
            };
            const newLore = (await db.loreStore.add(lore));
            return h.response(newLore).code(200);
        },
    },
    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            console.log("delete...");
            await db.loreStore.delete();
            return h.response().code(204);
        },
    },
};
