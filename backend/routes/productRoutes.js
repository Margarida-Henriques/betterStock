import express from "express";
const router = express.Router();
import {
  getProducts,
  createProduct,
  getCategories,
  deleteProduct,
  changeStock,
} from "../controllers/productControllers.js";

router.get("/", getProducts);
router.post("/", createProduct);
router.delete("/", deleteProduct);

router.put("/store/:id", changeStock);
router.get("/categories", getCategories);

export default router;
