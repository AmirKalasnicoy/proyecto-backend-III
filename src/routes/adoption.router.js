import { Router } from "express";
import { AdoptionModel } from "../models/adoption.model.js";
import { UserModel } from "../models/user.model.js";
import { PetModel } from "../models/pet.model.js";

const router = Router();

/**
 * ==========================================
 *  CREAR ADOPCIÓN
 *  POST /api/adoption
 * ==========================================
 */
router.post("/", async (req, res, next) => {
  try {
    const { user, pet } = req.body;

    if (!user || !pet) {
      return res.status(400).json({
        status: "error",
        message: "Debe enviar user y pet."
      });
    }

    // Verificar usuario
    const userExists = await UserModel.findById(user);
    if (!userExists) {
      return res.status(404).json({
        status: "error",
        message: "El usuario no existe."
      });
    }

    // Verificar mascota
    const petExists = await PetModel.findById(pet);
    if (!petExists) {
      return res.status(404).json({
        status: "error",
        message: "La mascota no existe."
      });
    }

    // Crear adopción en Mongo
    const adoption = await AdoptionModel.create({
      user,
      pet
    });

    // Agregar la mascota al usuario
    await UserModel.updateOne(
      { _id: user },
      { $push: { pets: pet } }
    );

    return res.status(201).json({
      status: "success",
      payload: adoption
    });

  } catch (err) {
    next(err);
  }
});

/**
 * ==========================================
 *  OBTENER TODAS LAS ADOPCIONES
 *  GET /api/adoption
 * ==========================================
 */
router.get("/", async (_req, res, next) => {
  try {
    const all = await AdoptionModel.find()
      .populate("user")
      .populate("pet");

    res.json({
      status: "success",
      payload: all
    });

  } catch (err) {
    next(err);
  }
});

export default router;
