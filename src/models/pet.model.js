import mongoose from "mongoose";

const petSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["dog", "cat", "bird", "other"], default: "dog" },
  age: { type: Number, default: 1 },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null }
}, { timestamps: true });

export const PetModel = mongoose.model("Pet", petSchema);
