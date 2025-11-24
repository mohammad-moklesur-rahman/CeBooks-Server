import { getDB } from "../config/CeBooks.config.js";


export const eBooksCollection = () => {
  const db = getDB();
  return db.collection("eBooks");
};