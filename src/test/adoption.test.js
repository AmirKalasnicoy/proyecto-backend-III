import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import mongoose from "mongoose";
import app from "../app.testing.js";
import { AdoptionModel } from "../models/adoption.model.js";
import { UserModel } from "../models/user.model.js";
import { PetModel } from "../models/pet.model.js";

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URL_TEST);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe("Adoption API", () => {

  it("Debe crear una adopción (POST /api/adoption)", async () => {
    const user = await UserModel.create({ 
      first_name: "Test",
      last_name: "User",
      email: "test@test.com",
      password: "123456",
      pets: []
    });

    const pet = await PetModel.create({
      name: "Firu",
      type: "dog",
      age: 3
    });

    const res = await request(app)
      .post("/api/adoption")
      .send({ user: user._id, pet: pet._id });

    expect(res.statusCode).toBe(201);
    expect(res.body.status).toBe("success");
    expect(res.body.payload.user).toBe(String(user._id));
  });

  it("Debe obtener todas las adopciones (GET /api/adoption)", async () => {
    const res = await request(app).get("/api/adoption");

    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe("success");
    expect(Array.isArray(res.body.payload)).toBe(true);
  });

});
