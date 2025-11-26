import express from "express";
import {
  createEBooks,
  getAllEBooks,
  getLatestListing,
  getMyEBooks,
} from "../controllers/eBooksController.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

// Ensure uploads folder exists
const uploadPath = path.join(process.cwd(), "src", "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

// Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // Save inside src/uploads
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// POST route with file uploads
router.post(
  "/",
  upload.fields([
    { name: "thumbnail", maxCount: 1 },
    { name: "pdf", maxCount: 1 },
  ]),
  createEBooks
);

// * Get all eBooks
router.get("/", getAllEBooks);

// * Get latest eBooks
router.get("/latest-ebooks", getLatestListing);

// * Get My eBooks
router.get("/my-ebooks", getMyEBooks);

export default router;
