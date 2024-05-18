import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { sanitizeInput, sanitizeOutput } from "../utils/sanitization.js";
import { Character } from "../types/contribution-types.js"; // Ensure you have this type defined


export const characterApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function ( request: Request, h: ResponseToolkit) {
            const characters = await db.characterStore.find();
            const sanitizedCharacters = characters.map((character: Character) => ({
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
        handler: async function (request: Request, h: ResponseToolkit) {
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
          } catch (err) {
            return Boom.notFound("No Character with this id");
          }
        },
      },

      create: {
        auth: {
          strategy: "jwt",
        },
        handler: async function (request: Request, h: ResponseToolkit) {
          const characterPayload = request.payload as Character;
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
        handler: async function (request: Request, h: ResponseToolkit) {
          await db.characterStore.delete();
          return h.response().code(204);
        },
      },
    
      deleteOne: {
        auth: {
          strategy: "jwt",
        },
        handler: async function (request: Request, h: ResponseToolkit) {
          await db.characterStore.deleteOne(request.params.id);
          return h.response().code(204);
        },
      },

};