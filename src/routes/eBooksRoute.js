import express from "express";
import { createEBooks } from "../controllers/eBooksController.js";

const router = express.Router();

// * Routes for Products
router.post("/", createEBooks);



export default router;
