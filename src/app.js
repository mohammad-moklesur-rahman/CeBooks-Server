import express from "express";
import cors from "cors";
import { connectDB } from "./config/CeBooks.config.js";
import eBooksRoute from "./routes/eBooksRoute.js";

const app = express();
connectDB();

// * middleware
app.use(cors());
app.use(express.json());

// * Products Route
app.use("/api/ebooks", eBooksRoute);


// * Root Route
app.get("/", (req, res) => {
  res.send("Welcome to backend Server!");
});

export default app;
