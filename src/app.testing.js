import express from "express";
import cors from "cors";
import morgan from "morgan";

import adoptionRouter from "./routes/adoption.router.js";

// Creamos una instancia especial para testing
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Solo usás la ruta que vas a testear
app.use("/api/adoption", adoptionRouter);

export default app;
