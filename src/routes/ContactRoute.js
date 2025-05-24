import express from "express";
import ContactController from "../controllers/ContactController.js";

const router = express.Router();
router.get("/", ContactController.get);
router.get("/:id", ContactController.get);
router.post("/", ContactController.persist);
router.put("/:id", ContactController.persist);
router.delete("/:id", ContactController.destroy);

export default router;