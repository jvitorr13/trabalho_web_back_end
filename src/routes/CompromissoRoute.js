import express from "express";
import { createCompromisso, getCompromissos } from "../controllers/CompromissoController.js";

const router = express.Router();

router.post("/", createCompromisso); 
router.get("/", getCompromissos);

export default router;