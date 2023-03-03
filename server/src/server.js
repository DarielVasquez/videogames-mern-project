import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import user from "./routes/users.route.js";
import favorites from "./routes/favorites.route.js";
import login from "./routes/login.route.js";
import logout from "./routes/logout.route.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/api/user", user);
app.use("/api/favorites", favorites);
app.use("/api/login", login);
app.use("/api/logout", logout);
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

export default app;
