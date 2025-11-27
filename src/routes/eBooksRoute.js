import express from "express";
import {
  createEBooks,
  deleteEBook,
  getAllEBooks,
  getEBookById,
  getLatestListing,
  getMyEBooks,
} from "../controllers/eBooksController.js";

const router = express.Router();

// * Get My eBooks
router.get("/my-ebooks", getMyEBooks);

// * Get all eBooks
router.get("/", getAllEBooks);

// * Get latest eBooks
router.get("/latest-ebooks", getLatestListing);

// * Get eBook by id
router.get("/:id", getEBookById);

// * POST route
router.post("/", createEBooks);

// * delete eBook by id
router.delete("/delete/:id", deleteEBook);

export default router;
