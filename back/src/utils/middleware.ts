import { Request, Response, NextFunction } from "express";

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
    res.status(400).json({ error: "expected `username` to be unique" });
  } else if (error.message.includes("Username or password is incorrect")) {
    res.status(400).json({ error: "Username or password is incorrect" });
  } else {
    res.status(500).send({ errors: [{ message: "Something went wrong: " }] });
  }
};
