import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: true, trim: true },
  last_name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // va encriptada
  role: { type: String, enum: ["user", "admin"], default: "user" },
  pets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pet" }]
}, { timestamps: true });

export const UserModel = mongoose.model("User", userSchema);
