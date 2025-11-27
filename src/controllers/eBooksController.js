import { ObjectId } from "mongodb";
import { eBooksCollection } from "../models/eBooksModel.js";

const getBaseUrl = (req) => {
  // Attempt to construct the full origin (protocol + host)
  const protocol = req.protocol || "http";
  const host = req.get("host"); // e.g., localhost:5000
  return host ? `${protocol}://${host}` : "";
};

// * Get eBook By id
export const getEBookById = async (req, res) => {
  const { id } = req.params;
  const result = await eBooksCollection().findOne({ _id: new ObjectId(id) });
  res.send(result);
};

// * Get my Listings eBooks
export const getMyEBooks = async (req, res) => {
  try {
    const userEmail = req.query.email;

    if (!userEmail) {
      return res.status(400).send({ message: "email required" });
    }

    const myEBooks = await eBooksCollection()
      .find({ email: userEmail })
      .toArray();

    res.send(myEBooks);
  } catch (error) {
    res.status(500).send({ message: "Failed to fetch" });
  }
};

// * Get All eBooks
export const getAllEBooks = async (req, res) => {
  try {
    const { category } = req.query;

    const categoryMap = {
      islamic: "Islamic Books",
      english: "English Books",
      bangla: "Bangla Books",
    };

    const mongoCategory = categoryMap[category?.toLowerCase()] || category;

    const filter = mongoCategory
      ? { category: { $regex: new RegExp(mongoCategory, "i") } }
      : {};

    const result = await eBooksCollection().find(filter).toArray();

    //base URL (e.g., http://localhost:5000)
    const baseUrl = getBaseUrl(req);

    const resultWithPublicUrls = result.map((ebook) => {
      if (ebook.thumbnailUrl && ebook.thumbnailUrl.startsWith("/uploads/")) {
        // Prepend the base URL to make it an absolute URL
        // e.g., http://localhost:5000/uploads/image.jpg
        ebook.thumbnailUrl = `${baseUrl}${ebook.thumbnailUrl}`;
      }

      if (ebook.pdfUrl && ebook.pdfUrl.startsWith("/uploads/")) {
        ebook.pdfUrl = `${baseUrl}${ebook.pdfUrl}`;
      }

      return ebook;
    });

    res.send(resultWithPublicUrls);
  } catch (error) {
    console.error("Error fetching ebooks:", error);
    res.status(500).send({ message: "Server error" });
  }
};

// *Get latest 6 listings eBooks
export const getLatestListing = async (req, res) => {
  try {
    // Sort by date descending and limit to 6
    const listings = await eBooksCollection()
      .find()
      .sort({ date: -1 })
      .limit(6)
      .toArray();

    res.send(listings);
  } catch (error) {
    res.status(500).send({ message: "Server Error" });
  }
};

// * Add eBooks
export const createEBooks = async (req, res) => {
  const doc = req.body;
  const result = await eBooksCollection().insertOne(doc);
  res.send(result);
};

// * Delete eBook
export const deleteEBook = async (req, res) => {
  const id = req.params.id;
  const result = await eBooksCollection().deleteOne({
    _id: new ObjectId(id),
  });
  res.send(result);
};
