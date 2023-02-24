import express from "express";
import cors from "cors";
import users from "./routes/users.route.js";
import favorites from "./routes/favorites.route.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/routes/users", users);
app.use("/routes/favorites", favorites);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
