import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

const PASSWORD_PLAIN = "coder123";

// Genera N usuarios con password encriptada, role aleatorio y pets: []
export async function buildMockUsers(count = 50) {
  const hashed = await bcrypt.hash(PASSWORD_PLAIN, 10);

  return Array.from({ length: count }).map(() => {
    const first = faker.person.firstName();
    const last  = faker.person.lastName();
    const email = faker.internet.email({ firstName: first, lastName: last }).toLowerCase();

    return {
      // Formato similar a Mongo cuando mockeamos (para visualización)
      _id: faker.database.mongodbObjectId(),
      first_name: first,
      last_name: last,
      email,
      password: hashed,               // encriptada
      role: faker.helpers.arrayElement(["user", "admin"]),
      pets: [],                       // array vacio
      createdAt: new Date(),
      updatedAt: new Date(),
      __v: 0
    };
  });
}

// Genera N mascotas para el endpoint /mockingpets
export function buildMockPets(count = 10) {
  const types = ["dog", "cat", "bird", "other"];
  return Array.from({ length: count }).map(() => ({
    _id: faker.database.mongodbObjectId(),
    name: faker.animal.petName(),
    type: faker.helpers.arrayElement(types),
    age: faker.number.int({ min: 1, max: 18 }),
    owner: null,
    createdAt: new Date(),
    updatedAt: new Date(),
    __v: 0
  }));
}
