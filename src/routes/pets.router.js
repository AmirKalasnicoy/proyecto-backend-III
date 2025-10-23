import { Router } from "express";
import { PetModel } from "../models/pet.model.js";

const router = Router();

// Lista todas las mascotas
router.get("/", async (_req, res, next) => {
  try {
    const pets = await PetModel.find().lean();
    res.json({ status: "success", count: pets.length, payload: pets });
  } catch (err) { next(err); }
});

export default router;
