import Boom from "@hapi/boom";
import { Request, ResponseToolkit } from "@hapi/hapi";
import { db } from "../models/db.js";
import { Lore, Character } from "../types/contribution-types.js";
import { Readable } from "stream";

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
        try {
          const character = await db.characterStore.findOne(request.params.id) as Character;
          if (!character) {
            return Boom.notFound("No Character with this id");
          }
  
          const payload = request.payload as { lore: any, images: any };
          
          const lorePayload = JSON.parse(payload.lore) as Lore;
          const images = payload.images;
  
          // Handle images
          const imageUrls = await handleImages(images);
  
          const lore: Lore = {
            bookno: lorePayload.bookno,
            charactersinv: character.name,
            lat: lorePayload.lat,
            lng: lorePayload.lng,
            lore: lorePayload.lore,
            contributor: lorePayload.contributor,
            nation: lorePayload.nation,
            images: imageUrls,
          };
  
          // Add new lore to DB
          const newLore = await db.loreStore.add(lore as Lore);
          return h.response(newLore).code(200);
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
      payload: {
        output: "stream",
        parse: true,
        allow: "multipart/form-data",
        multipart: true,
        maxBytes: 10 * 1024 * 1024, // Limit filesize to 10mb
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

    findById: {
      auth: {
        strategy: "jwt",
      },
      handler: async function (request: Request, h: ResponseToolkit) {
        try {
          const lore = await db.loreStore.findOne(request.params.id);
          if(!lore){
            return Boom.notFound("No Lore with this id");
          }
          return h.response(lore).code(200);
        } catch (err) {
          return Boom.serverUnavailable("DB error");
        }
      },
    },

    deleteImage: {
      auth: {
        strategy: "jwt",
      },
      handler: async function (request: Request, h: ResponseToolkit) {
        try {
          const { loreId, imageUrl } = request.payload as { loreId: string; imageUrl: string };
          const lore = await db.loreStore.findOne(loreId);
          if (!lore) {
            return Boom.notFound("No Lore with this id");
          }
  
          lore.images = lore.images.filter((img: string) => img !== imageUrl);
          await db.loreStore.update(lore);
  
          return h.response({ success: true }).code(200);
        } catch (err) {
          return Boom.serverUnavailable("Database Error");
        }
      },
    },

  };

  // Function to handle image processing
  async function handleImages(images: any): Promise<string[]> {
    if (!images) return [];
    
    const imageUrls: string[] = [];
  
    // images could be an array or a single object depending on the upload
    const imageArray = Array.isArray(images) ? images : [images];
  
    for (const image of imageArray) {
      const imageData = await new Promise<string>((resolve, reject) => {
        const chunks: Buffer[] = [];
        (image as Readable).on('data', (chunk: Buffer) => {
          chunks.push(chunk);
        });
        (image as Readable).on('end', () => {
          const buffer = Buffer.concat(chunks);
          const base64Image = buffer.toString('base64');
          resolve(base64Image);
        });
        (image as Readable).on('error', (err: Error) => {
          reject(err);
        });
      });
  
      imageUrls.push(`data:${image.hapi.headers['content-type']};base64,${imageData}`);
    }
  
    return imageUrls;
  }