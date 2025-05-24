import express from "express";
import { 
  createCompromisso, 
  getCompromissos, 
  getCompromissoById, 
  updateCompromisso, 
  deleteCompromisso 
} from "../controllers/CompromissoController.js";

const router = express.Router();

router.post("/", createCompromisso); 
router.get("/", getCompromissos);
router.get("/:id", getCompromissoById);     
router.put("/:id", updateCompromisso);      
router.delete("/:id", deleteCompromisso);    

export default router;