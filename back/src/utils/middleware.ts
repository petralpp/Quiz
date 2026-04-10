import { Request, Response, NextFunction } from "express";
import z from "zod";

export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({ error: "unknown endpoint" });
};

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error(`${error.name}: ${error.message}`);
  if (error.name === "CastError") {
    res.status(400).send(`Malformatted id: ${error.message}`);
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    res.status(400).json({ error: "Username already in use" });
  } else if (error.message.includes("Username or password is incorrect")) {
    res.status(400).json({ error: "Username or password is incorrect" });
  } else if (error instanceof z.ZodError) {
    res.status(400).send({ error: "Input in wrong format" });
  } else if (error.name === "JsonWebTokenError") {
    res.status(401).json({ error: "token missing or invalid" });
  } else if (error.name === "TokenExpiredError") {
    res.status(401).json({
      error: "token expired"
    });
  } else {
    res.status(500).send({ error: "Something went wrong: " });
  }
};
