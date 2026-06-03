import { Token } from "../types.js";

export {};

declare global {
  namespace Express {
    interface Request {
      token?: Token;
    }
  }
}
