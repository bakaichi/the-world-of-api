import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { sanitizeInput, sanitizeOutput } from "../utils/sanitization.js";
export const characterApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const characters = await db.characterStore.find();
            const sanitizedCharacters = characters.map((character) => ({
                ...character,
                name: sanitizeOutput(character.name),
            }));
            return h.response(sanitizedCharacters).code(200);
        },
    },
    findOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const character = await db.characterStore.findOne(request.params.id);
                if (character === null) {
                    return Boom.notFound("No Character with this id");
                }
                const sanitizedCharacter = {
                    ...character,
                    name: sanitizeOutput(character.name),
                };
                return h.response(sanitizedCharacter).code(200);
            }
            catch (err) {
                return Boom.notFound("No Character with this id");
            }
        },
    },
    create: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            const characterPayload = request.payload;
            const sanitizedCharacterPayload = {
                ...characterPayload,
                name: sanitizeInput(characterPayload.name),
            };
            const character = await db.characterStore.add(sanitizedCharacterPayload);
            if (character !== null) {
                return h.response(character).code(201);
            }
            return Boom.badImplementation("error creating character");
        },
    },
    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            await db.characterStore.delete();
            return h.response().code(204);
        },
    },
    deleteOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            await db.characterStore.deleteOne(request.params.id);
            return h.response().code(204);
        },
    },
};
