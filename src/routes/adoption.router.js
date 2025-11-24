import { Router } from "express";
import { AdoptionModel } from "../models/adoption.model.js";

const router = Router();

router.post("/", async (req, res, next) => {
  try {
    const adoption = await AdoptionModel.create(req.body);
    res.status(201).json({ status: "success", payload: adoption });
  } catch (err) { next(err); }
});

router.get("/", async (req, res, next) => {
  try {
    const adoptions = await AdoptionModel.find().lean();
    res.json({ status: "success", payload: adoptions });
  } catch (err) { next(err); }
});

export default router;
