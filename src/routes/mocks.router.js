import { Router } from "express";
import { buildMockUsers, buildMockPets } from "../utils/mocking.js";
import { UserModel } from "../models/user.model.js";
import { PetModel } from "../models/pet.model.js";

const router = Router();

/** GET (solo mock, no inserta) */
router.get("/mockingpets", (req, res) => {
  const count = Number(req.query.count ?? 10);
  const pets = buildMockPets(count);
  res.json({ status: "success", count: pets.length, payload: pets });
});

/** GET  (solo mock, no inserta) */
router.get("/mockingusers", async (req, res, next) => {
  try {
    const count = Number(req.query.count ?? 50);
    const users = await buildMockUsers(count);
    res.json({ status: "success", count: users.length, payload: users });
  } catch (err) {
    next(err);
  }
});

/** POST  { users: number, pets: number } */
router.post("/generateData", async (req, res, next) => {
  try {
    const usersToGen = Number(req.body?.users ?? 0);
    const petsToGen  = Number(req.body?.pets ?? 0);

    // 1) USERS
    let createdUsers = [];
    if (usersToGen > 0) {
      const mockUsers = await buildMockUsers(usersToGen);

      // asegurar unicidad por email y quitar campos mock
      const uniqueByEmail = {};
      for (const u of mockUsers) uniqueByEmail[u.email] = u;

      const usersReady = Object.values(uniqueByEmail).map(u => ({
        first_name: u.first_name,
        last_name : u.last_name,
        email     : u.email,
        password  : u.password, 
        role      : u.role,
        pets      : []
      }));

      createdUsers = await UserModel.insertMany(usersReady);
    }

    // 2) PETS
    let createdPets = [];
    if (petsToGen > 0) {
      const types = ["dog", "cat", "bird", "other"];
      const mockPets = Array.from({ length: petsToGen }).map(() => ({
        name: "Pet " + Math.random().toString(36).slice(2, 7),
        type: types[Math.floor(Math.random() * types.length)],
        age: 1 + Math.floor(Math.random() * 15),
        owner: createdUsers.length
          ? createdUsers[Math.floor(Math.random() * createdUsers.length)]._id
          : null
      }));

      createdPets = await PetModel.insertMany(mockPets);

      // reflejar en users.pets (opcional)
      if (createdUsers.length && createdPets.length) {
        const byOwner = new Map();
        for (const p of createdPets) {
          if (!p.owner) continue;
          const k = p.owner.toString();
          if (!byOwner.has(k)) byOwner.set(k, []);
          byOwner.get(k).push(p._id);
        }
        const bulk = [];
        for (const [ownerId, petIds] of byOwner.entries()) {
          bulk.push({
            updateOne: {
              filter: { _id: ownerId },
              update: { $push: { pets: { $each: petIds } } }
            }
          });
        }
        if (bulk.length) await UserModel.bulkWrite(bulk);
      }
    }

    res.status(201).json({
      status: "success",
      users_inserted: createdUsers.length,
      pets_inserted : createdPets.length
    });
  } catch (err) {
    next(err);
  }
});

export default router;
