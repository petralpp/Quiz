import request from "supertest";
import app from "../src/app";
import mongoose from "mongoose";

import testUtils from "./test_utils";

import { UserModel } from "../src/models/userModel";

describe("User router", () => {
  it("POST /api/user/register should successfully register a new user", async () => {
    const user = testUtils.testUser;

    await request(app)
      .post("/api/user/register")
      .send(user)
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
  it("POST /api/user/register should fail with missing credentials", async () => {
    const user = testUtils.testUser;

    await request(app)
      .post("/api/user/register")
      .send({ username: user.username, name: user.name })
      .expect(400)
      .expect("Content-Type", /application\/json/)
      .expect({ error: "Credentials missing" });

    await request(app)
      .post("/api/user/register")
      .send({ name: user.name, password: user.password })
      .expect(400)
      .expect("Content-Type", /application\/json/)
      .expect({ error: "Credentials missing" });
  });
  it("POST /api/user/login should successfully login a user", async () => {
    const { username, password } = testUtils.testUser;

    await request(app)
      .post("/api/user/login")
      .send({ username, password })
      .expect(201)
      .expect("Content-Type", /application\/json/);
  });
  it("POST /api/user/login should fail with a wrong username", async () => {
    const { password } = testUtils.testUser;
    const username = "wrongUsername";

    await request(app)
      .post("/api/user/login")
      .send({ username, password })
      .expect(401)
      .expect("Content-Type", /application\/json/)
      .expect({ error: "Invalid username or password" });
  });
  it("POST /api/user/login should fail with a wrong password", async () => {
    const { username } = testUtils.testUser;
    const password = "wrongPassword";

    await request(app)
      .post("/api/user/login")
      .send({ username, password })
      .expect(401)
      .expect("Content-Type", /application\/json/)
      .expect({ error: "Invalid username or password" });
  });
  it("POST /api/user/login should fail with a missing username or password", async () => {
    const { username, password } = testUtils.testUser;

    await request(app)
      .post("/api/user/login")
      .send({ username })
      .expect(400)
      .expect("Content-Type", /application\/json/)
      .expect({ error: "Credentials missing" });

    await request(app)
      .post("/api/user/login")
      .send({ password })
      .expect(400)
      .expect("Content-Type", /application\/json/)
      .expect({ error: "Credentials missing" });
  });
});

afterAll(async () => {
  await UserModel.deleteMany({});
  await mongoose.connection.close();
});
