import { eBooksCollection } from "../models/eBooksModel.js";

// * Create Products
export const createEBooks = async (req, res) => {
  const doc = req.body;
  const result = await eBooksCollection().insertOne(doc);
  res.send(result);
};


// import { ObjectId } from "mongodb";
// import { productsCollection } from "../models/productsModel.js";

// // * Get Product By id
// export const getProductById = async (req, res) => {
//   const { id } = req.params;
//   const result = await productsCollection().findOne({ _id: new ObjectId(id) });
//   res.send(result);
// };

// // * Get All Products
// export const getAllProduct = async (req, res) => {
//   try {
//     const { category } = req.query;

//     const categoryMap = {
//       "Pets (Adoption)": "Pets",
//       "Pet Food": "Food",
//       Accessories: "Accessories",
//       "Pet Care Products": "Care Products",
//     };

//     const mongoCategory = categoryMap[category] || category;

//     const filter = mongoCategory
//       ? { category: { $regex: new RegExp(mongoCategory, "i") } }
//       : {};

//     const result = await productsCollection().find(filter).toArray();
//     res.send(result);
//   } catch (error) {
//     res.status(500).send({ message: "Server error" });
//   }
// };

// // *Get latest 6 listings products
// export const getLatestListing = async (req, res) => {
//   try {
//     // Sort by date descending and limit to 6
//     const listings = await productsCollection()
//       .find()
//       .sort({ date: -1 })
//       .limit(6)
//       .toArray();

//     res.send(listings);
//   } catch (error) {
//     res.status(500).send({ message: "Server Error" });
//   }
// };

// // * Get my Listings
// export const getUserProducts = async (req, res) => {
//   try {
//     const userEmail = req.query.email;

//     if (!userEmail) {
//       return res.status(400).send({ message: "email required" });
//     }

//     const myProducts = await productsCollection()
//       .find({ email: userEmail })
//       .toArray();

//     res.send(myProducts);
//   } catch (error) {
//     res.status(500).send({ message: "Failed to fetch" });
//   }
// };

// // * Create Products
// export const createProduct = async (req, res) => {
//   const doc = req.body;
//   const result = await productsCollection().insertOne(doc);
//   res.send(result);
// };

// // * Update Product
// export const updateProduct = async (req, res) => {
//   const id = req.params.id;
//   const updatedProduct = req.body;

//   // Ensure valid ObjectId
//   const filter = { _id: new ObjectId(id) };

//   const updateDoc = {
//     $set: {
//       name: updatedProduct.name,
//       category: updatedProduct.category,
//       price: updatedProduct.price,
//       location: updatedProduct.location,
//       description: updatedProduct.description,
//       image: updatedProduct.image,
//       date: updatedProduct.date,
//       email: updatedProduct.email,
//     },
//   };

//   const result = await productsCollection().updateOne(filter, updateDoc);

//   res.send(result);
// };

// // * Delete product
// export const deleteProduct = async (req, res) => {
//   const id = req.params.id;
//   const result = await productsCollection().deleteOne({
//     _id: new ObjectId(id),
//   });
//   res.send(result);
// };
