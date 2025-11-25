import express from "express";
import cors from "cors";
import path from "path";
import { connectDB } from "./config/CeBooks.config.js";
import eBooksRoute from "./routes/eBooksRoute.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(process.cwd(), "src", "uploads")));

// Connect DB
connectDB();

// Routes
app.use("/api/ebooks", eBooksRoute);

app.get("/", (req, res) => res.send("Welcome to backend server!"));

export default app;
