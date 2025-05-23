import express from "express";
import {
  createCompromisso,
  getCompromissos,
  updateCompromisso,
  getCompromissoById,
} from "../controllers/CompromissoController.js";

const router = express.Router();

router.post("/", createCompromisso); 
router.get("/", getCompromissos);
router.get("/:id", getCompromissoById);
router.put("/:id", updateCompromisso); 

export default router;