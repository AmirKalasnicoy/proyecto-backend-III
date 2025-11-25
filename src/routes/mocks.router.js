import { Router } from "express";
import { buildMockUsers, buildMockPets, buildMockAdoptions } from "../utils/mocking.js";
import { UserModel } from "../models/user.model.js";
import { PetModel } from "../models/pet.model.js";

const router = Router();

/* ===============================
   SOLO MOCKING (NO INSERTA)
================================ */
router.get("/mockingusers", async (req, res, next) => {
  try {
    const count = Number(req.query.count ?? 20);
    const users = await buildMockUsers(count);
    res.json({ status: "success", count: users.length, payload: users });
  } catch (err) { next(err); }
});

router.get("/mockingpets", (req, res) => {
  const count = Number(req.query.count ?? 10);
  const pets = buildMockPets(count);
  res.json({ status: "success", count: pets.length, payload: pets });
});

/* ===============================
   MOCKING ADOPTIONS (INSERTA)
================================ */
router.get("/mockingadoptions", async (req, res, next) => {
  try {
    const count = Number(req.query.count ?? 10);
    const result = await buildMockAdoptions(count);
    return res.json(result);
  } catch (err) { next(err); }
});

/* ===============================
   GENERAR USERS + PETS EN DB
================================ */
router.post("/generateData", async (req, res, next) => {
  try {
    const usersToGen = Number(req.body?.users ?? 0);
    const petsToGen  = Number(req.body?.pets ?? 0);

    let createdUsers = [];
    let createdPets  = [];

    if (usersToGen > 0) {
      const mocks = await buildMockUsers(usersToGen);

      createdUsers = await UserModel.insertMany(
        mocks.map(u => ({
          first_name: u.first_name,
          last_name : u.last_name,
          email     : u.email,
          password  : u.password,
          role      : u.role,
          pets      : []
        }))
      );
    }

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
    }

    res.status(201).json({
      status: "success",
      users_inserted: createdUsers.length,
      pets_inserted : createdPets.length
    });
  } catch (err) { next(err); }
});

export default router;
