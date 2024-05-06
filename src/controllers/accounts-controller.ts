import { db } from "../models/db.js";
import { Request, ResponseToolkit } from "@hapi/hapi";

export const accountsController = {
  index: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      return h.view("Main", { title: "Welcome to Avatar" });
    },
  },
  showSignup: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      return h.view("Signup", { title: "Sign up for Avatar" });
    },
  },
  signup: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      const user = request.payload;
      await db.userStore.add(user);
      return h.redirect("/");
    },
  },
  showLogin: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      return h.view("Login", { title: "Login to Avatar" });
    },
  },
  login: {
    auth: false,
    handler: async function (request: Request, h: ResponseToolkit) {
      const { email, password } = request.payload as any;
      const user = await db.userStore.findBy(email);
      if (!user || user.password !== password) {
        return h.redirect("/");
      }
      request.cookieAuth.set({ id: user._id });
      return h.redirect("/dashboard");
    },
  },
  logout: {
    handler: async function (request: Request, h: ResponseToolkit) {
      request.cookieAuth.clear();
      return h.redirect("/");
    },
  },

  async validate(request: Request, session: any) {
    const user = await db.userStore.findOne(session.id);
    if (!user) {
      return { isValid: false };
    }
    return { isValid: true, credentials: user };
  },
};