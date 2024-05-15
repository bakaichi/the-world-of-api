import { userApi } from "./api/users-api.js";
import { characterApi } from "./api/character-api.js";
import { loreApi } from "./api/lore-api.js";
export const apiRoutes = [
    { method: "GET", path: "/api/users", config: userApi.find },
    { method: "POST", path: "/api/users", config: userApi.create },
    { method: "DELETE", path: "/api/users", config: userApi.deleteAll },
    { method: "GET", path: "/api/users/{id}", config: userApi.findOne },
    { method: "POST", path: "/api/users/authenticate", config: userApi.authenticate },
    { method: "GET", path: "/api/characters", config: characterApi.find },
    { method: "GET", path: "/api/characters/{id}", config: characterApi.findOne },
    { method: "POST", path: "/api/characters", config: characterApi.create },
    { method: "DELETE", path: "/api/characters/{id}", config: characterApi.deleteOne },
    { method: "DELETE", path: "/api/characters", config: characterApi.deleteAll },
    { method: "GET", path: "/api/lores", config: loreApi.findAll },
    { method: "GET", path: "/api/characters/{id}/lores", config: loreApi.findByCharacter },
    { method: "POST", path: "/api/characters/{id}/lores", config: loreApi.addLore },
    { method: "DELETE", path: "/api/lores", config: loreApi.deleteAll },
    { method: "GET", path: "/api/lores/{id}", config: loreApi.findById },
];
