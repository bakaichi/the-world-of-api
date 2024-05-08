import { userApi } from "./api/users-api.js";
import { characterApi } from "./api/character-api.js";
import { loreApi } from "./api/lore-api.js";

export const apiRoutes = [
  { method: "GET" as const, path: "/api/users", config: userApi.find },
  { method: "POST" as const, path: "/api/users", config: userApi.create },
  { method: "DELETE" as const, path: "/api/users", config: userApi.deleteAll },
  { method: "GET" as const, path: "/api/users/{id}", config: userApi.findOne },
  { method: "POST" as const, path: "/api/users/authenticate", config: userApi.authenticate },

  { method: "GET" as const, path: "/api/characters", config: characterApi.find },
  { method: "GET" as const, path: "/api/characters/{id}", config: characterApi.findOne },
  { method: "POST" as const, path: "/api/characters", config: characterApi.create },
  { method: "DELETE" as const, path: "/api/characters/{id}", config: characterApi.deleteOne },
  { method: "DELETE" as const, path: "/api/characters", config: characterApi.deleteAll },

  { method: "GET" as const, path: "/api/lores", config: loreApi.findAll },
  { method: "GET" as const, path: "/api/characters/{id}/lores", config: loreApi.findByCharacter },
  { method: "POST" as const, path: "/api/characters/{id}/lores", config: loreApi.addLore },
  { method: "DELETE" as const, path: "/api/lores", config: loreApi.deleteAll },

];

