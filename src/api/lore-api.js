import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { sanitizeInput, sanitizeOutput } from "../utils/sanitization.js";
export const loreApi = {
    findAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const lores = await db.loreStore.find();
                const sanitizedLores = lores.map((lore) => ({
                    ...lore,
                    lore: sanitizeOutput(lore.lore),
                    contributor: sanitizeOutput(lore.contributor),
                }));
                return h.response(sanitizedLores).code(200);
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
            const sanitizedLores = lores.map(lore => ({
                ...lore,
                lore: sanitizeOutput(lore.lore),
                contributor: sanitizeOutput(lore.contributor),
            }));
            return h.response(sanitizedLores).code(200);
        },
    },
    addLore: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const character = await db.characterStore.findOne(request.params.id);
                if (!character) {
                    return Boom.notFound("No Character with this id");
                }
                const payload = request.payload;
                const lorePayload = JSON.parse(sanitizeInput(payload.lore));
                const images = payload.images;
                // Handle images
                const imageUrls = await handleImages(images);
                const lore = {
                    bookno: lorePayload.bookno,
                    charactersinv: sanitizeInput(character.name),
                    lat: lorePayload.lat,
                    lng: lorePayload.lng,
                    lore: sanitizeInput(lorePayload.lore),
                    contributor: sanitizeInput(lorePayload.contributor),
                    nation: sanitizeInput(lorePayload.nation),
                    images: imageUrls,
                };
                // Add new lore to DB
                const newLore = await db.loreStore.add(lore);
                return h.response(newLore).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
        payload: {
            output: "stream",
            parse: true,
            allow: "multipart/form-data",
            multipart: true,
            maxBytes: 3 * 1024 * 1024, // Limit filesize to 3mb
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
    findById: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const lore = await db.loreStore.findOne(request.params.id);
                if (!lore) {
                    return Boom.notFound("No Lore with this id");
                }
                const sanitizedLore = {
                    ...lore,
                    lore: sanitizeOutput(lore.lore),
                    contributor: sanitizeOutput(lore.contributor),
                };
                return h.response(sanitizedLore).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("DB error");
            }
        },
    },
    deleteImage: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const { loreId, imageUrl } = request.payload;
                const lore = await db.loreStore.findOne(loreId);
                if (!lore) {
                    return Boom.notFound("No Lore with this id");
                }
                lore.images = lore.images.filter((img) => img !== imageUrl);
                await db.loreStore.update(lore);
                return h.response({ success: true }).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
};
// Function to handle image processing
async function handleImages(images) {
    if (!images)
        return [];
    const imageUrls = [];
    // images could be an array or a single object depending on the upload
    const imageArray = Array.isArray(images) ? images : [images];
    for (const image of imageArray) {
        const imageData = await new Promise((resolve, reject) => {
            const chunks = [];
            image.on('data', (chunk) => {
                chunks.push(chunk);
            });
            image.on('end', () => {
                const buffer = Buffer.concat(chunks);
                const base64Image = buffer.toString('base64');
                resolve(base64Image);
            });
            image.on('error', (err) => {
                reject(err);
            });
        });
        imageUrls.push(`data:${image.hapi.headers['content-type']};base64,${imageData}`);
    }
    return imageUrls.map(url => sanitizeOutput(url));
}
