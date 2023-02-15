import express from "express";
import cors from "cors";
import appliances from "./api/appliances.route.js";
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/v1/appliances", appliances);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
