import Boom from "@hapi/boom";
import { db } from "../models/db.js";
import { createToken } from "./jwt-utils.js";
import { sanitizeInput, sanitizeOutput } from "../utils/sanitization.js";
export const userApi = {
    find: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const users = await db.userStore.find();
                const sanitizedUsers = users.map((user) => ({
                    ...user,
                    username: sanitizeOutput(user.username),
                    email: sanitizeOutput(user.email),
                }));
                return h.response(sanitizedUsers).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
    findOne: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                const user = await db.userStore.findOne(request.params.id);
                if (user === null) {
                    return Boom.notFound("No User with this id");
                }
                const sanitizedUser = {
                    ...user,
                    username: sanitizeOutput(user.username),
                    email: sanitizeOutput(user.email),
                };
                return h.response(sanitizedUser).code(200);
            }
            catch (err) {
                return Boom.serverUnavailable("Database error");
            }
        },
    },
    create: {
        auth: false,
        handler: async function (request, h) {
            try {
                const userPayload = request.payload;
                const sanitizedUserPayload = {
                    ...userPayload,
                    username: sanitizeInput(userPayload.username),
                    email: sanitizeInput(userPayload.email),
                    password: sanitizeInput(userPayload.password),
                };
                const user = await db.userStore.add(sanitizedUserPayload);
                return h.response({ success: true }).code(201);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
    deleteAll: {
        auth: {
            strategy: "jwt",
        },
        handler: async function (request, h) {
            try {
                await db.userStore.delete();
                return h.response().code(204);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
    authenticate: {
        auth: false,
        handler: async function (request, h) {
            const payload = request.payload;
            try {
                const user = (await db.userStore.findBy(payload.email));
                if (user === null)
                    return Boom.unauthorized("User not found");
                const passwordsMatch = payload.password === user.password;
                if (!passwordsMatch)
                    return Boom.unauthorized("Invalid password");
                const token = createToken(user);
                return h.response({ success: true,
                    name: `${user.username}`,
                    token: token, _id: user._id
                }).code(201);
            }
            catch (err) {
                return Boom.serverUnavailable("Database Error");
            }
        },
    },
};
