import { Router } from "express";
import { UserModel } from "../models/user.model.js";

const router = Router();

// Lista todos los usuarios (con sus pets como ObjectId)
router.get("/", async (_req, res, next) => {
  try {
    const users = await UserModel.find().lean();
    res.json({ status: "success", count: users.length, payload: users });
  } catch (err) { next(err); }
});

export default router;
