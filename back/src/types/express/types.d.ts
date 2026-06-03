import { Token, User } from "../types.js";

export {};

declare global {
  namespace Express {
    interface Request {
      token?: Token;
      user?: User;
    }
  }
}
