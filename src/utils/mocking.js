import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model.js";
import { PetModel } from "../models/pet.model.js";
import { AdoptionModel } from "../models/adoption.model.js";

const PASSWORD_PLAIN = "coder123";

/* ============================
   MOCK DE USERS (SOLO OBJETOS)
=============================== */
export async function buildMockUsers(count = 50) {
  const hashed = await bcrypt.hash(PASSWORD_PLAIN, 10);

  return Array.from({ length: count }).map(() => {
    const first = faker.person.firstName();
    const last = faker.person.lastName();
    return {
      first_name: first,
      last_name: last,
      email: faker.internet.email({ firstName: first, lastName: last }).toLowerCase(),
      password: hashed,
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: [],
    };
  });
}

/* ============================
   MOCK DE PETS (SOLO OBJETOS)
=============================== */
export function buildMockPets(count = 10) {
  const types = ["dog", "cat", "bird", "other"];
  return Array.from({ length: count }).map(() => ({
    name: faker.animal.petName(),
    type: faker.helpers.arrayElement(types),
    age: faker.number.int({ min: 1, max: 18 }),
    owner: null,
  }));
}

/* ============================
   MOCK DE ADOPTIONS (INSERTA EN DB)
=============================== */
export async function buildMockAdoptions(count = 10) {
  const users = await UserModel.find();
  const pets = await PetModel.find();

  if (!users.length || !pets.length) {
    return {
      status: "error",
      message: "Debe haber users y pets en la base para generar adopciones.",
    };
  }

  const results = [];

  for (let i = 0; i < count; i++) {
    const randomUser = users[Math.floor(Math.random() * users.length)];
    const randomPet = pets[Math.floor(Math.random() * pets.length)];

    // Crear adopción en DB
    const adoption = await AdoptionModel.create({
      uid: randomUser._id,
      pid: randomPet._id,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Asignar mascota al array del usuario
    await UserModel.updateOne(
      { _id: randomUser._id },
      { $push: { pets: randomPet._id } }
    );

    results.push(adoption);
  }

  return {
    status: "success",
    count: results.length,
    payload: results,
  };
}
