import { Router } from "express";
import { UserModel } from "../models/user.model.js";

const router = Router();

/**
 * @openapi
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 */
router.get("/", async (_req, res, next) => {
  try {
    const users = await UserModel.find().lean();
    res.json({ status: "success", count: users.length, payload: users });
  } catch (err) { next(err); }
});

export default router;

