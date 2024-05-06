import { db } from "../models/db.js";
export const dashboardController = {
    index: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            return h.view("Dashboard", {
                title: "World Builder",
                user: loggedInUser
            });
        },
    },
    addLore: {
        handler: async function (request, h) {
            try {
                const loggedInUser = request.auth.credentials;
                const lorePayload = request.payload;
                const newLore = {
                    bookno: lorePayload.bookno,
                    charactersinv: lorePayload.characters,
                    lore: lorePayload.lore,
                    lat: lorePayload.lat,
                    lng: lorePayload.lng,
                    contributor: loggedInUser.username,
                };
                await db.loreStore.add(newLore);
                return h.redirect("/dashboard");
            }
            catch (err) {
                return h.view("main", { errors: [{ message: err.message }] });
            }
        }
    },
    report: {
        handler: async function (request, h) {
            const loggedInUser = request.auth.credentials;
            const lore = await db.loreStore.find();
            return h.view("Report", {
                title: "Report",
                user: loggedInUser,
                lore: lore,
            });
        },
    },
};
