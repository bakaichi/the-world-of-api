import dotenv from "dotenv";
dotenv.config();

import Hapi, { Server } from "@hapi/hapi";
import Inert from "@hapi/inert";
import Vision from "@hapi/vision";
import Cookie from "@hapi/cookie";
import Handlebars from "handlebars";
import path from "path";
import { fileURLToPath } from "url";
import { accountsController } from "./controllers/accounts-controller.js";
import { webRoutes } from "./web-routes.js";
import { connectDb } from "./models/db.js";
import { apiRoutes } from "./api-routes.js";
import { validate } from "./api/jwt-utils.js";
import jwt from "hapi-auth-jwt2";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


function importEnvs() {
  const result = dotenv.config();
  if (result.error) {
    console.log(result.error.message);
    //process.exit(1); // Exit if there's an error loading .env file
  }
}

async function initPlugins(server: Server) {
  await server.register(Inert);
  await server.register(Vision);
  await server.register(Cookie);
  await server.register(jwt);

  server.views({
    engines: {
      hbs: Handlebars,
    },
    relativeTo: __dirname,
    path: "./views",
    layoutPath: "./views/Layout.hbs",
    partialsPath: "./views/partials",
    layout: true,
    isCached: false,
  });

  server.route({
    method: "GET",
    path: "/public/{param*}",
    handler: {
      directory: {
        path: path.join(__dirname, "src/lib/public"),
        redirectToSlash: true,
        index: true,
      },
    },
  });
}

function initSecurityStrategies(server: Server) {
  const cookieName = process.env.COOKIE_NAME;
  const cookiePassword = process.env.COOKIE_PASSWORD;

  if (!cookieName || !cookiePassword) {
    console.log("Error: COOKIE_NAME and COOKIE_PASSWORD must be set in the environment variables.");
    process.exit(1);
  }

  server.auth.strategy("session", "cookie", {
    cookie: {
      name: cookieName,
      password: cookiePassword,
      isSecure: process.env.NODE_ENV === 'production',
    },
    redirectTo: "/",
    validate: accountsController.validate,
  });
  server.auth.default("session");

  server.auth.strategy("jwt", "jwt", {
    key: cookiePassword,
    validate: validate,
    verifyOptions: { algorithms: ["HS256"] },
  });
}

async function init() {
  importEnvs();
  const server = Hapi.server({
    port: process.env.PORT || 4000,
    routes: { cors: true },
  });
  await initPlugins(server);
  initSecurityStrategies(server);
  connectDb("mongo");
  server.route(webRoutes);
  server.route(apiRoutes);
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();